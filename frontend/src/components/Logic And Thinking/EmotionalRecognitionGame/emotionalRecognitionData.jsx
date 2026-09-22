import React from 'react';

// Crisp, child-friendly vector SVG illustrations for each emotion
export const EMOTION_ILLUSTRATIONS = {
  happy: (
    <svg viewBox="0 0 160 160" width="100%" height="100%">
      <circle cx="80" cy="80" r="70" fill="#fef08a" stroke="#facc15" strokeWidth="3.5" />
      {/* Sparkles around head */}
      <circle cx="28" cy="40" r="3" fill="#eab308" />
      <circle cx="132" cy="42" r="3" fill="#eab308" />
      {/* Happy child face */}
      <circle cx="80" cy="82" r="46" fill="#fed7aa" stroke="#f97316" strokeWidth="2.5" />
      {/* Cute curly hair */}
      <path d="M 44 68 C 40 40, 65 34, 80 34 C 95 34, 120 40, 116 68 C 110 52, 98 50, 80 50 C 62 50, 50 52, 44 68 Z" fill="#78350f" />
      {/* Sparkling happy eyes (curved smiling eyes) */}
      <path d="M 64 74 Q 72 65 80 74" fill="none" stroke="#1e1b4b" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M 88 74 Q 96 65 104 74" fill="none" stroke="#1e1b4b" strokeWidth="3.5" strokeLinecap="round" />
      {/* Rosy blush cheeks */}
      <circle cx="58" cy="84" r="6.5" fill="#f43f5e" opacity="0.45" />
      <circle cx="102" cy="84" r="6.5" fill="#f43f5e" opacity="0.45" />
      {/* Joyful open mouth smile with pink tongue */}
      <path d="M 68 88 Q 80 108 92 88 Z" fill="#be123c" stroke="#1e1b4b" strokeWidth="2.5" />
      <path d="M 72 98 Q 80 104 88 98" fill="#f472b6" />
    </svg>
  ),

  sad: (
    <svg viewBox="0 0 160 160" width="100%" height="100%">
      <circle cx="80" cy="80" r="70" fill="#e0f2fe" stroke="#7dd3fc" strokeWidth="3.5" />
      {/* Gentle raincloud above */}
      <path d="M 65 30 Q 72 22 80 30 Q 92 24 96 34 Q 104 36 100 44 L 60 44 Q 54 36 65 30 Z" fill="#93c5fd" opacity="0.65" />
      {/* Sad child face */}
      <circle cx="80" cy="88" r="46" fill="#fed7aa" stroke="#f97316" strokeWidth="2.5" />
      {/* Hair */}
      <path d="M 44 74 C 40 46, 65 40, 80 40 C 95 40, 120 46, 116 74 C 110 58, 98 56, 80 56 C 62 56, 50 58, 44 74 Z" fill="#451a03" />
      {/* Droopy eyebrows */}
      <path d="M 64 72 L 76 76" stroke="#1e1b4b" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 96 76 L 84 72" stroke="#1e1b4b" strokeWidth="2.5" strokeLinecap="round" />
      {/* Big watery eyes */}
      <circle cx="70" cy="82" r="4" fill="#1e1b4b" />
      <circle cx="90" cy="82" r="4" fill="#1e1b4b" />
      <circle cx="72" cy="80" r="1.5" fill="#ffffff" />
      <circle cx="92" cy="80" r="1.5" fill="#ffffff" />
      {/* Shiny teardrop */}
      <path d="M 66 89 C 64 92, 64 97, 68 97 C 72 97, 72 92, 66 89 Z" fill="#38bdf8" />
      {/* Downward sad mouth */}
      <path d="M 72 102 Q 80 94 88 102" fill="none" stroke="#1e1b4b" strokeWidth="3" strokeLinecap="round" />
    </svg>
  ),

  angry: (
    <svg viewBox="0 0 160 160" width="100%" height="100%">
      <circle cx="80" cy="80" r="70" fill="#fee2e2" stroke="#fca5a5" strokeWidth="3.5" />
      {/* Angry flushed face */}
      <circle cx="80" cy="82" r="46" fill="#fecaca" stroke="#dc2626" strokeWidth="2.5" />
      {/* Spiky hair */}
      <polygon points="45,60 55,42 62,54 75,36 85,52 95,38 105,52 115,44 115,62" fill="#7f1d1d" />
      {/* Sharp angled angry eyebrows */}
      <line x1="62" y1="68" x2="76" y2="76" stroke="#7f1d1d" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="98" y1="68" x2="84" y2="76" stroke="#7f1d1d" strokeWidth="3.5" strokeLinecap="round" />
      {/* Fierce eyes */}
      <circle cx="70" cy="80" r="4" fill="#1e1b4b" />
      <circle cx="90" cy="80" r="4" fill="#1e1b4b" />
      {/* Pouting mouth */}
      <path d="M 72 98 Q 80 92 88 98" fill="none" stroke="#7f1d1d" strokeWidth="3.5" strokeLinecap="round" />
      {/* Steam puffs */}
      <path d="M 32 75 Q 36 70 32 65" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M 128 75 Q 124 70 128 65" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    </svg>
  ),

  scared: (
    <svg viewBox="0 0 160 160" width="100%" height="100%">
      <circle cx="80" cy="80" r="70" fill="#ede9fe" stroke="#c4b5fd" strokeWidth="3.5" />
      {/* Scared pale face */}
      <circle cx="80" cy="84" r="46" fill="#fed7aa" stroke="#6366f1" strokeWidth="2.5" />
      {/* Tousled hair */}
      <path d="M 46 66 C 42 42, 65 36, 80 36 C 95 36, 118 42, 114 66 C 108 52, 98 50, 80 50 C 62 50, 52 52, 46 66 Z" fill="#312e81" />
      {/* Raised worried eyebrows */}
      <path d="M 64 68 Q 72 63 76 67" fill="none" stroke="#1e1b4b" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 96 68 Q 88 63 84 67" fill="none" stroke="#1e1b4b" strokeWidth="2.5" strokeLinecap="round" />
      {/* Wide startled round eyes */}
      <circle cx="68" cy="78" r="7" fill="#ffffff" stroke="#1e1b4b" strokeWidth="2" />
      <circle cx="92" cy="78" r="7" fill="#ffffff" stroke="#1e1b4b" strokeWidth="2" />
      <circle cx="68" cy="78" r="3" fill="#1e1b4b" />
      <circle cx="92" cy="78" r="3" fill="#1e1b4b" />
      {/* Trembling squiggly mouth */}
      <path d="M 70 98 Q 75 102 80 98 Q 85 94 90 98" fill="none" stroke="#1e1b4b" strokeWidth="2.8" strokeLinecap="round" />
      {/* Sweat drop on forehead */}
      <path d="M 96 58 C 94 62, 94 66, 98 66 C 102 66, 102 62, 96 58 Z" fill="#60a5fa" />
    </svg>
  ),

  surprised: (
    <svg viewBox="0 0 160 160" width="100%" height="100%">
      <circle cx="80" cy="80" r="70" fill="#fdf2f8" stroke="#fbcfe8" strokeWidth="3.5" />
      {/* Surprised face */}
      <circle cx="80" cy="84" r="46" fill="#fed7aa" stroke="#ec4899" strokeWidth="2.5" />
      {/* Ponytail or wild hair */}
      <path d="M 44 68 C 40 40, 65 34, 80 34 C 95 34, 120 40, 116 68 C 110 52, 98 50, 80 50 C 62 50, 50 52, 44 68 Z" fill="#b45309" />
      <circle cx="80" cy="30" r="10" fill="#b45309" />
      {/* Very high arched raised eyebrows */}
      <path d="M 62 62 Q 70 54 78 62" fill="none" stroke="#1e1b4b" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 82 62 Q 90 54 98 62" fill="none" stroke="#1e1b4b" strokeWidth="2.5" strokeLinecap="round" />
      {/* Huge wide round eyes */}
      <circle cx="68" cy="74" r="8" fill="#ffffff" stroke="#1e1b4b" strokeWidth="2" />
      <circle cx="92" cy="74" r="8" fill="#ffffff" stroke="#1e1b4b" strokeWidth="2" />
      <circle cx="68" cy="74" r="3.5" fill="#1e1b4b" />
      <circle cx="92" cy="74" r="3.5" fill="#1e1b4b" />
      {/* Big round "O" mouth */}
      <ellipse cx="80" cy="98" rx="8" ry="11" fill="#be185d" stroke="#1e1b4b" strokeWidth="2.5" />
      {/* Sparkles of surprise */}
      <polygon points="34,44 38,40 42,44 38,48" fill="#ec4899" />
      <polygon points="126,44 130,40 134,44 130,48" fill="#ec4899" />
    </svg>
  ),

  excited: (
    <svg viewBox="0 0 160 160" width="100%" height="100%">
      <circle cx="80" cy="80" r="70" fill="#fefce8" stroke="#fde047" strokeWidth="3.5" />
      {/* Confetti particles */}
      <rect x="35" y="32" width="6" height="6" rx="2" fill="#ef4444" transform="rotate(15 35 32)" />
      <rect x="120" y="34" width="6" height="6" rx="2" fill="#3b82f6" transform="rotate(-25 120 34)" />
      <rect x="130" y="70" width="6" height="6" rx="2" fill="#10b981" transform="rotate(45 130 70)" />
      {/* Excited face */}
      <circle cx="80" cy="84" r="46" fill="#fed7aa" stroke="#eab308" strokeWidth="2.5" />
      {/* Cheerful spiky hair */}
      <path d="M 44 64 C 40 38, 65 32, 80 32 C 95 32, 120 38, 116 64 C 110 48, 98 46, 80 46 C 62 46, 50 48, 44 64 Z" fill="#d97706" />
      {/* Star sparkles in eyes */}
      <g transform="translate(68, 72) scale(0.6)">
        <polygon points="0,-12 4,-3 12,0 4,3 0,12 -4,3 -12,0 -4,-3" fill="#ca8a04" />
      </g>
      <g transform="translate(92, 72) scale(0.6)">
        <polygon points="0,-12 4,-3 12,0 4,3 0,12 -4,3 -12,0 -4,-3" fill="#ca8a04" />
      </g>
      {/* Cheerful blush cheeks */}
      <circle cx="58" cy="82" r="6" fill="#f43f5e" opacity="0.5" />
      <circle cx="102" cy="82" r="6" fill="#f43f5e" opacity="0.5" />
      {/* Huge laughing open mouth */}
      <path d="M 66 86 Q 80 112 94 86 Z" fill="#dc2626" stroke="#1e1b4b" strokeWidth="2.5" />
      <path d="M 72 98 Q 80 106 88 98" fill="#fca5a5" />
      {/* Raised cheering hands */}
      <circle cx="34" cy="94" r="8" fill="#fed7aa" stroke="#f97316" strokeWidth="2" />
      <circle cx="126" cy="94" r="8" fill="#fed7aa" stroke="#f97316" strokeWidth="2" />
    </svg>
  ),

  calm: (
    <svg viewBox="0 0 160 160" width="100%" height="100%">
      <circle cx="80" cy="80" r="70" fill="#f0fdf4" stroke="#86efac" strokeWidth="3.5" />
      {/* Calm face */}
      <circle cx="80" cy="82" r="46" fill="#fed7aa" stroke="#10b981" strokeWidth="2.5" />
      {/* Soft neat hair */}
      <path d="M 44 68 C 40 42, 65 36, 80 36 C 95 36, 120 42, 116 68 C 110 52, 98 50, 80 50 C 62 50, 50 52, 44 68 Z" fill="#065f46" />
      {/* Peaceful closed curved eyes (serene zen curve) */}
      <path d="M 64 74 Q 72 79 80 74" fill="none" stroke="#047857" strokeWidth="3" strokeLinecap="round" />
      <path d="M 88 74 Q 96 79 104 74" fill="none" stroke="#047857" strokeWidth="3" strokeLinecap="round" />
      {/* Soft gentle rosy cheeks */}
      <circle cx="58" cy="82" r="5.5" fill="#f472b6" opacity="0.35" />
      <circle cx="102" cy="82" r="5.5" fill="#f472b6" opacity="0.35" />
      {/* Gentle pleasant soft smile */}
      <path d="M 72 88 Q 80 94 88 88" fill="none" stroke="#047857" strokeWidth="2.5" strokeLinecap="round" />
      {/* Little green peaceful leaf floating */}
      <path d="M 38 42 Q 46 36 50 44 Q 44 48 38 42 Z" fill="#4ade80" />
      <line x1="38" y1="42" x2="48" y2="44" stroke="#15803d" strokeWidth="1" />
    </svg>
  )
};

