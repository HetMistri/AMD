// Dynamic Translation Service using MyMemory API (Fast & Reliable)
// Supports all major Indian languages - No external packages required!

export const INDIAN_LANGUAGES = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ' },
  { code: 'as', name: 'Assamese', nativeName: 'অসমীয়া' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو' },
  { code: 'sa', name: 'Sanskrit', nativeName: 'संस्कृतम्' },
];

// Base English text that will be translated
export const BASE_TRANSLATIONS = {
  // Navbar & Header
  title: "Gram Meter",
  dashboard: "Dashboard",
  settings: "Settings",
  smartMeter: "Smart Meter",
  smartMeterDashboard: "Smart Meter Dashboard",
  selectLanguage: "Select Language",
  
  // KPI Cards
  liveUsage: "Live Usage",
  dailyCost: "Today's Cost",
  efficiency: "Efficiency Score",
  normal: "Normal Load",
  updated: "Updated",
  justNow: "Just now",
  excellent: "Excellent Consumption",
  voltage: "Voltage",
  currentPower: "Current Power",
  powerConsumption: "Power Consumption",
  
  // Chart
  chartTitle: "24-Hour Consumption Trend",
  usage: "Usage",
  time: "Time",
  
  // Alerts
  alerts: "Smart Alerts",
  voltageSpike: "Voltage Spike",
  spikeMessage: "Spike detected at {time}. Check your water pump.",
  peakHours: "Peak Hours",
  peakMessage: "Rates are high right now. Reduce load.",
  anomalyDetected: "Anomaly Detected",
  highUsage: "High Usage Alert",
  billForecast: "Bill Forecast",
  forecastMessage: "Estimated bill: ₹{amount} if current usage continues",
  highVoltageAlert: "High Voltage Alert",
  dangerHighVoltage: "Danger! Voltage is too high",
  
  // Actions
  simulateAlert: "Simulate WhatsApp Alert",
  viewDetails: "View Details",
  acknowledge: "Acknowledge",
  sending: "Sending...",
  listen: "Listen",
  download: "Download",
  listenVoltage: "Listen Voltage",
  listenBill: "Listen Bill",
  pumpStatus: "Pump Status",
  
  // Stats
  todayUsage: "Today's Usage",
  thisMonth: "This Month",
  thisWeek: "This Week",
  avgDaily: "Avg. Daily",
  thisMonthBill: "This Month's Bill",
  units: "Units",
  dueDate: "Due Date",
  pay: "Pay",
  payment: "Payment",
  
  // Status Labels
  online: "Online",
  offline: "Offline Mode",
  offlineMode: "Offline Mode",
  syncing: "Syncing...",
  lastSync: "Last synced",
  active: "Active",
  statusActive: "Active",
  inactive: "Inactive",
  statusInactive: "Inactive",
  alert: "Alert",
  statusAlert: "Alert",
  offline: "Offline",
  statusOffline: "Offline",
  statusUnknown: "Unknown",
  acknowledged: "Acknowledged",
  resolved: "Resolved",
  
  // Notifications
  alertSent: "Alert sent successfully!",
  dataUpdated: "Data updated",
  offlineWarning: "You're offline. Showing cached data.",
  backOnline: "Back online!",
  noAlerts: "No alerts at the moment",
  
  // Bill Forecast
  projectedMonthly: "Projected Monthly",
  vsLastMonth: "Vs Last Month",
  
  // Pump Control
  pumpControl: "Pump Control",
  turnOn: "Turn ON",
  turnOff: "Turn OFF",
  pumpOn: "Pump is ON",
  pumpOff: "Pump is OFF",
  todayRuntime: "Today's Runtime",
  pumpTurnedOn: "Pump turned on",
  pumpTurnedOff: "Pump turned off",
  
  // Weather
  todayWeather: "Today's Weather",
  humidity: "Humidity",
  wind: "Wind",
  
  // Power Schedule
  powerSchedule: "Power Schedule",
  electricitySchedule: "Electricity Schedule",
  scheduled: "Scheduled",
  currentlyOn: "Currently ON",
  
  // Emergency
  emergency: "Emergency",
  emergencyContacts: "Emergency Contacts",
  tapToCall: "Tap to call",
  electricityBoard: "Electricity Board",
  gramPanchayat: "Gram Panchayat",
  fireEmergency: "Fire Emergency",
  
  // Appliances
  waterPump: "Water Pump",
  refrigerator: "Refrigerator",
  lights: "Lights",
  fan: "Fan",
  ac: "Air Conditioner",
  
  // Units
  kw: "kW",
  kwh: "kWh",
  rupee: "₹",
  volts: "V",
  hours: "hrs",
  
  // Voice Messages - Complete Sentences (Text-to-Speech)
  voiceVoltageReading: "Voltage is {value} volts",
  voiceVoltageDanger: "Danger! Voltage is too high at {value} volts",
  voiceVoltageWarning: "Warning! Voltage is low at {value} volts",
  voiceVoltageOk: "Voltage is normal at {value} volts. Everything is fine",
  voicePowerReading: "Current power usage is {value} kilowatts",
  voiceEnergyTodayReading: "Today's energy usage is {value} kilowatt hours",
  voiceEnergyMonthlyReading: "This month's energy usage is {value} kilowatt hours",
  voiceBillReading: "Your bill is {amount} rupees for {units} units of electricity",
  voiceBillDueReading: "Your electricity bill of {amount} rupees is due in {days} days",
  voicePumpStatusOn: "The water pump is currently turned on",
  voicePumpStatusOff: "The water pump is currently turned off",
  voicePumpTurnedOn: "The water pump has been turned on",
  voicePumpTurnedOff: "The water pump has been turned off",
  voiceEfficiencyReading: "Your energy efficiency score is {value} percent",
  voiceWeatherReading: "Today's weather. Temperature is {temp} degrees. Humidity is {humidity} percent. Wind speed is {wind} kilometers per hour",
  voicePeakHours: "You are currently using electricity during peak hours. Please consider shifting to off-peak hours for better savings",
  voiceDailyReport: "Daily energy report. Today you consumed {energy} kilowatt hours, costing approximately {cost} rupees",
  voiceWeeklyReport: "Weekly report. You consumed {energy} kilowatt hours this week, costing {cost} rupees. You saved {savings} percent compared to last week",
  voiceMonthlyReport: "Monthly report. You consumed {energy} kilowatt hours this month, costing {cost} rupees",
  voiceAnomalyDetected: "Anomaly detected in your power consumption. Please review your meter readings",
  voiceSavingsTip: "Great job! You saved {percent} percent on electricity this month compared to last month",
  voiceHighUsageAlert: "Warning! Your electricity usage is unusually high. Please check your appliances",
  voiceOfflineWarning: "You are currently in offline mode. Showing cached data",
  voiceBackOnline: "Welcome back! You are back online",
  voiceDataUpdated: "Your data has been updated",
  voiceWelcome: "Welcome to Gram Meter. Your smart energy monitoring assistant",
  
  // Voice Messages - Status Notifications
  voiceMetersLoaded: "Loaded {count} meters successfully",
  voiceMetersLoadFailed: "Failed to load meters. Please try again",
  voiceAlertsLoaded: "Loaded {count} new alerts",
  voiceAnalyticsReady: "Analytics data is ready. You can now view your energy insights",
  voiceBillingReady: "Your billing information has been updated",
  voicePaymentSuccessful: "Payment of {amount} rupees has been processed successfully",
  voicePaymentFailed: "Payment failed. Please try again",
  
  // Footer
  poweredBy: "Powered by SmartBijli Squad",
  version: "v1.0",

  // Layout & Navigation
  navDashboard: "Dashboard",
  navMeters: "Meters",
  navAlerts: "Alerts",
  navAnalytics: "Analytics",
  navBilling: "Billing",
  navProfile: "Profile",
  smartEnergy: "Smart Energy",
  signOut: "Sign Out",
  searchPlaceholder: "Search...",
  profile: "Profile",
  notifications: "Notifications",
  preferences: "Preferences",

  // Dashboard Page
  dashboardTitle: "Smart Meter",
  dashboardSubtitle: "Smart Meter Dashboard",
  loading: "Loading...",
  weatherToday: "Today's Weather",
  powerScheduleTitle: "Power Schedule",
  powerScheduleSubtitle: "Electricity Schedule",
  emergencyTitle: "Emergency",
  emergencySubtitle: "Tap to call",
  listenPumpStatus: "Listen Pump Status",
  onText: "ON",
  offText: "OFF",
  currentPowerLabel: "Current Power",
  todayLabel: "Today",
  windSpeed: "12 km/h",
  duePrefix: "Due",
  redirectingToPayment: "Redirecting to payment...",
  alertHighVoltageMessage: "Danger! Voltage is too high ({value}V)",

  // Meters - Deep Localization
  totalMeters: "Total Meters",
  totalMetersLabel: "Total Meters",
  withAlerts: "With Alerts",
  withAlertsLabel: "With Alerts",
  autoRefreshLabel: "Auto-refresh",
  autoRefreshText: "Auto-refresh",
  totalSuffix: "total",
  totalText: "total",
  meter: "Meter",
  unknownLocation: "Unknown Location",
  currentPowerShort: "Current Power",
  currentPowerLabel: "Current Power",
  todaysUsage: "Today's Usage",
  todaysUsageLabel: "Today's Usage",
  efficiencyLabel: "efficiency",
  noData: "No data",
  noDataText: "No data",
  selectMeter: "Select a Meter",
  selectMeterText: "Select a Meter",
  selectMeterSubtitle: "Click on a meter card to view detailed readings and analytics",
  selectMeterHelperText: "Click on a meter card to view detailed readings and analytics",
  liveReadings: "Live Readings",
  liveReadingsLabel: "Live Readings",
  live: "Live",
  liveText: "Live",
  current: "Current",
  currentLabel: "Current",
  power: "Power",
  powerLabel: "Power",
  energy: "Energy",
  energyLabel: "Energy",
  powerFactor: "Power Factor",
  powerFactorLabel: "Power Factor",
  frequency: "Frequency",
  frequencyLabel: "Frequency",
  voltageLabel: "Voltage",
  vsLastWeek: "vs last week",
  powerConsumption24h: "Power Consumption (Last 24 Hours)",
  powerConsumptionChart: "Power Consumption (Last 24 Hours)",
  voltageCurrentTrends24h: "Voltage & Current Trends (24 Hours)",
  voltageCurrentTrendsChart: "Voltage & Current Trends (24 Hours)",
  dailyEnergyComparisonAllMeters: "Daily Energy Comparison (All Meters)",
  dailyEnergyComparisonChart: "Daily Energy Comparison (All Meters)",
  todaysEnergy: "Today's Energy",
  todaysEnergyTooltip: "Today's Energy",
  todaysEnergyChartLabel: "Today's Energy (kWh)",
  failedToLoadMeters: "Failed to load meters",
  activeLabel: "Active",
  offlineLabel: "Offline",

  // Analytics - Deep Localization
  day: "Day",
  week: "Week",
  month: "Month",
  versusLastPeriod: "{value}% vs last period",
  savingsPercent: "{value}% savings",
  improvementPercent: "{value}% improvement",
  greenEnergyTag: "Green energy",
  energyConsumptionOverTime: "Energy Consumption Over Time",
  efficiencyPerformance: "Efficiency Performance",
  costAnalysisProjection: "Cost Analysis & Projection",
  carbonEmissionsTracking: "Carbon Emissions Tracking",
  dailyUsagePattern: "Daily Usage Pattern",
  energyKwhLabel: "Energy (kWh)",
  costRupeeLabel: "Cost (₹)",
  efficiencyPercentLabel: "Efficiency (%)",
  loadBalancePercentLabel: "Load Balance (%)",
  co2SavedKgLabel: "CO₂ Saved (kg)",
  co2EmittedKgLabel: "CO₂ Emitted (kg)",
  carbonSavedKgLabel: "CO₂ Saved (kg)",
  carbonEmittedKgLabel: "CO₂ Emitted (kg)",
  netCo2KgLabel: "Net CO₂ (kg)",
  usageKwLabel: "Usage (kW)",
  peakHoursLabel: "Peak Hours",
  aiInsight: "AI Insight",
  aiInsightLabel: "AI Insight",
  insightConsumptionDay: "Peak consumption occurs during 10 AM - 2 PM and 6 PM - 9 PM. Consider load balancing during these hours.",
  insightConsumptionWeek: "Weekday consumption is 40% higher than weekends. Optimize irrigation schedules for better efficiency.",
  insightConsumptionMonth: "Mid-month shows highest energy usage (irrigation season). Plan maintenance during low-consumption periods.",
  efficiencyAnalysis: "Efficiency Analysis",
  efficiencyAnalysisLabel: "Efficiency Analysis",
  insightEfficiencyDay: "Night hours show 95%+ efficiency. Peak loads (10 AM-2 PM) have reduced efficiency due to heavy equipment usage.",
  insightEfficiencyWeek: "Weekend efficiency is 12% higher due to reduced load. Consider power factor correction during weekdays.",
  insightEfficiencyMonth: "Average efficiency: 82%. Install capacitor banks to improve power factor during high-load periods.",
  costOptimization: "Cost Optimization",
  costOptimizationLabel: "Cost Optimization",
  insightCostDay: "Shifting 30% of non-critical loads to off-peak hours could save ₹50-80 daily.",
  insightCostWeek: "Current average: ₹{costPerDay}/day. Solar integration could reduce this by 20-25%.",
  insightCostMonth: "Monthly cost: ₹{monthlyCost}. Demand-side management could save ₹800-1200/month.",
  environmentalImpact: "Environmental Impact",
  environmentalImpactLabel: "Environmental Impact",
  insightCarbonDay: "Green energy offset: 15%. Daily carbon saved equivalent to planting 0.2 trees.",
  insightCarbonWeek: "Weekly carbon savings: {carbonSaved}kg CO₂. Equivalent to removing a car for 2 days.",
  insightCarbonMonth: "Monthly carbon offset: {carbonSaved}kg. Expanding solar could double this impact.",
  usagePattern: "Usage Pattern",
  usagePatternLabel: "Usage Pattern",
  usagePatternText: "Peak usage: 10 AM - 2 PM (irrigation) and 6 PM - 9 PM (lighting/equipment). Off-peak hours offer better rates.",
  insightPatternAll: "Peak usage: 10 AM - 2 PM (irrigation) and 6 PM - 9 PM (lighting/equipment). Off-peak hours offer better rates.",
  efficiencyBreakdown: "Efficiency Breakdown",
  score: "Score",
  scoreLabel: "Score",
  powerFactorSubject: "Power Factor",
  loadBalanceSubject: "Load Balance",
  peakEfficiencySubject: "Peak Efficiency",
  offPeakUsageSubject: "Off-Peak Usage",
  standbyPowerSubject: "Standby Power",
  voltageQualitySubject: "Voltage Quality",
  costDistribution: "Cost Distribution",
  irrigation: "Irrigation",
  irrigationCategory: "Irrigation",
  lighting: "Lighting",
  lightingCategory: "Lighting",
  equipment: "Equipment",
  equipmentCategory: "Equipment",
  other: "Other",
  otherCategory: "Other",
  mlPoweredInsights: "ML-Powered Insights",
  predictedMonthlyUsage: "Predicted Monthly Usage",
  basedOnCurrentPatterns: "Based on current patterns",
  anomalyDetection: "Anomaly Detection",
  anomalyDetectionLabel: "Anomaly Detection",
  foundCount: "{count} Found",
  foundText: "Found",
  last7Days: "Last 7 days",
  lastSevenDays: "Last 7 days",
  optimizationPotential: "Optimization Potential",
  savingsOpportunity: "Savings opportunity",

  // Meters Page
  smartMetersTitle: "Smart Meters",
  smartMetersSubtitle: "Monitor and manage all connected meters",
  refresh: "Refresh",
  allMeters: "All Meters",
  liveReadings: "Live Readings",
  loadingMeters: "Loading meters...",
  loadingMeterData: "Loading meter data...",
  noMetersFound: "No meters found",

  // Alerts Page
  alertCenterTitle: "Alert Center",
  alertCenterSubtitle: "Monitor and manage system alerts",
  loadingAlerts: "Loading alerts...",
  filters: "Filters",
  allStatus: "All Status",
  allPriorities: "All Priorities",
  allTypes: "All Types",
  selectAll: "Select All",
  noAlertsFound: "No Alerts Found",
  totalAlerts: "Total Alerts",
  byPriority: "By Priority",
  byStatus: "By Status",
  quickActions: "Quick Actions",
  viewCriticalAlerts: "View Critical Alerts",
  viewActiveAlerts: "View Active Alerts",
  clearFilters: "Clear Filters",
  noData: "No data",
  count: "Count",
  alertForMeter: "Meter: {meter}",
  unknown: "Unknown",
  noDescriptionAvailable: "No description available",
  active: "Active",
  acknowledged: "Acknowledged",
  resolved: "Resolved",
  critical: "Critical",
  high: "High",
  medium: "Medium",
  low: "Low",
  acknowledgeAll: "Acknowledge All",
  clear: "Clear",
  paid: "Paid",
  pending: "Pending",
  overdue: "Overdue",
  alertSelectedCount: "{count} alert(s) selected",
  alertTotalCount: "{count} alert(s)",
  tryAdjustingFilters: "Try adjusting your filters",
  systemsRunningSmoothly: "All systems are running smoothly",
  versusLastWeek: "{value}% vs last week",
  statusLabel: "Status",
  priorityLabel: "Priority",
  typeLabel: "Type",
  all: "All",
  minuteAgoShort: "m ago",
  hourAgoShort: "h ago",
  dayAgoShort: "d ago",

  // Analytics Page
  analyticsTitle: "Energy Analytics",
  analyticsSubtitle: "ML-powered insights and consumption analysis",
  loadingAnalytics: "Loading Analytics...",
  totalConsumption: "Total Consumption",
  totalCost: "Total Cost",
  efficiencyScore: "Efficiency Score",
  carbonSaved: "Carbon Saved",

  // Billing Page
  billingTitle: "Billing & Payments",
  billingSubtitle: "Manage your bills, invoices and payments",
  loadingBillingData: "Loading billing data...",
  overview: "Overview",
  bills: "Bills",
  invoices: "Invoices",
  monthlyBillingTrend: "Monthly Billing Trend",
  paymentStatus: "Payment Status",
  allInvoices: "All Invoices",
  lastMonth: "Last Month",
  last3Months: "Last 3 Months",
  last6Months: "Last 6 Months",
  lastYear: "Last Year",
  totalBilled: "Total Billed",
  pendingAmount: "Pending Amount",
  totalUnits: "Total Units",
  avgRate: "Avg. Rate",
  currentMonthLive: "Current Month (Live)",
  liveCalculation: "Live Calculation",
  baseAmount: "Base Amount",
  fixedCharges: "Fixed Charges",
  electricityDuty: "Electricity Duty (15%)",
  noPaymentData: "No payment data",
  unitsVsAmountComparison: "Units vs Amount Comparison",
  noBillsFound: "No Bills Found",
  billsAppearHere: "Your bills will appear here once generated",
  totalInvoicesCount: "{count} total invoices",
  noInvoicesFound: "No Invoices Found",
  invoicesAppearHere: "Your invoices will appear here once generated",
  billDetails: "Bill Details",
  billNumber: "Bill Number",
  billingPeriod: "Billing Period",
  unitsConsumed: "Units Consumed",
  rate: "Rate",
  totalAmount: "Total Amount",
  payNow: "Pay Now",
  amountLabel: "Amount",
  meterId: "Meter ID",
  unitsLabel: "Units",
  print: "Print",
  billsCount: "{count} bills",
  versusLastMonth: "{value}% vs last month",
  view: "View",
  downloadPdf: "Download PDF",

  // Profile & Settings
  settingsTitle: "Settings",
  settingsSubtitle: "Manage your profile and preferences",
  personalInformation: "Personal Information",
  firstName: "First Name",
  lastName: "Last Name",
  mobileNumber: "Mobile Number",
  mobileCannotChange: "Mobile number cannot be changed",
  villageLocation: "Village/Location",
  emailOptional: "Email (Optional)",
  saveChanges: "Save Changes",
  editProfile: "Edit Profile",
  notificationChannels: "Notification Channels",
  notificationTypes: "Notification Types",
  pushNotifications: "Push Notifications",
  pushNotificationsDesc: "Receive in-app notifications",
  smsNotifications: "SMS Notifications",
  smsNotificationsDesc: "Receive alerts via SMS",
  notificationSound: "Notification Sound",
  notificationSoundDesc: "Play sound for notifications",
  alertNotifications: "Alert Notifications",
  alertNotificationsDesc: "Meter alerts and warnings",
  billingNotifications: "Billing Notifications",
  billingNotificationsDesc: "Bill generation and payment reminders",
  systemUpdates: "System Updates",
  systemUpdatesDesc: "App updates and new features",
  display: "Display",
  darkMode: "Dark Mode",
  darkModeDesc: "Use dark theme",
  autoRefresh: "Auto Refresh",
  autoRefreshDesc: "Automatically refresh data",
  language: "Language",
  dataUsage: "Data Usage",
  dataUsageLow: "Low",
  dataUsageLowDesc: "Minimal data, basic charts",
  dataUsageNormal: "Normal",
  dataUsageNormalDesc: "Standard data usage",
  dataUsageHigh: "High",
  dataUsageHighDesc: "Full data, all features",
  security: "Security",
  changePin: "Change PIN",
  changePinDesc: "Update your 4-digit PIN",
  twoFactorAuth: "Two-Factor Authentication",
  twoFactorAuthDesc: "OTP verification enabled",
  enabled: "Enabled",
  loginHistory: "Login History",
  loginHistoryDesc: "View recent login activity",
  data: "Data",
  exportMyData: "Export My Data",
  exportMyDataDesc: "Download all your data",
  deleteAccount: "Delete Account",
  deleteAccountDesc: "Permanently delete your account",
  support: "Support",
  helpCenter: "Help Center",
  helpCenterDesc: "FAQs and guides",
  contactSupport: "Contact Support",
  contactSupportDesc: "Get help from our team",
  about: "About",
  aboutDesc: "App version 1.0.0",
  
  // Language Selection
  languageChanged: "Language changed to",
  indianLanguages: "Indian Languages",
};

