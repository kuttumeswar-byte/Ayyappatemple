export interface PoojaItem {
  id: string;
  name: string;
  category: 'daily' | 'special' | 'abhishekam' | 'homam';
  badge: string;
  price: number;
  time: string;
  description: string;
  significance: string;
  prasadamIncludes: string[];
}

export interface TempleEvent {
  id: string;
  title: string;
  dateStr: string;
  month: string;
  day: string;
  category: 'festival' | 'monthly' | 'special';
  description: string;
  timings: string;
  rituals: string[];
}

export interface HolyStep {
  step: number;
  name: string;
  meaning: string;
  category: 'Indriyas' | 'Ragas' | 'Gunas' | 'Knowledge';
  spiritualSignificance: string;
}

export const TEMPLE_POOJAS: PoojaItem[] = [
  {
    id: 'neyyabhishekam',
    name: 'Neyyabhishekam',
    category: 'abhishekam',
    badge: 'Most Sacred',
    price: 251,
    time: '07:00 AM - 11:00 AM',
    description: 'Anointing the idol of Lord Ayyappa with pure consecrated cow ghee brought in the ghee-coconut of the Irumudi bundle.',
    significance: 'Signifies the surrender of the individual soul (Jivatma) into the Supreme Soul (Paramatma) through the pure melted ghee.',
    prasadamIncludes: ['Consecrated Ghee Prasadam', 'Vibhuti', 'Chandan (Sandalwood)', 'Kumkum']
  },
  {
    id: 'ganapathi-homam',
    name: 'Ganapathi Homam',
    category: 'homam',
    badge: 'Morning Seva',
    price: 501,
    time: '05:30 AM Daily',
    description: 'Sacred fire ritual performed at Brahma Muhurtham for removing all obstacles, initiating new ventures, and peace of mind.',
    significance: 'Invokes Lord Vighneshwara to remove hurdles from family life, health issues, and spiritual path.',
    prasadamIncludes: ['Homam Bhasmam (Ash)', 'Modakam', 'Raksha Thread', 'Blessed Coconut']
  },
  {
    id: 'pushpabhishekam',
    name: 'Pushpabhishekam',
    category: 'special',
    badge: 'Evening Special',
    price: 1116,
    time: '07:45 PM Daily',
    description: 'Opulent floral offering with 18 varieties of fragrant flowers, lotus blossoms, tulsi, and bilva leaves accompanied by chants.',
    significance: 'Fills the heart with devotion and attracts divine cosmic vibrations for serenity and overall prosperity.',
    prasadamIncludes: ['Blessed Lotus Petals', 'Tulsi Dal', 'Panchamirtham', 'Appam Prasadam']
  },
  {
    id: 'sahasranama-archana',
    name: 'Sahasranama Archana',
    category: 'daily',
    badge: 'Vedic Chanting',
    price: 151,
    time: '08:30 AM & 06:00 PM',
    description: 'Recitation of the 1000 holy names of Lord Dharma Sastha with kumkum and fragrant bilva leaves in the devotee’s name and star.',
    significance: 'Shields the devotee against planetary afflictions (especially Shani dosha) and brings spiritual clarity.',
    prasadamIncludes: ['Archana Kumkum', 'Sandal paste', 'Blessed Sacred Flower']
  },
  {
    id: 'padi-pooja',
    name: 'Pathinettampadi Pooja',
    category: 'special',
    badge: 'Grand Seva',
    price: 5001,
    time: 'Special Festival Evenings',
    description: 'Special illumination and flower decorations on all 18 Holy Steps accompanied by Melam and deepam lighting.',
    significance: 'One of the most elaborate poojas seeking liberation from past karma and blessing all 18 aspects of human life.',
    prasadamIncludes: ['Grand Prasadam Hamper', 'Silver Locket of Lord Ayyappa', 'Ghee Bottle', 'Panchamirtham']
  },
  {
    id: 'ashtabhishekam',
    name: 'Ashtabhishekam',
    category: 'abhishekam',
    badge: 'Sacred Eightfold',
    price: 2100,
    time: '06:30 AM',
    description: 'Eight sacred libations: holy water, milk, curd, honey, cane juice, tender coconut water, sandalwood paste, and ghee.',
    significance: 'Purifies inner chakras and bestows sound health, longevity, and peace of mind for the whole family.',
    prasadamIncludes: ['All 8 Abhisheka Theertham', 'Aravana Payasam', 'Chandan']
  }
];