// 7 Core Emotions Guide Catalog
export const EMOTIONS_CATALOG = [
  {
    id: 'happy',
    name: 'Happy',
    nameMr: 'आनंदी',
    taglineMr: 'हास्याने भरलेले',
    descriptionMr: 'जेव्हा आपल्याला मनातून छान वाटते, चेहऱ्यावर हास्य असते आणि आपण मित्रांसोबत हसतो!',
    whenFeelMr: 'खेळताना, जवळ घेताना किंवा आवडते फळ खाताना.',
    emoji: '😊',
    color: '#eab308',
    bg: '#fef9c3',
    illustrationKey: 'happy',
    tagline: 'Full of Smiles',
    description: 'When we feel good inside, smile brightly, and laugh with our friends!',
    whenFeel: 'When playing games, getting a hug, or eating yummy fruit.'
  },
  {
    id: 'sad',
    name: 'Sad',
    nameMr: 'दुःखी',
    taglineMr: 'मायेची गरज',
    descriptionMr: 'जेव्हा काहीतरी मनाविरुद्ध घडते किंवा त्रास होतो. रडणे आणि कोणाचा तरी आधार घेणे स्वाभाविक आहे.',
    whenFeelMr: 'खेळणे तुटल्यावर, कोणीतरी गेल्यावर किंवा एकटे वाटल्यावर.',
    emoji: '😢',
    color: '#0284c7',
    bg: '#e0f2fe',
    illustrationKey: 'sad',
    tagline: 'Needing a Hug',
    description: 'When something hurt or did not go our way. It is okay to cry and ask for comfort.',
    whenFeel: 'When a toy breaks, someone leaves, or we feel left out.'
  },
  {
    id: 'angry',
    name: 'Angry',
    nameMr: 'रागीट',
    taglineMr: 'दीर्घ श्वास घ्या',
    descriptionMr: 'जेव्हा आपल्याला राग येतो किंवा चिडचिड होते. तीन दीर्घ श्वास घेतल्याने मन शांत होते.',
    whenFeelMr: 'जेव्हा कोणी आपली वस्तू हिसकावून घेते किंवा मनाविरुद्ध होते.',
    emoji: '😠',
    color: '#ef4444',
    bg: '#fee2e2',
    illustrationKey: 'angry',
    tagline: 'Take Deep Breaths',
    description: 'When we feel upset or frustrated. Taking deep breaths helps our tummy calm down.',
    whenFeel: 'When someone grabs our toy or rules feel unfair.'
  },
  {
    id: 'scared',
    name: 'Scared',
    nameMr: 'घाबरलेला',
    taglineMr: 'जवळ पकडा',
    descriptionMr: 'जेव्हा एखादी गोष्ट भीतीदायक वाटते किंवा मोठा आवाज होतो. आई किंवा बाबांना जवळ घेतल्याने सुरक्षित वाटते!',
    whenFeelMr: 'विजांचा कडकडाट ऐकल्यावर किंवा अंधाऱ्या खोलीत जाताना.',
    emoji: '😨',
    color: '#6366f1',
    bg: '#ede9fe',
    illustrationKey: 'scared',
    tagline: 'Hold Someone Close',
    description: 'When something feels spooky or loud. Holding mom or dad makes us feel safe!',
    whenFeel: 'When hearing loud thunder or entering a dark room.'
  },
  {
    id: 'surprised',
    name: 'Surprised',
    nameMr: 'आश्चर्यचकित',
    taglineMr: 'मोठे डोळे',
    descriptionMr: 'जेव्हा अचानक अनपेक्षित काहीतरी छान घडते ज्याची आपल्याला कल्पना नसते!',
    whenFeelMr: 'सरप्राईज गिफ्ट बॉक्स उघडताना किंवा कोणी अचानक समोर आल्यावर.',
    emoji: '😲',
    color: '#ec4899',
    bg: '#fdf2f8',
    illustrationKey: 'surprised',
    tagline: 'Eyes Wide Open',
    description: 'When something unexpected happens that we did not see coming!',
    whenFeel: 'When opening a mystery gift box or someone jumps out saying "Peekaboo!"'
  },
  {
    id: 'excited',
    name: 'Excited',
    nameMr: 'उत्साही',
    taglineMr: 'उडी मारायला तयार!',
    descriptionMr: 'जेव्हा खूप मजेची गोष्ट घडणार असते आणि मन आनंदाने उड्या मारू लागते!',
    whenFeelMr: 'बागेत जाताना, वाढदिवसाच्या पार्टीत किंवा पाळण्यात बसताना.',
    emoji: '🤩',
    color: '#f59e0b',
    bg: '#fef3c7',
    illustrationKey: 'excited',
    tagline: 'Ready to Jump!',
    description: 'When something super fun is happening and our heart jumps with joy!',
    whenFeel: 'When going to the playground, birthday party, or amusement rides.'
  },
  {
    id: 'calm',
    name: 'Calm',
    nameMr: 'शांत',
    taglineMr: 'शांत आणि प्रसन्न',
    descriptionMr: 'जेव्हा आपले शरीर आणि मन अगदी हलके, निवांत आणि शांत असते.',
    whenFeelMr: 'गोड संगीत ऐकताना, मऊ पांघरूणात झोपताना किंवा चित्रपुस्तक वाचताना.',
    emoji: '😌',
    color: '#10b981',
    bg: '#ecfdf5',
    illustrationKey: 'calm',
    tagline: 'Peaceful & Gentle',
    description: 'When our body feels relaxed, quiet, and happy just resting softly.',
    whenFeel: 'When listening to soft music, cuddling a blanket, or reading a picture book.'
  }
];