// Translation cache to avoid repeated API calls
const translationCache = {};
const TRANSLATION_CACHE_VERSION = 'v4';

const MYMEMORY_LANG_MAP = {
  en: 'en',
  hi: 'hi',
  gu: 'gu',
  ta: 'ta',
  te: 'te',
  kn: 'kn',
  ml: 'ml',
  mr: 'mr',
  pa: 'pa',
  bn: 'bn',
  or: 'or',
  as: 'as',
  ur: 'ur',
  sa: 'sa',
};

const GOOGLE_LANG_MAP = {
  en: 'en',
  hi: 'hi',
  gu: 'gu',
  ta: 'ta',
  te: 'te',
  kn: 'kn',
  ml: 'ml',
  mr: 'mr',
  pa: 'pa',
  bn: 'bn',
  or: 'or',
  as: 'as',
  ur: 'ur',
  sa: 'sa',
};

function getMyMemoryLangCode(targetLang) {
  return MYMEMORY_LANG_MAP[targetLang] || targetLang;
}

function getGoogleLangCode(targetLang) {
  return GOOGLE_LANG_MAP[targetLang] || targetLang;
}

async function fetchWithTimeout(url, options = {}, timeoutMs = 8000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, { ...options, signal: controller.signal });
    return response;
  } finally {
    clearTimeout(timer);
  }
}

