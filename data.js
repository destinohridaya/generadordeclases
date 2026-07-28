window.YOGA_DATA = {
  intentions: [
    { id: 'grounding', es: 'Enraizamiento', en: 'Grounding' },
    { id: 'energy', es: 'Energía y vitalidad', en: 'Energy and vitality' },
    { id: 'calm', es: 'Calma y regulación', en: 'Calm and regulation' },
    { id: 'focus', es: 'Concentración', en: 'Focus' },
    { id: 'confidence', es: 'Confianza y expansión', en: 'Confidence and expansion' },
    { id: 'release', es: 'Soltar tensiones', en: 'Release tension' }
  ],
  focusAreas: [
    { id: 'whole', es: 'Cuerpo completo', en: 'Full body' },
    { id: 'hips', es: 'Caderas', en: 'Hips' },
    { id: 'back', es: 'Espalda y columna', en: 'Back and spine' },
    { id: 'shoulders', es: 'Hombros y pecho', en: 'Shoulders and chest' },
    { id: 'legs', es: 'Piernas y estabilidad', en: 'Legs and stability' },
    { id: 'balance', es: 'Equilibrio', en: 'Balance' },
    { id: 'core', es: 'Centro y fuerza', en: 'Core and strength' }
  ],
  groupNeeds: [
    { id: 'none', es: 'Sin adaptación específica', en: 'No specific adaptation' },
    { id: 'multilevel', es: 'Grupo multinivel', en: 'Mixed-level group' },
    { id: 'chair', es: 'Práctica con silla', en: 'Chair-supported practice' },
    { id: 'senior', es: 'Personas mayores', en: 'Older adults' },
    { id: 'pregnancy', es: 'Embarazo (con autorización profesional)', en: 'Pregnancy (with professional clearance)' },
    { id: 'wrists', es: 'Reducir carga en muñecas', en: 'Reduce wrist loading' },
    { id: 'knees', es: 'Cuidar rodillas', en: 'Knee-sensitive practice' },
    { id: 'lowback', es: 'Cuidar zona lumbar', en: 'Low-back-sensitive practice' }
  ],
  equipment: [
    { id: 'blocks', es: 'Bloques', en: 'Blocks' },
    { id: 'strap', es: 'Cinto', en: 'Strap' },
    { id: 'bolster', es: 'Bolster / almohadón', en: 'Bolster / cushion' },
    { id: 'chair', es: 'Silla', en: 'Chair' },
    { id: 'wall', es: 'Pared', en: 'Wall' }
  ],
  poses: [
    {
      id: 'easy-seat', sanskrit: 'Sukhasana', es: 'Postura fácil', en: 'Easy Seat', family: 'seated', level: 1,
      styles: ['hatha','vinyasa','yin','restorative'], focus: ['whole','back','hips'], intensity: 1,
      cueEs: 'Sentate sobre una base estable, alargá la columna y dejá que la respiración encuentre un ritmo natural.',
      cueEn: 'Sit on a steady base, lengthen the spine, and let the breath find a natural rhythm.',
      adaptationEs: 'Elevá la pelvis sobre un bloque o almohadón. Apoyá las rodillas si quedan en tensión.',
      adaptationEn: 'Elevate the pelvis on a block or cushion. Support the knees if they feel strained.',
      cautionEs: 'Evitá forzar las rodillas hacia el piso.', cautionEn: 'Avoid forcing the knees toward the floor.'
    },
    {
      id: 'mountain', sanskrit: 'Tadasana', es: 'Montaña', en: 'Mountain Pose', family: 'standing', level: 1,
      styles: ['hatha','vinyasa'], focus: ['whole','legs','balance'], intensity: 1,
      cueEs: 'Distribuí el peso en ambos pies, activá suavemente las piernas y crecé desde la coronilla.',
      cueEn: 'Spread weight through both feet, gently engage the legs, and rise through the crown.',
      adaptationEs: 'Separá los pies al ancho de caderas o usá la pared como referencia.',
      adaptationEn: 'Place feet hip-width apart or use the wall for reference.',
      cautionEs: 'Mantené las rodillas desbloqueadas.', cautionEn: 'Keep the knees soft rather than locked.'
    },
    {
      id: 'child', sanskrit: 'Balasana', es: 'Postura del niño', en: 'Child’s Pose', family: 'rest', level: 1,
      styles: ['hatha','vinyasa','yin','restorative'], focus: ['back','hips','whole'], intensity: 1,
      cueEs: 'Llevá la pelvis hacia los talones y permití que la espalda se ensanche con cada inhalación.',
      cueEn: 'Move the hips toward the heels and let the back widen with each inhale.',
      adaptationEs: 'Colocá un bolster bajo el torso o una manta entre pelvis y talones.',
      adaptationEn: 'Place a bolster under the torso or a blanket between hips and heels.',
      cautionEs: 'En embarazo, separá ampliamente las rodillas y evitá comprimir el abdomen.', cautionEn: 'During pregnancy, widen the knees and avoid compressing the abdomen.'
    },
    {
      id: 'cat-cow', sanskrit: 'Marjaryasana–Bitilasana', es: 'Gato–vaca', en: 'Cat–Cow', family: 'warmup', level: 1,
      styles: ['hatha','vinyasa','yin'], focus: ['back','shoulders','whole'], intensity: 1,
      cueEs: 'Coordiná el movimiento de la columna con la respiración, sin buscar amplitud máxima.',
      cueEn: 'Coordinate spinal movement with the breath without chasing maximum range.',
      adaptationEs: 'Practicá sentado en una silla o apoyá antebrazos si las muñecas están sensibles.',
      adaptationEn: 'Practice seated on a chair or lower to forearms if wrists are sensitive.',
      cautionEs: 'Mové la columna dentro de un rango cómodo.', cautionEn: 'Move the spine within a comfortable range.'
    },
    {
      id: 'thread-needle', sanskrit: 'Parsva Balasana', es: 'Enhebrar la aguja', en: 'Thread the Needle', family: 'warmup', level: 1,
      styles: ['hatha','vinyasa','yin'], focus: ['shoulders','back'], intensity: 1,
      cueEs: 'Deslizá un brazo por debajo del otro y respirale al espacio entre omóplatos.',
      cueEn: 'Slide one arm beneath the other and breathe into the space between the shoulder blades.',
      adaptationEs: 'Colocá una manta bajo el hombro o hacé la torsión sentado.',
      adaptationEn: 'Place a blanket under the shoulder or take the twist seated.',
      cautionEs: 'No cargues peso sobre el cuello.', cautionEn: 'Avoid loading the neck.'
    },
    {
      id: 'down-dog', sanskrit: 'Adho Mukha Svanasana', es: 'Perro boca abajo', en: 'Downward-Facing Dog', family: 'inversion', level: 1,
      styles: ['hatha','vinyasa'], focus: ['whole','shoulders','legs','back'], intensity: 2,
      cueEs: 'Empujá el piso, alargá los costados del torso y flexioná rodillas si eso libera la espalda.',
      cueEn: 'Press the floor away, lengthen the side body, and bend the knees if it frees the spine.',
      adaptationEs: 'Apoyá las manos en la pared o en una silla para reducir carga.',
      adaptationEn: 'Place hands on a wall or chair to reduce loading.',
      cautionEs: 'Reducí el tiempo si hay molestias en muñecas, hombros o presión incómoda en la cabeza.', cautionEn: 'Reduce time if wrists, shoulders, or head pressure feel uncomfortable.'
    },
    {
      id: 'half-lift', sanskrit: 'Ardha Uttanasana', es: 'Media flexión de pie', en: 'Half Lift', family: 'standing', level: 1,
      styles: ['hatha','vinyasa'], focus: ['back','legs'], intensity: 1,
      cueEs: 'Alargá la columna hacia adelante y apoyá manos en muslos, tibias o bloques.',
      cueEn: 'Lengthen the spine forward and place hands on thighs, shins, or blocks.',
      adaptationEs: 'Flexioná rodillas y elevá las manos sobre bloques.', adaptationEn: 'Bend the knees and elevate the hands on blocks.',
      cautionEs: 'Evitá redondear y colapsar la zona lumbar.', cautionEn: 'Avoid collapsing into the lower back.'
    },
    {
      id: 'forward-fold', sanskrit: 'Uttanasana', es: 'Flexión de pie', en: 'Standing Forward Fold', family: 'standing', level: 1,
      styles: ['hatha','vinyasa','yin'], focus: ['legs','back','calm'], intensity: 1,
      cueEs: 'Flexioná rodillas, soltá el peso de la cabeza y dejá que el torso se acerque a los muslos.',
      cueEn: 'Bend the knees, release the head, and let the torso move toward the thighs.',
      adaptationEs: 'Apoyá manos en bloques o en el asiento de una silla.', adaptationEn: 'Place hands on blocks or a chair seat.',
      cautionEs: 'Salí lentamente si aparece mareo.', cautionEn: 'Come up slowly if dizziness appears.'
    },
    {
      id: 'low-lunge', sanskrit: 'Anjaneyasana', es: 'Estocada baja', en: 'Low Lunge', family: 'lunge', level: 1,
      styles: ['hatha','vinyasa','yin'], focus: ['hips','legs'], intensity: 2,
      cueEs: 'Apoyá la rodilla posterior y llevá la pelvis hacia adelante sin perder longitud en el torso.',
      cueEn: 'Lower the back knee and move the pelvis forward while keeping length in the torso.',
      adaptationEs: 'Usá manta bajo la rodilla y bloques a ambos lados.', adaptationEn: 'Use a blanket under the knee and blocks on both sides.',
      cautionEs: 'Mantené la rodilla delantera alineada con el pie.', cautionEn: 'Keep the front knee tracking with the foot.'
    },
    {
      id: 'high-lunge', sanskrit: 'Utthita Ashwa Sanchalanasana', es: 'Estocada alta', en: 'High Lunge', family: 'lunge', level: 2,
      styles: ['hatha','vinyasa'], focus: ['legs','balance','core'], intensity: 3,
      cueEs: 'Extendé la pierna posterior, activá el centro y proyectá el pecho hacia arriba.',
      cueEn: 'Reach back through the rear leg, engage the core, and lift through the chest.',
      adaptationEs: 'Acortá la distancia entre pies o apoyá la rodilla posterior.', adaptationEn: 'Shorten the stance or lower the back knee.',
      cautionEs: 'No profundices si perdés estabilidad en la pelvis.', cautionEn: 'Do not deepen if pelvic stability is lost.'
    },
    {
      id: 'chair', sanskrit: 'Utkatasana', es: 'Silla', en: 'Chair Pose', family: 'standing', level: 1,
      styles: ['hatha','vinyasa'], focus: ['legs','core'], intensity: 3,
      cueEs: 'Llevá la pelvis atrás, mantené el pecho amplio y el peso repartido en los pies.',
      cueEn: 'Send the hips back, keep the chest broad, and spread weight through the feet.',
      adaptationEs: 'Tocá una silla detrás o practicá con la espalda en la pared.', adaptationEn: 'Tap a chair behind you or practice with the back at the wall.',
      cautionEs: 'Ajustá la profundidad según rodillas y zona lumbar.', cautionEn: 'Adjust depth for the knees and lower back.'
    },
    {
      id: 'warrior1', sanskrit: 'Virabhadrasana I', es: 'Guerrero I', en: 'Warrior I', family: 'standing', level: 1,
      styles: ['hatha','vinyasa'], focus: ['legs','hips','shoulders'], intensity: 2,
      cueEs: 'Enraizá ambos pies, orientá la pelvis de manera cómoda y elevá el esternón.',
      cueEn: 'Root both feet, square the pelvis comfortably, and lift the sternum.',
      adaptationEs: 'Separá más los pies lateralmente o mantené manos en caderas.', adaptationEn: 'Widen the stance or keep hands on hips.',
      cautionEs: 'No fuerces la pelvis a quedar completamente frontal.', cautionEn: 'Do not force the pelvis fully forward.'
    },
    {
      id: 'warrior2', sanskrit: 'Virabhadrasana II', es: 'Guerrero II', en: 'Warrior II', family: 'standing', level: 1,
      styles: ['hatha','vinyasa'], focus: ['legs','hips','confidence'], intensity: 2,
      cueEs: 'Abrí la pelvis, mirá sobre la mano delantera y sostené amplitud entre ambos brazos.',
      cueEn: 'Open the pelvis, gaze over the front hand, and keep breadth across both arms.',
      adaptationEs: 'Reducí la flexión de la rodilla o apoyá el muslo en una silla.', adaptationEn: 'Reduce knee flexion or support the thigh with a chair.',
      cautionEs: 'Alineá rodilla delantera con el segundo o tercer dedo del pie.', cautionEn: 'Track the front knee toward the second or third toe.'
    },
    {
      id: 'side-angle', sanskrit: 'Utthita Parsvakonasana', es: 'Ángulo lateral extendido', en: 'Extended Side Angle', family: 'standing', level: 2,
      styles: ['hatha','vinyasa'], focus: ['legs','hips','shoulders'], intensity: 3,
      cueEs: 'Apoyá antebrazo en muslo o mano en bloque y alargá el costado superior.',
      cueEn: 'Rest forearm on thigh or hand on a block and lengthen the top side body.',
      adaptationEs: 'Usá el antebrazo sobre el muslo para conservar espacio.', adaptationEn: 'Use the forearm on the thigh to preserve space.',
      cautionEs: 'Evitá colapsar el peso sobre el hombro inferior.', cautionEn: 'Avoid collapsing weight into the lower shoulder.'
    },
    {
      id: 'triangle', sanskrit: 'Trikonasana', es: 'Triángulo', en: 'Triangle Pose', family: 'standing', level: 1,
      styles: ['hatha','vinyasa'], focus: ['legs','hips','shoulders'], intensity: 2,
      cueEs: 'Alargá ambos costados del torso y apoyá la mano donde puedas mantener espacio.',
      cueEn: 'Lengthen both sides of the torso and place the hand where space can be maintained.',
      adaptationEs: 'Usá un bloque alto o practicá con la espalda en la pared.', adaptationEn: 'Use a high block or practice with the back at the wall.',
      cautionEs: 'La amplitud importa menos que la estabilidad.', cautionEn: 'Stability matters more than range.'
    },
    {
      id: 'wide-fold', sanskrit: 'Prasarita Padottanasana', es: 'Flexión amplia', en: 'Wide-Legged Forward Fold', family: 'standing', level: 1,
      styles: ['hatha','vinyasa','yin'], focus: ['legs','back','calm'], intensity: 2,
      cueEs: 'Separá los pies, incliná desde las caderas y mantené la columna larga.',
      cueEn: 'Step the feet wide, hinge from the hips, and keep the spine long.',
      adaptationEs: 'Apoyá manos en una silla o bloques.', adaptationEn: 'Place hands on a chair or blocks.',
      cautionEs: 'Reducí profundidad si hay tirantez intensa en isquiotibiales.', cautionEn: 'Reduce depth if hamstrings feel intensely strained.'
    },
    {
      id: 'tree', sanskrit: 'Vrksasana', es: 'Árbol', en: 'Tree Pose', family: 'balance', level: 1,
      styles: ['hatha','vinyasa'], focus: ['balance','legs','focus'], intensity: 2,
      cueEs: 'Fijá la mirada, enraizá el pie de apoyo y elegí una altura estable para el otro pie.',
      cueEn: 'Steady the gaze, root the standing foot, and choose a stable height for the other foot.',
      adaptationEs: 'Apoyá dedos del pie en el piso o una mano en la pared.', adaptationEn: 'Keep toes on the floor or one hand at the wall.',
      cautionEs: 'No apoyes el pie directamente sobre la articulación de la rodilla.', cautionEn: 'Do not press the foot directly into the knee joint.'
    },
    {
      id: 'eagle', sanskrit: 'Garudasana', es: 'Águila', en: 'Eagle Pose', family: 'balance', level: 2,
      styles: ['hatha','vinyasa'], focus: ['balance','shoulders','legs'], intensity: 3,
      cueEs: 'Flexioná la pierna de apoyo, cruzá brazos y piernas en la medida que sostengas el eje.',
      cueEn: 'Bend the standing leg and cross arms and legs only as far as balance remains steady.',
      adaptationEs: 'Apoyá la punta del pie cruzado o abrazá hombros.', adaptationEn: 'Touch the crossed toes down or hug the shoulders.',
      cautionEs: 'Elegí una variante que no comprima rodillas ni hombros.', cautionEn: 'Choose a variation that does not compress knees or shoulders.'
    },
    {
      id: 'half-moon', sanskrit: 'Ardha Chandrasana', es: 'Media luna', en: 'Half Moon', family: 'balance', level: 2,
      styles: ['hatha','vinyasa'], focus: ['balance','legs','hips'], intensity: 3,
      cueEs: 'Apoyá la mano en un bloque, extendé la pierna elevada y abrí el pecho progresivamente.',
      cueEn: 'Place the hand on a block, extend the lifted leg, and gradually open the chest.',
      adaptationEs: 'Practicá junto a una pared.', adaptationEn: 'Practice next to a wall.',
      cautionEs: 'Mantené una microflexión en la pierna de apoyo.', cautionEn: 'Keep a micro-bend in the standing leg.'
    },
    {
      id: 'plank', sanskrit: 'Phalakasana', es: 'Plancha', en: 'Plank Pose', family: 'strength', level: 2,
      styles: ['hatha','vinyasa'], focus: ['core','shoulders','whole'], intensity: 3,
      cueEs: 'Empujá el piso, activá abdomen y piernas, y alargá desde talones a coronilla.',
      cueEn: 'Press the floor away, engage core and legs, and lengthen from heels to crown.',
      adaptationEs: 'Apoyá rodillas o elevá manos sobre una silla.', adaptationEn: 'Lower the knees or elevate hands on a chair.',
      cautionEs: 'Evitá hundir la zona lumbar.', cautionEn: 'Avoid sinking into the lower back.'
    },
    {
      id: 'forearm-plank', sanskrit: 'Makara Adho Mukha Svanasana', es: 'Plancha de antebrazos', en: 'Forearm Plank', family: 'strength', level: 2,
      styles: ['hatha','vinyasa'], focus: ['core','shoulders'], intensity: 3,
      cueEs: 'Presioná antebrazos, llevá talones atrás y sostené el centro activo.',
      cueEn: 'Press the forearms down, reach the heels back, and keep the center active.',
      adaptationEs: 'Apoyá rodillas o sostené menos tiempo.', adaptationEn: 'Lower the knees or hold for less time.',
      cautionEs: 'Evitá tensión en cuello y mandíbula.', cautionEn: 'Avoid tension in the neck and jaw.'
    },
    {
      id: 'cobra', sanskrit: 'Bhujangasana', es: 'Cobra baja', en: 'Low Cobra', family: 'backbend', level: 1,
      styles: ['hatha','vinyasa'], focus: ['back','shoulders'], intensity: 2,
      cueEs: 'Deslizá el pecho hacia adelante, mantené codos cerca y usá la fuerza de la espalda.',
      cueEn: 'Glide the chest forward, keep elbows close, and use the back body.',
      adaptationEs: 'Elevá muy poco el pecho o apoyá antebrazos en esfinge.', adaptationEn: 'Lift the chest only slightly or come to sphinx.',
      cautionEs: 'No comprimas la zona lumbar.', cautionEn: 'Avoid compressing the lower back.'
    },
    {
      id: 'sphinx', sanskrit: 'Salamba Bhujangasana', es: 'Esfinge', en: 'Sphinx Pose', family: 'backbend', level: 1,
      styles: ['hatha','yin','restorative'], focus: ['back','shoulders'], intensity: 1,
      cueEs: 'Alineá codos bajo hombros y proyectá el pecho hacia adelante sin colapsar.',
      cueEn: 'Align elbows under shoulders and draw the chest forward without collapsing.',
      adaptationEs: 'Alejá los codos si la zona lumbar necesita menos extensión.', adaptationEn: 'Move elbows forward if the lower back needs less extension.',
      cautionEs: 'Salí si aparece presión lumbar incómoda.', cautionEn: 'Come out if uncomfortable low-back pressure appears.'
    },
    {
      id: 'bridge', sanskrit: 'Setu Bandha Sarvangasana', es: 'Puente', en: 'Bridge Pose', family: 'backbend', level: 1,
      styles: ['hatha','vinyasa','restorative'], focus: ['back','legs','shoulders'], intensity: 2,
      cueEs: 'Presioná pies, elevá la pelvis y mantené las rodillas orientadas hacia adelante.',
      cueEn: 'Press the feet down, lift the pelvis, and keep the knees tracking forward.',
      adaptationEs: 'Apoyá el sacro sobre un bloque para una versión sostenida.', adaptationEn: 'Support the sacrum on a block for a held variation.',
      cautionEs: 'No gires la cabeza mientras la pelvis esté elevada.', cautionEn: 'Do not turn the head while the pelvis is lifted.'
    },
    {
      id: 'camel', sanskrit: 'Ustrasana', es: 'Camello', en: 'Camel Pose', family: 'backbend', level: 2,
      styles: ['hatha','vinyasa'], focus: ['back','shoulders','hips'], intensity: 3,
      cueEs: 'Llevá manos al sacro, elevá el esternón y permití una extensión distribuida.',
      cueEn: 'Bring hands to the sacrum, lift the sternum, and create a distributed backbend.',
      adaptationEs: 'Mantené manos en la pelvis o apoyá dedos en bloques.', adaptationEn: 'Keep hands on the pelvis or place fingertips on blocks.',
      cautionEs: 'Evitá colapsar el cuello y la zona lumbar.', cautionEn: 'Avoid collapsing the neck and lower back.'
    },
    {
      id: 'boat', sanskrit: 'Navasana', es: 'Barco', en: 'Boat Pose', family: 'strength', level: 2,
      styles: ['hatha','vinyasa'], focus: ['core','balance'], intensity: 3,
      cueEs: 'Elevá el pecho, sostené detrás de los muslos si hace falta y activá el centro.',
      cueEn: 'Lift the chest, hold behind the thighs if needed, and engage the center.',
      adaptationEs: 'Mantené pies en el piso o rodillas flexionadas.', adaptationEn: 'Keep feet on the floor or knees bent.',
      cautionEs: 'No redondees ni cargues la zona lumbar.', cautionEn: 'Avoid rounding or straining the lower back.'
    },
    {
      id: 'pigeon', sanskrit: 'Eka Pada Rajakapotasana (prep.)', es: 'Paloma preparatoria', en: 'Pigeon Preparation', family: 'hips', level: 2,
      styles: ['hatha','vinyasa','yin'], focus: ['hips'], intensity: 2,
      cueEs: 'Acomodá la pierna delantera sin forzar la rodilla y mantené apoyo bajo la pelvis si lo necesitás.',
      cueEn: 'Set the front leg without forcing the knee and support the pelvis as needed.',
      adaptationEs: 'Reemplazá por figura cuatro acostada.', adaptationEn: 'Replace with reclined figure four.',
      cautionEs: 'No debería sentirse presión aguda en la rodilla delantera.', cautionEn: 'There should be no sharp pressure in the front knee.'
    },
    {
      id: 'figure-four', sanskrit: 'Supta Kapotasana', es: 'Figura cuatro acostada', en: 'Reclined Figure Four', family: 'hips', level: 1,
      styles: ['hatha','vinyasa','yin','restorative'], focus: ['hips'], intensity: 1,
      cueEs: 'Cruzá un tobillo sobre el muslo opuesto y acercá las piernas sin levantar la cabeza.',
      cueEn: 'Cross one ankle over the opposite thigh and draw the legs in without lifting the head.',
      adaptationEs: 'Apoyá el pie inferior en la pared.', adaptationEn: 'Place the lower foot on a wall.',
      cautionEs: 'Mantené el pie cruzado activo para cuidar la rodilla.', cautionEn: 'Keep the crossed foot active to support the knee.'
    },
    {
      id: 'lizard', sanskrit: 'Utthan Pristhasana', es: 'Lagarto', en: 'Lizard Pose', family: 'hips', level: 2,
      styles: ['hatha','vinyasa','yin'], focus: ['hips','legs'], intensity: 3,
      cueEs: 'Llevá ambas manos al interior del pie delantero y elegí la altura que permita respirar.',
      cueEn: 'Bring both hands inside the front foot and choose a height that allows steady breathing.',
      adaptationEs: 'Usá bloques altos y apoyá la rodilla posterior.', adaptationEn: 'Use high blocks and lower the back knee.',
      cautionEs: 'No fuerces la apertura de cadera.', cautionEn: 'Do not force the hip opening.'
    },
    {
      id: 'butterfly', sanskrit: 'Baddha Konasana', es: 'Mariposa', en: 'Bound Angle Pose', family: 'seated', level: 1,
      styles: ['hatha','yin','restorative'], focus: ['hips','calm'], intensity: 1,
      cueEs: 'Juntá plantas de los pies y sostené una columna cómoda, sin empujar las rodillas.',
      cueEn: 'Bring soles of the feet together and keep a comfortable spine without pushing the knees.',
      adaptationEs: 'Apoyá rodillas sobre bloques o almohadones.', adaptationEn: 'Support the knees on blocks or cushions.',
      cautionEs: 'No rebotes ni fuerces la apertura.', cautionEn: 'Avoid bouncing or forcing the opening.'
    },
    {
      id: 'seated-fold', sanskrit: 'Paschimottanasana', es: 'Flexión sentada', en: 'Seated Forward Fold', family: 'seated', level: 1,
      styles: ['hatha','yin'], focus: ['back','legs','calm'], intensity: 1,
      cueEs: 'Elevá la pelvis si hace falta y avanzá desde las caderas con la espalda larga.',
      cueEn: 'Elevate the pelvis if needed and hinge from the hips with a long spine.',
      adaptationEs: 'Flexioná rodillas y usá un cinto alrededor de los pies.', adaptationEn: 'Bend the knees and use a strap around the feet.',
      cautionEs: 'No tires del cuerpo hacia adelante con los brazos.', cautionEn: 'Do not pull the body forward with the arms.'
    },
    {
      id: 'head-to-knee', sanskrit: 'Janu Sirsasana', es: 'Cabeza a rodilla', en: 'Head-to-Knee Pose', family: 'seated', level: 1,
      styles: ['hatha','yin'], focus: ['back','legs','hips'], intensity: 1,
      cueEs: 'Extendé una pierna, flexioná la otra y orientá el torso hacia la pierna larga.',
      cueEn: 'Extend one leg, bend the other, and orient the torso toward the long leg.',
      adaptationEs: 'Usá un cinto y apoyá la rodilla flexionada.', adaptationEn: 'Use a strap and support the bent knee.',
      cautionEs: 'Evitá forzar el cuello hacia la rodilla.', cautionEn: 'Avoid forcing the neck toward the knee.'
    },
    {
      id: 'supine-twist', sanskrit: 'Supta Matsyendrasana', es: 'Torsión acostada', en: 'Supine Twist', family: 'twist', level: 1,
      styles: ['hatha','vinyasa','yin','restorative'], focus: ['back','calm','whole'], intensity: 1,
      cueEs: 'Dejá caer las rodillas hacia un lado y mantené ambos hombros pesados.',
      cueEn: 'Let the knees fall to one side and keep both shoulders heavy.',
      adaptationEs: 'Apoyá las rodillas sobre un bolster.', adaptationEn: 'Support the knees on a bolster.',
      cautionEs: 'En embarazo, elegí una torsión abierta y suave.', cautionEn: 'During pregnancy, choose a gentle open twist.'
    },
    {
      id: 'happy-baby', sanskrit: 'Ananda Balasana', es: 'Bebé feliz', en: 'Happy Baby', family: 'supine', level: 1,
      styles: ['hatha','vinyasa','yin'], focus: ['hips','back'], intensity: 1,
      cueEs: 'Tomá detrás de muslos o bordes externos de pies y mantené el sacro apoyado.',
      cueEn: 'Hold behind the thighs or outer feet and keep the sacrum grounded.',
      adaptationEs: 'Usá un cinto o sostené detrás de los muslos.', adaptationEn: 'Use a strap or hold behind the thighs.',
      cautionEs: 'No levantes el sacro para acercar las piernas.', cautionEn: 'Do not lift the sacrum to draw the legs closer.'
    },
    {
      id: 'knees-chest', sanskrit: 'Apanasana', es: 'Rodillas al pecho', en: 'Knees to Chest', family: 'supine', level: 1,
      styles: ['hatha','vinyasa','yin','restorative'], focus: ['back','calm'], intensity: 1,
      cueEs: 'Abrazá las piernas con suavidad y permití que la zona lumbar se apoye.',
      cueEn: 'Hug the legs gently and let the lower back settle.',
      adaptationEs: 'Tomá detrás de los muslos o acercá una pierna por vez.', adaptationEn: 'Hold behind the thighs or draw in one leg at a time.',
      cautionEs: 'En embarazo, evitá comprimir el abdomen.', cautionEn: 'During pregnancy, avoid compressing the abdomen.'
    },
    {
      id: 'reclined-butterfly', sanskrit: 'Supta Baddha Konasana', es: 'Mariposa acostada', en: 'Reclined Bound Angle', family: 'rest', level: 1,
      styles: ['hatha','yin','restorative'], focus: ['hips','calm'], intensity: 1,
      cueEs: 'Uní plantas de los pies y permití que las rodillas descansen con soporte.',
      cueEn: 'Bring the soles together and let the knees rest with support.',
      adaptationEs: 'Usá bloques bajo rodillas y un bolster bajo la espalda.', adaptationEn: 'Use blocks under the knees and a bolster under the back.',
      cautionEs: 'Salí con ayuda de las manos, sin cerrar las piernas de golpe.', cautionEn: 'Use the hands to come out rather than snapping the legs together.'
    },
    {
      id: 'legs-wall', sanskrit: 'Viparita Karani', es: 'Piernas en la pared', en: 'Legs Up the Wall', family: 'rest', level: 1,
      styles: ['yin','restorative'], focus: ['calm','legs'], intensity: 1,
      cueEs: 'Apoyá las piernas en la pared y dejá que el peso del cuerpo sea sostenido por el piso.',
      cueEn: 'Rest the legs on the wall and let the floor support the body’s weight.',
      adaptationEs: 'Alejá la pelvis de la pared o apoyá pantorrillas en una silla.', adaptationEn: 'Move the hips away from the wall or rest calves on a chair.',
      cautionEs: 'Salí si la posición genera presión incómoda en cabeza u ojos.', cautionEn: 'Come out if the pose creates uncomfortable pressure in the head or eyes.'
    },
    {
      id: 'supported-child', sanskrit: 'Salamba Balasana', es: 'Niño con soporte', en: 'Supported Child’s Pose', family: 'rest', level: 1,
      styles: ['yin','restorative'], focus: ['calm','back','hips'], intensity: 1,
      cueEs: 'Abrazá un bolster y girá la cabeza hacia un lado, dejando que el soporte reciba el peso.',
      cueEn: 'Hug a bolster and turn the head to one side, letting the support receive your weight.',
      adaptationEs: 'Aumentá la altura del soporte o practicá sentado inclinado hacia una mesa.', adaptationEn: 'Increase support height or practice seated, leaning toward a table.',
      cautionEs: 'En embarazo, asegurá espacio amplio para el abdomen.', cautionEn: 'During pregnancy, create generous space for the abdomen.'
    },
    {
      id: 'supported-bridge', sanskrit: 'Salamba Setu Bandha', es: 'Puente sostenido', en: 'Supported Bridge', family: 'rest', level: 1,
      styles: ['yin','restorative'], focus: ['back','calm','shoulders'], intensity: 1,
      cueEs: 'Apoyá el sacro sobre un bloque y dejá que el abdomen se suavice.',
      cueEn: 'Rest the sacrum on a block and let the abdomen soften.',
      adaptationEs: 'Usá la altura más baja del bloque.', adaptationEn: 'Use the lowest block height.',
      cautionEs: 'No coloques el bloque sobre la zona lumbar.', cautionEn: 'Do not place the block under the lumbar spine.'
    },
    {
      id: 'deer', sanskrit: 'Mrigasana', es: 'Ciervo', en: 'Deer Pose', family: 'yin', level: 1,
      styles: ['yin'], focus: ['hips'], intensity: 1,
      cueEs: 'Acomodá ambas piernas en forma de ángulos suaves y orientá el torso donde puedas respirar sin esfuerzo.',
      cueEn: 'Arrange both legs in gentle angles and orient the torso where breathing stays easeful.',
      adaptationEs: 'Sentate sobre una manta y apoyá el torso sobre un bolster.', adaptationEn: 'Sit on a blanket and support the torso on a bolster.',
      cautionEs: 'Ajustá la posición si aparece presión en las rodillas.', cautionEn: 'Adjust if pressure appears in the knees.'
    },
    {
      id: 'dragonfly', sanskrit: 'Upavistha Konasana (Yin)', es: 'Libélula', en: 'Dragonfly', family: 'yin', level: 1,
      styles: ['yin'], focus: ['hips','legs','back'], intensity: 1,
      cueEs: 'Separá las piernas dentro de un rango sostenible y descansá el torso sobre soporte si lo deseás.',
      cueEn: 'Open the legs to a sustainable range and rest the torso on support if desired.',
      adaptationEs: 'Flexioná rodillas o sentate sobre una manta.', adaptationEn: 'Bend the knees or sit on a blanket.',
      cautionEs: 'No busques una sensación intensa en la inserción de los isquiotibiales.', cautionEn: 'Avoid intense sensation at the hamstring attachment.'
    },

    {
      id: 'prayer', sanskrit: 'Pranamasana', es: 'Gesto de saludo', en: 'Prayer Pose', family: 'standing', level: 1,
      styles: ['hatha','vinyasa'], focus: ['whole','calm','focus'], intensity: 1,
      cueEs: 'Reuní las palmas frente al corazón, sentí el apoyo de los pies y dejá que la respiración organice el comienzo.',
      cueEn: 'Bring the palms together at the heart, feel the support of the feet, and let the breath organize the beginning.',
      adaptationEs: 'Practicá sentado o con la espalda apoyada en la pared.', adaptationEn: 'Practice seated or with the back supported by a wall.',
      cautionEs: 'Mantené los hombros suaves y la respiración libre.', cautionEn: 'Keep the shoulders soft and the breath unrestricted.'
    },
    {
      id: 'raised-arms', sanskrit: 'Urdhva Hastasana', es: 'Brazos elevados', en: 'Upward Salute', family: 'standing', level: 1,
      styles: ['hatha','vinyasa'], focus: ['whole','shoulders','back'], intensity: 1,
      cueEs: 'Enraizá los pies y elevá los brazos sin comprimir la zona lumbar; crecé desde ambos costados del torso.',
      cueEn: 'Root through the feet and lift the arms without compressing the lower back; lengthen both sides of the torso.',
      adaptationEs: 'Separá las manos, flexioná codos o elevá un brazo por vez.', adaptationEn: 'Separate the hands, bend the elbows, or lift one arm at a time.',
      cautionEs: 'Reducí el rango si hay dolor en hombros o cuello.', cautionEn: 'Reduce the range if there is shoulder or neck pain.'
    },
    {
      id: 'chaturanga', sanskrit: 'Chaturanga Dandasana', es: 'Plancha baja', en: 'Four-Limbed Staff Pose', family: 'strength', level: 2,
      styles: ['hatha','vinyasa'], focus: ['core','shoulders','whole'], intensity: 3,
      cueEs: 'Desde plancha, mantené el cuerpo largo y flexioná los codos cerca del torso hasta un rango estable.',
      cueEn: 'From plank, keep the body long and bend the elbows close to the ribs only to a stable range.',
      adaptationEs: 'Apoyá rodillas o reemplazá por rodillas–pecho–mentón.', adaptationEn: 'Lower the knees or replace with knees–chest–chin.',
      cautionEs: 'Evitá hundir hombros o zona lumbar; omití si no existe control suficiente.', cautionEn: 'Avoid collapsing the shoulders or lower back; skip when control is insufficient.'
    },
    {
      id: 'knees-chest-chin', sanskrit: 'Ashtanga Namaskara', es: 'Rodillas, pecho y mentón', en: 'Knees–Chest–Chin', family: 'strength', level: 1,
      styles: ['hatha','vinyasa'], focus: ['shoulders','back','whole'], intensity: 2,
      cueEs: 'Apoyá rodillas, acercá el pecho entre las manos y mantené la pelvis elevada mientras el mentón toca suavemente.',
      cueEn: 'Lower the knees, bring the chest between the hands, and keep the hips lifted as the chin touches lightly.',
      adaptationEs: 'Reemplazá por una cobra baja desde el suelo o una extensión de pie con apoyo.', adaptationEn: 'Replace with low cobra or a supported standing backbend.',
      cautionEs: 'Evitá esta transición si genera presión cervical, de hombros o muñecas.', cautionEn: 'Avoid this transition if it creates neck, shoulder, or wrist pressure.'
    },
    {
      id: 'up-dog', sanskrit: 'Urdhva Mukha Svanasana', es: 'Perro boca arriba', en: 'Upward-Facing Dog', family: 'backbend', level: 2,
      styles: ['hatha','vinyasa'], focus: ['back','shoulders','whole'], intensity: 3,
      cueEs: 'Presioná manos y empeines, elevá muslos y esternón, y distribuí la extensión a lo largo de toda la columna.',
      cueEn: 'Press through hands and tops of feet, lift thighs and sternum, and distribute the backbend through the whole spine.',
      adaptationEs: 'Elegí cobra baja o esfinge.', adaptationEn: 'Choose low cobra or sphinx.',
      cautionEs: 'No profundices si aparece compresión lumbar o molestias en muñecas.', cautionEn: 'Do not deepen if there is lumbar compression or wrist discomfort.'
    },
    {
      id: 'star', sanskrit: 'Utthita Tadasana', es: 'Estrella', en: 'Five-Pointed Star', family: 'standing', level: 1,
      styles: ['hatha','vinyasa'], focus: ['whole','legs','shoulders'], intensity: 1,
      cueEs: 'Separá ampliamente los pies, extendé los brazos y ocupá el espacio con una base firme y respiración amplia.',
      cueEn: 'Step the feet wide, extend the arms, and take up space with a steady base and spacious breath.',
      adaptationEs: 'Reducí la separación de los pies o apoyá una mano en la pared.', adaptationEn: 'Narrow the stance or place one hand on a wall.',
      cautionEs: 'Mantené rodillas y pies orientados en la misma dirección.', cautionEn: 'Keep knees and feet tracking in the same direction.'
    },
    {
      id: 'goddess', sanskrit: 'Utkata Konasana', es: 'Diosa', en: 'Goddess Pose', family: 'standing', level: 1,
      styles: ['hatha','vinyasa'], focus: ['hips','legs','whole'], intensity: 2,
      cueEs: 'Flexioná las rodillas sobre la línea de los pies, mantené la pelvis neutra y el torso vertical.',
      cueEn: 'Bend the knees in line with the feet, keep the pelvis neutral, and stay upright through the torso.',
      adaptationEs: 'Disminuí la profundidad o apoyá las manos en el respaldo de una silla.', adaptationEn: 'Reduce depth or rest the hands on a chair back.',
      cautionEs: 'Ajustá el rango ante molestias en rodillas, caderas o pelvis.', cautionEn: 'Adjust the range for knee, hip, or pelvic discomfort.'
    },
    {
      id: 'pyramid', sanskrit: 'Parsvottanasana', es: 'Pirámide', en: 'Pyramid Pose', family: 'standing', level: 2,
      styles: ['hatha','vinyasa'], focus: ['legs','back','balance'], intensity: 2,
      cueEs: 'Acortá la base, orientá la pelvis hacia adelante y alargá el torso antes de inclinarte.',
      cueEn: 'Shorten the stance, orient the pelvis forward, and lengthen the torso before folding.',
      adaptationEs: 'Usá bloques altos o una silla y flexioná suavemente la rodilla delantera.', adaptationEn: 'Use high blocks or a chair and softly bend the front knee.',
      cautionEs: 'Evitá forzar isquiotibiales o bloquear la rodilla delantera.', cautionEn: 'Avoid forcing the hamstrings or locking the front knee.'
    },
    {
      id: 'side-lunge', sanskrit: 'Skandasana', es: 'Estocada lateral', en: 'Side Lunge', family: 'lunge', level: 2,
      styles: ['hatha','vinyasa'], focus: ['hips','legs','balance'], intensity: 3,
      cueEs: 'Flexioná una rodilla y desplazá la pelvis hacia ese lado, manteniendo la otra pierna larga dentro de un rango estable.',
      cueEn: 'Bend one knee and shift the hips toward that side while keeping the other leg long within a stable range.',
      adaptationEs: 'Mantené la pelvis alta, apoyá manos en bloques o usá una silla.', adaptationEn: 'Keep the hips high, use blocks, or hold a chair.',
      cautionEs: 'No profundices si la rodilla pierde alineación o aparece presión en la cadera.', cautionEn: 'Do not deepen if knee alignment is lost or hip pressure appears.'
    },
    {
      id: 'standing-side-bend', sanskrit: 'Indudalasana', es: 'Media luna de pie', en: 'Standing Crescent', family: 'standing', level: 1,
      styles: ['hatha','vinyasa'], focus: ['shoulders','back','whole'], intensity: 1,
      cueEs: 'Alargá ambos costados y desplazá el torso lateralmente sin girar el pecho ni colapsar la cintura.',
      cueEn: 'Lengthen both side bodies and arc laterally without rotating the chest or collapsing the waist.',
      adaptationEs: 'Dejá una mano en la cadera o practicá sentado.', adaptationEn: 'Keep one hand on the hip or practice seated.',
      cautionEs: 'Mantené espacio en cuello y zona lumbar.', cautionEn: 'Maintain space through the neck and lower back.'
    },
    {
      id: 'savasana', sanskrit: 'Savasana', es: 'Relajación final', en: 'Final Relaxation', family: 'rest', level: 1,
      styles: ['hatha','vinyasa','yin','restorative'], focus: ['calm','whole'], intensity: 1,
      cueEs: 'Permití que el cuerpo sea sostenido, suavizá la respiración y soltá la necesidad de hacer.',
      cueEn: 'Let the body be supported, soften the breath, and release the need to do.',
      adaptationEs: 'Colocá un bolster bajo rodillas, una manta o recostate de lado.', adaptationEn: 'Place a bolster under the knees, use a blanket, or rest on one side.',
      cautionEs: 'Elegí una posición respirable y cómoda.', cautionEn: 'Choose a position that feels comfortable and easy to breathe in.'
    }
  ],

  salutations: [
    { id: 'auto', es: 'Automático según la clase', en: 'Automatic for the class', helperEs: 'Yoga 2.0 elige el saludo más coherente con el estilo, la intención y el nivel.' },
    { id: 'none', es: 'Sin saludo', en: 'No salutation', helperEs: 'Mantiene una progresión sin secuencia solar o lunar.' },
    { id: 'sun-a', es: 'Saludo al Sol A', en: 'Sun Salutation A', helperEs: 'Flujo clásico y simétrico para elevar temperatura y ritmo.' },
    { id: 'sun-b', es: 'Saludo al Sol B', en: 'Sun Salutation B', helperEs: 'Integra Silla y Guerrero I con mayor demanda de fuerza.' },
    { id: 'sun-classic', es: 'Saludo al Sol clásico de Hatha', en: 'Classical Hatha Sun Salutation', helperEs: 'Secuencia tradicional de doce posiciones, realizada a ambos lados.' },
    { id: 'moon', es: 'Saludo a la Luna', en: 'Moon Salutation', helperEs: 'Secuencia lateral, circular y equilibrante, realizada hacia ambos lados.' }
  ],
  salutationVariants: [
    { id: 'auto', es: 'Automática según el grupo', en: 'Automatic for the group' },
    { id: 'standard', es: 'Estándar', en: 'Standard' },
    { id: 'beginner', es: 'Nivel inicial', en: 'Beginner' },
    { id: 'chair', es: 'Con silla', en: 'Chair-supported' },
    { id: 'mobility', es: 'Movilidad reducida', en: 'Reduced mobility' },
    { id: 'pregnancy', es: 'Embarazo', en: 'Pregnancy' }
  ],
  classThemes: {
    grounding: {
      es: 'Enraizar para habitar el presente', en: 'Rooting into the present',
      openingEs: 'Invitá al grupo a sentir los puntos de apoyo y a dejar que la respiración marque el ritmo de la práctica.',
      openingEn: 'Invite the group to feel their points of contact and let the breath set the pace of practice.',
      closingEs: 'Cerrar recordando que la estabilidad no es rigidez: es la capacidad de volver al propio centro.',
      closingEn: 'Close by remembering that steadiness is not rigidity; it is the ability to return to center.'
    },
    energy: {
      es: 'Despertar energía con claridad', en: 'Awaken energy with clarity',
      openingEs: 'Proponé una respiración amplia y una intención de movimiento consciente, sin apuro.',
      openingEn: 'Offer a spacious breath and an intention of conscious movement without rushing.',
      closingEs: 'Reconocer la energía disponible y elegir cómo llevarla al resto del día.',
      closingEn: 'Acknowledge the energy available and choose how to carry it into the rest of the day.'
    },
    calm: {
      es: 'Crear espacio para la calma', en: 'Making space for calm',
      openingEs: 'Invitá a reducir el esfuerzo innecesario y a observar la exhalación como una vía de descanso.',
      openingEn: 'Invite the release of unnecessary effort and notice the exhale as a pathway to rest.',
      closingEs: 'Cerrar con una pausa silenciosa y la sensación de no tener que resolver nada por un momento.',
      closingEn: 'Close with a quiet pause and the feeling that nothing needs to be solved for a moment.'
    },
    focus: {
      es: 'Una mente clara, un gesto a la vez', en: 'A clear mind, one gesture at a time',
      openingEs: 'Elegí un punto de atención —respiración, mirada o apoyo— y volvé a él cada vez que la mente se disperse.',
      openingEn: 'Choose one anchor—breath, gaze, or contact—and return to it whenever the mind wanders.',
      closingEs: 'Reconocer que la concentración se cultiva regresando, no evitando la distracción.',
      closingEn: 'Acknowledge that concentration grows through returning, not through eliminating distraction.'
    },
    confidence: {
      es: 'Expandirse desde una base estable', en: 'Expand from a steady base',
      openingEs: 'Proponé explorar amplitud sin abandonar el propio límite ni la calidad de la respiración.',
      openingEn: 'Explore expansion without abandoning personal boundaries or the quality of breath.',
      closingEs: 'Cerrar integrando la experiencia de ocupar espacio con presencia y suavidad.',
      closingEn: 'Close by integrating the experience of taking up space with presence and softness.'
    },
    release: {
      es: 'Soltar lo que ya no hace falta sostener', en: 'Release what no longer needs holding',
      openingEs: 'Invitá a identificar dónde se acumula esfuerzo y a explorar una respuesta más amable.',
      openingEn: 'Invite awareness of where effort accumulates and explore a kinder response.',
      closingEs: 'Cerrar con una exhalación larga y la intención de llevar menos tensión al resto del día.',
      closingEn: 'Close with a long exhale and the intention to carry less tension into the rest of the day.'
    }
  }
};