// Mode 1: "Guess the Emotion" (Face to Emotion Choice)
export const GUESS_THE_EMOTION_ROUNDS = [
  {
    id: 1,
    title: 'Look at the Smiling Face!',
    titleMr: 'हसणारा चेहरा पाहा!',
    questionMr: 'या गोड मुलाला कसे वाटते आहे?',
    hintMr: 'गुलाबी गाल आणि चेहऱ्यावरील मोठे हास्य पाहा!',
    praiseMr: 'खूप छान! 😊 ही आनंदी भावना आहे! हसल्याने सर्वांना आनंद मिळतो!',
    correctEmotionId: 'happy',
    question: 'How is this friendly child feeling?',
    illustrationKey: 'happy',
    hint: 'Notice the rosy cheeks and big bright smile!',
    praise: 'Superstar! 😊 That is Happy! Smiling brings joy to everyone!',
    options: ['happy', 'sad', 'angry']
  },
  {
    id: 2,
    title: 'Look at the Drooping Mouth!',
    titleMr: 'उदास चेहरा पाहा!',
    questionMr: 'या मुलाला आता कसे वाटते आहे?',
    hintMr: 'गालावरील पाण्याचा थेंब आणि उदास तोंड पाहा.',
    praiseMr: 'अगदी बरोबर! 😢 ही दुःखी भावना आहे. जवळ घेतल्याने त्यांना बरे वाटेल!',
    correctEmotionId: 'sad',
    question: 'How is this child feeling right now?',
    illustrationKey: 'sad',
    hint: 'Look at the little shiny teardrop and turned-down mouth.',
    praise: 'You got it! 😢 That is Sad. Giving a warm hug makes them feel better!',
    options: ['excited', 'sad', 'calm']
  },
  {
    id: 3,
    title: 'Look at the Pointy Eyebrows!',
    titleMr: 'भुवयांची ठेवण पाहा!',
    questionMr: 'या मुलाला कसे वाटते आहे?',
    hintMr: 'त्यांच्या भुवया तिरक्या झाल्या आहेत आणि गाल लाल झाले आहेत.',
    praiseMr: 'बरोबर! 😠 हा राग आहे. तीन दीर्घ श्वास घेतल्याने राग शांत होतो!',
    correctEmotionId: 'angry',
    question: 'How is this child feeling?',
    illustrationKey: 'angry',
    hint: 'Their eyebrows are angled down and cheeks are flushed red.',
    praise: 'Spot on! 😠 That is Angry. Taking three deep slow breaths helps!',
    options: ['calm', 'surprised', 'angry']
  },
  {
    id: 4,
    title: 'Look at the Big Round Eyes!',
    titleMr: 'मोठे गोल डोळे पाहा!',
    questionMr: 'या मुलाला कसे वाटते आहे?',
    hintMr: 'त्यांचे डोळे मोठे झाले आहेत आणि चेहरा थरथरतो आहे.',
    praiseMr: 'उत्तम! 😨 ही भीती आहे. आवडते खेळणे जवळ घेतल्याने सुरक्षित वाटते!',
    correctEmotionId: 'scared',
    question: 'How is this child feeling?',
    illustrationKey: 'scared',
    hint: 'Their eyes are wide and mouth is trembling slightly.',
    praise: 'Great job! 😨 That is Scared. Holding a favorite teddy bear helps us feel safe!',
    options: ['scared', 'happy', 'excited']
  },
  {
    id: 5,
    title: 'Look at the "O" Shaped Mouth!',
    titleMr: 'गोल "ओ" आकाराचे तोंड पाहा!',
    questionMr: 'या मुलाला कसे वाटते आहे?',
    hintMr: 'त्यांचे तोंड गोल "O" आकाराचे झाले आहे आणि भुवया वर झाल्या आहेत!',
    praiseMr: 'अप्रतिम! 😲 हे आश्चर्य आहे! अचानक अनपेक्षित काहीतरी घडले आहे!',
    correctEmotionId: 'surprised',
    question: 'How is this child feeling?',
    illustrationKey: 'surprised',
    hint: 'Their mouth is shaped like a round letter O and eyebrows are high!',
    praise: 'Awesome! 😲 That is Surprised! Something unexpected just happened!',
    options: ['sad', 'surprised', 'calm']
  },
  {
    id: 6,
    title: 'Look at the Sparkles in the Eyes!',
    titleMr: 'डोळ्यांमधील चमक पाहा!',
    questionMr: 'या मुलाला कसे वाटते आहे?',
    hintMr: 'त्यांचे हात हवेत उंच आहेत आणि डोळे आनंदाने चमकत आहेत!',
    praiseMr: 'व्वा! 🤩 हा उत्साह आहे! नव्या साहसासाठी तयार!',
    correctEmotionId: 'excited',
    question: 'How is this child feeling?',
    illustrationKey: 'excited',
    hint: 'Their hands are up in the air and eyes are sparkling with joy!',
    praise: 'Hooray! 🤩 That is Excited! Ready for an amazing adventure!',
    options: ['angry', 'excited', 'scared']
  },
  {
    id: 7,
    title: 'Look at the Gentle Soft Eyes!',
    titleMr: 'शांत आणि प्रसन्न डोळे पाहा!',
    questionMr: 'या मुलाला कसे वाटते आहे?',
    hintMr: 'डोळे हळूवार मिटलेले आहेत आणि चेहऱ्यावर गोड स्मितहास्य आहे.',
    praiseMr: 'छान! 😌 ही शांत भावना आहे. सर्व काही शांत आणि प्रसन्न आहे.',
    correctEmotionId: 'calm',
    question: 'How is this child feeling?',
    illustrationKey: 'calm',
    hint: 'Eyes are softly closed and there is a peaceful little smile.',
    praise: 'Wonderful! 😌 That is Calm. Everything is quiet and peaceful.',
    options: ['calm', 'angry', 'surprised']
  }
];