export const TEMPLE_EVENTS: TempleEvent[] = [
  {
    id: 'mandala-mahotsavam',
    title: 'Mandala Pooja Mahotsavam',
    dateStr: 'Nov 17 - Dec 27, 2026',
    month: 'NOV - DEC',
    day: '41 Days',
    category: 'festival',
    description: 'The sacred 41-day Mandala season begins on 1st Vrichikam. Thousands of pilgrims observe strict austerities and carry Irumudi.',
    timings: 'Daily 04:00 AM - 11:00 PM',
    rituals: ['Mala Dharanam Ceremony', 'Daily Usha Pooja & Ghee Abhishekam', 'Deeparadhana', 'Annadanam Seva']
  },
  {
    id: 'makaravilakku-festival',
    title: 'Makaravilakku & Makara Sankranti',
    dateStr: 'January 14, 2027',
    month: 'JAN',
    day: '14',
    category: 'festival',
    description: 'The culmination of the Sabarimala pilgrimage with the sighting of the divine Makaravilakku flame and Thiruvabharanam procession.',
    timings: 'Full Day & Night Vigil',
    rituals: ['Thiruvabharanam Reception', 'Deeparadhana with Sacred Ornaments', 'Makarajyothi Darshan', 'Harivarasanam']
  },
  {
    id: 'vishu-kani',
    title: 'Vishu Kani & New Year Darshan',
    dateStr: 'April 14, 2027',
    month: 'APR',
    day: '14',
    category: 'festival',
    description: 'Auspicious viewing of Lord Ayyappa surrounded by golden cucumber, betel leaves, grains, fruits, mirrors, and glowing brass deepams.',
    timings: '04:30 AM - 10:00 PM',
    rituals: ['Vishu Kani Darshan', 'Kaineettam Distribution by Chief Priest', 'Maha Payasa Naivedyam']
  },
  {
    id: 'panguni-uthram',
    title: 'Panguni Uthram & Ayyappa Jayanthi',
    dateStr: 'March 22, 2027',
    month: 'MAR',
    day: '22',
    category: 'festival',
    description: 'The auspicious incarnation day of Lord Dharma Sastha, celebrated with 1008 Kalasa Abhishekam and temple procession.',
    timings: '05:00 AM - 09:30 PM',
    rituals: ['1008 Kalasabhishekam', 'Pushpabhishekam with 108 kg flowers', 'Grand Feast Annadanam']
  }
];

