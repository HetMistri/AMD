import React, { useState, useEffect } from 'react';
import { 
  User, 
  Settings, 
  Bell, 
  Shield, 
  Globe, 
  Moon, 
  Sun,
  Phone,
  MapPin,
  Mail,
  LogOut,
  ChevronRight,
  Save,
  Camera,
  Edit2,
  Check,
  X,
  Lock,
  Smartphone,
  MessageSquare,
  Volume2,
  VolumeX,
  Eye,
  EyeOff,
  RefreshCw,
  Trash2,
  Download,
  HelpCircle,
  Info
} from 'lucide-react';
import authService from '../services/authService';
import { useLanguage } from '../contexts/LanguageContext';

// Toggle Switch Component
const Toggle = ({ enabled, onChange, label }) => (
  <button
    onClick={() => onChange(!enabled)}
    className="flex items-center gap-3 w-full"
  >
    <div className={`relative w-11 h-6 rounded-full transition-colors ${enabled ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'}`}>
      <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${enabled ? 'translate-x-5' : ''}`}></div>
    </div>
    <span className="text-gray-700 dark:text-gray-300">{label}</span>
  </button>
);

// Section Card Component
const SectionCard = ({ icon: Icon, title, children, className = '' }) => (
  <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm ${className}`}>
    <div className="p-5 border-b border-gray-100 dark:border-gray-700 flex items-center gap-3">
      <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
        <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
    </div>
    <div className="p-5">{children}</div>
  </div>
);

// Setting Row Component
const SettingRow = ({ icon: Icon, label, description, children, onClick }) => (
  <div 
    className={`flex items-center justify-between py-4 ${onClick ? 'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 -mx-5 px-5 transition-colors' : ''}`}
    onClick={onClick}
  >
    <div className="flex items-center gap-3">
      {Icon && (
        <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
          <Icon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
        </div>
      )}
      <div>
        <p className="font-medium text-gray-900 dark:text-white">{label}</p>
        {description && <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>}
      </div>
    </div>
    {children}
  </div>
);

