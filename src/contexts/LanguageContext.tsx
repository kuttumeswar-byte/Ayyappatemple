import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'hi' | 'ta';

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, fallback?: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Header & Brand
    'temple.name': 'SRI AYYAPA TEMPLE',
    'temple.motto': 'Faith • Discipline • Devotion • Equality',
    'nav.home': 'Home',
    'nav.about': 'About Temple',
    'nav.pooja': 'Pooja Services',
    'nav.timings': 'Darshan Timings',
    'nav.gallery': 'Gallery',
    'nav.contact': 'Contact Us',
    'header.ringBell': 'Ring Bell',
    'header.bellRinging': 'Bell Ringing • Mute',
    'header.donate': 'Donate Now',
    'header.contributeAnnadanam': 'Contribute to Annadanam',
    'header.selectLanguage': 'Select Language',

    // Hero Section
    'hero.chant': 'SWAMIYE SARANAM AYYAPPA',
    'hero.welcome': 'Welcome to',
    'hero.templeNameGold': 'Sri Ayyapa',
    'hero.templeNameRest': ' Temple',
    'hero.subtitle': 'A sacred place of devotion, discipline and unity. All are welcome in the path of Dharma.',
    'hero.cta': 'Learn More',
    'hero.donateCta': 'Donate Now',
    'hero.card1.title': 'Temple Timings',
    'hero.card1.subtitle': 'Morning & Evening Darshan',
    'hero.card1.time': '05:00 AM - 12:30 PM • 05:00 PM - 09:00 PM',
    'hero.card2.title': 'Pooja Sevas',
    'hero.card2.subtitle': 'Book Neyyabhishekam & Archana',
    'hero.card2.time': 'Daily & Special Sevas',
    'hero.card3.title': 'Holy 18 Steps',
    'hero.card3.subtitle': 'Sacred Pathinettampadi Meaning',
    'hero.card3.time': '18 Divine Spiritual Steps',
    'hero.card4.title': 'Mandala Vratam',
    'hero.card4.subtitle': '41-Day Deeksha Observance',
    'hero.card4.time': 'Ritual Guidelines & Code',
    'hero.card5.title': 'Annadanam Seva',
    'hero.card5.subtitle': 'Sacred Prasadam Distribution',
    'hero.card5.time': 'Mahaprasadam Serving Daily',

    // Sacred Ribbon & Chants
    'ribbon.chant1': 'Swamiye Saranam Ayyappa',
    'ribbon.chant2': 'Harihara Suthane Saranam Ayyappa',
    'ribbon.chant3': 'Manikanda Prabhuve Saranam Ayyappa',
    'ribbon.chant4': 'Villali Veerane Veeramanikandane',
    'ribbon.chant5': 'Sabari Gireesane Saranam Ayyappa',
    'ribbon.badge': 'DAILY DEVOTION',
    'ribbon.harivarasanam': 'Harivarasanam Viswamohanam',

    // About Section
    'about.kicker': 'Sacred Heritage & Divine Abode',
    'about.title': 'The Eternal Glory of Lord Dharma Sastha',
    'about.p1': 'Sri Ayyapa Temple stands as a sanctum of unshakeable spiritual truth, radiating divine grace to all who tread upon the righteous path. Dedicated to Lord Ayyappa, the holy union of Lord Shiva and Lord Vishnu (Harihara), this sacred shrine preserves centuries of authentic Sabarimala traditions.',
    'about.p2': 'Here, every devotee is embraced without distinction of caste, creed, religion, or social standing. Clad in the sacred black and saffron, bearing the twin-compartment Irumudi upon the head, pilgrims become embodiments of the Lord Himself, greeting one another simply as "Swami".',
    'about.coreValues': 'Four Pillars of Ayyappa Dharma',
    'about.value1.title': 'Faith (Bhakti)',
    'about.value1.desc': 'Unwavering surrender to the divine will, seeing Hariharasutha in every living being.',
    'about.value2.title': 'Discipline (Niyama)',
    'about.value2.desc': 'Observance of strict 41-day Brahmacharya, cold water ablutions, and sattvic mindfulness.',
    'about.value3.title': 'Devotion (Saranagati)',
    'about.value3.desc': 'Chanting the sacred 108 Sharanams with single-minded contemplation and joy.',
    'about.value4.title': 'Equality (Samathvam)',
    'about.value4.desc': 'Realizing the Upanishadic mahavakya "Tat Tvam Asi" — That Thou Art.',
    'about.learnVratam': 'View 41-Day Vratam Guide',
    'about.explore18': 'Explore 18 Holy Steps',

    // Pooja Section
    'pooja.kicker': 'Sacred Sevas & Offerings',
    'pooja.title': 'Book Pooja Sevas for Blessings & Prosperity',
    'pooja.subtitle': 'Participate in time-honored Vedic rituals, homams, and sacred abhishekams performed by qualified temple priests according to Tantric scriptures.',
    'pooja.viewAll': 'View All Pooja Services',
    'pooja.bookNow': 'Book Seva',
    'pooja.timings': 'Timings',
    'pooja.dakshina': 'Seva Dakshina',
    'pooja.prasadamIncludes': 'Prasadam Includes',
    'pooja.significance': 'Spiritual Significance',

    // Timings Section
    'timings.kicker': 'Temple Schedule',
    'timings.title': 'Daily Darshan & Pooja Timings',
    'timings.subtitle': 'Join the sanctified daily poojas, aartis, and abhishekams. Pilgrims are requested to adhere to traditional dress code and temple discipline.',
    'timings.morning': 'Morning Darshan',
    'timings.evening': 'Evening Darshan',
    'timings.specialNotice': 'Special Notice for Devotees',
    'timings.noticeDesc': 'During the sacred Mandala-Makaravilakku season and monthly festival days, the sanctum sanctorum remains open continuously with extended darshan hours.',
    'timings.viewFull': 'View Complete Schedule',

    // Gallery
    'gallery.kicker': 'Divine Visuals',
    'gallery.title': 'Sacred Temple Gallery',
    'gallery.subtitle': 'Glimpses of deity alankaram, festivals, holy 18 steps, and sacred community Annadanam.',

    // Contact
    'contact.kicker': 'Reach Out to Us',
    'contact.title': 'Contact Sri Ayyapa Temple',
    'contact.subtitle': 'We are here to assist pilgrims, coordinate pooja bookings, and answer spiritual queries.',
    'contact.address': 'Temple Sanctum Address',
    'contact.addressDetail': 'Campbell Bay, Great Nicobar',
    'contact.priest': 'Chief Priest Office',
    'contact.priestDetail': 'For astrological consultations, homam bookings & deeksha ceremonies',
    'contact.admin': 'Administrative Office',
    'contact.adminDetail': 'For Annadanam trust donations, receipts & auditorium reservations',

    // Committee Members
    'committee.title': 'Committee Members Details',
    'committee.subtitle': 'Devotees and pilgrims may contact the temple executive office-bearers directly for guidance, donations, and special seva arrangements.',
    'committee.role.president': 'President',
    'committee.role.secretary': 'Secretary',
    'committee.role.jointSecretary': 'Joint Secretary',
    'committee.role.cashier': 'Cashier',
    'contact.form.name': 'Your Full Name',
    'contact.form.phone': 'Mobile Number',
    'contact.form.email': 'Email Address',
    'contact.form.queryType': 'Nature of Enquiry',
    'contact.form.message': 'Your Message / Spiritual Query',
    'contact.form.submit': 'Send Enquiry to Temple',
    'contact.form.success': 'Thank you! Your message has been received by the temple administration.',

    // Footer
    'footer.quickLinks': 'Quick Navigation',
    'footer.poojaOfferings': 'Sacred Sevas',
    'footer.templeOffice': 'Temple Information',
    'footer.rights': 'All Rights Reserved. Dedicated to the devotees of Lord Dharma Sastha.',
    'footer.harivarasanamLine': 'Swamiye Saranam Ayyappa • Tat Tvam Asi',

    // Modals
    'modal.close': 'Close',
    'modal.donate.title': 'Sacred Annadanam & Temple Seva',
    'modal.donate.subtitle': 'Feeding devotees is the supreme virtue. Contribute to daily Mahaprasadam serving.',
    'modal.booking.title': 'Book Sacred Pooja Seva',
    'modal.booking.devoteeName': 'Devotee Full Name',
    'modal.booking.nakshatra': 'Janma Nakshatra (Star)',
    'modal.booking.gothram': 'Gothram',
    'modal.booking.date': 'Preferred Seva Date',
    'modal.booking.sankalpam': 'Special Sankalpam / Prayer Intent',
    'modal.booking.confirm': 'Proceed to Book Seva',
    'modal.18steps.title': 'The Divine 18 Holy Steps (Pathinettampadi)',
    'modal.18steps.subtitle': 'Each golden step signifies an inner spiritual milestone toward liberation.',
    'modal.vratam.title': '41-Day Sacred Mandala Vratam Deeksha',
    'modal.vratam.subtitle': 'Rules of purity, discipline, and devotion for carrying the holy Irumudi.'
  },
  hi: {
    // Header & Brand
    'temple.name': 'श्री अय्यप्पा मंदिर',
    'temple.motto': 'विश्वास • अनुशासन • भक्ति • समानता',
    'nav.home': 'होम',
    'nav.about': 'मंदिर के बारे में',
    'nav.pooja': 'पूजा सेवाएं',
    'nav.timings': 'दर्शन समय',
    'nav.gallery': 'गैलरी',
    'nav.contact': 'संपर्क करें',
    'header.ringBell': 'घंटी बजाएं',
    'header.bellRinging': 'घंटी बज रही है • मूक करें',
    'header.donate': 'दान करें',
    'header.contributeAnnadanam': 'अन्नदानम में योगदान दें',
    'header.selectLanguage': 'भाषा चुनें',

    // Hero Section
    'hero.chant': 'स्वामी ये शरणम अय्यप्पा',
    'hero.welcome': 'स्वागतम्',
    'hero.templeNameGold': 'श्री अय्यप्पा',
    'hero.templeNameRest': ' मंदिर',
    'hero.subtitle': 'भक्ति, अनुशासन और एकता का एक पवित्र स्थल। धर्म के मार्ग पर सभी श्रद्धालुओं का हार्दिक स्वागत है।',
    'hero.cta': 'अधिक जानें',
    'hero.donateCta': 'अभी दान करें',
    'hero.card1.title': 'दर्शन समय',
    'hero.card1.subtitle': 'प्रातः एवं संध्या दर्शन',
    'hero.card1.time': '05:00 AM - 12:30 PM • 05:00 PM - 09:00 PM',
    'hero.card2.title': 'पूजा सेवाएँ',
    'hero.card2.subtitle': 'नेय्याभिषेकम एवं अर्चना बुक करें',
    'hero.card2.time': 'दैनिक एवं विशेष सेवाएँ',
    'hero.card3.title': 'पवित्र 18 सीढ़ियाँ',
    'hero.card3.subtitle': 'पथिनेट्टाम्पडी का आध्यात्मिक रहस्य',
    'hero.card3.time': '18 दिव्य आध्यात्मिक सोपान',
    'hero.card4.title': 'मंडल व्रतम',
    'hero.card4.subtitle': '41 दिवसीय दीक्षा नियम',
    'hero.card4.time': 'अनुष्ठान दिशानिर्देश व आचार संहिता',
    'hero.card5.title': 'अन्नदानम् सेवा',
    'hero.card5.subtitle': 'पवित्र महाप्रसाद वितरण',
    'hero.card5.time': 'प्रतिदिन महाप्रसाद सेवा',

    // Sacred Ribbon & Chants
    'ribbon.chant1': 'स्वामी ये शरणम अय्यप्पा',
    'ribbon.chant2': 'हरिहर सुतने शरणम अय्यप्पा',
    'ribbon.chant3': 'मणिकण्ठ प्रभुवे शरणम अय्यप्पा',
    'ribbon.chant4': 'विल्लालि वीरने वीरमणिकण्ठने',
    'ribbon.chant5': 'शबरी गिरीशने शरणम अय्यप्पा',
    'ribbon.badge': 'दैनिक भक्ति',
    'ribbon.harivarasanam': 'हरिवरासनम् विश्वमोहनम्',

    // About Section
    'about.kicker': 'पवित्र विरासत एवं पावन धाम',
    'about.title': 'भगवान धर्म शास्ता का शाश्वत वैभव',
    'about.p1': 'श्री अय्यप्पा मंदिर अडिग आध्यात्मिक सत्य का एक दिव्य केंद्र है, जो धर्म के मार्ग पर चलने वाले सभी भक्तों को अपनी कृपा से आप्लावित करता है। भगवान शिव और भगवान विष्णु (हरिहर) के पावन मिलन के रूप में अवतरित भगवान अय्यप्पा को समर्पित यह तीर्थ स्थल सबरीमाला की सदियों पुरानी प्रामाणिक परंपराओं को संजोए हुए है।',
    'about.p2': 'यहाँ प्रत्येक भक्त को जाति, पंथ, धर्म या सामाजिक स्थिति के किसी भी भेद के बिना गले लगाया जाता है। पवित्र काले और केसरिया वस्त्र धारण कर, सिर पर पावन इरुमुडी पोटली रखकर भक्त स्वयं प्रभु का ही रूप बन जाते हैं और एक-दूसरे को केवल "स्वामी" कहकर पुकारते हैं।',
    'about.coreValues': 'अय्यप्पा धर्म के चार स्तम्भ',
    'about.value1.title': 'विश्वास (भक्ति)',
    'about.value1.desc': 'ईश्वरीय विधान के प्रति अटूट समर्पण, प्रत्येक प्राणी में हरिहरसुत का दर्शन।',
    'about.value2.title': 'अनुशासन (नियम)',
    'about.value2.desc': '41 दिवसीय ब्रह्मचर्य, शीतल जल स्नान और सात्विक जीवनशैली का कठोर पालन।',
    'about.value3.title': 'समर्पण (शरणागति)',
    'about.value3.desc': 'एकाग्र चित्त और अगाध आनंद के साथ पवित्र 108 शरणम् का निरंतर जाप।',
    'about.value4.title': 'समानता (समत्वम्)',
    'about.value4.desc': 'उपनिषद के महावाक्य "तत् त्वम् असि" — तुम वही हो — की प्रत्यक्ष अनुभूति।',
    'about.learnVratam': '41 दिवसीय व्रत मार्गदर्शिका',
    'about.explore18': '18 पवित्र सीढ़ियों का दर्शन',

    // Pooja Section
    'pooja.kicker': 'पवित्र सेवाएँ एवं अर्पण',
    'pooja.title': 'कृपा और समृद्धि हेतु पूजा सेवाएँ बुक करें',
    'pooja.subtitle': 'तांत्रिक शास्त्रों के अनुसार सुयोग्य वैदिक पुजारियों द्वारा संपन्न किए जाने वाले प्राचीन यज्ञों, होमादि और पवित्राभिषेकों में भाग लें।',
    'pooja.viewAll': 'सभी पूजा सेवाएँ देखें',
    'pooja.bookNow': 'सेवा बुक करें',
    'pooja.timings': 'समय',
    'pooja.dakshina': 'सेवा दक्षिणा',
    'pooja.prasadamIncludes': 'प्रसाद में सम्मिलित',
    'pooja.significance': 'आध्यात्मिक महत्व',

    // Timings Section
    'timings.kicker': 'मंदिर समय सारिणी',
    'timings.title': 'दैनिक दर्शन एवं आरती का समय',
    'timings.subtitle': 'दैनिक पूजा, आरती और अभिषेक में सम्मिलित हों। सभी भक्तों से पारंपरिक वेशभूषा और मंदिर अनुशासन का पालन करने का अनुरोध है।',
    'timings.morning': 'प्रातःकालीन दर्शन',
    'timings.evening': 'सायंकालीन दर्शन',
    'timings.specialNotice': 'भक्तों हेतु विशेष सूचना',
    'timings.noticeDesc': 'पवित्र मंडल-मकरविलक्कु काल और मासिक उत्सवों के दौरान गर्भगृह निरंतर खुला रहता है और दर्शन के अतिरिक्त घंटे उपलब्ध रहते हैं।',
    'timings.viewFull': 'पूर्ण समय-सारिणी देखें',

    // Gallery
    'gallery.kicker': 'दिव्य दर्शन',
    'gallery.title': 'मंदिर छायाचित्र दीर्घा',
    'gallery.subtitle': 'विग्रह अलंकार, पावन 18 सीढ़ियाँ, महामहोत्सव और भव्य महाप्रसाद अन्नदानम की झलकियाँ।',

    // Contact
    'contact.kicker': 'हमसे संपर्क करें',
    'contact.title': 'श्री अय्यप्पा मंदिर संपर्क सूत्र',
    'contact.subtitle': 'हम तीर्थयात्रियों की सहायता, पूजा बुकिंग समन्वय और आध्यात्मिक मार्गदर्शन हेतु सदैव तत्पर हैं।',
    'contact.address': 'मंदिर गर्भगृह पता',
    'contact.addressDetail': 'कैंपबेल बे, ग्रेट निकोबार',
    'contact.priest': 'मुख्य पुजारी कार्यालय',
    'contact.priestDetail': 'ज्योतिष परामर्श, होम बुकिंग और दीक्षा संस्कारों हेतु',
    'contact.admin': 'प्रशासनिक कार्यालय',
    'contact.adminDetail': 'अन्नदानम ट्रस्ट दान, रसीद एवं सभागार आरक्षण हेतु',

    // Committee Members
    'committee.title': 'प्रबंधन समिति के पदाधिकारी',
    'committee.subtitle': 'भक्त एवं तीर्थयात्री मार्गदर्शन, दान एवं विशेष सेवा प्रबंध हेतु मंदिर के प्रमुख पदाधिकारियों से सीधे संपर्क कर सकते हैं।',
    'committee.role.president': 'अध्यक्ष',
    'committee.role.secretary': 'सचिव',
    'committee.role.jointSecretary': 'संयुक्त सचिव',
    'committee.role.cashier': 'कोषाध्यक्ष',
    'contact.form.name': 'आपका पूरा नाम',
    'contact.form.phone': 'मोबाइल नंबर',
    'contact.form.email': 'ईमेल पता',
    'contact.form.queryType': 'पूछताछ का प्रकार',
    'contact.form.message': 'आपका संदेश / प्रार्थना',
    'contact.form.submit': 'मंदिर को संदेश भेजें',
    'contact.form.success': 'धन्यवाद! आपका संदेश मंदिर प्रशासन को प्राप्त हो गया है।',

    // Footer
    'footer.quickLinks': 'त्वरित नेविगेशन',
    'footer.poojaOfferings': 'पवित्र पूजा सेवाएँ',
    'footer.templeOffice': 'मंदिर कार्यालय व सूचना',
    'footer.rights': 'सर्वाधिकार सुरक्षित। भगवान धर्म शास्ता के भक्तों को समर्पित।',
    'footer.harivarasanamLine': 'स्वामी ये शरणम अय्यप्पा • तत् त्वम् असि',

    // Modals
    'modal.close': 'बंद करें',
    'modal.donate.title': 'पवित्र अन्नदानम् एवं मंदिर सेवा',
    'modal.donate.subtitle': 'भक्तों को भोजन कराना परम पुण्य है। दैनिक महाप्रसाद सेवा में सहर्ष योगदान दें।',
    'modal.booking.title': 'पवित्र पूजा सेवा बुक करें',
    'modal.booking.devoteeName': 'भक्त का पूरा नाम',
    'modal.booking.nakshatra': 'जन्म नक्षत्र',
    'modal.booking.gothram': 'गोत्र',
    'modal.booking.date': 'पूजा की अभीष्ट तिथि',
    'modal.booking.sankalpam': 'विशेष संकल्प / प्रार्थना का उद्देश्य',
    'modal.booking.confirm': 'पूजा सेवा बुक करें',
    'modal.18steps.title': 'दिव्य 18 पवित्र सीढ़ियाँ (पथिनेट्टाम्पडी)',
    'modal.18steps.subtitle': 'प्रत्येक स्वर्णिम सोपान मोक्ष प्राप्ति की ओर एक आंतरिक आध्यात्मिक उपलब्धि का प्रतीक है।',
    'modal.vratam.title': '41 दिवसीय पवित्र मंडल व्रतम दीक्षा',
    'modal.vratam.subtitle': 'पवित्र इरुमुडी धारण करने हेतु शुचिता, अनुशासन और भक्ति के वैदिक नियम।'
  },
  ta: {
    // Header & Brand
    'temple.name': 'ஸ்ரீ ஐயப்ப சுவாமி திருக்கோவில்',
    'temple.motto': 'நம்பிக்கை • ஒழுக்கம் • பக்தி • சமத்துவம்',
    'nav.home': 'முகப்பு',
    'nav.about': 'கோவில் வரலாறு',
    'nav.pooja': 'பூஜை சேவைகள்',
    'nav.timings': 'தரிசன நேரங்கள்',
    'nav.gallery': 'படத்தொகுப்பு',
    'nav.contact': 'தொடர்புக்கு',
    'header.ringBell': 'மணி ஒலிக்க',
    'header.bellRinging': 'மணி ஒலிக்கிறது • நிறுத்த',
    'header.donate': 'நன்கொடை',
    'header.contributeAnnadanam': 'அன்னதானத்திற்கு உதவ',
    'header.selectLanguage': 'மொழியைத் தேர்ந்தெடுக்கவும்',

    // Hero Section
    'hero.chant': 'சுவாமியே சரணம் ஐயப்பா',
    'hero.welcome': 'வருக',
    'hero.templeNameGold': 'ஸ்ரீ ஐயப்ப சுவாமி',
    'hero.templeNameRest': ' திருக்கோவில்',
    'hero.subtitle': 'பக்தி, ஆன்மீக ஒழுக்கம் மற்றும் சமத்துவத்தின் புனித தலம். தர்மத்தின் வழியில் அனைத்து பக்தர்களையும் அன்போடு வரவேற்கிறோம்.',
    'hero.cta': 'மேலும் அறிய',
    'hero.donateCta': 'இப்போதே நன்கொடை அளியுங்கள்',
    'hero.card1.title': 'தரிசன நேரங்கள்',
    'hero.card1.subtitle': 'காலை மற்றும் மாலை நடை திறப்பு',
    'hero.card1.time': '05:00 AM - 12:30 PM • 05:00 PM - 09:00 PM',
    'hero.card2.title': 'பூஜை சேவைகள்',
    'hero.card2.subtitle': 'நெய்யபிஷேகம் மற்றும் அர்ச்சனை பதிவு',
    'hero.card2.time': 'தினசரி & சிறப்பு பூஜைகள்',
    'hero.card3.title': 'புனித 18 படிகள்',
    'hero.card3.subtitle': 'பதினெட்டாம்படியின் தெய்வீக தாத்பரியம்',
    'hero.card3.time': '18 ஆன்மீக படிகளின் ரகசியம்',
    'hero.card4.title': 'மண்டல விரதம்',
    'hero.card4.subtitle': '41 நாட்கள் தீட்சை விரத நெறிமுறைகள்',
    'hero.card4.time': 'ஆசார விதிகளும் அனுஷ்டானங்களும்',
    'hero.card5.title': 'அன்னதான சேவை',
    'hero.card5.subtitle': 'புனித மகாபிரசாத விநியோகம்',
    'hero.card5.time': 'தினசரி பசிப்பிணி தீர்க்கும் சேவை',

    // Sacred Ribbon & Chants
    'ribbon.chant1': 'சுவாமியே சரணம் ஐயப்பா',
    'ribbon.chant2': 'ஹரிஹர சுதனே சரணம் ஐயப்பா',
    'ribbon.chant3': 'மணிகண்ட பிரபுவே சரணம் ஐயப்பா',
    'ribbon.chant4': 'வில்லாளி வீரனே வீரமணிகண்டனே',
    'ribbon.chant5': 'சபரி கிரீசனே சரணம் ஐயப்பா',
    'ribbon.badge': 'தினசரி பக்தி',
    'ribbon.harivarasanam': 'ஹரிவராசனம் விஸ்வமோகனம்',

    // About Section
    'about.kicker': 'புனித பெருமையும் தெய்வீக ஆலயமும்',
    'about.title': 'ஸ்ரீ தர்ம சாஸ்தாவின் நித்திய மகிமை',
    'about.p1': 'ஸ்ரீ ஐயப்ப சுவாமி திருக்கோவில் சத்தியமும் ஆன்மீக ஒளியும் நிறைந்த புனித தலமாக திகழ்கிறது. சிவபெருமானுக்கும் மகாவிஷ்ணுவிற்கும் (ஹரிஹரன்) அவதரித்த ஸ்ரீ ஐயப்பனுக்கு அர்ப்பணிக்கப்பட்ட இந்த கோவில், சபரிமலையின் பாரம்பரிய ஆசாரங்களை அதே புனிதத்தோடு பாதுகாத்து வருகிறது.',
    'about.p2': 'இங்கு ஜாதி, மதம், இனம், ஏழை, பணக்காரன் என்ற எந்த பாகுபாடும் இன்றி அனைத்து பக்தர்களும் சமமாக போற்றப்படுகிறார்கள். கருப்பு, நீலம் மற்றும் காவி வஸ்திரம் அணிந்து, தலையில் இருமுடி ஏந்தி வரும் ஒவ்வொரு பக்தரும் ஐயப்பனின் வடிவமாகவே போற்றப்பட்டு "சுவாமி" என்றே அழைக்கப்படுகிறார்கள்.',
    'about.coreValues': 'ஐயப்ப தர்மத்தின் நான்கு தூண்கள்',
    'about.value1.title': 'நம்பிக்கை (பக்தி)',
    'about.value1.desc': 'இறைவனின் திருவுள்ளத்திற்கு முழுமையான சரணாகதி, அனைத்து உயிர்களிலும் ஐயப்பனை காணுதல்.',
    'about.value2.title': 'ஒழுக்கம் (நியமம்)',
    'about.value2.desc': '41 நாட்கள் கடுமையான பிரம்மச்சரியம், குளிர்ந்த நீர் நீராடல் மற்றும் சாத்விக உணவுக் கட்டுப்பாடு.',
    'about.value3.title': 'சரணாகதி (பக்தி நெறி)',
    'about.value3.desc': 'மனமுருகி 108 சரண கோஷங்களை சொல்லி ஐயப்பனின் திருவடிகளை அடைதல்.',
    'about.value4.title': 'சமத்துவம் (சமத்வம்)',
    'about.value4.desc': '"தத் த்வம் அசி" (நீயே அதுவாக இருக்கிறாய்) என்ற உபநிஷத தத்துவத்தின் நேரடி அனுபவம்.',
    'about.learnVratam': '41 நாள் விரத கையேடு',
    'about.explore18': '18 படிகளின் தத்துவம்',

    // Pooja Section
    'pooja.kicker': 'புனித வழிபாடுகளும் சேவைகளும்',
    'pooja.title': 'ஆயுள், ஆரோக்கியம், வளம் பெற பூஜை முன்பதிவு',
    'pooja.subtitle': 'வேத விற்பன்னர்களால் ஆகம விதிகளின்படி நடத்தப்படும் நெய்யபிஷேகம், கணபதி ஹோமம் மற்றும் சிறப்பு வழிபாடுகளில் கலந்து கொள்ளுங்கள்.',
    'pooja.viewAll': 'அனைத்து பூஜை சேவைகளையும் காண்க',
    'pooja.bookNow': 'பூஜை முன்பதிவு',
    'pooja.timings': 'நேரம்',
    'pooja.dakshina': 'சேவை கட்டணம்',
    'pooja.prasadamIncludes': 'பிரசாத விவரம்',
    'pooja.significance': 'ஆன்மீக பலன்',

    // Timings Section
    'timings.kicker': 'திருக்கோவில் நடை திறப்பு அட்டவணை',
    'timings.title': 'தினசரி தரிசனம் மற்றும் தீபாராதனை நேரங்கள்',
    'timings.subtitle': 'தினசரி நித்திய பூஜைகள் மற்றும் தீபாராதனைகளில் பங்கேற்க வாருங்கள். பக்தர்கள் பாரம்பரிய ஆடை அணிந்து வர கேட்டுக்கொள்ளப்படுகிறார்கள்.',
    'timings.morning': 'காலை தரிசனம்',
    'timings.evening': 'மாலை தரிசனம்',
    'timings.specialNotice': 'பக்தர்களுக்கான முக்கிய அறிவிப்பு',
    'timings.noticeDesc': 'மண்டல-மகரவிளக்கு காலங்களிலும், மாத பிறப்பு விசேஷ நாட்களிலும் நடை தொடர்ந்து திறக்கப்பட்டு கூடுதல் நேரம் பக்தர்கள் தரிசனத்திற்கு அனுமதிக்கப்படுவர்.',
    'timings.viewFull': 'முழு அட்டவணையை பார்க்க',

    // Gallery
    'gallery.kicker': 'தெய்வீக தரிசனம்',
    'gallery.title': 'திருக்கோவில் புகைப்படத் தொகுப்பு',
    'gallery.subtitle': 'மூலவர் அலங்காரம், 18 புனித படிகள், திருவிழாக்கள் மற்றும் அன்னதான வைபவங்களின் காட்சிகள்.',

    // Contact
    'contact.kicker': 'தொடர்பு கொள்ளுங்கள்',
    'contact.title': 'ஸ்ரீ ஐயப்ப சுவாமி திருக்கோவில் தொடர்பு',
    'contact.subtitle': 'பக்தர்களின் தரிசன வசதிகள், பூஜை முன்பதிவு மற்றும் ஆன்மீக சந்தேகங்களுக்கு உதவ எப்போதும் தயாராக உள்ளோம்.',
    'contact.address': 'திருக்கோவில் முகவரி',
    'contact.addressDetail': 'கேம்ப்பெல் பே, கிரேட் நிக்கோபார்',
    'contact.priest': 'தலைமை அர்ச்சகர் அலுவலகம்',
    'contact.priestDetail': 'ஜாதக பரிகாரங்கள், ஹோமங்கள் மற்றும் மாலை அணிதல் சடங்குகளுக்கு',
    'contact.admin': 'கோவில் நிர்வாக அலுவலகம்',
    'contact.adminDetail': 'அன்னதான நன்கொடைகள், ரசீது மற்றும் மண்டப முன்பதிவுக்கு',

    // Committee Members
    'committee.title': 'நிர்வாகக் குழு உறுப்பினர்கள் விவரம்',
    'committee.subtitle': 'பக்தர்கள் கோவில் வழிபாடுகள், நன்கொடைகள் மற்றும் விசேஷ ஏற்பாடுகளுக்கு நிர்வாகக் குழு நிர்வாகிகளை நேரடியாக தொடர்பு கொள்ளலாம்.',
    'committee.role.president': 'தலைவர்',
    'committee.role.secretary': 'செயலாளர்',
    'committee.role.jointSecretary': 'இணைச் செயலாளர்',
    'committee.role.cashier': 'பொருளாளர்',
    'contact.form.name': 'தங்கள் முழு பெயர்',
    'contact.form.phone': 'கைபேசி எண்',
    'contact.form.email': 'மின்னஞ்சல் முகவரி',
    'contact.form.queryType': 'தொடர்பின் நோக்கம்',
    'contact.form.message': 'தங்கள் செய்தி / விண்ணப்பம்',
    'contact.form.submit': 'விண்ணப்பத்தை அனுப்புக',
    'contact.form.success': 'நன்றி! உங்கள் செய்தி கோவில் நிர்வாகத்திற்கு வெற்றிகரமாக அனுப்பி வைக்கப்பட்டது.',

    // Footer
    'footer.quickLinks': 'முக்கிய இணைப்புகள்',
    'footer.poojaOfferings': 'புனித பூஜை சேவைகள்',
    'footer.templeOffice': 'திருக்கோவில் விவரங்கள்',
    'footer.rights': 'அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை. தர்ம சாஸ்தாவின் பக்தர்களுக்கு அர்ப்பணிக்கப்பட்டது.',
    'footer.harivarasanamLine': 'சுவாமியே சரணம் ஐயப்பா • தத் த்வம் அசி',

    // Modals
    'modal.close': 'மூடுக',
    'modal.donate.title': 'புனித அன்னதானம் & கோவில் கைங்கர்யம்',
    'modal.donate.subtitle': 'பக்தர்களின் பசி போக்குவது மகத்தான புண்ணியம். தினசரி அன்னதானத்திற்கு உங்கள் ஆதரவை அளியுங்கள்.',
    'modal.booking.title': 'புனித பூஜை முன்பதிவு',
    'modal.booking.devoteeName': 'பக்தரின் பெயர்',
    'modal.booking.nakshatra': 'ஜென்ம நட்சத்திரம்',
    'modal.booking.gothram': 'கோத்திரம்',
    'modal.booking.date': 'பூஜை செய்ய விரும்பும் தேதி',
    'modal.booking.sankalpam': 'சங்கல்பம் / பிரார்த்தனை நோக்கம்',
    'modal.booking.confirm': 'முன்பதிவு செய்ய தொடரவும்',
    'modal.18steps.title': 'தெய்வீக 18 புனித படிகள் (பதினெட்டாம்படி)',
    'modal.18steps.subtitle': 'ஒவ்வொரு பொற்படியும் ஆத்ம விடுதலையை நோக்கிய உயர்ந்த ஆன்மீக நிலையை குறிக்கிறது.',
    'modal.vratam.title': '41 நாட்கள் புனித மண்டல விரத நெறிமுறைகள்',
    'modal.vratam.subtitle': 'புனித இருமுடி ஏந்தி சபரிமலை ஏற கடைபிடிக்க வேண்டிய விரத மற்றும் ஆசார நெறிகள்.'
  }
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key: string, fallback?: string) => fallback || key,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('temple_language');
    if (saved === 'hi' || saved === 'ta' || saved === 'en') {
      return saved as Language;
    }
    return 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('temple_language', lang);
    } catch {
      // ignore
    }
    // Update HTML lang tag
    document.documentElement.lang = lang;
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string, fallback?: string): string => {
    const dict = translations[language];
    if (dict && dict[key]) {
      return dict[key];
    }
    const enDict = translations['en'];
    if (enDict && enDict[key]) {
      return enDict[key];
    }
    return fallback !== undefined ? fallback : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