export const HOLY_18_STEPS: HolyStep[] = [
  { step: 1, name: 'Eye (Chakshu)', meaning: 'Mastery over Sight', category: 'Indriyas', spiritualSignificance: 'Purifies vision from worldly lust and illusions, turning sight inward to see the divine in all.' },
  { step: 2, name: 'Ear (Shrotra)', meaning: 'Mastery over Hearing', category: 'Indriyas', spiritualSignificance: 'Directs ears away from gossip, slander, and noise towards divine bhajans and sacred chants.' },
  { step: 3, name: 'Nose (Ghrana)', meaning: 'Mastery over Smell', category: 'Indriyas', spiritualSignificance: 'Transcending physical attachments through the subtle fragrance of pure devotion.' },
  { step: 4, name: 'Tongue (Jihva)', meaning: 'Mastery over Taste & Speech', category: 'Indriyas', spiritualSignificance: 'Speaking only truth and sweetness, controlling cravings through Sattvic fasting.' },
  { step: 5, name: 'Skin (Sparsha)', meaning: 'Mastery over Touch', category: 'Indriyas', spiritualSignificance: 'Overcoming bodily comfort, tolerating heat and cold with equal equanimity during the Vratam.' },
  { step: 6, name: 'Kama', meaning: 'Lust / Sensual Desire', category: 'Ragas', spiritualSignificance: 'Sublimating worldly infatuations into pure selfless adoration for the divine.' },
  { step: 7, name: 'Krodha', meaning: 'Anger', category: 'Ragas', spiritualSignificance: 'Dissolving hostility and short temper into boundless patience, tolerance, and unconditional love.' },
  { step: 8, name: 'Lobha', meaning: 'Greed', category: 'Ragas', spiritualSignificance: 'Overcoming possessiveness through regular charity, generosity, and feeding the needy (Annadanam).' },
  { step: 9, name: 'Moha', meaning: 'Delusion / Infatuation', category: 'Ragas', spiritualSignificance: 'Piercing the veil of Maya to realize that all transient worldly attachments are temporary.' },
  { step: 10, name: 'Mada', meaning: 'Pride / Egoism', category: 'Ragas', spiritualSignificance: 'Surrendering status, wealth, and titles; addressing every fellow pilgrim equally as Swami.' },
  { step: 11, name: 'Matsarya', meaning: 'Envy / Jealousy', category: 'Ragas', spiritualSignificance: 'Rejoicing genuinely in the welfare, prosperity, and spiritual ascension of others.' },
  { step: 12, name: 'Dambha', meaning: 'Ostentation / Pretense', category: 'Ragas', spiritualSignificance: 'Living with humble authenticity, discarding hypocrisy and superficial pious displays.' },
  { step: 13, name: 'Asooya', meaning: 'Spitefulness / Finding Fault', category: 'Ragas', spiritualSignificance: 'Cleansing the mind from searching faults in others and focusing solely on self-purification.' },
  { step: 14, name: 'Sattva Guna', meaning: 'Purity, Harmony & Light', category: 'Gunas', spiritualSignificance: 'Cultivating clarity, serenity, truthfulness, and non-violence in thought and deed.' },
  { step: 15, name: 'Rajas Guna', meaning: 'Restless Passion & Activity', category: 'Gunas', spiritualSignificance: 'Channeling boundless energy into righteous action (Karma Yoga) without selfish craving for fruits.' },
  { step: 16, name: 'Tamas Guna', meaning: 'Inertia, Lethargy & Darkness', category: 'Gunas', spiritualSignificance: 'Overcoming spiritual slumber, procrastination, and gloom through early Brahma Muhurtha worship.' },
  { step: 17, name: 'Vidya', meaning: 'Spiritual Knowledge', category: 'Knowledge', spiritualSignificance: 'Attaining profound intuitive wisdom of the eternal Self (Atman) and Vedic scriptures.' },
  { step: 18, name: 'Avidya Surrender', meaning: 'Final Liberation (Moksha)', category: 'Knowledge', spiritualSignificance: 'Total surrender of ego where the pilgrim attains "Tat Tvam Asi" - That Thou Art!' }
];