/* Yoga 2.0 v2.0 · biblioteca visual */
window.YOGA_DATA.poses.push(...[{"id": "table", "sanskrit": "Bharmanasana", "es": "Postura de la mesa", "en": "Tabletop Pose", "family": "warmup", "level": 1, "styles": ["hatha", "vinyasa", "yin"], "focus": ["whole", "back", "shoulders"], "intensity": 1, "cueEs": "Alineá hombros sobre muñecas y caderas sobre rodillas; sostené una columna larga y respirable.", "cueEn": "Stack shoulders over wrists and hips over knees, keeping the spine long and breathable.", "adaptationEs": "Colocá manta bajo rodillas o apoyá antebrazos.", "adaptationEn": "Place a blanket under the knees or lower to forearms.", "cautionEs": "Distribuí el peso sin colapsar muñecas ni hombros.", "cautionEn": "Spread weight without collapsing into wrists or shoulders."}, {"id": "cat", "sanskrit": "Marjaryasana", "es": "Gato", "en": "Cat Pose", "family": "warmup", "level": 1, "styles": ["hatha", "vinyasa", "yin"], "focus": ["back", "whole"], "intensity": 1, "cueEs": "Exhalá, redondeá la columna y dejá que la cabeza acompañe sin forzar el cuello.", "cueEn": "Exhale, round the spine, and let the head follow without forcing the neck.", "adaptationEs": "Practicá sentado si necesitás evitar carga en manos.", "adaptationEn": "Practice seated to avoid weight bearing through the hands.", "cautionEs": "No empujes la cabeza hacia el pecho.", "cautionEn": "Do not force the head toward the chest."}, {"id": "cow", "sanskrit": "Bitilasana", "es": "Vaca", "en": "Cow Pose", "family": "warmup", "level": 1, "styles": ["hatha", "vinyasa", "yin"], "focus": ["back", "shoulders"], "intensity": 1, "cueEs": "Inhalá, ampliá el pecho y mové la pelvis sin comprimir la zona lumbar.", "cueEn": "Inhale, broaden the chest, and move the pelvis without compressing the lower back.", "adaptationEs": "Reducí la extensión o practicá sentado.", "adaptationEn": "Reduce the extension or practice seated.", "cautionEs": "Mantené el cuello como continuación de la columna.", "cautionEn": "Keep the neck as a continuation of the spine."}, {"id": "runner-lunge", "sanskrit": "Ashwa Sanchalanasana", "es": "Estocada del corredor", "en": "Runner’s Lunge", "family": "lunge", "level": 1, "styles": ["hatha", "vinyasa"], "focus": ["hips", "legs"], "intensity": 2, "cueEs": "Llevá una pierna atrás, apoyá las manos y alargá el pecho hacia adelante.", "cueEn": "Step one leg back, ground the hands, and lengthen the chest forward.", "adaptationEs": "Usá bloques o apoyá la rodilla posterior.", "adaptationEn": "Use blocks or lower the back knee.", "cautionEs": "Alineá la rodilla delantera con el pie.", "cautionEn": "Track the front knee with the foot."}, {"id": "warrior3", "sanskrit": "Virabhadrasana III", "es": "Guerrero III", "en": "Warrior III", "family": "balance", "level": 2, "styles": ["hatha", "vinyasa"], "focus": ["balance", "legs", "core"], "intensity": 3, "cueEs": "Proyectá talón y coronilla en direcciones opuestas mientras sostenés una pelvis estable.", "cueEn": "Reach heel and crown in opposite directions while keeping the pelvis steady.", "adaptationEs": "Apoyá manos en pared, silla o bloques.", "adaptationEn": "Place hands on a wall, chair, or blocks.", "cautionEs": "Evitá abrir la cadera de la pierna elevada.", "cautionEn": "Avoid opening the hip of the lifted leg."}, {"id": "reverse-warrior", "sanskrit": "Viparita Virabhadrasana", "es": "Guerrero invertido", "en": "Reverse Warrior", "family": "standing", "level": 2, "styles": ["hatha", "vinyasa"], "focus": ["legs", "shoulders", "whole"], "intensity": 2, "cueEs": "Mantené la base de Guerrero II y alargá el costado anterior sin colapsar el posterior.", "cueEn": "Keep the Warrior II base and lengthen the front side body without collapsing the back side.", "adaptationEs": "Apoyá la mano inferior en la cadera.", "adaptationEn": "Keep the lower hand at the hip.", "cautionEs": "Conservá espacio en la zona lumbar.", "cautionEn": "Maintain space in the lower back."}, {"id": "staff", "sanskrit": "Dandasana", "es": "Bastón sentado", "en": "Staff Pose", "family": "seated", "level": 1, "styles": ["hatha", "yin"], "focus": ["legs", "back"], "intensity": 1, "cueEs": "Sentate sobre los isquiones, extendé las piernas y crecé desde la base de la columna.", "cueEn": "Sit on the sitting bones, extend the legs, and rise through the spine.", "adaptationEs": "Elevá la pelvis sobre una manta o flexioná rodillas.", "adaptationEn": "Elevate the pelvis on a blanket or bend the knees.", "cautionEs": "No bloquees las rodillas ni redondees la espalda.", "cautionEn": "Avoid locking the knees or rounding the back."}, {"id": "cow-face", "sanskrit": "Gomukhasana", "es": "Cara de vaca", "en": "Cow Face Pose", "family": "seated", "level": 2, "styles": ["hatha", "yin"], "focus": ["hips", "shoulders"], "intensity": 2, "cueEs": "Apilá las rodillas dentro de un rango cómodo y buscá longitud antes de unir las manos.", "cueEn": "Stack the knees comfortably and find length before joining the hands.", "adaptationEs": "Sentate en un bloque y usá un cinto entre las manos.", "adaptationEn": "Sit on a block and use a strap between the hands.", "cautionEs": "No fuerces rodillas ni hombros.", "cautionEn": "Do not force the knees or shoulders."}, {"id": "fire-log", "sanskrit": "Agnistambhasana", "es": "Leño al fuego", "en": "Fire Log Pose", "family": "hips", "level": 2, "styles": ["hatha", "yin"], "focus": ["hips"], "intensity": 2, "cueEs": "Apilá las tibias y sostené una columna larga sin empujar las rodillas.", "cueEn": "Stack the shins and keep the spine long without pressing the knees.", "adaptationEs": "Separá las piernas o colocá soportes bajo las rodillas.", "adaptationEn": "Unstack the legs or support the knees.", "cautionEs": "Evitá si aparece dolor articular en rodillas.", "cautionEn": "Avoid if there is joint pain in the knees."}, {"id": "caterpillar", "sanskrit": "Paschimottanasana (Yin)", "es": "Oruga", "en": "Caterpillar Pose", "family": "yin", "level": 1, "styles": ["yin"], "focus": ["back", "legs", "calm"], "intensity": 1, "cueEs": "Dejá que la columna se redondee con suavidad y sostené sin traccionar el cuerpo.", "cueEn": "Allow the spine to round softly and hold without pulling the body.", "adaptationEs": "Flexioná rodillas y apoyá el torso en un bolster.", "adaptationEn": "Bend the knees and support the torso on a bolster.", "cautionEs": "Evitá hormigueo o dolor agudo.", "cautionEn": "Avoid tingling or sharp pain."}, {"id": "dragon", "sanskrit": "Dragon Pose", "es": "Dragón", "en": "Dragon Pose", "family": "yin", "level": 2, "styles": ["yin"], "focus": ["hips", "legs"], "intensity": 2, "cueEs": "Entrá gradualmente en la estocada y dejá que los apoyos sostengan el peso.", "cueEn": "Enter the lunge gradually and let the props support the weight.", "adaptationEs": "Usá bloques y manta bajo la rodilla posterior.", "adaptationEn": "Use blocks and a blanket under the back knee.", "cautionEs": "Protegé la rodilla delantera y evitá compresión lumbar.", "cautionEn": "Protect the front knee and avoid lumbar compression."}, {"id": "shoelace", "sanskrit": "Eka Pada Gomukhasana", "es": "Cordón", "en": "Shoelace Pose", "family": "yin", "level": 2, "styles": ["yin"], "focus": ["hips"], "intensity": 2, "cueEs": "Apilá las piernas hasta donde sea sostenible y dejá que la pelvis se apoye.", "cueEn": "Stack the legs only as far as sustainable and let the pelvis settle.", "adaptationEs": "Separá los pies o sentate sobre un soporte.", "adaptationEn": "Separate the feet or sit on support.", "cautionEs": "No fuerces las rodillas.", "cautionEn": "Do not force the knees."}, {"id": "seated-twist", "sanskrit": "Ardha Matsyendrasana", "es": "Media torsión sentada", "en": "Half Lord of the Fishes", "family": "twist", "level": 1, "styles": ["hatha", "yin"], "focus": ["back", "whole"], "intensity": 1, "cueEs": "Crecé al inhalar y girá desde el torso al exhalar, sin empujar la rodilla.", "cueEn": "Lengthen on the inhale and rotate through the torso on the exhale without forcing the knee.", "adaptationEs": "Mantené una pierna extendida o practicá sentado en silla.", "adaptationEn": "Keep one leg extended or practice on a chair.", "cautionEs": "Evitá torsiones cerradas en embarazo.", "cautionEn": "Avoid closed twists during pregnancy."}, {"id": "locust", "sanskrit": "Salabhasana", "es": "Langosta", "en": "Locust Pose", "family": "backbend", "level": 2, "styles": ["hatha", "vinyasa"], "focus": ["back", "legs", "core"], "intensity": 2, "cueEs": "Alargá el cuerpo antes de elevar pecho y piernas, manteniendo la nuca larga.", "cueEn": "Lengthen before lifting the chest and legs, keeping the back of the neck long.", "adaptationEs": "Elevá solo pecho o una pierna por vez.", "adaptationEn": "Lift only the chest or one leg at a time.", "cautionEs": "Evitá comprimir la zona lumbar.", "cautionEn": "Avoid compressing the lower back."}, {"id": "fish", "sanskrit": "Matsyasana", "es": "Pez", "en": "Fish Pose", "family": "backbend", "level": 2, "styles": ["hatha"], "focus": ["shoulders", "back"], "intensity": 2, "cueEs": "Elevá el esternón y apoyá la cabeza sin cargar peso sobre el cuello.", "cueEn": "Lift the sternum and rest the head without loading the neck.", "adaptationEs": "Usá un bolster a lo largo de la columna.", "adaptationEn": "Use a bolster along the spine.", "cautionEs": "El peso principal permanece en antebrazos y pelvis.", "cautionEn": "Keep the main weight through forearms and pelvis."}, {"id": "puppy", "sanskrit": "Uttana Shishosana", "es": "Cachorro extendido", "en": "Extended Puppy Pose", "family": "warmup", "level": 1, "styles": ["hatha", "vinyasa", "yin"], "focus": ["shoulders", "back"], "intensity": 1, "cueEs": "Mantené caderas sobre rodillas y alargá brazos y pecho hacia adelante.", "cueEn": "Keep hips over knees and lengthen the arms and chest forward.", "adaptationEs": "Apoyá frente o pecho sobre un bolster.", "adaptationEn": "Support the forehead or chest on a bolster.", "cautionEs": "Reducí el rango si hay molestia en hombros.", "cautionEn": "Reduce range if the shoulders feel uncomfortable."}]);
window.YOGA_DATA.poseImages={"easy-seat": "./images/asanas/01_sukhasana.webp", "mountain": "./images/asanas/02_tadasana.webp", "prayer": "./images/asanas/03_anjali_mudra.webp", "raised-arms": "./images/asanas/04_urdhva_hastasana.webp", "forward-fold": "./images/asanas/05_uttanasana.webp", "half-lift": "./images/asanas/06_ardha_uttanasana.webp", "table": "./images/asanas/07_bharmanasana.webp", "cat": "./images/asanas/08_marjaryasana.webp", "cow": "./images/asanas/09_bitilasana.webp", "child": "./images/asanas/10_balasana.webp", "plank": "./images/asanas/11_phalakasana.webp", "forearm-plank": "./images/asanas/11_phalakasana.webp", "chaturanga": "./images/asanas/12_chaturanga_dandasana.webp", "knees-chest-chin": "./images/asanas/13_ashtanga_namaskara.webp", "cobra": "./images/asanas/14_bhujangasana.webp", "up-dog": "./images/asanas/15_urdhva_mukha_svanasana.webp", "down-dog": "./images/asanas/16_adho_mukha_svanasana.webp", "runner-lunge": "./images/asanas/17_ashwa_sanchalanasana.webp", "low-lunge": "./images/asanas/18_anjaneyasana.webp", "high-lunge": "./images/asanas/19_crescent_lunge.webp", "chair": "./images/asanas/20_utkatasana.webp", "warrior1": "./images/asanas/21_virabhadrasana_i.webp", "warrior2": "./images/asanas/22_virabhadrasana_ii.webp", "warrior3": "./images/asanas/23_virabhadrasana_iii.webp", "reverse-warrior": "./images/asanas/24_reverse_warrior.webp", "triangle": "./images/asanas/25_trikonasana.webp", "side-angle": "./images/asanas/26_parsvakonasana.webp", "pyramid": "./images/asanas/27_parsvottanasana.webp", "wide-fold": "./images/asanas/28_prasarita_padottanasana.webp", "half-moon": "./images/asanas/29_ardha_chandrasana.webp", "goddess": "./images/asanas/30_utkata_konasana.webp", "staff": "./images/asanas/31_dandasana.webp", "butterfly": "./images/asanas/32_baddha_konasana.webp", "head-to-knee": "./images/asanas/33_janu_sirsasana.webp", "seated-fold": "./images/asanas/34_paschimottanasana.webp", "dragonfly": "./images/asanas/35_upavistha_konasana.webp", "cow-face": "./images/asanas/36_gomukhasana.webp", "pigeon": "./images/asanas/37_pigeon_prep.webp", "fire-log": "./images/asanas/38_agnistambhasana.webp", "figure-four": "./images/asanas/38_agnistambhasana.webp", "caterpillar": "./images/asanas/39_caterpillar.webp", "dragon": "./images/asanas/40_dragon.webp", "lizard": "./images/asanas/40_dragon.webp", "shoelace": "./images/asanas/41_shoelace_pose.webp", "deer": "./images/asanas/41_shoelace_pose.webp", "seated-twist": "./images/asanas/42_ardha_matsyendrasana.webp", "supine-twist": "./images/asanas/43_jathara_parivartanasana.webp", "sphinx": "./images/asanas/44_sphinx_pose.webp", "locust": "./images/asanas/45_salabhasana.webp", "camel": "./images/asanas/46_ustrasana.webp", "bridge": "./images/asanas/47_setu_bandha_sarvangasana.webp", "supported-bridge": "./images/asanas/47_setu_bandha_sarvangasana.webp", "fish": "./images/asanas/48_matsyasana.webp", "puppy": "./images/asanas/49_uttana_shishosana.webp", "thread-needle": "./images/asanas/50_thread_the_needle.webp", "reclined-butterfly": "./images/asanas/51_supta_baddha_konasana.webp", "legs-wall": "./images/asanas/52_viparita_karani.webp", "knees-chest": "./images/asanas/53_apanasana.webp", "savasana": "./images/asanas/54_savasana.webp", "star": "./images/asanas/55_star_pose.webp", "side-lunge": "./images/asanas/56_skandasana.webp", "supported-child": "./images/adaptations/78_child_support.webp", "standing-side-bend": "./images/accessibility/84_side_opening_pregnancy.webp"};
window.YOGA_DATA.sequenceImages={"sun-a": {"cover": "./images/sequences/57_saludo_sol_a_portada.webp", "steps": "./images/sequences/58_saludo_sol_a_pasos.webp"}, "sun-b": {"cover": "./images/sequences/59_saludo_sol_b_portada.webp", "steps": "./images/sequences/60_saludo_sol_b_pasos.webp"}, "sun-classic": {"cover": "./images/sequences/61_saludo_sol_hatha_portada.webp", "steps": "./images/sequences/62_saludo_sol_hatha_pasos.webp"}, "moon": {"cover": "./images/sequences/63_saludo_luna_portada.webp", "steps": "./images/sequences/64_saludo_luna_pasos.webp"}};
window.YOGA_DATA.adaptationImages=[{"title": "Perro boca abajo con silla", "category": "Apoyo y descarga", "image": "./images/adaptations/71_down_dog_chair.webp"}, {"title": "Uttanasana con bloques", "category": "Bloques", "image": "./images/adaptations/72_uttanasana_blocks.webp"}, {"title": "Guerrero II con silla", "category": "Silla", "image": "./images/adaptations/73_warrior2_chair.webp"}, {"title": "Triángulo con bloque", "category": "Bloque", "image": "./images/adaptations/74_triangle_block.webp"}, {"title": "Mariposa restaurativa", "category": "Bolster", "image": "./images/adaptations/75_butterfly_restorative.webp"}, {"title": "Supta Baddha Konasana con soporte", "category": "Soportes", "image": "./images/adaptations/76_supta_baddha_support.webp"}, {"title": "Viparita Karani con pared", "category": "Pared", "image": "./images/adaptations/77_viparita_wall.webp"}, {"title": "Postura del niño con soporte", "category": "Bolster", "image": "./images/adaptations/78_child_support.webp"}, {"title": "Savasana con bolster", "category": "Bolster", "image": "./images/adaptations/79_savasana_bolster.webp"}, {"title": "Estocada baja con apoyo", "category": "Silla", "image": "./images/adaptations/80_low_lunge_support.webp"}];
window.YOGA_DATA.accessibilityImages=[{"title": "Tadasana para embarazo", "category": "Embarazo", "image": "./images/accessibility/81_tadasana_pregnancy.webp"}, {"title": "Diosa para embarazo", "category": "Embarazo", "image": "./images/accessibility/82_goddess_pregnancy.webp"}, {"title": "Gato–vaca para embarazo", "category": "Embarazo", "image": "./images/accessibility/83_cat_cow_pregnancy.webp"}, {"title": "Apertura lateral para embarazo", "category": "Embarazo", "image": "./images/accessibility/84_side_opening_pregnancy.webp"}, {"title": "Secuencia suave con silla", "category": "Movilidad reducida", "image": "./images/accessibility/85_chair_sequence.webp"}, {"title": "Flexión adelante con silla", "category": "Movilidad reducida", "image": "./images/accessibility/86_uttanasana_chair.webp"}, {"title": "Torsión sentada con silla", "category": "Movilidad reducida", "image": "./images/accessibility/87_seated_twist_chair.webp"}, {"title": "Estiramiento lateral en silla", "category": "Movilidad reducida", "image": "./images/accessibility/88_side_stretch_chair.webp"}];
window.YOGA_DATA.appImages={"library": "./images/app/89_portada_biblioteca.webp", "classMode": "./images/app/90_portada_modo_clase.webp", "saved": "./images/app/91_portada_mis_clases.webp", "hero": "./images/app/92_hero_yoga_2_0.webp"};
window.YOGA_DATA.poses.forEach(pose => { pose.image = window.YOGA_DATA.poseImages[pose.id] || ''; });


/* Resolución robusta de imágenes: usa el archivo integrado si la carpeta images no fue subida. */
(() => {
  const embedded = window.YOGA_IMAGE_ASSETS || {};
  const resolveAsset = path => embedded[path] || path;
  const data = window.YOGA_DATA;
  data.poseImages = Object.fromEntries(Object.entries(data.poseImages || {}).map(([key, value]) => [key, resolveAsset(value)]));
  Object.values(data.sequenceImages || {}).forEach(item => {
    item.cover = resolveAsset(item.cover);
    item.steps = resolveAsset(item.steps);
  });
  (data.adaptationImages || []).forEach(item => { item.image = resolveAsset(item.image); });
  (data.accessibilityImages || []).forEach(item => { item.image = resolveAsset(item.image); });
  Object.keys(data.appImages || {}).forEach(key => { data.appImages[key] = resolveAsset(data.appImages[key]); });
  (data.poses || []).forEach(pose => { pose.image = data.poseImages[pose.id] || pose.image || ''; });
})();
