import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations: Record<string, Record<Language, string>> = {
  // Website branding
  websiteName: { en: 'SahityaAurShabd', hi: 'साहित्य और शब्द' },
  
  // Navigation
  home: { en: 'Home', hi: 'होम' },
  poets: { en: 'Poets', hi: 'कवि' },
  about: { en: 'About', hi: 'के बारे में' },
  ownerPoetry: { en: 'Owner Poetry', hi: 'मालिक की कविता' },
  
  // Homepage
  welcomeTitle: { en: 'Welcome to SahityaAurShabd', hi: 'साहित्य और शब्द में आपका स्वागत है' },
  welcomeSubtitle: { en: 'Discover the rich tapestry of Indian poetry', hi: 'भारतीय कविता की समृद्ध विरासत की खोज करें' },
  explorePoets: { en: 'Explore Poets by Region', hi: 'क्षेत्र के अनुसार कवियों का अन्वेषण करें' },
  clickRegionExplore: { en: 'Click on any region to explore its poet', hi: 'किसी भी क्षेत्र पर क्लिक करके उसके कवि का अन्वेषण करें' },
  
  // States
  andhraPradesh: { en: 'Andhra Pradesh', hi: 'आंध्र प्रदेश' },
  arunachalPradesh: { en: 'Arunachal Pradesh', hi: 'अरुणाचल प्रदेश' },
  assam: { en: 'Assam', hi: 'असम' },
  bihar: { en: 'Bihar', hi: 'बिहार' },
  chhattisgarh: { en: 'Chhattisgarh', hi: 'छत्तीसगढ़' },
  goa: { en: 'Goa', hi: 'गोवा' },
  gujarat: { en: 'Gujarat', hi: 'गुजरात' },
  haryana: { en: 'Haryana', hi: 'हरियाणा' },
  himachalPradesh: { en: 'Himachal Pradesh', hi: 'हिमाचल प्रदेश' },
  jharkhand: { en: 'Jharkhand', hi: 'झारखंड' },
  karnataka: { en: 'Karnataka', hi: 'कर्नाटक' },
  kerala: { en: 'Kerala', hi: 'केरल' },
  madhyaPradesh: { en: 'Madhya Pradesh', hi: 'मध्य प्रदेश' },
  maharashtra: { en: 'Maharashtra', hi: 'महाराष्ट्र' },
  manipur: { en: 'Manipur', hi: 'मणिपुर' },
  meghalaya: { en: 'Meghalaya', hi: 'मेघालय' },
  mizoram: { en: 'Mizoram', hi: 'मिजोरम' },
  nagaland: { en: 'Nagaland', hi: 'नागालैंड' },
  odisha: { en: 'Odisha', hi: 'ओडिशा' },
  punjab: { en: 'Punjab', hi: 'पंजाब' },
  rajasthan: { en: 'Rajasthan', hi: 'राजस्थान' },
  sikkim: { en: 'Sikkim', hi: 'सिक्किम' },
  tamilNadu: { en: 'Tamil Nadu', hi: 'तमिलनाडु' },
  telangana: { en: 'Telangana', hi: 'तेलंगाना' },
  tripura: { en: 'Tripura', hi: 'त्रिपुरा' },
  uttarPradesh: { en: 'Uttar Pradesh', hi: 'उत्तर प्रदेश' },
  uttarakhand: { en: 'Uttarakhand', hi: 'उत्तराखंड' },
  westBengal: { en: 'West Bengal', hi: 'पश्चिम बंगाल' },
  
  // Union Territories
  andamanAndNicobarIslands: { en: 'Andaman and Nicobar Islands', hi: 'अंडमान और निकोबार द्वीप समूह' },
  chandigarh: { en: 'Chandigarh', hi: 'चंडीगढ़' },
  dadraAndNagarHaveliAndDamanAndDiu: { en: 'Dadra and Nagar Haveli and Daman and Diu', hi: 'दादरा और नगर हवेली और दमन और दीव' },
  delhi: { en: 'Delhi', hi: 'दिल्ली' },
  jammuAndKashmir: { en: 'Jammu and Kashmir', hi: 'जम्मू और कश्मीर' },
  ladakh: { en: 'Ladakh', hi: 'लद्दाख' },
  lakshadweep: { en: 'Lakshadweep', hi: 'लक्षद्वीप' },
  puducherry: { en: 'Puducherry', hi: 'पुडुचेरी' },
  
  // Poetry categories
  ghazals: { en: 'Ghazals', hi: 'ग़ज़लें' },
  kavitas: { en: 'Kavitas', hi: 'कविताएँ' },
  shers: { en: 'Shers', hi: 'शेर' },
  nazms: { en: 'Nazms', hi: 'नज़्में' },
  kahanis: { en: 'Kahanis', hi: 'कहानियाँ' },
  imageShayaris: { en: 'Image Shayaris', hi: 'चित्र शायरी' },
  videos: { en: 'Videos', hi: 'वीडियो' },
  audioFiles: { en: 'Audio Files', hi: 'ऑडियो फ़ाइलें' },
  top5Shayaris: { en: 'Top 5 Shayaris', hi: 'शीर्ष 5 शायरी' },
  
  // Poet profile
  biography: { en: 'Biography', hi: 'जीवनी' },
  awards: { en: 'Awards', hi: 'पुरस्कार' },
  notableWorks: { en: 'Notable Works', hi: 'उल्लेखनीय कार्य' },
  website: { en: 'Website', hi: 'वेबसाइट' },
  socialMedia: { en: 'Social Media', hi: 'सोशल मीडिया' },
  
  // Common
  loading: { en: 'Loading...', hi: 'लोड हो रहा है...' },
  error: { en: 'Error', hi: 'त्रुटि' },
  noContent: { en: 'No content available', hi: 'कोई सामग्री उपलब्ध नहीं' },
  backToHome: { en: 'Back to Home', hi: 'होम पर वापस जाएं' },
  builtWith: { en: 'Built with', hi: 'के साथ बनाया गया' },
  using: { en: 'using', hi: 'उपयोग करते हुए' },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved === 'hi' || saved === 'en') ? saved : 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'hi' : 'en');
  };

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