export const getLocalizedPoojas = (lang: string): PoojaItem[] => {
  if (lang === 'hi') {
    return [
      {
        id: 'neyyabhishekam',
        name: 'नेय्याभिषेकम (घृत अभिषेक)',
        category: 'abhishekam',
        badge: 'परम पावन',
        price: 251,
        time: '07:00 AM - 11:00 AM',
        description: 'पवित्र इरुमुडी में लाए गए शुद्ध देशी गाय के घी से भगवान अय्यप्पा के श्रीविग्रह का पावन अभिषेक।',
        significance: 'पिघले हुए पवित्र घी के माध्यम से जीवात्मा का परमात्मा में पूर्ण समर्पण का दिव्य प्रतीक।',
        prasadamIncludes: ['अभिषेक घृत प्रसाद', 'विभूति', 'चंदन', 'कुमकुम']
      },
      {
        id: 'ganapathi-homam',
        name: 'महा गणपति होमम्',
        category: 'homam',
        badge: 'प्रातःकालीन सेवा',
        price: 501,
        time: 'प्रतिदिन 05:30 AM',
        description: 'समस्त विघ्नों के निवारण, नवीन कार्यों की शुभ शुरुआत एवं मन की शांति हेतु ब्रह्म मुहूर्त में संपन्न अग्नि अनुष्ठान।',
        significance: 'भगवान विघ्नेश्वर का आह्वान कर पारिवारिक सुख, आरोग्य और आध्यात्मिक मार्ग की बाधाओं को दूर करता है।',
        prasadamIncludes: ['होम भस्म', 'मोदक प्रसाद', 'रक्षा सूत्र', 'अभिमंत्रित श्रीफल']
      },
      {
        id: 'pushpabhishekam',
        name: 'दिव्य पुष्पाभिषेकम',
        category: 'special',
        badge: 'सायंकालीन विशेष',
        price: 1116,
        time: 'प्रतिदिन 07:45 PM',
        description: '18 प्रकार के सुगंधित पुष्पों, कमल दल, तुलसी और बिल्व पत्रों द्वारा वैदिक मंत्रोच्चार के साथ भव्य पुष्पार्पण।',
        significance: 'हृदय को भक्ति से परिपूर्ण करता है तथा सुख, शांति और सर्वांगीण समृद्धि के दिव्य स्पंदन आकर्षित करता है।',
        prasadamIncludes: ['अभिमंत्रित कमल दल', 'तुलसी दल', 'पंचामृत', 'अप्पम प्रसाद']
      },
      {
        id: 'sahasranama-archana',
        name: 'सहस्रनाम अर्चना',
        category: 'daily',
        badge: 'वैदिक मंत्रोच्चार',
        price: 151,
        time: '08:30 AM एवं 06:00 PM',
        description: 'भक्त के नाम और नक्षत्र में भगवान धर्म शास्ता के 1000 पावन नामों का कुमकुम और बिल्व पत्रों से सस्वर पाठ।',
        significance: 'ग्रह दोषों (विशेषकर शनि पीड़ा) से रक्षा करता है तथा आध्यात्मिक स्पष्टता और सुरक्षा प्रदान करता है।',
        prasadamIncludes: ['अर्चना कुमकुम', 'चंदन लेप', 'पवित्र पुष्प प्रसाद']
      },
      {
        id: 'padi-pooja',
        name: 'पथिनेट्टाम्पडी पूजा (18 सीढ़ी पूजा)',
        category: 'special',
        badge: 'भव्य महापूजा',
        price: 5001,
        time: 'विशेष उत्सव संध्या',
        description: 'समस्त 18 पवित्र सीढ़ियों पर विशेष दीप प्रज्ज्वलन, पुष्प सज्जा और वाद्य वृंद (मेलम) के साथ भव्य महाआरती।',
        significance: 'मानव जीवन के 18 आध्यात्मिक आयामों को सिद्ध कर पूर्व संचित कर्मों से मुक्ति प्रदान करने वाली महापूजा।',
        prasadamIncludes: ['महाप्रसाद हैंपर', 'भगवान अय्यप्पा का रजत लॉकेट', 'पवित्र घृत', 'पंचामृत']
      },
      {
        id: 'ashtabhishekam',
        name: 'अष्टाभिषेकम (अष्टद्रव्य अभिषेक)',
        category: 'abhishekam',
        badge: 'अष्टद्रव्य पावन सेवा',
        price: 2100,
        time: '06:30 AM',
        description: 'आठ पावन द्रव्यों से अभिषेक: तीर्थ जल, दुग्ध, दधि, मधु, इक्षुरस, नारियल जल, चंदन एवं शुद्ध घृत।',
        significance: 'आंतरिक चक्रों को शुद्ध कर पूरे परिवार को उत्तम स्वास्थ्य, दीर्घायु और मानसिक शांति प्रदान करता है।',
        prasadamIncludes: ['अष्ट अभिषेक तीर्थ जल', 'अरवण पायसम', 'पवित्र चंदन']
      }
    ];
  }

  if (lang === 'ta') {
    return [
      {
        id: 'neyyabhishekam',
        name: 'நெய்யபிஷேகம் (புனித வழிபாடு)',
        category: 'abhishekam',
        badge: 'மிகவும் புனிதமானது',
        price: 251,
        time: '07:00 AM - 11:00 AM',
        description: 'இருமுடியில் கொண்டு வரப்பட்ட தூய பசு நெய்யினால் சுவாமி ஐயப்பனுக்கு செய்யப்படும் ஆத்மார்த்தமான திருமுழுக்கு.',
        significance: 'உருகிய நெய்யின் மூலம் ஜீவாத்மா பரமாத்மாவுடன் இணையும் பூரண சரணாகதி தத்துவத்தின் அடையாளம்.',
        prasadamIncludes: ['அபிஷேக நெய் பிரசாதம்', 'திருநீறு (விபூதி)', 'சந்தனம்', 'குங்குமம்']
      },
      {
        id: 'ganapathi-homam',
        name: 'மகா கணபதி ஹோமம்',
        category: 'homam',
        badge: 'காலை பிரம்ம முகூர்த்தம்',
        price: 501,
        time: 'தினசரி 05:30 AM',
        description: 'காரிய தடைகள் அகலவும், புது முயற்சிகள் வெற்றி பெறவும் அதிகாலை பிரம்ம முகூர்த்தத்தில் செய்யப்படும் வேள்வி.',
        significance: 'விக்னங்களை போக்கி குடும்பத்தில் மகிழ்ச்சி, நல்வாழ்வு மற்றும் அமைதியை அருளுகிறது.',
        prasadamIncludes: ['ஹோம பஸ்மம்', 'மோதக பிரசாதம்', 'ரக்ஷா கயிறு', 'அருளப்பட்ட தேங்காய்']
      },
      {
        id: 'pushpabhishekam',
        name: 'புஷ்பாபிஷேகம்',
        category: 'special',
        badge: 'மாலை விசேஷம்',
        price: 1116,
        time: 'தினசரி 07:45 PM',
        description: '18 வகையான நறுமண மலர்கள், தாமரை, துளசி மற்றும் வில்வ இலைகளால் மேள தாளங்களுடன் செய்யப்படும் மலர் அர்ச்சனை.',
        significance: 'மனதில் சாந்தியை நிறைத்து, வீட்டில் தெய்வீக ஆற்றலையும் சகல செல்வங்களையும் பெருக்குகிறது.',
        prasadamIncludes: ['தாமரை மலர் பிரசாதம்', 'துளசி தளம்', 'பஞ்சாமிர்தம்', 'அப்பம் பிரசாதம்']
      },
      {
        id: 'sahasranama-archana',
        name: 'சஹஸ்ரநாம அர்ச்சனை',
        category: 'daily',
        badge: 'வேத மந்திர பாராயணம்',
        price: 151,
        time: '08:30 AM & 06:00 PM',
        description: 'பக்தரின் பெயர், நட்சத்திரம் கூறி ஸ்ரீ தர்ம சாஸ்தாவின் 1000 திருநாமங்களை சொல்லி குங்கும அர்ச்சனை.',
        significance: 'சனீஸ்வர தோஷம் உள்ளிட்ட நவக்கிரக பாதிப்புகளை போக்கி ஆன்மீக தெளிவை தருகிறது.',
        prasadamIncludes: ['அர்ச்சனை குங்குமம்', 'சந்தன பிரசாதம்', 'புனித மலர்']
      },
      {
        id: 'padi-pooja',
        name: 'பதினெட்டாம்படி பூஜை',
        category: 'special',
        badge: 'மகா சிறப்பு பூஜை',
        price: 5001,
        time: 'விசேஷ மாலை வேளைகளில்',
        description: '18 பொற்படிகளிலும் தீபம் ஏற்றி, மலர் அலங்காரம் செய்து நாதஸ்வர இசையுடன் செய்யப்படும் மகா பூஜை.',
        significance: 'மனித வாழ்க்கையின் 18 ஆன்மீக நிலைகளை கடந்து மோட்சம் பெற அருளும் அதி உன்னதமான பூஜை.',
        prasadamIncludes: ['மகா பிரசாத பை', 'ஐயப்ப சுவாமி வெள்ளி டாலர்', 'அபிஷேக நெய்', 'பஞ்சாமிர்தம்']
      },
      {
        id: 'ashtabhishekam',
        name: 'அஷ்டாபிஷேகம் (எட்டு திரவிய அபிஷேகம்)',
        category: 'abhishekam',
        badge: 'புனித அஷ்ட திரவியம்',
        price: 2100,
        time: '06:30 AM',
        description: 'தீர்த்தம், பால், தயிர், தேன், கரும்புச்சாறு, இளநீர், சந்தனம், நெய் ஆகிய 8 புனித திரவியங்களால் அபிஷேகம்.',
        significance: 'உடலையும் உள்ளத்தையும் தூய்மைப்படுத்தி, குடும்பத்திற்கு தீர்க்காயுள் மற்றும் ஆரோக்கியம் அருள்கிறது.',
        prasadamIncludes: ['8 அபிஷேக தீர்த்த பிரசாதம்', 'அரவணை பாயாசம்', 'சந்தனம்']
      }
    ];
  }

  return TEMPLE_POOJAS;
};