async function translateWithGoogle(text, targetLang) {
  const mappedLang = getGoogleLangCode(targetLang);
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${encodeURIComponent(mappedLang)}&dt=t&q=${encodeURIComponent(text)}`;

  const response = await fetchWithTimeout(url, { method: 'GET' }, 7000);
  if (!response.ok) return null;

  const data = await response.json();
  if (!Array.isArray(data) || !Array.isArray(data[0])) return null;

  const translated = data[0]
    .map((chunk) => (Array.isArray(chunk) ? chunk[0] : ''))
    .join('')
    .trim();

  return translated || null;
}

async function translateWithMyMemory(text, targetLang) {
  const mappedLang = getMyMemoryLangCode(targetLang);
  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${encodeURIComponent(mappedLang)}`;

  const response = await fetchWithTimeout(
    url,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    },
    9000
  );

  if (!response.ok) return null;
  const data = await response.json();
  const translated = data?.responseData?.translatedText?.trim();
  return translated || null;
}

function isSameMeaningFallback(original, translated) {
  if (!translated) return true;
  return original.trim().toLowerCase() === translated.trim().toLowerCase();
}

function getTranslationCoverage(translations) {
  const entries = Object.entries(BASE_TRANSLATIONS);
  const changedCount = entries.reduce((count, [key, baseValue]) => {
    const translatedValue = translations?.[key];
    if (!translatedValue) return count;
    return translatedValue.trim().toLowerCase() === baseValue.trim().toLowerCase() ? count : count + 1;
  }, 0);
  return changedCount / entries.length;
}

