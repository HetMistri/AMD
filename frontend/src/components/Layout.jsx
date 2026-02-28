import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Gauge, 
  AlertTriangle, 
  BarChart3, 
  Receipt, 
  User, 
  Settings, 
  LogOut,
  Menu,
  X,
  Bell,
  ChevronDown,
  Moon,
  Sun,
  Search,
  Sparkles,
  Globe,
  Loader
} from 'lucide-react';
import authService from '../services/authService';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';

const Layout = ({ children, onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();
  const { t, language, availableLanguages, changeLanguage, loading } = useLanguage();
  
  const user = authService.getCurrentUser();
  const selectableLanguages = [
    { code: 'en', name: 'English', nativeName: 'English' },
    ...availableLanguages.filter((lang) => lang.code !== 'en'),
  ];

  const navItems = [
    { path: '/dashboard', label: t('navDashboard'), icon: LayoutDashboard },
    { path: '/meters', label: t('navMeters'), icon: Gauge },
    { path: '/alerts', label: t('navAlerts'), icon: AlertTriangle },
    { path: '/analytics', label: t('navAnalytics'), icon: BarChart3 },
    { path: '/billing', label: t('navBilling'), icon: Receipt },
    { path: '/profile', label: t('navProfile'), icon: User },
  ];

  const handleLanguageChange = async (langCode) => {
    setLanguageMenuOpen(false);
    await changeLanguage(langCode);
  };

  const handleLogout = () => {
    if (onLogout) onLogout();
    else {
      authService.logout();
      navigate('/auth');
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 z-50 h-full w-64 bg-white dark:bg-gray-800 shadow-xl transform transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-gray-700">
            <Link to="/dashboard" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center">
                <Gauge className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900 dark:text-white">{t('title')}</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">{t('smartEnergy')}</p>
              </div>
            </Link>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 overflow-y-auto">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium
                      ${isActive(item.path) 
                        ? 'bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400' 
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                  >
                    <item.icon className={`w-5 h-5 ${isActive(item.path) ? 'text-green-600 dark:text-green-400' : ''}`} />
                    {item.label}
                    {item.path === '/alerts' && (
                      <span className="ml-auto bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">3</span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* User Info */}
          <div className="p-4 border-t border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                {(user?.first_name?.[0] || user?.firstName?.[0] || 'U').toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 dark:text-white truncate">
                  {user?.first_name || user?.firstName || 'User'}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate capitalize">
                  {user?.role || 'Farmer'}
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors font-medium"
            >
              <LogOut className="w-4 h-4" />
              {t('signOut')}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Top Header */}
        <header className="sticky top-0 z-30 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between px-4 lg:px-6 py-4">
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              <Menu className="w-6 h-6 text-gray-600 dark:text-gray-400" />
            </button>

            {/* Search */}
            <div className="hidden md:flex flex-1 max-w-md mx-4">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder={t('searchPlaceholder')}
                  className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 border-none rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-2">
              {/* Dark Mode Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                {isDark ? (
                  <Sun className="w-5 h-5 text-yellow-500" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-600" />
                )}
              </button>

              <div className="relative">
                <button
                  onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
                  className="flex items-center gap-2 px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                  disabled={loading}
                >
                  <Globe className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  <span className="hidden md:inline text-sm text-gray-700 dark:text-gray-300">
                    {selectableLanguages.find(l => l.code === language)?.nativeName || 'English'}
                  </span>
                  {loading ? <Loader className="w-4 h-4 animate-spin text-gray-500" /> : <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${languageMenuOpen ? 'rotate-180' : ''}`} />}
                </button>

                {languageMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setLanguageMenuOpen(false)} />
                    <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 py-2 z-50 max-h-96 overflow-y-auto custom-scrollbar">
                      {selectableLanguages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => handleLanguageChange(lang.code)}
                          className={`w-full text-left px-4 py-2 text-sm transition-colors ${language === lang.code ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                        >
                          <div className="font-medium">{lang.nativeName}</div>
                          <div className="text-xs opacity-70">{lang.name}</div>
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Notifications */}
              <Link 
                to="/alerts"
                className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </Link>

              {/* User Menu (Desktop) */}
              <div className="hidden lg:block relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {(user?.first_name?.[0] || user?.firstName?.[0] || 'U').toUpperCase()}
                  </div>
                  <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 py-2">
                    <Link
                      to="/profile"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <User className="w-4 h-4" />
                      {t('profile')}
                    </Link>
                    <Link
                      to="/settings"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <Settings className="w-4 h-4" />
                      {t('settings')}
                    </Link>
                    <hr className="my-2 border-gray-100 dark:border-gray-700" />
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      <LogOut className="w-4 h-4" />
                      {t('signOut')}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="min-h-[calc(100vh-65px)]">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