// Main Profile/Settings Page
const Profile = () => {
  const { t, language, availableLanguages, changeLanguage } = useLanguage();
  const [activeTab, setActiveTab] = useState('profile');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  
  // Form states
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    mobile: '',
    village: '',
    email: '',
    role: ''
  });
  
  // Notification preferences
  const [notifications, setNotifications] = useState({
    pushEnabled: true,
    smsEnabled: true,
    alertNotifications: true,
    billingNotifications: true,
    systemUpdates: false,
    soundEnabled: true
  });
  
  // App preferences
  const [preferences, setPreferences] = useState({
    darkMode: false,
    language: 'en',
    autoRefresh: true,
    dataUsage: 'normal'
  });

  useEffect(() => {
    // Load user data from localStorage or API
    const userData = authService.getCurrentUser();
    if (userData) {
      setUser(userData);
      setFormData({
        firstName: userData.first_name || userData.firstName || '',
        lastName: userData.last_name || userData.lastName || '',
        mobile: userData.mobile_number || userData.mobile || '',
        village: userData.village || '',
        email: userData.email || '',
        role: userData.role || 'farmer'
      });
    }
    
    // Load saved preferences
    const savedNotifications = localStorage.getItem('notificationPrefs');
    const savedPreferences = localStorage.getItem('appPreferences');
    
    if (savedNotifications) setNotifications(JSON.parse(savedNotifications));
    if (savedPreferences) setPreferences(JSON.parse(savedPreferences));
    
    // Check dark mode
    setPreferences(prev => ({
      ...prev,
      darkMode: document.documentElement.classList.contains('dark')
    }));
    
    setLoading(false);
  }, []);

  useEffect(() => {
    setPreferences((prev) => ({ ...prev, language }));
  }, [language]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = async () => {
    setSaving(true);
    try {
      // Here you would call the API to update user profile
      // await api.updateProfile(formData);
      
      // Update local storage
      const updatedUser = {
        ...user,
        first_name: formData.firstName,
        last_name: formData.lastName,
        village: formData.village,
        email: formData.email
      };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      setEditing(false);
    } catch (err) {
      console.error('Failed to save profile:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleNotificationChange = (key, value) => {
    const updated = { ...notifications, [key]: value };
    setNotifications(updated);
    localStorage.setItem('notificationPrefs', JSON.stringify(updated));
  };

  const handlePreferenceChange = (key, value) => {
    const updated = { ...preferences, [key]: value };
    setPreferences(updated);
    localStorage.setItem('appPreferences', JSON.stringify(updated));
    
    // Apply dark mode immediately
    if (key === 'darkMode') {
      document.documentElement.classList.toggle('dark', value);
    }

    if (key === 'language') {
      changeLanguage(value);
    }
  };

  const handleLogout = () => {
    authService.logout();
    window.location.href = '/';
  };

  const tabs = [
    { id: 'profile', label: t('profile'), icon: User },
    { id: 'notifications', label: t('notifications'), icon: Bell },
    { id: 'preferences', label: t('preferences'), icon: Settings },
    { id: 'security', label: t('security'), icon: Shield },
  ];

  const languages = [
    { code: 'en', name: 'English', nativeName: 'English' },
    ...availableLanguages.filter((lang) => lang.code !== 'en'),
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <RefreshCw className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t('settingsTitle')}</h1>
          <p className="text-gray-500 dark:text-gray-400">{t('settingsSubtitle')}</p>
        </div>

        {/* Profile Card */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 mb-6 text-white">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-3xl font-bold">
                {(formData.firstName?.[0] || 'U').toUpperCase()}
              </div>
              <button className="absolute bottom-0 right-0 p-1.5 bg-white rounded-full text-blue-600 hover:bg-gray-100">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <div>
              <h2 className="text-xl font-bold">{formData.firstName} {formData.lastName}</h2>
              <p className="text-blue-100">{formData.mobile}</p>
              <p className="text-sm text-blue-200 capitalize">{formData.role}</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap
                ${activeTab === tab.id 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'profile' && (
          <SectionCard icon={User} title={t('personalInformation')}>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('firstName')}</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    disabled={!editing}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white disabled:opacity-60"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('lastName')}</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    disabled={!editing}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white disabled:opacity-60"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('mobileNumber')}</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    disabled
                    className="w-full pl-12 pr-4 py-3 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-500 dark:text-gray-400"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">{t('mobileCannotChange')}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('villageLocation')}</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="village"
                    value={formData.village}
                    onChange={handleInputChange}
                    disabled={!editing}
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white disabled:opacity-60"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('emailOptional')}</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={!editing}
                    placeholder={t('emailOptional')}
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white disabled:opacity-60"
                  />
                </div>
              </div>
              
              <div className="flex gap-3 pt-4">
                {editing ? (
                  <>
                    <button
                      onClick={handleSaveProfile}
                      disabled={saving}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium disabled:opacity-50"
                    >
                      {saving ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                      {t('saveChanges')}
                    </button>
                    <button
                      onClick={() => setEditing(false)}
                      className="px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setEditing(true)}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
                  >
                    <Edit2 className="w-5 h-5" />
                    {t('editProfile')}
                  </button>
                )}
              </div>
            </div>
          </SectionCard>
        )}

        {activeTab === 'notifications' && (
          <div className="space-y-6">
            <SectionCard icon={Bell} title={t('notificationChannels')}>
              <div className="space-y-4">
                <SettingRow 
                  icon={Bell} 
                  label={t('pushNotifications')} 
                  description={t('pushNotificationsDesc')}
                >
                  <Toggle 
                    enabled={notifications.pushEnabled} 
                    onChange={(v) => handleNotificationChange('pushEnabled', v)} 
                  />
                </SettingRow>
                
                <SettingRow 
                  icon={MessageSquare} 
                  label={t('smsNotifications')} 
                  description={t('smsNotificationsDesc')}
                >
                  <Toggle 
                    enabled={notifications.smsEnabled} 
                    onChange={(v) => handleNotificationChange('smsEnabled', v)} 
                  />
                </SettingRow>
                
                <SettingRow 
                  icon={notifications.soundEnabled ? Volume2 : VolumeX} 
                  label={t('notificationSound')} 
                  description={t('notificationSoundDesc')}
                >
                  <Toggle 
                    enabled={notifications.soundEnabled} 
                    onChange={(v) => handleNotificationChange('soundEnabled', v)} 
                  />
                </SettingRow>
              </div>
            </SectionCard>

            <SectionCard icon={Bell} title={t('notificationTypes')}>
              <div className="space-y-4">
                <SettingRow 
                  label={t('alertNotifications')} 
                  description={t('alertNotificationsDesc')}
                >
                  <Toggle 
                    enabled={notifications.alertNotifications} 
                    onChange={(v) => handleNotificationChange('alertNotifications', v)} 
                  />
                </SettingRow>
                
                <SettingRow 
                  label={t('billingNotifications')} 
                  description={t('billingNotificationsDesc')}
                >
                  <Toggle 
                    enabled={notifications.billingNotifications} 
                    onChange={(v) => handleNotificationChange('billingNotifications', v)} 
                  />
                </SettingRow>
                
                <SettingRow 
                  label={t('systemUpdates')} 
                  description={t('systemUpdatesDesc')}
                >
                  <Toggle 
                    enabled={notifications.systemUpdates} 
                    onChange={(v) => handleNotificationChange('systemUpdates', v)} 
                  />
                </SettingRow>
              </div>
            </SectionCard>
          </div>
        )}

        {activeTab === 'preferences' && (
          <div className="space-y-6">
            <SectionCard icon={Settings} title={t('display')}>
              <div className="space-y-4">
                <SettingRow 
                  icon={preferences.darkMode ? Moon : Sun} 
                  label={t('darkMode')} 
                  description={t('darkModeDesc')}
                >
                  <Toggle 
                    enabled={preferences.darkMode} 
                    onChange={(v) => handlePreferenceChange('darkMode', v)} 
                  />
                </SettingRow>
                
                <SettingRow 
                  icon={RefreshCw} 
                  label={t('autoRefresh')} 
                  description={t('autoRefreshDesc')}
                >
                  <Toggle 
                    enabled={preferences.autoRefresh} 
                    onChange={(v) => handlePreferenceChange('autoRefresh', v)} 
                  />
                </SettingRow>
              </div>
            </SectionCard>

            <SectionCard icon={Globe} title={t('language')}>
              <div className="space-y-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handlePreferenceChange('language', lang.code)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-colors
                      ${language === lang.code 
                        ? 'bg-blue-50 dark:bg-blue-900/30 border-2 border-blue-500' 
                        : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'}`}
                  >
                      <span className="font-medium text-gray-900 dark:text-white">{lang.nativeName || lang.name}</span>
                    {language === lang.code && (
                      <Check className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    )}
                  </button>
                ))}
              </div>
            </SectionCard>

            <SectionCard icon={Info} title={t('dataUsage')}>
              <div className="space-y-2">
                {[
                  { value: 'low', label: t('dataUsageLow'), desc: t('dataUsageLowDesc') },
                  { value: 'normal', label: t('dataUsageNormal'), desc: t('dataUsageNormalDesc') },
                  { value: 'high', label: t('dataUsageHigh'), desc: t('dataUsageHighDesc') },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handlePreferenceChange('dataUsage', option.value)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-colors
                      ${preferences.dataUsage === option.value 
                        ? 'bg-blue-50 dark:bg-blue-900/30 border-2 border-blue-500' 
                        : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'}`}
                  >
                    <div>
                      <span className="font-medium text-gray-900 dark:text-white">{option.label}</span>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{option.desc}</p>
                    </div>
                    {preferences.dataUsage === option.value && (
                      <Check className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    )}
                  </button>
                ))}
              </div>
            </SectionCard>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="space-y-6">
            <SectionCard icon={Shield} title={t('security')}>
              <div className="divide-y divide-gray-100 dark:divide-gray-700">
                <SettingRow 
                  icon={Lock} 
                  label={t('changePin')} 
                  description={t('changePinDesc')}
                  onClick={() => {}}
                >
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </SettingRow>
                
                <SettingRow 
                  icon={Smartphone} 
                  label={t('twoFactorAuth')} 
                  description={t('twoFactorAuthDesc')}
                >
                  <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm font-medium rounded-full">
                    {t('enabled')}
                  </span>
                </SettingRow>
                
                <SettingRow 
                  icon={Eye} 
                  label={t('loginHistory')} 
                  description={t('loginHistoryDesc')}
                  onClick={() => {}}
                >
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </SettingRow>
              </div>
            </SectionCard>

            <SectionCard icon={Download} title={t('data')}>
              <div className="divide-y divide-gray-100 dark:divide-gray-700">
                <SettingRow 
                  icon={Download} 
                  label={t('exportMyData')} 
                  description={t('exportMyDataDesc')}
                  onClick={() => {}}
                >
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </SettingRow>
                
                <SettingRow 
                  icon={Trash2} 
                  label={t('deleteAccount')} 
                  description={t('deleteAccountDesc')}
                  onClick={() => {}}
                >
                  <ChevronRight className="w-5 h-5 text-red-400" />
                </SettingRow>
              </div>
            </SectionCard>

            <SectionCard icon={HelpCircle} title={t('support')}>
              <div className="divide-y divide-gray-100 dark:divide-gray-700">
                <SettingRow 
                  icon={HelpCircle} 
                  label={t('helpCenter')} 
                  description={t('helpCenterDesc')}
                  onClick={() => {}}
                >
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </SettingRow>
                
                <SettingRow 
                  icon={MessageSquare} 
                  label={t('contactSupport')} 
                  description={t('contactSupportDesc')}
                  onClick={() => {}}
                >
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </SettingRow>
                
                <SettingRow 
                  icon={Info} 
                  label={t('about')} 
                  description={t('aboutDesc')}
                  onClick={() => {}}
                >
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </SettingRow>
              </div>
            </SectionCard>
          </div>
        )}

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full mt-6 flex items-center justify-center gap-2 px-4 py-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors font-medium"
        >
          <LogOut className="w-5 h-5" />
          {t('signOut')}
        </button>
      </div>
    </div>
  );
};

export default Profile;