async function translateEntries(entries, targetLang, initialTranslations = {}, onProgress) {
  const translations = { ...initialTranslations };
  const queue = entries.filter(([key]) => !(key in translations));
  const concurrency = 24;
  let currentIndex = 0;
  const total = entries.length;
  let completed = Object.keys(translations).length;

  const emitProgress = () => {
    if (typeof onProgress === 'function') {
      onProgress({ completed, total });
    }
  };

  emitProgress();

  async function worker() {
    while (currentIndex < queue.length) {
      const index = currentIndex;
      currentIndex += 1;

      const [key, value] = queue[index];
      const translated = await translateText(value, targetLang);
      translations[key] = translated;
      completed += 1;
      if (completed % 5 === 0 || completed === total) {
        emitProgress();
      }
    }
  }

  const workerCount = Math.min(concurrency, queue.length || 1);
  const workers = Array.from({ length: workerCount }, () => worker());
  await Promise.all(workers);
  emitProgress();

  return translations;
}

/**
 * Translate text using MyMemory Translation API (Fast, Free, No Package Required)
 * MyMemory is a collaborative translation database with excellent coverage
 */
async function translateText(text, targetLang) {
  if (targetLang === 'en') return text;
  
  const cacheKey = `${text}_${targetLang}`;
  if (translationCache[cacheKey]) {
    return translationCache[cacheKey];
  }

  const providers = [translateWithGoogle, translateWithMyMemory];

  for (const provider of providers) {
    try {
      const translatedText = await provider(text, targetLang);
      if (!translatedText) continue;

      if (!isSameMeaningFallback(text, translatedText) || text.trim().length <= 3) {
        translationCache[cacheKey] = translatedText;
        return translatedText;
      }
    } catch (error) {
      console.warn('Translation provider failed:', error);
    }
  }

  // Return original text on error
  translationCache[cacheKey] = text;
  return text;
}