// Mode 2: "How Do They Feel?" Everyday Situations
export const SITUATION_ROUNDS = [
  {
    id: 'sit-1',
    story: 'Maya opens a mystery gift box on her birthday and sees a cute puppy toy!',
    storyMr: 'मायाने तिच्या वाढदिवशी गिफ्ट बॉक्स उघडला आणि त्यात तिला एक गोड कुत्र्याचे खेळणे दिसले!',
    questionMr: 'मायाला कसे वाटते आहे?',
    hintMr: 'तिला आवडती भेटवस्तू मिळाली आणि ती आनंदाने उड्या मारत आहे!',
    praiseMr: 'होय! 🤩 माया खूप उत्साही आणि आनंदी आहे!',
    question: 'How does Maya feel?',
    correctEmotionId: 'excited',
    illustrationKey: 'excited',
    hint: 'She got a dream present and is jumping up and down!',
    praise: 'Yes! 🤩 Maya feels Excited and super joyful!',
    options: ['excited', 'angry', 'scared']
  },
  {
    id: 'sit-2',
    story: 'Leo was walking with his ice cream cone, but the scoop slipped and fell on the grass!',
    storyMr: 'लिओ आईस्क्रीम घेऊन जात होता, पण अचानक आईस्क्रीम खाली गवतावर पडले!',
    questionMr: 'लिओला कसे वाटते आहे?',
    hintMr: 'त्याचे आवडते आईस्क्रीम पडले आणि चेहरा उदास झाला.',
    praiseMr: 'बरोबर! 😢 लिओला दुःखी वाटत आहे. काही हरकत नाही, आपण दुसरे घेऊ!',
    question: 'How does Leo feel?',
    correctEmotionId: 'sad',
    illustrationKey: 'sad',
    hint: 'His yummy treat is gone and his mouth turns down.',
    praise: 'Correct! 😢 Leo feels Sad. It is okay, we can get another scoop!',
    options: ['happy', 'sad', 'calm']
  },
  {
    id: 'sit-3',
    story: 'Lucas spent 20 minutes building a giant block castle, and his puppy knocked it over!',
    storyMr: 'ल्युकासने २० मिनिटे लावून मोठा किल्ला बनवला, आणि त्याच्या कुत्र्याने तो पाडला!',
    questionMr: 'ल्युकासला कसे वाटते आहे?',
    hintMr: 'त्याची मेहनत वाया गेली आणि त्याच्या मुठी आवळल्या आहेत.',
    praiseMr: 'नक्कीच! 😠 ल्युकासला राग आला आहे. दीर्घ श्वास घेतल्याने मन शांत होईल.',
    question: 'How does Lucas feel?',
    correctEmotionId: 'angry',
    illustrationKey: 'angry',
    hint: 'His hard work got ruined and his hands are clenched.',
    praise: 'Exactly! 😠 Lucas feels Angry. Breathing in and out will help him calm down.',
    options: ['calm', 'surprised', 'angry']
  },
  {
    id: 'sit-4',
    story: 'Toby is lying in bed when suddenly loud thunder goes BOOM outside his window!',
    storyMr: 'टोबी बेडवर झोपला होता आणि अचानक खिडकीबाहेर विजांचा गडगडाट झाला!',
    questionMr: 'टोबीला कसे वाटते आहे?',
    hintMr: 'अंधारात मोठा आवाज ऐकून छाती धडधडू लागते.',
    praiseMr: 'अगदी बरोबर! 😨 टोबी घाबरला आहे. आई-बाबांना जवळ घेतल्याने बरे वाटेल.',
    question: 'How does Toby feel?',
    correctEmotionId: 'scared',
    illustrationKey: 'scared',
    hint: 'Loud sudden sounds in the dark can make our hearts beat fast.',
    praise: 'You understood! 😨 Toby feels Scared. Hugging mom or dad will keep him safe.',
    options: ['scared', 'happy', 'excited']
  },
  {
    id: 'sit-5',
    story: 'Emma opens the door to her bedroom and all her cousins are there shouting \'Surprise!\'',
    storyMr: 'एम्माने तिच्या खोलीचे दार उघडले आणि तिच्या सर्व मित्रांनी "सरप्राईज!" असे ओरडले!',
    questionMr: 'एम्माला कसे वाटते आहे?',
    hintMr: 'ते आज येणार आहेत याची तिला अजिबात कल्पना नव्हती!',
    praiseMr: 'एकदम बरोबर! 😲 एम्मा आश्चर्यचकित झाली आहे!',
    question: 'How does Emma feel?',
    correctEmotionId: 'surprised',
    illustrationKey: 'surprised',
    hint: 'She had no idea they were coming today!',
    praise: 'Spot on! 😲 Emma feels Surprised with wide happy eyes!',
    options: ['sad', 'surprised', 'angry']
  },
  {
    id: 'sit-6',
    story: 'Noah is wrapped in a warm fluffy blanket softly reading his favorite picture book.',
    storyMr: 'नोहा मऊ पांघरूणात बसून त्याचे आवडते चित्रपुस्तक हळूवार वाचत आहे.',
    questionMr: 'नोहाला कसे वाटते आहे?',
    hintMr: 'खोलीत शांतता आहे आणि त्याचे मन अगदी प्रसन्न आहे.',
    praiseMr: 'सुंदर! 😌 नोहाला शांत आणि प्रसन्न वाटत आहे.',
    question: 'How does Noah feel?',
    correctEmotionId: 'calm',
    illustrationKey: 'calm',
    hint: 'The room is quiet and his mind is peaceful and relaxed.',
    praise: 'Beautiful! 😌 Noah feels Calm, cozy, and peaceful.',
    options: ['calm', 'excited', 'scared']
  },
  {
    id: 'sit-7',
    story: 'Zara and her best friend are sharing crayons and painting a giant rainbow together.',
    storyMr: 'झारा आणि तिची मैत्रीण रंग वाटून एकत्र मोठा इंद्रधनुष्य रंगवत आहेत.',
    questionMr: 'झाराला कसे वाटते आहे?',
    hintMr: 'एकत्र खेळल्याने आणि वाटून घेतल्याने चेहऱ्यावर गोड हास्य येते.',
    praiseMr: 'उत्तम! 😊 झारा मैत्रिणीसोबत खूप आनंदी आहे!',
    question: 'How does Zara feel?',
    correctEmotionId: 'happy',
    illustrationKey: 'happy',
    hint: 'Playing and sharing together brings warm smiles.',
    praise: 'Super! 😊 Zara feels Happy having fun with her best friend!',
    options: ['happy', 'angry', 'sad']
  }
];

