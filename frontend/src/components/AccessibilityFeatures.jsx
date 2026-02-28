// Accessibility & Voice Alert Component - High Impact Features
import React, { useState, useEffect, useCallback } from 'react';
import {
  Volume2,
  VolumeX,
  Languages,
  Accessibility,
  Eye,
  EyeOff,
  Sun,
  Moon,
  Wifi,
  WifiOff,
  AlertTriangle,
  Bell,
  BellOff,
  MessageSquare,
  Phone,
  Mic,
  MicOff,
  Settings,
  Check
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useLanguage } from '../contexts/LanguageContext';
import { INDIAN_LANGUAGES } from '../services/translation';

// Voice messages are now served entirely from translation.js via VOICE_KEY_MAP keys

// Languages Config
const VOICE_LANGUAGE_FLAGS = {
  en: '🇬🇧',
  hi: '🇮🇳',
  gu: '🇮🇳',
  ta: '🇮🇳',
  te: '🇮🇳',
  kn: '🇮🇳',
  ml: '🇮🇳',
  mr: '🇮🇳',
  pa: '🇮🇳',
  bn: '🇮🇳',
  or: '🇮🇳',
  as: '🇮🇳',
  ur: '🇮🇳',
  sa: '🇮🇳',
};

const VOICE_LOCALE_MAP = {
  en: 'en-IN',
  hi: 'hi-IN',
  gu: 'gu-IN',
  ta: 'ta-IN',
  te: 'te-IN',
  kn: 'kn-IN',
  ml: 'ml-IN',
  mr: 'mr-IN',
  pa: 'pa-IN',
  bn: 'bn-IN',
  or: 'or-IN',
  as: 'as-IN',
  ur: 'ur-IN',
  sa: 'sa-IN',
};

const LANGUAGES = [
  // English - Always available
  {
    code: 'en',
    name: 'English',
    flag: '🇬🇧',
    voice: 'en-IN',
  },
  // Other Indian languages
  ...INDIAN_LANGUAGES.filter(lang => lang.code !== 'en').map((lang) => ({
    code: lang.code,
    name: lang.nativeName,
    flag: VOICE_LANGUAGE_FLAGS[lang.code] || '🌐',
    voice: VOICE_LOCALE_MAP[lang.code] || 'en-IN',
  }))
];

const VOICE_KEY_MAP = {
  highVoltage: 'voiceVoltageDanger',
  lowVoltage: 'voiceVoltageWarning',
  anomaly: 'voiceAnomalyDetected',
  billDue: 'voiceBillDueReading',
  peakHours: 'voicePeakHours',
  savingsTip: 'voiceSavingsTip',
  welcome: 'voiceWelcome',
  dailyReport: 'voiceDailyReport'
};

// Voice Alert Hook
export const useVoiceAlert = () => {
  const { language: selectedLanguage, t } = useLanguage();
  const [isEnabled, setIsEnabled] = useState(() => {
    if (typeof window === 'undefined') return true;
    const stored = window.localStorage.getItem('gm_voice_enabled');
    return stored === null ? true : stored === 'true';
  });
  const [language, setLanguage] = useState(selectedLanguage || 'en');
  const [speaking, setSpeaking] = useState(false);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    setLanguage(selectedLanguage || 'en');
  }, [selectedLanguage]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem('gm_voice_enabled', String(isEnabled));
  }, [isEnabled]);
  
  const speak = useCallback((messageKey, params = {}) => {
    if (!isEnabled || typeof window === 'undefined' || !window.speechSynthesis) return;
    
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    // Use translation system only - no fallback to hardcoded messages
    const translatedKey = VOICE_KEY_MAP[messageKey];
    if (!translatedKey) {
      console.warn(`Voice message key not mapped: ${messageKey}`);
      return;
    }
    
    const message = t(translatedKey, params);
    if (!message || message === translatedKey) {
      console.warn(`Translation missing for key: ${translatedKey}`);
      return;
    }
    
    const utterance = new SpeechSynthesisUtterance(message);
    const langConfig = LANGUAGES.find(l => l.code === language);
    utterance.lang = langConfig?.voice || VOICE_LOCALE_MAP[language] || 'en-IN';
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = volume;
    
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    
    window.speechSynthesis.speak(utterance);
  }, [isEnabled, language, t, volume]);
  
  const stopSpeaking = useCallback(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
    }
  }, []);
  
  return {
    speak,
    stopSpeaking,
    speaking,
    isEnabled,
    setIsEnabled,
    language,
    setLanguage,
    volume,
    setVolume
  };
};

