(() => {
  'use strict';

  const DATA = window.YOGA_DATA;
  const STORAGE = {
    profile: 'yoga20_profile_v1',
    classes: 'yoga20_classes_v1',
    draft: 'yoga20_draft_v1',
    demo: 'yoga20_demo_v1'
  };

  const main = document.getElementById('mainContent');
  const modalRoot = document.getElementById('modalRoot');
  const toast = document.getElementById('toast');
  const settingsBtn = document.getElementById('settingsBtn');
  const navItems = [...document.querySelectorAll('.nav-item')];

  let profile = loadJSON(STORAGE.profile, null);
  let savedClasses = loadJSON(STORAGE.classes, []);
  let currentDraft = loadJSON(STORAGE.draft, null);
  function normalizeClassData(item) {
    if (!item?.criteria) return item;
    item.criteria.salutation ??= 'auto';
    item.criteria.salutationVariant ??= 'auto';
    item.criteria.salutationRounds ??= 2;
    return item;
  }
  savedClasses = savedClasses.map(normalizeClassData);
  currentDraft = normalizeClassData(currentDraft);

  let currentRoute = 'home';
  let classModeTimer = null;
  let classModeSeconds = 0;
  let classModeRunning = false;

  const LEVELS = { beginner: 1, intermediate: 2, advanced: 3, multilevel: 2 };
  const INTENSITIES = { gentle: 1, moderate: 2, active: 3 };

  function loadJSON(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (error) {
      console.warn('No se pudo leer', key, error);
      return fallback;
    }
  }

  function saveJSON(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function uid(prefix = 'id') {
    if (window.crypto?.randomUUID) return `${prefix}-${crypto.randomUUID()}`;
    return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }

  function escapeHTML(value = '') {
    return String(value)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');
  }

  function formatDate(dateString) {
    const date = dateString ? new Date(dateString) : new Date();
    return new Intl.DateTimeFormat('es-AR', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
    }).format(date);
  }

  function formatShortDate(dateString) {
    return new Intl.DateTimeFormat('es-AR', {
      day: '2-digit', month: 'short', year: 'numeric'
    }).format(new Date(dateString));
  }

  function humanAgo(dateString) {
    const diff = Date.now() - new Date(dateString).getTime();
    const mins = Math.max(0, Math.floor(diff / 60000));
    if (mins < 1) return 'recién';
    if (mins < 60) return `hace ${mins} min`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `hace ${hours} h`;
    const days = Math.floor(hours / 24);
    return `hace ${days} día${days === 1 ? '' : 's'}`;
  }

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('is-visible');
    window.setTimeout(() => toast.classList.remove('is-visible'), 2800);
  }

  function labelFrom(list, id, lang = 'es') {
    const item = list.find(entry => entry.id === id);
    return item ? item[lang] || item.es : id;
  }

  function styleLabel(id) {
    return ({ hatha: 'Hatha', vinyasa: 'Vinyasa', yin: 'Yin', restorative: 'Restaurativo' })[id] || id;
  }

  function levelLabel(id) {
    return ({ beginner: 'Inicial', intermediate: 'Intermedio', advanced: 'Avanzado', multilevel: 'Multinivel' })[id] || id;
  }

  function intensityLabel(id) {
    return ({ gentle: 'Suave', moderate: 'Moderada', active: 'Activa' })[id] || id;
  }

  function activateRoute(route) {
    currentRoute = route;
    navItems.forEach(item => item.classList.toggle('is-active', item.dataset.route === route));
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (route === 'home') renderHome();
    if (route === 'create') renderCreate();
    if (route === 'library') renderLibrary();
    if (route === 'saved') renderSaved();
  }

  function renderOnboarding() {
    document.body.classList.add('is-onboarding');
    const template = document.getElementById('onboardingTemplate');
    main.replaceChildren(template.content.cloneNode(true));
    document.getElementById('onboardingForm').addEventListener('submit', event => {
      event.preventDefault();
      const form = new FormData(event.currentTarget);
      profile = {
        name: String(form.get('teacherName')).trim(),
        defaultLanguage: form.get('defaultLanguage'),
        defaultStyle: form.get('defaultStyle'),
        createdAt: new Date().toISOString()
      };
      saveJSON(STORAGE.profile, profile);
      document.body.classList.remove('is-onboarding');
      createDemoClass();
      activateRoute('home');
      showToast('Tu estudio Yoga 2.0 está listo.');
    });
  }

  function createDemoClass() {
    if (localStorage.getItem(STORAGE.demo) === 'created') return;
    const demo = generateClass({
      style: profile.defaultStyle || 'hatha',
      duration: 45,
      level: 'multilevel',
      intention: 'grounding',
      focus: 'whole',
      intensity: 'moderate',
      groupNeed: 'multilevel',
      language: profile.defaultLanguage || 'es',
      equipment: ['blocks', 'strap']
    });
    demo.name = 'Clase de ejemplo · Volver al centro';
    demo.demo = true;
    demo.saved = true;
    savedClasses.unshift(demo);
    saveJSON(STORAGE.classes, savedClasses);
    localStorage.setItem(STORAGE.demo, 'created');
  }

  function renderHome() {
    const recent = savedClasses[0];
    const taught = savedClasses.filter(item => item.taught).length;
    const totalMinutes = savedClasses.reduce((sum, item) => sum + Number(item.criteria.duration || 0), 0);
    const favoriteStyle = mostFrequent(savedClasses.map(item => item.criteria.style));

    main.innerHTML = `
      <section class="hero-panel visual-hero">
        <div class="hero-copy">
          <p class="eyebrow">${escapeHTML(formatDate())}</p>
          <h2>Hola, ${escapeHTML(profile.name)}</h2>
          <p>Diseñá una clase con intención, adaptala a tu grupo y conservá tu propia voz como docente.</p>
          <button class="primary-button compact" id="quickCreateBtn" type="button">✦ Crear clase</button>
        </div>
        <img class="hero-app-image" src="${DATA.appImages.hero}" alt="Yoga 2.0, estudio visual para profesores de yoga">
      </section>

      <section class="metrics-grid" aria-label="Resumen de actividad">
        <article class="metric-card">
          <span class="metric-label">Clases guardadas</span>
          <strong>${savedClasses.length}</strong>
        </article>
        <article class="metric-card">
          <span class="metric-label">Clases impartidas</span>
          <strong>${taught}</strong>
        </article>
        <article class="metric-card">
          <span class="metric-label">Minutos planificados</span>
          <strong>${totalMinutes}</strong>
        </article>
      </section>

      <section class="section-block">
        <div class="section-heading">
          <div>
            <p class="eyebrow">CONTINUAR</p>
            <h3>Tu última clase</h3>
          </div>
          ${recent ? '<button class="text-button" id="seeAllBtn" type="button">Ver todas</button>' : ''}
        </div>
        ${recent ? classSummaryCard(recent, true) : emptyState('Todavía no guardaste clases.', 'Crear mi primera clase', 'homeEmptyCreate')}
      </section>

      <section class="section-block intention-strip">
        <div>
          <p class="eyebrow">TU ESTUDIO</p>
          <h3>Una práctica que también organiza tu trabajo</h3>
          <p>Usá el generador como punto de partida, editá cada bloque y guardá tus secuencias para construir una biblioteca profesional.</p>
        </div>
        <div class="mini-insight">
          <span>Estilo más usado</span>
          <strong>${favoriteStyle ? styleLabel(favoriteStyle) : 'Aún sin datos'}</strong>
        </div>
      </section>

      <section class="section-block">
        <div class="section-heading">
          <div>
            <p class="eyebrow">FLUJO YOGA 2.0</p>
            <h3>De la intención a la clase</h3>
          </div>
        </div>
        <div class="steps-row">
          <div class="step-node"><b>1</b><span>Elegí contexto</span></div>
          <div class="step-arrow" aria-hidden="true">→</div>
          <div class="step-node"><b>2</b><span>Generá estructura</span></div>
          <div class="step-arrow" aria-hidden="true">→</div>
          <div class="step-node"><b>3</b><span>Editá y guiá</span></div>
        </div>
      </section>
    `;

    document.getElementById('quickCreateBtn').addEventListener('click', () => activateRoute('create'));
    document.getElementById('seeAllBtn')?.addEventListener('click', () => activateRoute('saved'));
    document.getElementById('homeEmptyCreate')?.addEventListener('click', () => activateRoute('create'));
    document.querySelector('[data-open-class]')?.addEventListener('click', event => openSavedClass(event.currentTarget.dataset.openClass));
  }

  function mostFrequent(values) {
    if (!values.length) return null;
    const counts = values.reduce((acc, value) => {
      acc[value] = (acc[value] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
  }

  function classSummaryCard(item, large = false) {
    const theme = DATA.classThemes[item.criteria.intention];
    return `
      <article class="class-card ${large ? 'is-large' : ''}">
        <div class="class-card-top">
          <span class="style-chip">${escapeHTML(styleLabel(item.criteria.style))}</span>
          <span class="muted">${escapeHTML(humanAgo(item.updatedAt || item.createdAt))}</span>
        </div>
        <h4>${escapeHTML(item.name)}</h4>
        <p>${escapeHTML(theme?.es || labelFrom(DATA.intentions, item.criteria.intention))}</p>
        <div class="class-meta">
          <span>◷ ${item.criteria.duration} min</span>
          <span>◉ ${escapeHTML(levelLabel(item.criteria.level))}</span>
          <span>◇ ${escapeHTML(labelFrom(DATA.focusAreas, item.criteria.focus))}</span>
        </div>
        <button class="secondary-button" data-open-class="${escapeHTML(item.id)}" type="button">Abrir clase</button>
      </article>
    `;
  }

  function emptyState(text, buttonText, buttonId) {
    return `
      <div class="empty-state">
        <div aria-hidden="true">❁</div>
        <p>${escapeHTML(text)}</p>
        <button class="secondary-button" id="${escapeHTML(buttonId)}" type="button">${escapeHTML(buttonText)}</button>
      </div>
    `;
  }

  function renderCreate() {
    const defaults = currentDraft?.criteria || {
      style: profile.defaultStyle || 'hatha', duration: 60, level: 'multilevel', intention: 'grounding',
      focus: 'whole', intensity: 'moderate', groupNeed: 'multilevel', language: profile.defaultLanguage || 'es', equipment: ['blocks'],
      salutation: 'auto', salutationVariant: 'auto', salutationRounds: 2
    };

    main.innerHTML = `
      <section class="page-heading">
        <p class="eyebrow">GENERADOR CURADO</p>
        <h2>Crear una clase</h2>
        <p>Definí el contexto. Yoga 2.0 organizará una progresión coherente que después podés editar postura por postura.</p>
      </section>

      <form id="generatorForm" class="generator-form">
        <fieldset class="form-card">
          <legend>1. Formato de la clase</legend>
          <div class="option-grid two">
            ${radioCard('style', 'hatha', 'Hatha', 'Pausado y preciso', defaults.style)}
            ${radioCard('style', 'vinyasa', 'Vinyasa', 'Fluido y dinámico', defaults.style)}
            ${radioCard('style', 'yin', 'Yin', 'Sostenido e introspectivo', defaults.style)}
            ${radioCard('style', 'restorative', 'Restaurativo', 'Soporte y descanso', defaults.style)}
          </div>
          <div class="form-grid two">
            <label>Duración
              <select name="duration">
                ${[30,45,60,75,90].map(value => `<option value="${value}" ${Number(defaults.duration) === value ? 'selected' : ''}>${value} minutos</option>`).join('')}
              </select>
            </label>
            <label>Nivel
              <select name="level">
                <option value="beginner" ${defaults.level === 'beginner' ? 'selected' : ''}>Inicial</option>
                <option value="intermediate" ${defaults.level === 'intermediate' ? 'selected' : ''}>Intermedio</option>
                <option value="advanced" ${defaults.level === 'advanced' ? 'selected' : ''}>Avanzado</option>
                <option value="multilevel" ${defaults.level === 'multilevel' ? 'selected' : ''}>Multinivel</option>
              </select>
            </label>
          </div>
        </fieldset>

        <fieldset class="form-card">
          <legend>2. Intención y foco</legend>
          <div class="form-grid two">
            <label>Intención
              <select name="intention">
                ${DATA.intentions.map(item => `<option value="${item.id}" ${defaults.intention === item.id ? 'selected' : ''}>${escapeHTML(item.es)}</option>`).join('')}
              </select>
            </label>
            <label>Zona o capacidad principal
              <select name="focus">
                ${DATA.focusAreas.map(item => `<option value="${item.id}" ${defaults.focus === item.id ? 'selected' : ''}>${escapeHTML(item.es)}</option>`).join('')}
              </select>
            </label>
            <label>Intensidad
              <select name="intensity">
                <option value="gentle" ${defaults.intensity === 'gentle' ? 'selected' : ''}>Suave</option>
                <option value="moderate" ${defaults.intensity === 'moderate' ? 'selected' : ''}>Moderada</option>
                <option value="active" ${defaults.intensity === 'active' ? 'selected' : ''}>Activa</option>
              </select>
            </label>
            <label>Idioma de las indicaciones
              <select name="language">
                <option value="es" ${defaults.language === 'es' ? 'selected' : ''}>Español</option>
                <option value="en" ${defaults.language === 'en' ? 'selected' : ''}>English</option>
              </select>
            </label>
          </div>
          <div class="salutation-config">
            <div class="section-heading compact-heading">
              <div><span class="field-label">Secuencia solar o lunar</span><small>Se incorpora como un bloque ordenado y protegido.</small></div>
            </div>
            <div class="form-grid three">
              <label>Saludo
                <select name="salutation" id="salutationSelect">
                  ${DATA.salutations.map(item => `<option value="${item.id}" ${(defaults.salutation || 'auto') === item.id ? 'selected' : ''}>${escapeHTML(item.es)}</option>`).join('')}
                </select>
              </label>
              <label>Variante
                <select name="salutationVariant" id="salutationVariantSelect">
                  ${DATA.salutationVariants.map(item => `<option value="${item.id}" ${(defaults.salutationVariant || 'auto') === item.id ? 'selected' : ''}>${escapeHTML(item.es)}</option>`).join('')}
                </select>
              </label>
              <label>Vueltas
                <select name="salutationRounds" id="salutationRoundsSelect">
                  ${[1,2,3,4,5,6].map(value => `<option value="${value}" ${Number(defaults.salutationRounds || 2) === value ? 'selected' : ''}>${value} ${value === 1 ? 'vuelta' : 'vueltas'}</option>`).join('')}
                </select>
              </label>
            </div>
            <p class="field-help" id="salutationHelp">Yoga 2.0 respetará el orden, los lados y las transiciones del saludo seleccionado.</p>
          </div>
        </fieldset>

        <fieldset class="form-card">
          <legend>3. Grupo y recursos</legend>
          <label>Necesidad principal del grupo
            <select name="groupNeed">
              ${DATA.groupNeeds.map(item => `<option value="${item.id}" ${defaults.groupNeed === item.id ? 'selected' : ''}>${escapeHTML(item.es)}</option>`).join('')}
            </select>
          </label>
          <div class="checkbox-section">
            <span class="field-label">Material disponible</span>
            <div class="checkbox-grid">
              ${DATA.equipment.map(item => checkboxOption('equipment', item.id, item.es, defaults.equipment?.includes(item.id))).join('')}
            </div>
          </div>
          <div class="safety-note">
            <strong>Uso profesional responsable</strong>
            <p>Las adaptaciones son recordatorios pedagógicos generales. El profesor debe valorar a cada persona, respetar su formación y derivar consultas de salud.</p>
          </div>
        </fieldset>

        <button class="primary-button generate-button" type="submit">✦ Generar mi clase</button>
      </form>
    `;

    const salutationSelect = document.getElementById('salutationSelect');
    const salutationVariantSelect = document.getElementById('salutationVariantSelect');
    const salutationRoundsSelect = document.getElementById('salutationRoundsSelect');
    const salutationHelp = document.getElementById('salutationHelp');
    const updateSalutationHelp = () => {
      const style = document.querySelector('input[name="style"]:checked')?.value;
      const dynamicStyle = !['yin','restorative'].includes(style);
      salutationSelect.disabled = !dynamicStyle;
      salutationVariantSelect.disabled = !dynamicStyle;
      salutationRoundsSelect.disabled = !dynamicStyle;
      if (!dynamicStyle) {
        salutationHelp.textContent = 'En Yin y Restaurativo se omiten los saludos dinámicos para conservar la lógica del estilo.';
        return;
      }
      const selected = DATA.salutations.find(item => item.id === salutationSelect.value);
      salutationHelp.textContent = selected?.helperEs || 'Yoga 2.0 respetará el orden, los lados y las transiciones del saludo seleccionado.';
    };
    salutationSelect.addEventListener('change', updateSalutationHelp);
    document.querySelectorAll('input[name="style"]').forEach(input => input.addEventListener('change', updateSalutationHelp));
    updateSalutationHelp();

    document.getElementById('generatorForm').addEventListener('submit', event => {
      event.preventDefault();
      const form = new FormData(event.currentTarget);
      const criteria = {
        style: form.get('style'),
        duration: Number(form.get('duration')),
        level: form.get('level'),
        intention: form.get('intention'),
        focus: form.get('focus'),
        intensity: form.get('intensity'),
        groupNeed: form.get('groupNeed'),
        language: form.get('language'),
        equipment: form.getAll('equipment'),
        salutation: form.get('salutation'),
        salutationVariant: form.get('salutationVariant'),
        salutationRounds: Number(form.get('salutationRounds'))
      };
      currentDraft = generateClass(criteria);
      saveJSON(STORAGE.draft, currentDraft);
      renderClassEditor(currentDraft, false);
      showToast('Clase generada. Ahora podés personalizarla.');
    });
  }

  function radioCard(name, value, title, helper, selected) {
    return `
      <label class="choice-card ${selected === value ? 'is-selected' : ''}">
        <input type="radio" name="${name}" value="${value}" ${selected === value ? 'checked' : ''} required>
        <span><strong>${title}</strong><small>${helper}</small></span>
      </label>
    `;
  }

  function checkboxOption(name, value, title, checked) {
    return `
      <label class="check-choice">
        <input type="checkbox" name="${name}" value="${value}" ${checked ? 'checked' : ''}>
        <span>${escapeHTML(title)}</span>
      </label>
    `;
  }

  function generateClass(criteria) {
    const theme = DATA.classThemes[criteria.intention] || DATA.classThemes.grounding;
    const blocks = buildSequence(criteria);
    const className = `${styleLabel(criteria.style)} · ${theme.es}`;
    const now = new Date().toISOString();
    return {
      id: uid('class'),
      name: className,
      criteria,
      theme,
      blocks,
      generalNotes: '',
      createdAt: now,
      updatedAt: now,
      taught: false,
      saved: false,
      demo: false
    };
  }

  function buildSequence(criteria) {
    const style = criteria.style;
    if (style === 'yin') return buildYin(criteria);
    if (style === 'restorative') return buildRestorative(criteria);
    if (style === 'vinyasa') return buildVinyasa(criteria);
    return buildHatha(criteria);
  }

  function buildHatha(c) {
    const salutation = resolveSalutation(c);
    if (!salutation) {
      const durations = allocateMinutes(c.duration, [10, 17, 30, 18, 15, 10]);
      return [
        makeBlock('arrival', 'Llegada e intención', durations[0], choose(c, ['seated','rest'], 1, ['easy-seat'])),
        makeBlock('warm', 'Movilidad y calentamiento', durations[1], choose(c, ['warmup','lunge','inversion'], 3, ['cat-cow','thread-needle','low-lunge'])),
        makeBlock('standing', 'Secuencia de pie', durations[2], choose(c, ['standing','lunge','balance'], 5, ['mountain','warrior1','warrior2','triangle','tree'])),
        makeBlock('peak', 'Foco principal', durations[3], choosePeak(c, 2)),
        makeBlock('floor', 'Integración en el suelo', durations[4], choose(c, ['hips','seated','twist','supine'], 3, ['figure-four','seated-fold','supine-twist'])),
        makeBlock('rest', 'Relajación y cierre', durations[5], choose(c, ['rest'], 1, ['savasana']))
      ];
    }
    const durations = allocateMinutes(c.duration, [10, 14, 22, 20, 14, 10, 10]);
    return [
      makeBlock('arrival', 'Llegada e intención', durations[0], choose(c, ['seated','rest'], 1, ['easy-seat'])),
      makeBlock('warm', 'Movilidad y preparación', durations[1], choose(c, ['warmup','lunge'], 3, ['cat-cow','thread-needle','low-lunge'])),
      makeSalutationBlock(c, durations[2], salutation),
      makeBlock('standing', 'Secuencia de pie', durations[3], choose(c, ['standing','lunge','balance'], 4, ['warrior2','side-angle','triangle','tree'])),
      makeBlock('peak', 'Foco principal', durations[4], choosePeak(c, 2)),
      makeBlock('floor', 'Integración en el suelo', durations[5], choose(c, ['hips','seated','twist','supine'], 2, ['figure-four','supine-twist'])),
      makeBlock('rest', 'Relajación y cierre', durations[6], choose(c, ['rest'], 1, ['savasana']))
    ];
  }

  function buildVinyasa(c) {
    const salutation = resolveSalutation(c);
    if (!salutation) {
      const durations = allocateMinutes(c.duration, [8, 15, 38, 17, 12, 10]);
      return [
        makeBlock('arrival', 'Aterrizaje y respiración', durations[0], choose(c, ['seated','rest'], 1, ['easy-seat'])),
        makeBlock('warm', 'Preparación progresiva', durations[1], choose(c, ['warmup','lunge','inversion'], 4, ['cat-cow','down-dog','low-lunge','half-lift'])),
        makeBlock('flow', 'Flujo principal', durations[2], choose(c, ['standing','lunge','strength','balance'], 7, ['mountain','chair','high-lunge','warrior2','side-angle','plank','down-dog'])),
        makeBlock('peak', 'Exploración pico', durations[3], choosePeak(c, 2)),
        makeBlock('floor', 'Descenso e integración', durations[4], choose(c, ['hips','seated','twist','supine'], 3, ['figure-four','happy-baby','supine-twist'])),
        makeBlock('rest', 'Savasana y cierre', durations[5], choose(c, ['rest'], 1, ['savasana']))
      ];
    }
    const durations = allocateMinutes(c.duration, [8, 12, 25, 25, 12, 8, 10]);
    return [
      makeBlock('arrival', 'Aterrizaje y respiración', durations[0], choose(c, ['seated','rest'], 1, ['easy-seat'])),
      makeBlock('warm', 'Preparación progresiva', durations[1], choose(c, ['warmup','lunge'], 3, ['cat-cow','low-lunge','down-dog'])),
      makeSalutationBlock(c, durations[2], salutation),
      makeBlock('flow', 'Flujo principal', durations[3], choose(c, ['standing','lunge','strength','balance'], 5, ['high-lunge','warrior2','side-angle','plank','down-dog'])),
      makeBlock('peak', 'Exploración pico', durations[4], choosePeak(c, 2)),
      makeBlock('floor', 'Descenso e integración', durations[5], choose(c, ['hips','seated','twist','supine'], 2, ['figure-four','supine-twist'])),
      makeBlock('rest', 'Savasana y cierre', durations[6], choose(c, ['rest'], 1, ['savasana']))
    ];
  }

  function buildYin(c) {
    const durations = allocateMinutes(c.duration, [10, 17, 18, 18, 17, 20]);
    return [
      makeBlock('arrival', 'Llegada y quietud', durations[0], choose(c, ['seated','rest'], 1, ['easy-seat'])),
      makeBlock('yin1', 'Primer espacio de apertura', durations[1], choose(c, ['yin','hips','seated'], 2, ['butterfly','deer'])),
      makeBlock('yin2', 'Profundización suave', durations[2], choose(c, ['yin','hips','seated'], 2, ['dragonfly','head-to-knee'])),
      makeBlock('yin3', 'Cadena posterior y columna', durations[3], choose(c, ['yin','seated','backbend'], 2, ['sphinx','seated-fold'])),
      makeBlock('rebound', 'Rebote e integración', durations[4], choose(c, ['supine','twist','rest'], 2, ['knees-chest','supine-twist'])),
      makeBlock('rest', 'Relajación final', durations[5], choose(c, ['rest'], 1, ['savasana']))
    ];
  }

  function buildRestorative(c) {
    const durations = allocateMinutes(c.duration, [12, 20, 20, 20, 13, 15]);
    return [
      makeBlock('arrival', 'Llegada con soporte', durations[0], choose(c, ['seated','rest'], 1, ['easy-seat'])),
      makeBlock('support1', 'Apertura sostenida', durations[1], choose(c, ['rest','backbend'], 1, ['supported-bridge'])),
      makeBlock('support2', 'Descanso del torso', durations[2], choose(c, ['rest'], 1, ['supported-child'])),
      makeBlock('support3', 'Descarga de piernas', durations[3], choose(c, ['rest'], 1, ['legs-wall'])),
      makeBlock('integration', 'Integración suave', durations[4], choose(c, ['rest','twist'], 2, ['reclined-butterfly','supine-twist'])),
      makeBlock('rest', 'Savasana y cierre', durations[5], choose(c, ['rest'], 1, ['savasana']))
    ];
  }

  function resolveSalutation(criteria) {
    if (criteria.style === 'yin' || criteria.style === 'restorative') return null;
    let id = criteria.salutation || 'auto';
    if (id === 'none') return null;
    if (id === 'auto') {
      if (criteria.style === 'vinyasa') id = criteria.level === 'beginner' || criteria.intensity === 'gentle' ? 'sun-a' : 'sun-b';
      else id = ['calm','release'].includes(criteria.intention) ? 'moon' : 'sun-classic';
    }
    let variant = criteria.salutationVariant || 'auto';
    if (variant === 'auto') {
      const needMap = { pregnancy: 'pregnancy', chair: 'chair', senior: 'mobility' };
      variant = needMap[criteria.groupNeed] || (criteria.level === 'beginner' || ['wrists','knees','lowback'].includes(criteria.groupNeed) ? 'beginner' : 'standard');
    }
    return { id, variant, rounds: Math.max(1, Math.min(6, Number(criteria.salutationRounds || 2))) };
  }

  function makeSalutationBlock(criteria, minutes, selection) {
    const sequence = salutationTemplate(selection.id, selection.variant);
    const secondsPerStep = (minutes * 60) / Math.max(1, sequence.steps.length * selection.rounds);
    const label = DATA.salutations.find(item => item.id === selection.id);
    const variantLabel = DATA.salutationVariants.find(item => item.id === selection.variant);
    return {
      id: uid('salutation'),
      type: 'salutation',
      title: label?.es || 'Secuencia guiada',
      minutes,
      sequence: {
        id: selection.id,
        nameEs: label?.es || 'Secuencia guiada',
        nameEn: label?.en || 'Guided sequence',
        variant: selection.variant,
        variantEs: variantLabel?.es || selection.variant,
        variantEn: variantLabel?.en || selection.variant,
        rounds: selection.rounds,
        sidePatternEs: sequence.sidePatternEs,
        sidePatternEn: sequence.sidePatternEn,
        guidanceEs: sequence.guidanceEs,
        guidanceEn: sequence.guidanceEn
      },
      poses: sequence.steps.map((step, index) => ({
        poseId: step.poseId,
        minutes: secondsPerStep / 60,
        note: '',
        sequenceStep: true,
        side: step.side || '',
        stepNameEs: step.nameEs || '',
        stepNameEn: step.nameEn || '',
        stepCueEs: step.cueEs || '',
        stepCueEn: step.cueEn || '',
        transitionEs: step.transitionEs || '',
        transitionEn: step.transitionEn || ''
      }))
    };
  }

  function allocateSeconds(totalSeconds, count) {
    const base = Math.floor(totalSeconds / count);
    let remainder = totalSeconds - base * count;
    return Array.from({ length: count }, () => base + (remainder-- > 0 ? 1 : 0));
  }

  function salutationTemplate(id, variant) {
    const S = (poseId, side = '', cueEs = '', cueEn = '', nameEs = '', nameEn = '', transitionEs = '', transitionEn = '') => ({ poseId, side, cueEs, cueEn, nameEs, nameEn, transitionEs, transitionEn });
    const bases = {
      'sun-a': {
        sidePatternEs: 'Secuencia simétrica. Cada vuelta comienza y termina en el frente del mat.',
        sidePatternEn: 'Symmetrical sequence. Each round begins and ends at the front of the mat.',
        guidanceEs: 'Vinculá cada transición con la respiración. En Perro boca abajo podés sostener entre tres y cinco respiraciones.',
        guidanceEn: 'Link each transition to the breath. Downward Dog may be held for three to five breaths.',
        steps: [S('prayer'),S('raised-arms'),S('forward-fold'),S('half-lift'),S('plank'),S('chaturanga'),S('up-dog'),S('down-dog'),S('half-lift','','','', '', '', 'Caminá o avanzá al frente y alargá la columna.','Walk or step forward and lengthen the spine.'),S('forward-fold'),S('raised-arms'),S('prayer')]
      },
      'sun-b': {
        sidePatternEs: 'Una vuelta completa incluye Guerrero I a derecha e izquierda antes de regresar al frente.',
        sidePatternEn: 'One full round includes Warrior I on the right and left before returning to the front.',
        guidanceEs: 'Mantené el ritmo respiratorio estable. Evitá acelerar las transiciones de fuerza si se pierde alineación.',
        guidanceEn: 'Keep the breath steady. Avoid speeding through strength transitions when alignment is lost.',
        steps: [S('chair'),S('forward-fold'),S('half-lift'),S('plank'),S('chaturanga'),S('up-dog'),S('down-dog'),S('warrior1','derecha','','','','','Avanzá el pie derecho y girá el talón posterior.','Step the right foot forward and turn the back heel.'),S('plank'),S('chaturanga'),S('up-dog'),S('down-dog'),S('warrior1','izquierda','','','','','Avanzá el pie izquierdo y girá el talón posterior.','Step the left foot forward and turn the back heel.'),S('plank'),S('chaturanga'),S('up-dog'),S('down-dog'),S('half-lift','','','','','','Caminá o avanzá al frente.','Walk or step to the front.'),S('forward-fold'),S('chair'),S('mountain')]
      },
      'sun-classic': {
        sidePatternEs: 'Una vuelta completa contiene dos medias vueltas: primero pierna derecha atrás y luego pierna izquierda atrás.',
        sidePatternEn: 'One full round contains two half-rounds: right leg back first, then left leg back.',
        guidanceEs: 'Recorré las doce posiciones con continuidad y repetí del lado opuesto. La transición puede ser lenta y respirada.',
        guidanceEn: 'Move through the twelve positions continuously and repeat on the opposite side. The transition may be slow and breath-led.',
        steps: [
          S('prayer'),S('raised-arms'),S('forward-fold'),S('low-lunge','derecha atrás'),S('plank'),S('knees-chest-chin'),S('cobra'),S('down-dog'),S('low-lunge','derecha adelante'),S('forward-fold'),S('raised-arms'),S('prayer'),
          S('prayer','','','','Inicio de la segunda media vuelta','Start of the second half-round'),S('raised-arms'),S('forward-fold'),S('low-lunge','izquierda atrás'),S('plank'),S('knees-chest-chin'),S('cobra'),S('down-dog'),S('low-lunge','izquierda adelante'),S('forward-fold'),S('raised-arms'),S('prayer')
        ]
      },
      'moon': {
        sidePatternEs: 'Una vuelta completa viaja hacia la derecha, cruza por el centro y regresa hacia la izquierda.',
        sidePatternEn: 'One full round travels to the right, crosses through center, and returns to the left.',
        guidanceEs: 'Buscá un ritmo continuo y amplio. Priorizá estabilidad lateral, respiración tranquila y transiciones sin apuro.',
        guidanceEn: 'Seek a spacious, continuous rhythm. Prioritize lateral stability, calm breathing, and unhurried transitions.',
        steps: [S('prayer'),S('raised-arms'),S('standing-side-bend','derecha'),S('star'),S('goddess'),S('star'),S('triangle','derecha'),S('pyramid','derecha'),S('low-lunge','derecha'),S('side-lunge','derecha'),S('goddess','centro'),S('side-lunge','izquierda'),S('low-lunge','izquierda'),S('pyramid','izquierda'),S('triangle','izquierda'),S('star'),S('goddess'),S('star'),S('standing-side-bend','izquierda'),S('raised-arms'),S('prayer')]
      }
    };
    const base = structuredCloneSafe(bases[id] || bases['sun-a']);
    if (variant === 'standard') return base;

    if (variant === 'beginner') {
      base.guidanceEs += ' Variante inicial: avanzá caminando, usá bloques y apoyá rodillas antes de las transiciones de fuerza.';
      base.guidanceEn += ' Beginner variation: step rather than jump, use blocks, and lower the knees before strength transitions.';
      base.steps = base.steps.map(step => {
        if (step.poseId === 'chaturanga') return S('knees-chest-chin', step.side, 'Apoyá rodillas y descendé con control.', 'Lower the knees and descend with control.');
        if (step.poseId === 'up-dog') return S('cobra', step.side, 'Elegí una cobra baja y mantené la pelvis apoyada.', 'Choose low cobra and keep the pelvis grounded.');
        if (step.poseId === 'side-lunge') return { ...step, cueEs: 'Mantené la pelvis alta y usá bloques.', cueEn: 'Keep the hips high and use blocks.' };
        return { ...step, transitionEs: step.transitionEs || 'Movete sin saltos y ajustá la base antes de continuar.', transitionEn: step.transitionEn || 'Move without jumping and reset the base before continuing.' };
      });
      return base;
    }

    const chairSun = [
      S('prayer','','Sentate o permanecé de pie detrás de la silla.','Sit or stand behind the chair.','Saludo con silla','Chair prayer'),
      S('raised-arms','','Elevá los brazos dentro de un rango cómodo.','Lift the arms within a comfortable range.','Brazos elevados con apoyo','Supported upward salute'),
      S('forward-fold','','Incliná el torso hacia los muslos o hacia el respaldo.','Fold the torso toward the thighs or chair back.','Flexión con silla','Chair-supported fold'),
      S('half-lift','','Alargá la espalda con manos en muslos o respaldo.','Lengthen the spine with hands on thighs or chair back.','Media flexión con silla','Chair half lift'),
      S('plank','','Caminá hacia atrás y apoyá manos en el respaldo.','Walk back with hands on the chair back.','Plancha inclinada','Inclined plank'),
      S('cobra','','Desde la plancha inclinada, elevá suavemente el pecho.','From inclined plank, gently lift the chest.','Extensión de pie','Standing backbend'),
      S('down-dog','','Llevá la pelvis atrás con manos en la silla.','Send the hips back with hands on the chair.','Perro con silla','Chair-supported Down Dog'),
      S('half-lift','','Caminá al frente y alargá la columna.','Walk forward and lengthen the spine.','Media flexión con silla','Chair half lift'),
      S('raised-arms'),S('prayer')
    ];
    const chairMoon = [S('prayer'),S('raised-arms'),S('standing-side-bend','derecha','','','Inclinación lateral sentada o con silla','Seated or supported side bend'),S('star','','Abrí los pies detrás de la silla.','Step wide behind the chair.','Estrella con silla','Chair-supported star'),S('goddess','','Flexioná poco las rodillas con manos en el respaldo.','Bend the knees slightly with hands on the chair.','Diosa con silla','Chair-supported Goddess'),S('triangle','derecha','','','Triángulo con silla','Chair-supported Triangle'),S('low-lunge','derecha','','','Estocada corta con silla','Short chair-supported lunge'),S('goddess','centro','','','Diosa con silla','Chair-supported Goddess'),S('low-lunge','izquierda','','','Estocada corta con silla','Short chair-supported lunge'),S('triangle','izquierda','','','Triángulo con silla','Chair-supported Triangle'),S('star'),S('standing-side-bend','izquierda','','','Inclinación lateral sentada o con silla','Seated or supported side bend'),S('prayer')];

    if (variant === 'chair') {
      return {
        ...base,
        sidePatternEs: id === 'moon' ? 'Realizá la secuencia a ambos lados utilizando la silla como apoyo estable.' : 'La secuencia completa se realiza sentada o con apoyo continuo en una silla firme.',
        sidePatternEn: id === 'moon' ? 'Practice both sides using the chair as steady support.' : 'The complete sequence is practiced seated or with continuous support from a stable chair.',
        guidanceEs: 'Usá una silla sin ruedas sobre una superficie estable. Evitá colgar el peso del respaldo.',
        guidanceEn: 'Use a wheel-free chair on a stable surface. Avoid hanging body weight from the chair back.',
        steps: id === 'moon' ? chairMoon : (id === 'sun-b' ? [...chairSun.slice(0,4),S('chair','','Llevá la pelvis hacia atrás sin soltar la silla.','Send the hips back while keeping chair support.','Silla con apoyo','Supported Chair'),S('warrior1','derecha','','','Guerrero I con silla','Chair-supported Warrior I'),S('down-dog','','','','Perro con silla','Chair-supported Down Dog'),S('warrior1','izquierda','','','Guerrero I con silla','Chair-supported Warrior I'),...chairSun.slice(7)] : chairSun)
      };
    }

    if (variant === 'mobility') {
      const result = salutationTemplate(id, 'chair');
      result.guidanceEs = 'Variante de movilidad reducida: permití pausas, mantené apoyos cercanos y priorizá cambios de dirección previsibles.';
      result.guidanceEn = 'Reduced-mobility variation: allow pauses, keep support nearby, and prioritize predictable direction changes.';
      result.steps = result.steps.map(step => ({ ...step, nameEs: step.nameEs || `Versión asistida · ${DATA.poses.find(p => p.id === step.poseId)?.es || ''}`, nameEn: step.nameEn || `Assisted · ${DATA.poses.find(p => p.id === step.poseId)?.en || ''}` }));
      return result;
    }

    if (variant === 'pregnancy') {
      const pregnancySun = [S('prayer','','Separá los pies y encontrá una base cómoda.','Take a comfortable wide stance.','Saludo en base amplia','Wide-stance prayer'),S('raised-arms'),S('standing-side-bend','derecha'),S('half-lift','','Apoyá manos en una silla y mantené espacio para el abdomen.','Place hands on a chair and leave space for the abdomen.','Media flexión amplia con silla','Wide chair-supported half fold'),S('low-lunge','derecha','','','Estocada corta con silla','Short chair-supported lunge'),S('mountain','','Regresá al centro sin apuro.','Return to center without rushing.','Montaña amplia','Wide Mountain'),S('low-lunge','izquierda','','','Estocada corta con silla','Short chair-supported lunge'),S('goddess','','Elegí una profundidad suave.','Choose a gentle depth.','Diosa suave','Gentle Goddess'),S('standing-side-bend','izquierda'),S('raised-arms'),S('prayer')];
      const pregnancyMoon = [S('prayer','','Separá los pies y dejá espacio para el abdomen.','Take a wide stance and leave space for the abdomen.','Saludo en base amplia','Wide-stance prayer'),S('standing-side-bend','derecha'),S('star'),S('goddess','','Mantené una profundidad cómoda.','Keep a comfortable depth.'),S('triangle','derecha','','','Triángulo con apoyo','Supported Triangle'),S('low-lunge','derecha','','','Estocada corta con silla','Short chair-supported lunge'),S('goddess','centro'),S('low-lunge','izquierda','','','Estocada corta con silla','Short chair-supported lunge'),S('triangle','izquierda','','','Triángulo con apoyo','Supported Triangle'),S('star'),S('standing-side-bend','izquierda'),S('prayer')];
      return {
        ...base,
        sidePatternEs: 'Secuencia adaptada, simétrica y sin transiciones en prono. Realizá ambos lados con apoyo.',
        sidePatternEn: 'Adapted symmetrical sequence without prone transitions. Practice both sides with support.',
        guidanceEs: 'Embarazo: usar únicamente con autorización profesional y adaptación individual. Evitá compresión abdominal, apneas, sobrecalentamiento y rangos incómodos.',
        guidanceEn: 'Pregnancy: use only with professional clearance and individual adaptation. Avoid abdominal compression, breath retention, overheating, and uncomfortable ranges.',
        steps: id === 'moon' ? pregnancyMoon : pregnancySun
      };
    }
    return base;
  }

  function allocateMinutes(total, percentages) {
    const raw = percentages.map(value => Math.max(1, Math.round(total * value / 100)));
    let diff = total - raw.reduce((a, b) => a + b, 0);
    let index = 0;
    while (diff !== 0) {
      const direction = diff > 0 ? 1 : -1;
      if (raw[index] + direction > 0) {
        raw[index] += direction;
        diff -= direction;
      }
      index = (index + 1) % raw.length;
    }
    return raw;
  }

  function choose(criteria, families, count, preferredIds = []) {
    const maxLevel = LEVELS[criteria.level] || 2;
    const maxIntensity = INTENSITIES[criteria.intensity] || 2;
    const preferred = preferredIds.map(id => DATA.poses.find(p => p.id === id)).filter(Boolean);
    let candidates = DATA.poses.filter(pose =>
      pose.styles.includes(criteria.style) && families.includes(pose.family) && pose.level <= maxLevel && pose.intensity <= maxIntensity + (criteria.level === 'advanced' ? 1 : 0)
    );

    const focusMatches = candidates.filter(pose => pose.focus.includes(criteria.focus) || criteria.focus === 'whole');
    if (focusMatches.length >= count) candidates = focusMatches;

    const result = [];
    preferred.forEach(pose => {
      if (result.length < count && pose.styles.includes(criteria.style) && pose.level <= maxLevel + (criteria.level === 'multilevel' ? 1 : 0)) result.push(pose);
    });

    shuffle(candidates).forEach(pose => {
      if (result.length < count && !result.some(item => item.id === pose.id)) result.push(pose);
    });

    if (result.length < count) {
      DATA.poses.filter(pose => families.includes(pose.family)).forEach(pose => {
        if (result.length < count && !result.some(item => item.id === pose.id)) result.push(pose);
      });
    }
    return result.slice(0, count);
  }

  function choosePeak(criteria, count) {
    const map = {
      hips: ['pigeon','lizard','figure-four'],
      balance: ['tree','half-moon','eagle'],
      core: ['boat','plank','forearm-plank'],
      back: ['bridge','cobra','camel'],
      shoulders: ['thread-needle','cobra','camel'],
      legs: ['chair','warrior2','half-moon'],
      whole: criteria.intensity === 'active' ? ['half-moon','plank','bridge'] : ['tree','bridge','triangle']
    };
    const preferred = map[criteria.focus] || map.whole;
    return choose(criteria, ['balance','strength','backbend','hips','standing'], count, preferred);
  }

  function shuffle(array) {
    const clone = [...array];
    for (let i = clone.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [clone[i], clone[j]] = [clone[j], clone[i]];
    }
    return clone;
  }

  function makeBlock(id, title, minutes, poses) {
    const allocations = allocateMinutes(minutes, poses.map(() => 100 / poses.length));
    return {
      id: uid(id),
      type: id,
      title,
      minutes,
      poses: poses.map((pose, index) => ({ poseId: pose.id, minutes: allocations[index], note: '' }))
    };
  }

  function formatPracticeTime(minutes) {
    const seconds = Math.max(1, Math.round(Number(minutes || 0) * 60));
    if (seconds < 60) return `${seconds} seg`;
    const mins = Math.floor(seconds / 60);
    const remainder = seconds % 60;
    return remainder ? `${mins} min ${remainder} seg` : `${mins} min`;
  }

  function renderClassEditor(classData, fromSaved) {
    currentDraft = structuredCloneSafe(classData);
    saveJSON(STORAGE.draft, currentDraft);
    const lang = currentDraft.criteria.language || 'es';
    const theme = DATA.classThemes[currentDraft.criteria.intention] || DATA.classThemes.grounding;

    main.innerHTML = `
      <article class="class-editor" id="printArea">
        <div class="editor-header">
          <button class="text-button no-print" id="backToBuilder" type="button">← Volver</button>
          <div class="editor-actions no-print">
            <button class="icon-button" id="printClassBtn" type="button" title="Imprimir o guardar PDF" aria-label="Imprimir o guardar PDF">⤓</button>
            <button class="icon-button" id="classModeBtn" type="button" title="Abrir modo clase" aria-label="Abrir modo clase">▶</button>
          </div>
        </div>

        <header class="class-title-block">
          <div class="style-chip">${escapeHTML(styleLabel(currentDraft.criteria.style))}</div>
          <textarea id="classNameInput" class="class-name-input" rows="2" maxlength="90" aria-label="Nombre de la clase">${escapeHTML(currentDraft.name)}</textarea>
          <p>${escapeHTML(lang === 'en' ? theme.en : theme.es)}</p>
          <div class="class-meta centered">
            <span>◷ ${currentDraft.criteria.duration} min</span>
            <span>◉ ${escapeHTML(levelLabel(currentDraft.criteria.level))}</span>
            <span>◇ ${escapeHTML(intensityLabel(currentDraft.criteria.intensity))}</span>
            ${currentDraft.blocks.some(block => block.sequence) ? `<span>☼ ${escapeHTML(currentDraft.blocks.find(block => block.sequence).sequence.nameEs)}</span>` : ''}
          </div>
        </header>

        <section class="teacher-script">
          <p class="eyebrow">APERTURA SUGERIDA</p>
          <p>${escapeHTML(lang === 'en' ? theme.openingEn : theme.openingEs)}</p>
        </section>

        <section class="timeline-list" id="timelineList">
          ${currentDraft.blocks.map((block, blockIndex) => renderBlock(block, blockIndex, lang)).join('')}
        </section>

        <section class="teacher-script closing-script">
          <p class="eyebrow">CIERRE SUGERIDO</p>
          <p>${escapeHTML(lang === 'en' ? theme.closingEn : theme.closingEs)}</p>
        </section>

        <section class="notes-section">
          <label>Notas generales para esta clase
            <textarea id="generalNotes" rows="4" placeholder="Anotá ajustes para tu grupo, intención personal, música o recordatorios.">${escapeHTML(currentDraft.generalNotes || '')}</textarea>
          </label>
        </section>

        <section class="editor-footer no-print">
          <button class="secondary-button" id="duplicateDraftBtn" type="button">Duplicar variación</button>
          <button class="primary-button" id="saveClassBtn" type="button">${fromSaved ? 'Guardar cambios' : 'Guardar en Mis clases'}</button>
        </section>

        <aside class="disclaimer-print">
          Yoga 2.0 es una herramienta de planificación para profesores. No brinda diagnósticos ni reemplaza la valoración profesional individual.
        </aside>
      </article>
    `;

    attachEditorEvents(fromSaved);
  }

  function renderBlock(block, blockIndex, lang) {
    const sequence = block.sequence;
    return `
      <section class="sequence-block ${sequence ? 'is-salutation-block' : ''}" data-block-index="${blockIndex}">
        <div class="sequence-block-head">
          <div>
            <span class="block-number">${String(blockIndex + 1).padStart(2, '0')}</span>
            <div><h3>${escapeHTML(block.title)}</h3><p>${block.minutes} min${sequence ? ` · ${sequence.rounds} ${sequence.rounds === 1 ? 'vuelta' : 'vueltas'}` : ''}</p></div>
          </div>
          <button class="text-button no-print" data-action="${sequence ? 'edit-salutation' : 'regenerate-block'}" data-block-index="${blockIndex}" type="button">${sequence ? 'Cambiar saludo' : 'Regenerar bloque'}</button>
        </div>
        ${sequence ? `
          <div class="salutation-summary">
            ${DATA.sequenceImages[sequence.id] ? `<img class="salutation-inline-image" src="${DATA.sequenceImages[sequence.id].steps}" alt="${escapeHTML(sequence.nameEs)} paso a paso">` : ''}
            <div><span class="sequence-badge">Secuencia protegida</span><strong>${escapeHTML(lang === 'en' ? sequence.variantEn : sequence.variantEs)}</strong></div>
            <p>${escapeHTML(lang === 'en' ? sequence.sidePatternEn : sequence.sidePatternEs)}</p>
            <p><strong>Guía:</strong> ${escapeHTML(lang === 'en' ? sequence.guidanceEn : sequence.guidanceEs)}</p>
          </div>` : ''}
        <div class="pose-list">
          ${block.poses.map((item, poseIndex) => renderPoseRow(item, blockIndex, poseIndex, lang, Boolean(sequence))).join('')}
        </div>
      </section>
    `;
  }

  function localizedSide(side, lang) {
    if (!side || lang !== 'en') return side;
    const map = {
      'derecha': 'right', 'izquierda': 'left', 'centro': 'center',
      'derecha atrás': 'right leg back', 'izquierda atrás': 'left leg back',
      'derecha adelante': 'right leg forward', 'izquierda adelante': 'left leg forward'
    };
    return map[side] || side;
  }

  function renderPoseRow(item, blockIndex, poseIndex, lang, locked = false) {
    const pose = DATA.poses.find(entry => entry.id === item.poseId);
    if (!pose) return '';
    const name = (lang === 'en' ? item.stepNameEn : item.stepNameEs) || (lang === 'en' ? pose.en : pose.es);
    const cue = (lang === 'en' ? item.stepCueEn : item.stepCueEs) || (lang === 'en' ? pose.cueEn : pose.cueEs);
    const transition = lang === 'en' ? item.transitionEn : item.transitionEs;
    const adaptation = lang === 'en' ? pose.adaptationEn : pose.adaptationEs;
    const caution = lang === 'en' ? pose.cautionEn : pose.cautionEs;
    const groupNote = getGroupAdaptation(pose, currentDraft.criteria.groupNeed, lang);
    const displaySide = localizedSide(item.side, lang);
    const sideText = displaySide ? `<span class="side-tag">${escapeHTML(displaySide)}</span>` : '';
    const visual = pose.image ? `<img class="pose-row-image" src="${pose.image}" alt="${escapeHTML(name)} — ${escapeHTML(pose.sanskrit)}" loading="lazy">` : `<div class="pose-image-fallback" aria-hidden="true">❁</div>`;

    return `
      <article class="pose-row ${locked ? 'is-locked-step' : ''}" data-block-index="${blockIndex}" data-pose-index="${poseIndex}">
        <div class="pose-time"><strong>${escapeHTML(formatPracticeTime(item.minutes))}</strong><span>${item.sequenceStep ? 'por paso' : 'sugerido'}</span></div>
        <div class="pose-visual">${visual}</div>
        <div class="pose-content">
          <div class="pose-title-line">
            <div>
              <h4>${escapeHTML(name)} ${sideText}</h4>
              <p class="sanskrit">${escapeHTML(pose.sanskrit)}</p>
            </div>
            <span class="family-tag">${escapeHTML(familyLabel(pose.family))}</span>
          </div>
          <p class="cue-text">${escapeHTML(cue)}</p>
          ${transition ? `<p class="transition-note"><strong>Transición:</strong> ${escapeHTML(transition)}</p>` : ''}
          <details>
            <summary>Adaptación y cuidados</summary>
            <p><strong>Opción:</strong> ${escapeHTML(adaptation)}</p>
            ${groupNote ? `<p><strong>Para este grupo:</strong> ${escapeHTML(groupNote)}</p>` : ''}
            <p><strong>Atención:</strong> ${escapeHTML(caution)}</p>
          </details>
          ${item.note ? `<p class="personal-note"><strong>Nota docente:</strong> ${escapeHTML(item.note)}</p>` : ''}
        </div>
        <div class="pose-actions no-print" aria-label="Acciones de la postura">
          ${locked ? `<span class="locked-step-label" title="El orden pertenece a una secuencia completa">🔒</span><button type="button" data-action="note" title="Agregar nota" aria-label="Agregar nota docente">✎</button>` : `
            <button type="button" data-action="move-up" title="Mover arriba" aria-label="Mover postura arriba">↑</button>
            <button type="button" data-action="move-down" title="Mover abajo" aria-label="Mover postura abajo">↓</button>
            <button type="button" data-action="replace" title="Reemplazar" aria-label="Reemplazar postura">↻</button>
            <button type="button" data-action="note" title="Agregar nota" aria-label="Agregar nota docente">✎</button>
            <button type="button" data-action="remove" title="Quitar" aria-label="Quitar postura">×</button>`}
        </div>
      </article>
    `;
  }

  function familyLabel(family) {
    const map = {
      seated: 'Sentada', standing: 'De pie', rest: 'Descanso', warmup: 'Movilidad', inversion: 'Inversión',
      lunge: 'Estocada', balance: 'Equilibrio', strength: 'Fuerza', backbend: 'Extensión', hips: 'Caderas',
      twist: 'Torsión', supine: 'Acostada', yin: 'Yin', sequence: 'Secuencia'
    };
    return map[family] || family;
  }

  function getGroupAdaptation(pose, need, lang) {
    if (!need || need === 'none') return '';
    const es = {
      multilevel: 'Mostrá una base estable y una progresión opcional; evitá presentar la variante más intensa como objetivo obligatorio.',
      chair: 'Llevá el apoyo a una silla cuando sea posible y priorizá transiciones simples y previsibles.',
      senior: 'Aumentá tiempos de transición, reducí cambios rápidos de nivel y ofrecé apoyo cercano.',
      pregnancy: 'Evitá compresión abdominal, torsiones cerradas y permanencias incómodas. Adaptá según trimestre, experiencia y autorización profesional.',
      wrists: pose.family === 'warmup' || pose.family === 'strength' || pose.family === 'inversion' ? 'Usá antebrazos, pared o silla para disminuir la carga sobre las muñecas.' : 'Mantené muñecas en posición neutra y sin carga innecesaria.',
      knees: pose.family === 'lunge' || pose.family === 'standing' || pose.family === 'hips' ? 'Reducí la profundidad, agregá soporte y vigilá la alineación rodilla-pie.' : 'Evitá presión directa o rangos que generen molestia.',
      lowback: pose.family === 'backbend' || pose.family === 'strength' ? 'Elegí menor amplitud, priorizá longitud axial y evitá sostener si aparece compresión lumbar.' : 'Mové la pelvis y columna dentro de un rango cómodo.'
    };
    const en = {
      multilevel: 'Offer a steady base and an optional progression; avoid presenting the strongest variation as a required goal.',
      chair: 'Use chair support where possible and prioritize simple, predictable transitions.',
      senior: 'Allow more transition time, reduce rapid level changes, and offer nearby support.',
      pregnancy: 'Avoid abdominal compression, closed twists, and uncomfortable holds. Adapt for trimester, experience, and professional clearance.',
      wrists: pose.family === 'warmup' || pose.family === 'strength' || pose.family === 'inversion' ? 'Use forearms, a wall, or a chair to reduce wrist loading.' : 'Keep wrists neutral and free of unnecessary load.',
      knees: pose.family === 'lunge' || pose.family === 'standing' || pose.family === 'hips' ? 'Reduce depth, add support, and monitor knee-to-foot tracking.' : 'Avoid direct pressure or ranges that create discomfort.',
      lowback: pose.family === 'backbend' || pose.family === 'strength' ? 'Choose less range, prioritize axial length, and stop if lumbar compression appears.' : 'Move pelvis and spine within a comfortable range.'
    };
    return (lang === 'en' ? en : es)[need] || '';
  }

  function attachEditorEvents(fromSaved) {
    document.getElementById('backToBuilder').addEventListener('click', () => fromSaved ? activateRoute('saved') : renderCreate());
    document.getElementById('printClassBtn').addEventListener('click', () => window.print());
    document.getElementById('classModeBtn').addEventListener('click', () => openClassMode(currentDraft));
    document.getElementById('classNameInput').addEventListener('input', event => {
      currentDraft.name = event.target.value;
      persistDraft();
    });
    document.getElementById('generalNotes').addEventListener('input', event => {
      currentDraft.generalNotes = event.target.value;
      persistDraft();
    });
    document.getElementById('saveClassBtn').addEventListener('click', () => saveCurrentClass(fromSaved));
    document.getElementById('duplicateDraftBtn').addEventListener('click', () => {
      const duplicate = structuredCloneSafe(currentDraft);
      duplicate.id = uid('class');
      duplicate.name = `${duplicate.name} · variación`;
      duplicate.createdAt = new Date().toISOString();
      duplicate.updatedAt = duplicate.createdAt;
      duplicate.saved = false;
      currentDraft = duplicate;
      renderClassEditor(currentDraft, false);
      showToast('Variación creada. Editala y guardala cuando esté lista.');
    });

    document.getElementById('timelineList').addEventListener('click', event => {
      const button = event.target.closest('button[data-action]');
      if (!button) return;
      const action = button.dataset.action;
      const blockIndex = Number(button.closest('[data-block-index]')?.dataset.blockIndex ?? button.dataset.blockIndex);
      const row = button.closest('.pose-row');
      const poseIndex = row ? Number(row.dataset.poseIndex) : null;

      if (action === 'move-up') movePose(blockIndex, poseIndex, -1, fromSaved);
      if (action === 'move-down') movePose(blockIndex, poseIndex, 1, fromSaved);
      if (action === 'remove') removePose(blockIndex, poseIndex, fromSaved);
      if (action === 'replace') openReplaceModal(blockIndex, poseIndex, fromSaved);
      if (action === 'note') openNoteModal(blockIndex, poseIndex, fromSaved);
      if (action === 'regenerate-block') regenerateBlock(blockIndex, fromSaved);
      if (action === 'edit-salutation') openSalutationEditor(blockIndex, fromSaved);
    });
  }

  function persistDraft() {
    currentDraft.updatedAt = new Date().toISOString();
    saveJSON(STORAGE.draft, currentDraft);
  }

  function movePose(blockIndex, poseIndex, direction, fromSaved) {
    if (currentDraft.blocks[blockIndex].sequence) return;
    const list = currentDraft.blocks[blockIndex].poses;
    const target = poseIndex + direction;
    if (target < 0 || target >= list.length) return;
    [list[poseIndex], list[target]] = [list[target], list[poseIndex]];
    persistDraft();
    renderClassEditor(currentDraft, fromSaved);
  }

  function removePose(blockIndex, poseIndex, fromSaved) {
    if (currentDraft.blocks[blockIndex].sequence) return;
    const block = currentDraft.blocks[blockIndex];
    if (block.poses.length <= 1) {
      showToast('Cada bloque necesita al menos una práctica.');
      return;
    }
    block.poses.splice(poseIndex, 1);
    rebalanceBlock(block);
    persistDraft();
    renderClassEditor(currentDraft, fromSaved);
    showToast('Postura eliminada.');
  }

  function rebalanceBlock(block) {
    const mins = allocateMinutes(block.minutes, block.poses.map(() => 100 / block.poses.length));
    block.poses.forEach((item, index) => { item.minutes = mins[index]; });
  }

  function openReplaceModal(blockIndex, poseIndex, fromSaved) {
    const currentPose = DATA.poses.find(p => p.id === currentDraft.blocks[blockIndex].poses[poseIndex].poseId);
    const maxLevel = LEVELS[currentDraft.criteria.level] || 2;
    const choices = DATA.poses.filter(pose =>
      pose.id !== currentPose.id && pose.styles.includes(currentDraft.criteria.style) && pose.level <= maxLevel + (currentDraft.criteria.level === 'multilevel' ? 1 : 0) &&
      (pose.family === currentPose.family || pose.focus.some(focus => currentPose.focus.includes(focus)))
    ).slice(0, 14);

    openModal(`
      <div class="modal-card large-modal">
        <div class="modal-head"><div><p class="eyebrow">REEMPLAZAR</p><h3>${escapeHTML(currentPose.es)}</h3></div><button class="icon-button" data-close-modal type="button">×</button></div>
        <label>Buscar alternativa
          <input id="replaceSearch" type="search" placeholder="Nombre en español o sánscrito">
        </label>
        <div class="replacement-list" id="replacementList">
          ${choices.map(pose => replacementButton(pose)).join('')}
        </div>
      </div>
    `);

    const list = document.getElementById('replacementList');
    document.getElementById('replaceSearch').addEventListener('input', event => {
      const query = event.target.value.toLowerCase().trim();
      const filtered = DATA.poses.filter(pose =>
        pose.id !== currentPose.id && pose.styles.includes(currentDraft.criteria.style) && pose.level <= maxLevel + 1 &&
        (`${pose.es} ${pose.en} ${pose.sanskrit}`.toLowerCase().includes(query))
      ).slice(0, 18);
      list.innerHTML = filtered.map(pose => replacementButton(pose)).join('') || '<p class="muted">No encontramos una alternativa con ese nombre.</p>';
    });

    list.addEventListener('click', event => {
      const button = event.target.closest('[data-replacement-id]');
      if (!button) return;
      currentDraft.blocks[blockIndex].poses[poseIndex].poseId = button.dataset.replacementId;
      persistDraft();
      closeModal();
      renderClassEditor(currentDraft, fromSaved);
      showToast('Postura reemplazada.');
    });
  }

  function replacementButton(pose) {
    return `
      <button class="replacement-item" data-replacement-id="${pose.id}" type="button">
        <span><strong>${escapeHTML(pose.es)}</strong><small>${escapeHTML(pose.sanskrit)} · ${escapeHTML(familyLabel(pose.family))}</small></span>
        <span aria-hidden="true">→</span>
      </button>
    `;
  }

  function openNoteModal(blockIndex, poseIndex, fromSaved) {
    const item = currentDraft.blocks[blockIndex].poses[poseIndex];
    const pose = DATA.poses.find(p => p.id === item.poseId);
    openModal(`
      <div class="modal-card">
        <div class="modal-head"><div><p class="eyebrow">NOTA DOCENTE</p><h3>${escapeHTML(item.stepNameEs || pose.es)}</h3></div><button class="icon-button" data-close-modal type="button">×</button></div>
        <label>Tu recordatorio
          <textarea id="poseNoteInput" rows="5" placeholder="Ej. Ofrecer pared a Ana; sostener dos respiraciones menos.">${escapeHTML(item.note || '')}</textarea>
        </label>
        <button class="primary-button" id="savePoseNote" type="button">Guardar nota</button>
      </div>
    `);
    document.getElementById('savePoseNote').addEventListener('click', () => {
      item.note = document.getElementById('poseNoteInput').value.trim();
      persistDraft();
      closeModal();
      renderClassEditor(currentDraft, fromSaved);
      showToast('Nota actualizada.');
    });
  }

  function openSalutationEditor(blockIndex, fromSaved) {
    const block = currentDraft.blocks[blockIndex];
    const sequence = block.sequence;
    openModal(`
      <div class="modal-card">
        <div class="modal-head"><div><p class="eyebrow">SECUENCIA COMPLETA</p><h3>Cambiar saludo</h3></div><button class="icon-button" data-close-modal type="button">×</button></div>
        <label>Saludo
          <select id="editSalutationId">
            ${DATA.salutations.filter(item => !['auto','none'].includes(item.id)).map(item => `<option value="${item.id}" ${sequence.id === item.id ? 'selected' : ''}>${escapeHTML(item.es)}</option>`).join('')}
          </select>
        </label>
        <label>Variante
          <select id="editSalutationVariant">
            ${DATA.salutationVariants.filter(item => item.id !== 'auto').map(item => `<option value="${item.id}" ${sequence.variant === item.id ? 'selected' : ''}>${escapeHTML(item.es)}</option>`).join('')}
          </select>
        </label>
        <label>Vueltas
          <select id="editSalutationRounds">
            ${[1,2,3,4,5,6].map(value => `<option value="${value}" ${sequence.rounds === value ? 'selected' : ''}>${value}</option>`).join('')}
          </select>
        </label>
        <div class="safety-note"><strong>Bloque protegido</strong><p>Al guardar se reemplaza la secuencia completa. Sus pasos conservan el orden y los lados correspondientes.</p></div>
        <button class="primary-button" id="saveSalutationEdit" type="button">Aplicar secuencia</button>
      </div>
    `);
    document.getElementById('saveSalutationEdit').addEventListener('click', () => {
      const selection = {
        id: document.getElementById('editSalutationId').value,
        variant: document.getElementById('editSalutationVariant').value,
        rounds: Number(document.getElementById('editSalutationRounds').value)
      };
      currentDraft.criteria.salutation = selection.id;
      currentDraft.criteria.salutationVariant = selection.variant;
      currentDraft.criteria.salutationRounds = selection.rounds;
      currentDraft.blocks[blockIndex] = makeSalutationBlock(currentDraft.criteria, block.minutes, selection);
      persistDraft();
      closeModal();
      renderClassEditor(currentDraft, fromSaved);
      showToast('Secuencia completa actualizada.');
    });
  }

  function regenerateBlock(blockIndex, fromSaved) {
    const old = currentDraft.blocks[blockIndex];
    if (old.sequence) { openSalutationEditor(blockIndex, fromSaved); return; }
    const c = currentDraft.criteria;
    const familyMap = {
      arrival: ['seated','rest'], warm: ['warmup','lunge','inversion'], standing: ['standing','lunge','balance'],
      flow: ['standing','lunge','strength','balance'], peak: ['balance','strength','backbend','hips'], floor: ['hips','seated','twist','supine'],
      yin1: ['yin','hips','seated'], yin2: ['yin','hips','seated'], yin3: ['yin','seated','backbend'], rebound: ['supine','twist','rest'],
      support1: ['rest','backbend'], support2: ['rest'], support3: ['rest'], integration: ['rest','twist'], rest: ['rest']
    };
    const count = old.poses.length;
    const poses = old.type === 'peak' ? choosePeak(c, count) : choose(c, familyMap[old.type] || ['whole'], count, []);
    currentDraft.blocks[blockIndex] = makeBlock(old.type, old.title, old.minutes, poses);
    persistDraft();
    renderClassEditor(currentDraft, fromSaved);
    showToast('Bloque regenerado.');
  }

  function saveCurrentClass(fromSaved) {
    currentDraft.name = document.getElementById('classNameInput').value.trim() || 'Clase sin título';
    currentDraft.generalNotes = document.getElementById('generalNotes').value.trim();
    currentDraft.updatedAt = new Date().toISOString();
    currentDraft.saved = true;

    const existingIndex = savedClasses.findIndex(item => item.id === currentDraft.id);
    if (existingIndex >= 0) savedClasses[existingIndex] = structuredCloneSafe(currentDraft);
    else savedClasses.unshift(structuredCloneSafe(currentDraft));

    savedClasses.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    saveJSON(STORAGE.classes, savedClasses);
    saveJSON(STORAGE.draft, currentDraft);
    showToast(fromSaved ? 'Cambios guardados.' : 'Clase guardada en Mis clases.');
    activateRoute('saved');
  }

  function renderLibrary() {
    const gallery = (items, className = '') => items.map(item => `
      <article class="visual-resource-card ${className}">
        <img src="${item.image}" alt="${escapeHTML(item.title)}" loading="lazy">
        <div><span>${escapeHTML(item.category)}</span><h4>${escapeHTML(item.title)}</h4></div>
      </article>`).join('');

    main.innerHTML = `
      <section class="page-visual-banner">
        <img src="${DATA.appImages.library}" alt="Biblioteca visual de Yoga 2.0">
        <div><p class="eyebrow">BIBLIOTECA PROFESIONAL</p><h2>Asanas y recursos</h2><p>Consultá imágenes, indicaciones, variantes generales y cuidados. Usá esta biblioteca como apoyo a tu formación, no como sustituto de valoración individual.</p></div>
      </section>
      <section class="section-block">
        <div class="section-heading"><div><p class="eyebrow">SECUENCIAS COMPLETAS</p><h3>Saludos solares y lunares</h3></div></div>
        <div class="salutation-library-grid">
          ${DATA.salutations.filter(item => !['auto','none'].includes(item.id)).map(item => salutationLibraryCard(item)).join('')}
        </div>
      </section>
      <section class="section-block">
        <div class="section-heading"><div><p class="eyebrow">ADAPTACIONES</p><h3>Uso de apoyos</h3></div></div>
        <div class="visual-resource-grid">${gallery(DATA.adaptationImages)}</div>
      </section>
      <section class="section-block">
        <div class="section-heading"><div><p class="eyebrow">PRÁCTICA ACCESIBLE</p><h3>Embarazo y movilidad reducida</h3></div></div>
        <div class="visual-resource-grid">${gallery(DATA.accessibilityImages, 'is-accessible')}</div>
      </section>
      <section class="filter-panel">
        <label>Buscar
          <input id="poseSearch" type="search" placeholder="Nombre, sánscrito o zona corporal">
        </label>
        <div class="form-grid two">
          <label>Familia
            <select id="familyFilter">
              <option value="all">Todas</option>
              ${[...new Set(DATA.poses.map(pose => pose.family))].map(family => `<option value="${family}">${escapeHTML(familyLabel(family))}</option>`).join('')}
            </select>
          </label>
          <label>Nivel
            <select id="levelFilter"><option value="all">Todos</option><option value="1">Inicial</option><option value="2">Intermedio</option><option value="3">Avanzado</option></select>
          </label>
        </div>
      </section>
      <section class="library-grid" id="libraryGrid"></section>
    `;

    const search = document.getElementById('poseSearch');
    const family = document.getElementById('familyFilter');
    const level = document.getElementById('levelFilter');
    const update = () => {
      const query = search.value.toLowerCase().trim();
      const filtered = DATA.poses.filter(pose => {
        const text = `${pose.es} ${pose.en} ${pose.sanskrit} ${pose.focus.join(' ')}`.toLowerCase();
        return (!query || text.includes(query)) && (family.value === 'all' || pose.family === family.value) && (level.value === 'all' || String(pose.level) === level.value);
      });
      document.getElementById('libraryGrid').innerHTML = filtered.map(pose => libraryCard(pose)).join('') || emptyState('No encontramos posturas con esos filtros.', 'Limpiar filtros', 'clearLibraryFilters');
      document.getElementById('clearLibraryFilters')?.addEventListener('click', () => { search.value = ''; family.value = 'all'; level.value = 'all'; update(); });
    };
    search.addEventListener('input', update); family.addEventListener('change', update); level.addEventListener('change', update); update();
  }

  function salutationLibraryCard(item) {
    const summaries = {
      'sun-a': 'Flujo simétrico para preparar y elevar el ritmo de una práctica Hatha o Vinyasa.',
      'sun-b': 'Flujo dinámico con Silla y Guerrero I a ambos lados.',
      'sun-classic': 'Forma tradicional de Hatha con doce posiciones y cambio de pierna.',
      'moon': 'Secuencia lateral y circular que recorre ambos lados con suavidad.'
    };
    const images = DATA.sequenceImages[item.id];
    return `
      <article class="salutation-library-card visual-salutation-card">
        ${images ? `<img src="${images.cover}" alt="Portada de ${escapeHTML(item.es)}" loading="lazy">` : ''}
        <div><h4>${escapeHTML(item.es)}</h4><p>${escapeHTML(summaries[item.id])}</p><small>Variantes: estándar, inicial, silla, movilidad reducida y embarazo.</small>
          ${images ? `<details><summary>Ver secuencia visual</summary><img class="salutation-steps-image" src="${images.steps}" alt="Pasos de ${escapeHTML(item.es)}" loading="lazy"></details>` : ''}
        </div>
      </article>`;
  }

  function libraryCard(pose) {
    return `
      <article class="library-card visual-library-card">
        ${pose.image ? `<img class="library-pose-image" src="${pose.image}" alt="${escapeHTML(pose.es)} — ${escapeHTML(pose.sanskrit)}" loading="lazy">` : `<div class="library-image-fallback" aria-hidden="true">❁</div>`}
        <div class="library-card-body">
          <div class="pose-title-line"><div><h3>${escapeHTML(pose.es)}</h3><p class="sanskrit">${escapeHTML(pose.sanskrit)}</p></div><span class="level-dot">N${pose.level}</span></div>
          <div class="tag-row"><span>${escapeHTML(familyLabel(pose.family))}</span>${pose.focus.slice(0,2).map(focus => `<span>${escapeHTML(labelFrom(DATA.focusAreas, focus))}</span>`).join('')}</div>
          <p>${escapeHTML(pose.cueEs)}</p>
          <details><summary>Ver adaptación y atención</summary><p><strong>Adaptación:</strong> ${escapeHTML(pose.adaptationEs)}</p><p><strong>Atención:</strong> ${escapeHTML(pose.cautionEs)}</p></details>
        </div>
      </article>`;
  }

  function renderSaved() {
    main.innerHTML = `
      <section class="page-visual-banner compact-banner">
        <img src="${DATA.appImages.saved}" alt="Mis clases en Yoga 2.0">
        <div><p class="eyebrow">TU ARCHIVO DOCENTE</p><h2>Mis clases</h2><p>Guardá, duplicá y marcá como impartidas tus secuencias. Todo queda disponible en este dispositivo.</p></div>
      </section>
      <section class="filter-panel saved-filters">
        <label>Buscar clase
          <input id="classSearch" type="search" placeholder="Título, estilo o intención">
        </label>
        <div class="form-grid two">
          <label>Estilo
            <select id="savedStyleFilter">
              <option value="all">Todos</option>
              <option value="hatha">Hatha</option>
              <option value="vinyasa">Vinyasa</option>
              <option value="yin">Yin</option>
              <option value="restorative">Restaurativo</option>
            </select>
          </label>
          <label>Estado
            <select id="savedStatusFilter">
              <option value="all">Todas</option>
              <option value="planned">Planificadas</option>
              <option value="taught">Impartidas</option>
            </select>
          </label>
        </div>
      </section>
      <section id="savedList" class="saved-list"></section>
    `;

    const search = document.getElementById('classSearch');
    const style = document.getElementById('savedStyleFilter');
    const status = document.getElementById('savedStatusFilter');

    const update = () => {
      const query = search.value.toLowerCase().trim();
      const filtered = savedClasses.filter(item => {
        const theme = DATA.classThemes[item.criteria.intention];
        const text = `${item.name} ${styleLabel(item.criteria.style)} ${theme?.es || ''}`.toLowerCase();
        const statusMatch = status.value === 'all' || (status.value === 'taught' ? item.taught : !item.taught);
        return (!query || text.includes(query)) && (style.value === 'all' || item.criteria.style === style.value) && statusMatch;
      });
      document.getElementById('savedList').innerHTML = filtered.length ? filtered.map(savedClassCard).join('') : emptyState('No hay clases que coincidan con los filtros.', 'Crear nueva clase', 'savedEmptyCreate');
      document.getElementById('savedEmptyCreate')?.addEventListener('click', () => activateRoute('create'));
    };

    search.addEventListener('input', update);
    style.addEventListener('change', update);
    status.addEventListener('change', update);
    update();

    document.getElementById('savedList').addEventListener('click', event => {
      const actionButton = event.target.closest('[data-saved-action]');
      if (!actionButton) return;
      const id = actionButton.closest('[data-class-id]').dataset.classId;
      const action = actionButton.dataset.savedAction;
      if (action === 'open') openSavedClass(id);
      if (action === 'duplicate') duplicateSavedClass(id);
      if (action === 'taught') toggleTaught(id);
      if (action === 'delete') confirmDeleteClass(id);
    });
  }

  function savedClassCard(item) {
    return `
      <article class="saved-card" data-class-id="${escapeHTML(item.id)}">
        <div class="saved-card-main">
          <div class="class-card-top">
            <span class="style-chip">${escapeHTML(styleLabel(item.criteria.style))}</span>
            ${item.taught ? '<span class="status-chip">Impartida</span>' : '<span class="status-chip muted-status">Planificada</span>'}
          </div>
          <h3>${escapeHTML(item.name)}</h3>
          <p>${escapeHTML(formatShortDate(item.updatedAt || item.createdAt))} · ${item.criteria.duration} min · ${escapeHTML(levelLabel(item.criteria.level))}</p>
          <div class="tag-row">
            <span>${escapeHTML(labelFrom(DATA.intentions, item.criteria.intention))}</span>
            <span>${escapeHTML(labelFrom(DATA.focusAreas, item.criteria.focus))}</span>
            ${item.demo ? '<span>Ejemplo</span>' : ''}
          </div>
        </div>
        <div class="saved-actions">
          <button class="primary-button compact" data-saved-action="open" type="button">Abrir</button>
          <button class="icon-button" data-saved-action="duplicate" type="button" aria-label="Duplicar clase" title="Duplicar">⧉</button>
          <button class="icon-button" data-saved-action="taught" type="button" aria-label="Cambiar estado" title="Marcar como impartida">✓</button>
          <button class="icon-button danger-icon" data-saved-action="delete" type="button" aria-label="Eliminar clase" title="Eliminar">×</button>
        </div>
      </article>
    `;
  }

  function openSavedClass(id) {
    const item = savedClasses.find(entry => entry.id === id);
    if (!item) return;
    renderClassEditor(item, true);
  }

  function duplicateSavedClass(id) {
    const source = savedClasses.find(entry => entry.id === id);
    if (!source) return;
    const clone = structuredCloneSafe(source);
    clone.id = uid('class');
    clone.name = `${clone.name} · copia`;
    clone.taught = false;
    clone.demo = false;
    clone.createdAt = new Date().toISOString();
    clone.updatedAt = clone.createdAt;
    savedClasses.unshift(clone);
    saveJSON(STORAGE.classes, savedClasses);
    renderSaved();
    showToast('Clase duplicada.');
  }

  function toggleTaught(id) {
    const item = savedClasses.find(entry => entry.id === id);
    if (!item) return;
    item.taught = !item.taught;
    item.updatedAt = new Date().toISOString();
    saveJSON(STORAGE.classes, savedClasses);
    renderSaved();
    showToast(item.taught ? 'Clase marcada como impartida.' : 'Clase marcada como planificada.');
  }

  function confirmDeleteClass(id) {
    const item = savedClasses.find(entry => entry.id === id);
    if (!item) return;
    openModal(`
      <div class="modal-card">
        <div class="modal-head"><div><p class="eyebrow">ELIMINAR</p><h3>¿Querés eliminar esta clase?</h3></div><button class="icon-button" data-close-modal type="button">×</button></div>
        <p><strong>${escapeHTML(item.name)}</strong> se eliminará de este dispositivo.</p>
        <div class="modal-actions">
          <button class="secondary-button" data-close-modal type="button">Cancelar</button>
          <button class="danger-button" id="confirmDeleteClass" type="button">Eliminar</button>
        </div>
      </div>
    `);
    document.getElementById('confirmDeleteClass').addEventListener('click', () => {
      savedClasses = savedClasses.filter(entry => entry.id !== id);
      saveJSON(STORAGE.classes, savedClasses);
      closeModal();
      renderSaved();
      showToast('Clase eliminada.');
    });
  }

  function openSettings() {
    openModal(`
      <div class="modal-card large-modal">
        <div class="modal-head"><div><p class="eyebrow">YOGA 2.0</p><h3>Configuración</h3></div><button class="icon-button" data-close-modal type="button">×</button></div>
        <form id="settingsForm" class="stack-form">
          <label>Tu nombre
            <input name="name" value="${escapeHTML(profile.name)}" maxlength="40" required>
          </label>
          <label>Idioma habitual
            <select name="defaultLanguage">
              <option value="es" ${profile.defaultLanguage === 'es' ? 'selected' : ''}>Español</option>
              <option value="en" ${profile.defaultLanguage === 'en' ? 'selected' : ''}>English</option>
            </select>
          </label>
          <label>Estilo principal
            <select name="defaultStyle">
              <option value="hatha" ${profile.defaultStyle === 'hatha' ? 'selected' : ''}>Hatha</option>
              <option value="vinyasa" ${profile.defaultStyle === 'vinyasa' ? 'selected' : ''}>Vinyasa</option>
              <option value="yin" ${profile.defaultStyle === 'yin' ? 'selected' : ''}>Yin</option>
              <option value="restorative" ${profile.defaultStyle === 'restorative' ? 'selected' : ''}>Restaurativo</option>
            </select>
          </label>
          <button class="primary-button" type="submit">Guardar preferencias</button>
        </form>

        <div class="settings-section">
          <h4>Datos</h4>
          <button class="secondary-button" id="exportDataBtn" type="button">Exportar copia de seguridad</button>
          <label class="file-button">Importar copia de seguridad
            <input id="importDataInput" type="file" accept="application/json">
          </label>
          ${savedClasses.some(item => item.demo) ? '<button class="text-button danger-text" id="removeDemoBtn" type="button">Eliminar clase de demostración</button>' : ''}
          <button class="danger-button" id="resetAppBtn" type="button">Borrar todos los datos</button>
        </div>

        <div class="safety-note">
          <strong>Aviso</strong>
          <p>Yoga 2.0 es una herramienta de planificación y organización para profesores. No brinda diagnósticos, indicaciones médicas ni reemplaza la formación profesional o la evaluación individual.</p>
        </div>
      </div>
    `);

    document.getElementById('settingsForm').addEventListener('submit', event => {
      event.preventDefault();
      const form = new FormData(event.currentTarget);
      profile = {
        ...profile,
        name: String(form.get('name')).trim(),
        defaultLanguage: form.get('defaultLanguage'),
        defaultStyle: form.get('defaultStyle')
      };
      saveJSON(STORAGE.profile, profile);
      closeModal();
      activateRoute(currentRoute);
      showToast('Preferencias guardadas.');
    });

    document.getElementById('exportDataBtn').addEventListener('click', exportBackup);
    document.getElementById('importDataInput').addEventListener('change', importBackup);
    document.getElementById('removeDemoBtn')?.addEventListener('click', () => {
      savedClasses = savedClasses.filter(item => !item.demo);
      saveJSON(STORAGE.classes, savedClasses);
      closeModal(); activateRoute(currentRoute); showToast('Demostración eliminada.');
    });
    document.getElementById('resetAppBtn').addEventListener('click', confirmResetApp);
  }

  function exportBackup() {
    const payload = {
      app: 'Yoga 2.0', version: 1, exportedAt: new Date().toISOString(), profile, classes: savedClasses
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `yoga-2-backup-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
    showToast('Copia de seguridad exportada.');
  }

  function importBackup(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const payload = JSON.parse(reader.result);
        if (!payload.profile || !Array.isArray(payload.classes)) throw new Error('Formato inválido');
        profile = payload.profile;
        savedClasses = payload.classes;
        saveJSON(STORAGE.profile, profile);
        saveJSON(STORAGE.classes, savedClasses);
        closeModal(); activateRoute('home'); showToast('Copia importada correctamente.');
      } catch (error) {
        showToast('No se pudo importar ese archivo.');
      }
    };
    reader.readAsText(file);
  }

  function confirmResetApp() {
    openModal(`
      <div class="modal-card">
        <div class="modal-head"><div><p class="eyebrow">ACCIÓN PERMANENTE</p><h3>Borrar todos los datos</h3></div><button class="icon-button" data-close-modal type="button">×</button></div>
        <p>Esta acción eliminará tus preferencias y todas las clases guardadas. No puede deshacerse.</p>
        <div class="modal-actions">
          <button class="secondary-button" data-close-modal type="button">Cancelar</button>
          <button class="danger-button" id="confirmResetApp" type="button">Borrar todo</button>
        </div>
      </div>
    `);
    document.getElementById('confirmResetApp').addEventListener('click', () => {
      Object.values(STORAGE).forEach(key => localStorage.removeItem(key));
      profile = null; savedClasses = []; currentDraft = null;
      closeModal(); renderOnboarding();
    });
  }

  function openClassMode(classData) {
    const poses = classData.blocks.flatMap((block, blockIndex) => {
      if (!block.sequence) return block.poses.map((item, poseIndex) => ({ ...item, blockTitle: block.title, blockIndex, poseIndex }));
      const rounds = Math.max(1, Number(block.sequence.rounds || 1));
      const seconds = allocateSeconds(Math.round(block.minutes * 60), block.poses.length * rounds);
      const expanded = [];
      let timeIndex = 0;
      for (let round = 1; round <= rounds; round += 1) {
        block.poses.forEach((item, poseIndex) => {
          expanded.push({
            ...item,
            minutes: seconds[timeIndex++] / 60,
            blockTitle: `${block.title} · Vuelta ${round}/${rounds}`,
            blockIndex,
            poseIndex,
            round,
            roundTotal: rounds
          });
        });
      }
      return expanded;
    });
    if (!poses.length) return;
    let index = 0;

    const render = () => {
      const item = poses[index];
      const pose = DATA.poses.find(entry => entry.id === item.poseId);
      const lang = classData.criteria.language || 'es';
      classModeSeconds = Math.max(1, Math.round(item.minutes * 60));
      classModeRunning = false;
      clearInterval(classModeTimer);
      classModeTimer = null;

      modalRoot.innerHTML = `
        <div class="modal-overlay class-mode-overlay" role="dialog" aria-modal="true" aria-label="Modo clase">
          <div class="class-mode-card">
            <header>
              <div><p class="eyebrow">${escapeHTML(item.blockTitle)} · ${index + 1}/${poses.length}</p><h2>${escapeHTML(classData.name)}</h2></div>
              <button class="icon-button" id="closeClassMode" type="button" aria-label="Cerrar modo clase">×</button>
            </header>
            <main>
              ${pose.image ? `<img class="class-mode-pose-image" src="${pose.image}" alt="${escapeHTML((lang === 'en' ? pose.en : pose.es))}">` : ''}
              <p class="sanskrit large">${escapeHTML(pose.sanskrit)}${item.side ? ` · ${escapeHTML(localizedSide(item.side, lang))}` : ''}</p>
              <h3>${escapeHTML((lang === 'en' ? item.stepNameEn : item.stepNameEs) || (lang === 'en' ? pose.en : pose.es))}</h3>
              <p class="class-mode-cue">${escapeHTML((lang === 'en' ? item.stepCueEn : item.stepCueEs) || (lang === 'en' ? pose.cueEn : pose.cueEs))}</p>
              ${(lang === 'en' ? item.transitionEn : item.transitionEs) ? `<p class="transition-note"><strong>${lang === 'en' ? 'Transition' : 'Transición'}:</strong> ${escapeHTML(lang === 'en' ? item.transitionEn : item.transitionEs)}</p>` : ''}
              <div class="timer-display" id="timerDisplay">${formatTimer(classModeSeconds)}</div>
              <div class="timer-actions">
                <button class="secondary-button" id="resetTimer" type="button">Reiniciar</button>
                <button class="primary-button" id="toggleTimer" type="button">Iniciar</button>
              </div>
              ${item.note ? `<div class="personal-note"><strong>Nota docente:</strong> ${escapeHTML(item.note)}</div>` : ''}
              <details class="class-mode-details">
                <summary>Ver adaptación y atención</summary>
                <p>${escapeHTML(lang === 'en' ? pose.adaptationEn : pose.adaptationEs)}</p>
                <p><strong>Atención:</strong> ${escapeHTML(lang === 'en' ? pose.cautionEn : pose.cautionEs)}</p>
              </details>
            </main>
            <footer>
              <button class="secondary-button" id="previousPose" type="button" ${index === 0 ? 'disabled' : ''}>← Anterior</button>
              <button class="primary-button" id="nextPose" type="button">${index === poses.length - 1 ? 'Finalizar' : 'Siguiente →'}</button>
            </footer>
          </div>
        </div>
      `;

      document.getElementById('closeClassMode').addEventListener('click', closeModal);
      document.getElementById('previousPose').addEventListener('click', () => { if (index > 0) { index -= 1; render(); } });
      document.getElementById('nextPose').addEventListener('click', () => {
        if (index < poses.length - 1) { index += 1; render(); }
        else { closeModal(); showToast('Clase completada.'); }
      });
      document.getElementById('toggleTimer').addEventListener('click', toggleClassTimer);
      document.getElementById('resetTimer').addEventListener('click', () => {
        clearInterval(classModeTimer); classModeTimer = null; classModeRunning = false; classModeSeconds = Math.max(1, Math.round(item.minutes * 60));
        document.getElementById('timerDisplay').textContent = formatTimer(classModeSeconds);
        document.getElementById('toggleTimer').textContent = 'Iniciar';
      });
    };
    render();
  }

  function toggleClassTimer() {
    const button = document.getElementById('toggleTimer');
    if (classModeRunning) {
      clearInterval(classModeTimer); classModeTimer = null; classModeRunning = false; button.textContent = 'Continuar'; return;
    }
    classModeRunning = true;
    button.textContent = 'Pausar';
    classModeTimer = setInterval(() => {
      classModeSeconds = Math.max(0, classModeSeconds - 1);
      const display = document.getElementById('timerDisplay');
      if (display) display.textContent = formatTimer(classModeSeconds);
      if (classModeSeconds <= 0) {
        clearInterval(classModeTimer); classModeTimer = null; classModeRunning = false; button.textContent = 'Completado';
        showToast('Tiempo sugerido completado.');
      }
    }, 1000);
  }

  function formatTimer(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }

  function openModal(html) {
    modalRoot.innerHTML = `<div class="modal-overlay" role="dialog" aria-modal="true">${html}</div>`;
    modalRoot.querySelectorAll('[data-close-modal]').forEach(button => button.addEventListener('click', closeModal));
    modalRoot.querySelector('.modal-overlay').addEventListener('click', event => {
      if (event.target.classList.contains('modal-overlay')) closeModal();
    });
  }

  function closeModal() {
    clearInterval(classModeTimer);
    classModeTimer = null;
    classModeRunning = false;
    modalRoot.innerHTML = '';
  }

  function structuredCloneSafe(value) {
    return window.structuredClone ? structuredClone(value) : JSON.parse(JSON.stringify(value));
  }

  function registerServiceWorker() {
    if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('./service-worker.js').catch(error => console.warn('Service worker no disponible:', error));
      });
    }
  }

  navItems.forEach(item => item.addEventListener('click', () => activateRoute(item.dataset.route)));
  settingsBtn.addEventListener('click', openSettings);
  document.addEventListener('change', event => {
    if (event.target.matches('.choice-card input[type="radio"]')) {
      event.target.closest('.option-grid').querySelectorAll('.choice-card').forEach(card => card.classList.remove('is-selected'));
      event.target.closest('.choice-card').classList.add('is-selected');
    }
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && modalRoot.innerHTML) closeModal();
  });

  registerServiceWorker();
  if (!profile) renderOnboarding();
  else {
    document.body.classList.remove('is-onboarding');
    createDemoClass();
    activateRoute('home');
  }
})();
