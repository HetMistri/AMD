// Language Context with Dynamic Translation Support for All Indian Languages
import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  BASE_TRANSLATIONS, 
  INDIAN_LANGUAGES, 
  translateAllTexts, 
  detectUserLanguage 
} from '../services/translation';
import storageService from '../services/storage';
import { interpolate } from '../utils/helpers';
import toast from 'react-hot-toast';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const [translations, setTranslations] = useState(BASE_TRANSLATIONS);
  const [loading, setLoading] = useState(false);
  const [translationProgress, setTranslationProgress] = useState({
    completed: 0,
    total: Object.keys(BASE_TRANSLATIONS).length,
    percent: 0,
    language: 'en',
  });
  const [availableLanguages] = useState(INDIAN_LANGUAGES);

  useEffect(() => {
    // Always start with saved language or English (don't auto-detect from browser)
    const savedLanguage = storageService.getLanguage();
    const initialLang = savedLanguage || 'en'; // Force English if no saved preference
    
    if (initialLang !== 'en') {
      loadTranslations(initialLang);
    } else {
      setLanguage(initialLang);
    }
  }, []);

  const loadTranslations = async (lang) => {
    if (lang === 'en') {
      setTranslations(BASE_TRANSLATIONS);
      setLanguage(lang);
      storageService.setLanguage(lang);
      setTranslationProgress({
        completed: Object.keys(BASE_TRANSLATIONS).length,
        total: Object.keys(BASE_TRANSLATIONS).length,
        percent: 100,
        language: 'en',
      });
      return;
    }

    setLoading(true);
    setTranslationProgress({
      completed: 0,
      total: Object.keys(BASE_TRANSLATIONS).length,
      percent: 0,
      language: lang,
    });
    
    try {
      const translatedTexts = await translateAllTexts(lang, ({ completed, total }) => {
        const percent = total > 0 ? Math.min(100, Math.round((completed / total) * 100)) : 0;
        setTranslationProgress({ completed, total, percent, language: lang });
      });
      setTranslations(translatedTexts);
      setLanguage(lang);
      storageService.setLanguage(lang);
      setTranslationProgress({
        completed: Object.keys(BASE_TRANSLATIONS).length,
        total: Object.keys(BASE_TRANSLATIONS).length,
        percent: 100,
        language: lang,
      });
      
      toast.success(`Language changed to ${INDIAN_LANGUAGES.find(l => l.code === lang)?.nativeName || lang}`, {
        duration: 2000,
      });
    } catch (error) {
      console.error('Translation error:', error);
      toast.error('Failed to load translations. Using English.', {
        duration: 3000,
      });
      setTranslations(BASE_TRANSLATIONS);
      setLanguage('en');
      setTranslationProgress({
        completed: Object.keys(BASE_TRANSLATIONS).length,
        total: Object.keys(BASE_TRANSLATIONS).length,
        percent: 100,
        language: 'en',
      });
    } finally {
      setLoading(false);
    }
  };

  const changeLanguage = async (lang) => {
    if (!INDIAN_LANGUAGES.find(l => l.code === lang)) {
      console.error(`Language ${lang} not supported`);
      return;
    }

    const hasCompleteTranslations = Object.keys(BASE_TRANSLATIONS).every(
      (key) => Object.prototype.hasOwnProperty.call(translations, key)
    );

    if (lang === language && hasCompleteTranslations) {
      console.log('Language already selected:', lang);
      return;
    }

    console.log('🌐 Changing language to:', lang);
    await loadTranslations(lang);
  };

  const t = (key, values) => {
    const text = translations[key] || BASE_TRANSLATIONS[key] || key;
    return values ? interpolate(text, values) : text;
  };

  const value = {
    language,
    changeLanguage,
    t,
    translations,
    loading,
    translationProgress,
    availableLanguages,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