/**
 * Translate all base translations to target language
 * Uses parallel translation for speed
 */
export async function translateAllTexts(targetLang, onProgress) {
  if (targetLang === 'en') {
    return BASE_TRANSLATIONS;
  }

  // Check if we have cached translations for this language
  const cacheKey = `all_translations_${TRANSLATION_CACHE_VERSION}_${targetLang}`;
  const cached = localStorage.getItem(cacheKey);
  const entries = Object.entries(BASE_TRANSLATIONS);
  
  if (cached) {
    try {
      const cachedTranslations = JSON.parse(cached);
      const coverage = getTranslationCoverage(cachedTranslations);
      const missingEntries = entries.filter(([key]) => !(key in cachedTranslations));

      if (missingEntries.length === 0 && coverage >= 0.2) {
        return cachedTranslations;
      }

      const baseForBackfill = coverage >= 0.2 ? cachedTranslations : {};
      const backfilledTranslations = await translateEntries(entries, targetLang, baseForBackfill, onProgress);

      try {
        localStorage.setItem(cacheKey, JSON.stringify(backfilledTranslations));
      } catch (e) {
        console.warn('Could not update cached translations:', e);
      }

      return backfilledTranslations;
    } catch (error) {
      console.warn('Invalid cache, re-translating:', error);
    }
  }

  // Translate all texts with controlled high concurrency for faster first-load
  const translations = await translateEntries(entries, targetLang, {}, onProgress);

  // Cache the translations
  try {
    localStorage.setItem(cacheKey, JSON.stringify(translations));
  } catch (e) {
    console.warn('Could not cache translations:', e);
  }

  return translations;
}

/**
 * Detect user's preferred language from browser
 */
export function detectUserLanguage() {
  const browserLang = navigator.language.split('-')[0];
  const supportedLang = INDIAN_LANGUAGES.find(lang => lang.code === browserLang);
  return supportedLang ? browserLang : 'en';
}

/**
 * Clear translation cache (useful when switching languages frequently)
 */
export function clearTranslationCache() {
  Object.keys(localStorage).forEach(key => {
    if (key.startsWith('all_translations_')) {
      localStorage.removeItem(key);
    }
  });
  Object.keys(translationCache).forEach(key => {
    delete translationCache[key];
  });
}