// Accessibility Settings Panel
const AccessibilityPanel = ({ 
  voiceEnabled = true,
  setVoiceEnabled = () => {},
  language,
  setLanguage,
  volume,
  setVolume,
  highContrast,
  setHighContrast,
  largeText,
  setLargeText,
  reducedMotion,
  setReducedMotion,
  offlineMode,
  className = ''
}) => {
  const { changeLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const handleVoiceLanguageChange = async (langCode) => {
    setLanguage?.(langCode);
    await changeLanguage(langCode);
  };
  
  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-xl bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        aria-label="Accessibility Settings"
      >
        <Accessibility className="w-5 h-5 text-gray-600 dark:text-gray-400" />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 top-12 w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-violet-500/10 to-purple-500/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Accessibility className="w-5 h-5 text-violet-600" />
                <h3 className="font-semibold text-gray-900 dark:text-white">Accessibility</h3>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
          </div>
          
          <div className="p-4 space-y-4 max-h-[400px] overflow-y-auto">
            {/* Voice Alerts */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {voiceEnabled ? <Volume2 className="w-4 h-4 text-emerald-500" /> : <VolumeX className="w-4 h-4 text-gray-400" />}
                  <span className="font-medium text-gray-900 dark:text-white">Voice Alerts</span>
                </div>
                <button
                  onClick={() => setVoiceEnabled(!voiceEnabled)}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    voiceEnabled ? 'bg-emerald-500' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full bg-white shadow-sm transform transition-transform ${
                    voiceEnabled ? 'translate-x-6' : 'translate-x-0.5'
                  }`} />
                </button>
              </div>
              
              {voiceEnabled && (
                <div className="ml-6 space-y-3">
                  {/* Volume Slider */}
                  <div>
                    <label className="text-xs text-gray-500 block mb-1">Volume</label>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={volume}
                      onChange={(e) => setVolume(parseFloat(e.target.value))}
                      className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                    />
                  </div>
                  
                  {/* Language Selection */}
                  <div>
                    <label className="text-xs text-gray-500 block mb-2">Voice Language</label>
                    <div className="grid grid-cols-3 gap-2 max-h-44 overflow-y-auto pr-1">
                      {LANGUAGES.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => handleVoiceLanguageChange(lang.code)}
                          className={`p-2 rounded-lg text-center transition-colors ${
                            language === lang.code
                              ? 'bg-emerald-100 dark:bg-emerald-900/30 border-2 border-emerald-500'
                              : 'bg-gray-100 dark:bg-gray-700 border-2 border-transparent hover:border-gray-300'
                          }`}
                        >
                          <span className="text-lg">{lang.flag}</span>
                          <p className="text-xs mt-1 font-medium">{lang.name}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <hr className="border-gray-200 dark:border-gray-700" />
            
            {/* High Contrast */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-gray-500" />
                <span className="font-medium text-gray-900 dark:text-white">High Contrast</span>
              </div>
              <button
                onClick={() => setHighContrast(!highContrast)}
                className={`w-12 h-6 rounded-full transition-colors ${
                  highContrast ? 'bg-emerald-500' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              >
                <div className={`w-5 h-5 rounded-full bg-white shadow-sm transform transition-transform ${
                  highContrast ? 'translate-x-6' : 'translate-x-0.5'
                }`} />
              </button>
            </div>
            
            {/* Large Text */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 text-gray-500 font-bold text-sm">Aa</span>
                <span className="font-medium text-gray-900 dark:text-white">Large Text</span>
              </div>
              <button
                onClick={() => setLargeText(!largeText)}
                className={`w-12 h-6 rounded-full transition-colors ${
                  largeText ? 'bg-emerald-500' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              >
                <div className={`w-5 h-5 rounded-full bg-white shadow-sm transform transition-transform ${
                  largeText ? 'translate-x-6' : 'translate-x-0.5'
                }`} />
              </button>
            </div>
            
            {/* Reduced Motion */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Settings className="w-4 h-4 text-gray-500" />
                <span className="font-medium text-gray-900 dark:text-white">Reduced Motion</span>
              </div>
              <button
                onClick={() => setReducedMotion(!reducedMotion)}
                className={`w-12 h-6 rounded-full transition-colors ${
                  reducedMotion ? 'bg-emerald-500' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              >
                <div className={`w-5 h-5 rounded-full bg-white shadow-sm transform transition-transform ${
                  reducedMotion ? 'translate-x-6' : 'translate-x-0.5'
                }`} />
              </button>
            </div>
            
            <hr className="border-gray-200 dark:border-gray-700" />
            
            {/* Offline Mode Indicator */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-900/50">
              <div className="flex items-center gap-2">
                {offlineMode ? (
                  <WifiOff className="w-4 h-4 text-yellow-500" />
                ) : (
                  <Wifi className="w-4 h-4 text-emerald-500" />
                )}
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {offlineMode ? 'Offline Mode Active' : 'Connected'}
                </span>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                offlineMode 
                  ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                  : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
              }`}>
                {offlineMode ? 'Cached Data' : 'Live'}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Voice Alert Button Component  
const VoiceAlertButton = ({ message, messageKey, params, language, className = '' }) => {
  const { language: selectedLanguage, t } = useLanguage();
  const activeLanguage = language || selectedLanguage || 'en';
  const [speaking, setSpeaking] = useState(false);
  
  const speak = () => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      toast.error('Voice not supported in this browser');
      return;
    }
    
    window.speechSynthesis.cancel();
    setSpeaking(true);
    
    // Use translation system only - no fallback to hardcoded messages
    const translatedKey = VOICE_KEY_MAP[messageKey];
    if (!translatedKey) {
      console.warn(`Voice message key not mapped: ${messageKey}`);
      setSpeaking(false);
      return;
    }
    
    const finalText = t(translatedKey, params || {});
    if (!finalText || finalText === translatedKey) {
      console.warn(`Translation missing for key: ${translatedKey}`);
      setSpeaking(false);
      return;
    }
    
    const utterance = new SpeechSynthesisUtterance(finalText);
    const langConfig = LANGUAGES.find(l => l.code === activeLanguage);
    utterance.lang = langConfig?.voice || VOICE_LOCALE_MAP[activeLanguage] || 'en-IN';
    utterance.rate = 0.9;
    
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    
    window.speechSynthesis.speak(utterance);
  };
  
  const stop = () => {
    window.speechSynthesis.cancel();
    setSpeaking(false);
  };
  
  return (
    <button
      onClick={speaking ? stop : speak}
      className={`p-2 rounded-lg transition-all ${
        speaking 
          ? 'bg-red-100 dark:bg-red-900/30 text-red-600 animate-pulse' 
          : 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 hover:bg-emerald-200'
      } ${className}`}
      title={speaking ? 'Stop' : 'Listen'}
    >
      {speaking ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
    </button>
  );
};

// Emergency SOS Button
const EmergencySOSButton = ({ onActivate, className = '' }) => {
  const [countdown, setCountdown] = useState(null);
  
  const handlePress = () => {
    if (countdown !== null) {
      setCountdown(null);
      return;
    }
    
    setCountdown(3);
  };
  
  useEffect(() => {
    if (countdown === null) return;
    
    if (countdown === 0) {
      onActivate?.();
      toast.success('Emergency alert sent to registered contacts!', { icon: '🚨' });
      setCountdown(null);
      return;
    }
    
    const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown, onActivate]);
  
  return (
    <button
      onClick={handlePress}
      className={`relative p-4 rounded-2xl transition-all ${
        countdown !== null
          ? 'bg-red-600 animate-pulse'
          : 'bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700'
      } text-white shadow-lg ${className}`}
    >
      <div className="flex items-center gap-3">
        <Phone className="w-6 h-6" />
        <div className="text-left">
          <p className="font-bold">
            {countdown !== null ? `Sending in ${countdown}...` : 'Emergency SOS'}
          </p>
          <p className="text-xs opacity-75">
            {countdown !== null ? 'Tap to cancel' : 'Hold for 3 seconds'}
          </p>
        </div>
      </div>
    </button>
  );
};

export { AccessibilityPanel, VoiceAlertButton, EmergencySOSButton, LANGUAGES };
export default AccessibilityPanel;