// Mode 3: "Match Emotions" Pairing Challenges
export const MATCH_EMOTION_ROUNDS = [
  {
    id: 'm-1',
    prompt: 'Tap the matching pairs of faces and emotion names!',
    promptMr: 'चेहरे आणि भावनांच्या नावांच्या योग्य जोड्या लावा!',
    pairs: [
      { id: 'happy', name: 'Happy', nameMr: 'आनंदी',
    nameMr: 'आनंदी',
    taglineMr: 'हास्याने भरलेले',
    descriptionMr: 'जेव्हा आपल्याला मनातून छान वाटते, चेहऱ्यावर हास्य असते आणि आपण मित्रांसोबत हसतो!',
    whenFeelMr: 'खेळताना, जवळ घेताना किंवा आवडते फळ खाताना.', emoji: '😊', color: '#eab308' },
      { id: 'sad', name: 'Sad', nameMr: 'दुःखी',
    nameMr: 'दुःखी',
    taglineMr: 'मायेची गरज',
    descriptionMr: 'जेव्हा काहीतरी मनाविरुद्ध घडते किंवा त्रास होतो. रडणे आणि कोणाचा तरी आधार घेणे स्वाभाविक आहे.',
    whenFeelMr: 'खेळणे तुटल्यावर, कोणीतरी गेल्यावर किंवा एकटे वाटल्यावर.', emoji: '😢', color: '#0284c7' },
      { id: 'angry', name: 'Angry', nameMr: 'रागीट',
    nameMr: 'रागीट',
    taglineMr: 'दीर्घ श्वास घ्या',
    descriptionMr: 'जेव्हा आपल्याला राग येतो किंवा चिडचिड होते. तीन दीर्घ श्वास घेतल्याने मन शांत होते.',
    whenFeelMr: 'जेव्हा कोणी आपली वस्तू हिसकावून घेते किंवा मनाविरुद्ध होते.', emoji: '😠', color: '#ef4444' }
    ]
  },
  {
    id: 'm-2',
    prompt: 'Pair up the faces with the right feeling words!',
    promptMr: 'चेहऱ्यांना योग्य भावनांच्या शब्दांशी जुळवा!',
    pairs: [
      { id: 'scared', name: 'Scared', nameMr: 'घाबरलेला',
    nameMr: 'घाबरलेला',
    taglineMr: 'जवळ पकडा',
    descriptionMr: 'जेव्हा एखादी गोष्ट भीतीदायक वाटते किंवा मोठा आवाज होतो. आई किंवा बाबांना जवळ घेतल्याने सुरक्षित वाटते!',
    whenFeelMr: 'विजांचा कडकडाट ऐकल्यावर किंवा अंधाऱ्या खोलीत जाताना.', emoji: '😨', color: '#6366f1' },
      { id: 'surprised', name: 'Surprised', nameMr: 'आश्चर्यचकित',
    nameMr: 'आश्चर्यचकित',
    taglineMr: 'मोठे डोळे',
    descriptionMr: 'जेव्हा अचानक अनपेक्षित काहीतरी छान घडते ज्याची आपल्याला कल्पना नसते!',
    whenFeelMr: 'सरप्राईज गिफ्ट बॉक्स उघडताना किंवा कोणी अचानक समोर आल्यावर.', emoji: '😲', color: '#ec4899' },
      { id: 'excited', name: 'Excited', nameMr: 'उत्साही',
    nameMr: 'उत्साही',
    taglineMr: 'उडी मारायला तयार!',
    descriptionMr: 'जेव्हा खूप मजेची गोष्ट घडणार असते आणि मन आनंदाने उड्या मारू लागते!',
    whenFeelMr: 'बागेत जाताना, वाढदिवसाच्या पार्टीत किंवा पाळण्यात बसताना.', emoji: '🤩', color: '#f59e0b' },
      { id: 'calm', name: 'Calm', nameMr: 'शांत',
    nameMr: 'शांत',
    taglineMr: 'शांत आणि प्रसन्न',
    descriptionMr: 'जेव्हा आपले शरीर आणि मन अगदी हलके, निवांत आणि शांत असते.',
    whenFeelMr: 'गोड संगीत ऐकताना, मऊ पांघरूणात झोपताना किंवा चित्रपुस्तक वाचताना.', emoji: '😌', color: '#10b981' }
    ]
  }
];