export const NAKSHATRAS = [
  'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashirsha', 'Ardra', 'Punarvasu',
  'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni', 'Uttara Phalguni', 'Hasta', 'Chitra',
  'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha', 'Mula', 'Purva Ashadha', 'Uttara Ashadha',
  'Shravana', 'Dhanishta', 'Shatabhisha', 'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati'
];

export const GOTHRAMS = [
  'Kashyapa', 'Bharadwaja', 'Vashishta', 'Vishwamitra', 'Gautama', 'Agastya', 'Harita',
  'Atri', 'Jamadagni', 'Sandilya', 'Kaundinya', 'Srivatsa', 'Mudgala', 'Kutsasa', 'Siva / General'
];

export const MANDALA_GUIDELINES = [
  {
    title: 'Mala Dharanam',
    description: 'Devotee receives consecrated Tulsi or Rudraksha mala from the Guruswami or temple priest and begins the 41-day vow.'
  },
  {
    title: 'Sattvic Attire',
    description: 'Wearing modest black, dark blue, or saffron dhotis symbolizing ascetic simplicity and renunciation of fashion.'
  },
  {
    title: 'Brahma Muhurtha Snanam',
    description: 'Bathing twice daily in cold water before sunrise and sunset, followed by chanting of 108 Sharanams.'
  },
  {
    title: 'Celibacy & Speech',
    description: 'Strict Brahmacharya (purity in body and thought), abstaining from anger, and greeting everyone as "Swami".'
  },
  {
    title: 'Sattvic Diet',
    description: 'Strict vegetarian food prepared without onion, garlic, alcohol, or stale ingredients; consuming food only once or twice daily.'
  },
  {
    title: 'Irumudi Kettu Preparation',
    description: 'Sacred twin-compartment bag containing ghee-filled coconut, puffed rice, jaggery, turmeric, and vibhuti for the temple climb.'
  }
];

export const HARIVARASANAM_STANZA = [
  {
    sanskrit: "हरिवरासनं विश्वमोहनम्, हरिदधीश्वरम् आराध्यपादुकम् ।",
    transliteration: "Harivarasanam Viswamohanam, Haridadhiswaram Aaradhyapadhukam | Arivimardhanam Nithyanarthanam, Hariharathmajam Devamasraye ||",
    meaning: "Repository of Hari's blessings, enchanter of the whole universe, whose sacred lotus feet are worshipped by the celestial lords, destroyer of all sins, eternal divine dancer, I surrender unto the divine Son of Hari and Hara (Lord Ayyappa)."
  },
  {
    sanskrit: "शरणकीर्तनं भक्तमानसम्, भरणलोलुपं नर्तनालसम् ।",
    transliteration: "Saranakirtanam Bakhtamanasam, Bharanalolupam Narthanalasanam | Arunabhasuram Bhoothanayakam, Hariharathmajam Devamasraye ||",
    meaning: "Whose glory is sung in hymns of refuge, who abides lovingly in the hearts of devotees, protector of all living beings, radiant like the rising crimson sun, supreme lord of the Bhoothaganas, I take refuge in Lord Ayyappa."
  },
  {
    sanskrit: "प्रणयसत्यकं प्राणनायकम्, प्रणतकल्पकं सुप्रभान्वितम् ।",
    transliteration: "Pranayasathyakam Praananayakam, Pranathakalpakam Suprabhanjitham | Pranavaroopinam Keerthithaprabhum, Hariharathmajam Devamasraye ||",
    meaning: "True lover of truth, lord of all life's vital breath, wish-yielding divine tree (Kalpavriksha) to those who bow before Him, shining with cosmic splendor, the living embodiment of the sacred Omkara, I bow unto Thee."
  },
  {
    sanskrit: "तुरगवाहनं सुन्दराननम्, वरगदायुधं वेदवर्णितम् ।",
    transliteration: "Thuragavahanam Sundarananam, Varagadhayudham Vedavarnitham | Gurukrupakaram Keerthanapriyam, Hariharathmajam Devamasraye ||",
    meaning: "Riding upon a swift divine steed, possessing a captivating countenance of eternal beauty, bearing the sacred mace, praised by all four Vedas, bestower of Guru's grace, lover of sacred devotional hymns, I bow unto Thee."
  },
  {
    sanskrit: "त्रिभुवनोज्ज्वलं देवनात्मकम्, त्रिदशवन्दितं दीपमोहनम् ।",
    transliteration: "Tribhuvanojjwalam Dhevanathmakam, Thridhasavanditham Dheepamohanam | Thrimunisevitham Divyadhesikam, Hariharathmajam Devamasraye ||",
    meaning: "Illuminating the three worlds with divine aura, essence of divinity worshipped by the Devas, enchanted by glowing brass deepams, served by the ancient sages, supreme divine preceptor, I seek refuge in Lord Ayyappa."
  },
  {
    sanskrit: "भवभयावहं भुवनमोहनम्, भवरुजापहं भव्यचेतनम् ।",
    transliteration: "Bhavabhayavaham Bhuvanamohanam, Bhavarujapaham Bhavyachethanam | Bhavasamapitham Dhevapujitham, Hariharathmajam Devamasraye ||",
    meaning: "Dispeller of worldly fears, enchanter of the earth, healer of all diseases and worldly afflictions, radiant with noble consciousness, worshipped by all celestial beings, I surrender unto the divine Son of Hari and Hara."
  },
  {
    sanskrit: "श्रीभूतनाथ सदानन्द, शुभ्रतेजोमयं विभुम् ।",
    transliteration: "Sreebhoothanadha Sadananda, Sarvabhoothadhayapara | Jagadrakshaka Sreemantha, Hariharathmajam Devamasraye ||",
    meaning: "Supreme Lord of the elements, embodiment of eternal bliss, brimming with infinite compassion for all beings, protector of the universe, glorious and supreme, I surrender unto Lord Ayyappa."
  },
  {
    sanskrit: "शरणमष्टकं पुण्यवर्द्धनम्, सकलदुःखनाशनम् ।",
    transliteration: "Saranam Ayyappa Swami Saranam Ayyappa | Swamiye Saranam Ayyappa ||",
    meaning: "Singing this sacred octet increases virtue, eliminates all worldly sorrow, and bestows supreme liberation and peace. Saranam Ayyappa!"
  }
];

