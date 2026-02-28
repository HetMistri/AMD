// Rural Dashboard - Simple & Practical for Farmers
import React, { useEffect, useRef, useState } from 'react';
import { 
  Zap, Droplets, Phone, Volume2, Sun, Cloud, Clock, 
  AlertTriangle, CheckCircle, IndianRupee, Calendar, 
  Power, PhoneCall, Wind
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useRealtimeData, useBillingData } from '../hooks/useRealtimeData';
import toast from 'react-hot-toast';
import { addDashboardAlertToHistory } from '../services/alertHistory';

// Voice Alert Helper with Language Support + Voice Detection
const speakText = async (text, lang = 'en-IN') => {
  if (!text) {
    console.warn('⚠️ Empty text provided to TTS');
    return;
  }
  
  console.log('🔊 Speaking via backend TTS:', { text, lang });
  
  try {
    // Extract language code from locale (e.g., 'en' from 'en-IN')
    const langCode = lang.split('-')[0];
    
    // Call backend TTS API - use correct API URL with v1
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';
    const fullUrl = `${apiUrl}/tts/`;
    console.log('📡 TTS API URL:', fullUrl);
    
    const response = await fetch(fullUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: text,
        language: langCode,
      }),
    });
    
    console.log('📡 TTS API Response Status:', response.status);
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      console.error('🔊 TTS API error (HTTP ' + response.status + '):', error);
      return;
    }
    
    // Get audio blob and play it
    const audioBlob = await response.blob();
    console.log('🎵 Audio blob received, size:', audioBlob.size);
    
    const audioUrl = URL.createObjectURL(audioBlob);
    
    const audio = new Audio(audioUrl);
    audio.volume = 1;
    audio.onerror = (e) => {
      console.error('🔊 Audio playback error:', e);
    };
    audio.onended = () => {
      console.log('✅ Speech playback finished');
      URL.revokeObjectURL(audioUrl);
    };
    
    await audio.play();
    console.log('🎵 Playing backend TTS audio');
    
  } catch (error) {
    console.error('❌ Error calling TTS API:', error);
  }
};

// Large Status Card
const BigStatusCard = ({ icon: Icon, label, value, unit, status, color, onSpeak }) => {
  const statusColors = { good: 'bg-green-500', warning: 'bg-yellow-500', danger: 'bg-red-500', off: 'bg-gray-400' };
  return (
    <div className={`relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border-2 ${
      status === 'danger' ? 'border-red-500 animate-pulse' : 
      status === 'warning' ? 'border-yellow-500' : 'border-slate-200 dark:border-gray-700'
    } transition-all`}>
      <div className={`absolute top-3 right-3 w-4 h-4 rounded-full ${statusColors[status] || statusColors.good}`} />
      <div className={`w-16 h-16 rounded-xl ${color} flex items-center justify-center mb-4`}>
        <Icon className="w-8 h-8 text-white" />
      </div>
      <p className="text-slate-500 dark:text-gray-400 text-sm">{label}</p>
      <div className="flex items-baseline gap-2">
        <span className="text-4xl font-bold text-slate-900 dark:text-white">{value}</span>
        <span className="text-xl text-slate-500 dark:text-gray-400">{unit}</span>
      </div>
      {onSpeak && (
        <button onClick={(e) => { e.stopPropagation(); onSpeak(); }}
          className="absolute bottom-3 right-3 p-2 bg-blue-100 rounded-full hover:bg-blue-200">
          <Volume2 className="w-5 h-5 text-blue-600" />
        </button>
      )}
    </div>
  );
};

// Pump Control Card
const PumpControlCard = ({ isOn, onToggle, runtime, onSpeak, t }) => (
  <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 text-white shadow-lg">
    <div className="flex items-center justify-between mb-4">
      <div>
        <h3 className="text-xl font-bold">Pump Control</h3>
        <p className="text-emerald-100">{t('pumpControl')}</p>
      </div>
      <Droplets className="w-10 h-10 text-emerald-200" />
    </div>
    <button onClick={onToggle}
      className={`w-full py-6 rounded-xl text-2xl font-bold transition-all ${
        isOn ? 'bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/30' 
             : 'bg-green-500 hover:bg-green-600 shadow-lg shadow-green-500/30'
      }`}>
      <Power className="w-8 h-8 mx-auto mb-2" />
      {isOn ? `${t('turnOff')} (${t('offText')})` : `${t('turnOn')} (${t('onText')})`}
    </button>
    <div className="mt-4 flex items-center justify-between text-emerald-100">
      <span>{t('todayRuntime')}</span>
      <span className="text-xl font-bold text-white">{runtime} {t('hours')}</span>
    </div>
    {onSpeak && (
      <button onClick={onSpeak} className="mt-3 w-full py-2 bg-white/20 rounded-lg flex items-center justify-center gap-2 hover:bg-white/30">
        <Volume2 className="w-5 h-5" /><span>{t('listen')}</span>
      </button>
    )}
  </div>
);

// Weather Card
const WeatherCard = ({ temp, humidity, condition, t }) => (
  <div className="bg-gradient-to-br from-orange-400 to-yellow-500 rounded-2xl p-5 text-white shadow-lg">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-orange-100 text-sm">{t('todayWeather')}</p>
        <p className="text-4xl font-bold mt-1">{temp}°C</p>
        <div className="flex items-center gap-4 mt-2 text-orange-100">
          <span className="flex items-center gap-1"><Droplets className="w-4 h-4" /> {humidity}%</span>
          <span className="flex items-center gap-1"><Wind className="w-4 h-4" /> {t('windSpeed')}</span>
        </div>
      </div>
      {condition === 'cloudy' ? <Cloud className="w-12 h-12 text-gray-200" /> : <Sun className="w-12 h-12 text-yellow-200" />}
    </div>
  </div>
);

// Electricity Schedule Card
const ElectricityScheduleCard = ({ schedule, t }) => {
  const currentHour = new Date().getHours();
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-lg border border-slate-200 dark:border-gray-700">
      <div className="flex items-center gap-3 mb-4">
        <Clock className="w-6 h-6 text-emerald-500" />
        <div>
          <h3 className="font-bold text-slate-900 dark:text-white">{t('powerSchedule')}</h3>
          <p className="text-sm text-slate-500 dark:text-gray-400">{t('electricitySchedule')}</p>
        </div>
      </div>
      <div className="space-y-2">
        {schedule.map((slot, i) => (
          <div key={i} className={`flex items-center justify-between p-3 rounded-lg ${
            currentHour >= slot.start && currentHour < slot.end
              ? 'bg-green-100 border border-green-500'
              : 'bg-gray-50 dark:bg-gray-700'
          }`}>
            <span className="font-medium text-slate-700 dark:text-gray-300">{slot.start}:00 - {slot.end}:00</span>
            {currentHour >= slot.start && currentHour < slot.end ? (
              <span className="flex items-center gap-1 text-green-600 font-bold"><CheckCircle className="w-5 h-5" /> {t('onText')}</span>
            ) : <span className="text-gray-400 dark:text-gray-500">{t('scheduled')}</span>}
          </div>
        ))}
      </div>
    </div>
  );
};

// Emergency Contacts Card
const EmergencyContactsCard = ({ contacts, t }) => (
  <div className="bg-red-50 dark:bg-red-900/20 rounded-2xl p-5 border border-red-200 dark:border-red-800">
    <div className="flex items-center gap-3 mb-4">
      <Phone className="w-6 h-6 text-red-500" />
      <div>
        <h3 className="font-bold text-red-700">{t('emergency')}</h3>
        <p className="text-sm text-red-500">{t('tapToCall')}</p>
      </div>
    </div>
    <div className="space-y-2">
      {contacts.map((c, i) => (
        <button key={i} onClick={() => window.location.href = `tel:${c.phone}`}
          className="w-full flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30">
          <div className="text-left">
            <p className="font-medium text-slate-900 dark:text-white">{c.name}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-600 dark:text-gray-300">{c.phone}</span>
            <PhoneCall className="w-5 h-5 text-green-500" />
          </div>
        </button>
      ))}
    </div>
  </div>
);

// Current Bill Card
const CurrentBillCard = ({ amount, units, dueDate, onSpeak, onPay, t }) => (
  <div className="bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl p-6 text-white shadow-lg">
    <div className="flex items-center justify-between mb-4">
      <div>
        <h3 className="text-lg font-medium text-emerald-100">{t('thisMonthBill')}</h3>
      </div>
      <IndianRupee className="w-8 h-8 text-emerald-200" />
    </div>
    <div className="text-5xl font-bold mb-2">₹{amount}</div>
    <p className="text-emerald-100 mb-4">{units} {t('units')}</p>
    <div className="flex items-center gap-2 text-emerald-200 mb-4">
      <Calendar className="w-4 h-4" /><span>{t('duePrefix')}: {dueDate}</span>
    </div>
    <div className="flex gap-2">
      <button onClick={onSpeak} className="flex-1 py-3 bg-white/20 rounded-xl flex items-center justify-center gap-2 hover:bg-white/30">
        <Volume2 className="w-5 h-5" /><span>{t('listen')}</span>
      </button>
      <button onClick={onPay} className="flex-1 py-3 bg-white rounded-xl text-green-600 font-bold hover:bg-emerald-50">
        {t('pay')}
      </button>
    </div>
  </div>
);

// Main Dashboard
export default function Dashboard() {
  const { t, language } = useLanguage();
  const { data: liveData } = useRealtimeData({}, 2000);
  const billingData = useBillingData();
  
  const [pumpOn, setPumpOn] = useState(false);
  const [pumpRuntime, setPumpRuntime] = useState(2.5);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [activeAlert, setActiveAlert] = useState(null);
  const wasHighVoltageRef = useRef(false);
  const wasLowVoltageRef = useRef(false);
  const wasAnomalyRef = useRef(false);
  const wasPowerSurgeRef = useRef(false);
  const wasLowPowerRef = useRef(false);
  const wasFrequencyRef = useRef(false);
  const wasBillDueRef = useRef(false);
  const alertTimerRef = useRef(null);

  // Map language code to locale string for API
  const getVoiceLanguage = () => {
    const langMap = {
      'en': 'en-IN',
      'hi': 'hi-IN',
      'gu': 'gu-IN',
      'ta': 'ta-IN',
      'te': 'te-IN',
      'kn': 'kn-IN',
      'ml': 'ml-IN',
      'mr': 'mr-IN',
      'pa': 'pa-IN',
      'bn': 'bn-IN',
      'or': 'or-IN',
      'as': 'as-IN',
      'ur': 'ur-IN',
    };
    return langMap[language] || 'en-IN';
  };

  const speakVoltage = () => {
    if (!voiceEnabled) return;
    const v = liveData?.voltage?.toFixed(0) || 0;
    let voiceKey = 'voiceVoltageOk';
    if (v > 250) voiceKey = 'voiceVoltageDanger';
    else if (v < 200) voiceKey = 'voiceVoltageWarning';
    
    const message = t(voiceKey, { value: v });
    console.log('📊 Voltage Voice:', { voiceKey, message, currentLanguage: language, value: v });
    speakText(message, getVoiceLanguage());
    toast.success(`🔊 ${t('voltage')}: ${v}V`);
  };

  const speakBill = () => {
    if (!voiceEnabled) return;
    const amt = billingData.currentMonth?.amount || 0;
    const u = billingData.currentMonth?.units?.toFixed(0) || 0;
    const message = t('voiceBillReading', { amount: amt, units: u });
    console.log('💰 Bill Voice:', { message, currentLanguage: language, amount: amt, units: u });
    speakText(message, getVoiceLanguage());
    toast.success(`🔊 ${t('billForecast')}: ₹${amt}`);
  };

  const speakPump = () => {
    if (!voiceEnabled) return;
    const voiceKey = pumpOn ? 'voicePumpStatusOn' : 'voicePumpStatusOff';
    const message = t(voiceKey);
    console.log('💧 Pump Voice:', { voiceKey, message, currentLanguage: language, pumpStatus: pumpOn });
    speakText(message, getVoiceLanguage());
    toast.success(`🔊 ${t('pumpStatus')}: ${pumpOn ? t('onText') : t('offText')}`);
  };

  const togglePump = () => {
    setPumpOn(!pumpOn);
    if (voiceEnabled) {
      const voiceKey = !pumpOn ? 'voicePumpTurnedOn' : 'voicePumpTurnedOff';
      const message = t(voiceKey);
      console.log('🔀 Pump Toggle Voice:', { voiceKey, message, currentLanguage: language, pumpBecoming: !pumpOn });
      speakText(message, getVoiceLanguage());
    }
    toast.success(!pumpOn ? `✅ ${t('pumpOn')}` : `⏹️ ${t('pumpOff')}`);
  };

  const getVoltageStatus = () => {
    const v = liveData?.voltage || 0;
    if (v > 250) return 'danger';
    if (v < 200 || v > 240) return 'warning';
    return 'good';
  };

  const showAlertNotification = ({ type, title, message, voiceMessage }) => {
    setActiveAlert({ type, title, message });

    addDashboardAlertToHistory({
      id: `local-${Date.now()}-${type}`,
      alert_type: type,
      type,
      title,
      message,
      description: message,
      meter_id: 'LIVE-DASHBOARD',
      meter_name: t('dashboardTitle'),
      priority:
        type === 'high-voltage' || type === 'low-voltage' ? 'high' :
        type === 'anomaly' ? 'medium' :
        type === 'bill-due' ? 'medium' :
        'high',
      status: 'active',
      source: 'dashboard',
      created_at: new Date().toISOString(),
    });

    if (alertTimerRef.current) {
      clearTimeout(alertTimerRef.current);
    }

    alertTimerRef.current = setTimeout(() => {
      setActiveAlert(null);
    }, 5000);

    // Play voice alert if enabled and message exists
    if (voiceEnabled && voiceMessage) {
      console.log('🔔 Alert Voice:', { type, voiceMessage, currentLanguage: language });
      speakText(voiceMessage, getVoiceLanguage());
    }
  };

  useEffect(() => {
    const voltage = Number(liveData?.voltage || 0);
    const power = Number(liveData?.power || 0);
    const frequency = Number(liveData?.frequency || 50);
    const isHighVoltage = voltage > 250;
    const isLowVoltage = voltage < 200;
    const isAnomaly = Boolean(liveData?.isAnomaly);
    const isPowerSurge = power > 8000;
    const isLowPower = power < 1000 && liveData?.pumpActive;
    const isFrequencyUnstable = frequency < 48 || frequency > 52;
    const daysRemaining = Number(billingData?.currentMonth?.daysRemaining ?? 999);
    const amount = Number(billingData?.currentMonth?.amount ?? 0);
    const isBillDueSoon = daysRemaining >= 0 && daysRemaining <= 3 && amount > 0;

    // Generate alerts independently - allow multiple alert types per cycle
    if (isHighVoltage && !wasHighVoltageRef.current) {
      const roundedVoltage = voltage.toFixed(0);
      const alertMessage = t('voiceVoltageDanger', { value: roundedVoltage });
      showAlertNotification({
        type: 'high-voltage',
        title: t('highVoltageAlert'),
        message: t('alertHighVoltageMessage', { value: roundedVoltage }),
        voiceMessage: alertMessage,
      });
      wasHighVoltageRef.current = true;
    }

    if (isLowVoltage && !wasLowVoltageRef.current) {
      const roundedVoltage = voltage.toFixed(0);
      const voiceMessage = t('voiceVoltageWarning', { value: roundedVoltage });
      showAlertNotification({
        type: 'low-voltage',
        title: t('alert'),
        message: voiceMessage,
        voiceMessage,
      });
      wasLowVoltageRef.current = true;
    }

    if (isAnomaly && !wasAnomalyRef.current) {
      const voiceMessage = t('voiceAnomalyDetected');
      showAlertNotification({
        type: 'anomaly',
        title: t('anomalyDetected'),
        message: voiceMessage,
        voiceMessage,
      });
      wasAnomalyRef.current = true;
    }

    if (isPowerSurge && !wasPowerSurgeRef.current) {
      const roundedPower = power.toFixed(0);
      const voiceMessage = `Power surge detected at ${roundedPower} watts`;
      showAlertNotification({
        type: 'power-surge',
        title: t('alert'),
        message: voiceMessage,
        voiceMessage,
      });
      wasPowerSurgeRef.current = true;
    }

    if (isLowPower && !wasLowPowerRef.current) {
      const roundedPower = power.toFixed(0);
      const voiceMessage = `Low power consumption detected at ${roundedPower} watts, check pump efficiency`;
      showAlertNotification({
        type: 'low-power',
        title: t('alert'),
        message: voiceMessage,
        voiceMessage,
      });
      wasLowPowerRef.current = true;
    }

    if (isFrequencyUnstable && !wasFrequencyRef.current) {
      const roundedFreq = frequency.toFixed(2);
      const voiceMessage = `Grid frequency unstable at ${roundedFreq} Hz`;
      showAlertNotification({
        type: 'frequency',
        title: t('alert'),
        message: voiceMessage,
        voiceMessage,
      });
      wasFrequencyRef.current = true;
    }

    if (isBillDueSoon && !wasBillDueRef.current) {
      const voiceMessage = t('voiceBillDueReading', {
        amount: amount.toFixed(0),
        days: daysRemaining,
      });
      showAlertNotification({
        type: 'bill-due',
        title: t('billForecast'),
        message: voiceMessage,
        voiceMessage,
      });
      wasBillDueRef.current = true;
    }

    // Reset refs when conditions clear
    if (!isHighVoltage) {
      wasHighVoltageRef.current = false;
    }

    if (!isLowVoltage) {
      wasLowVoltageRef.current = false;
    }

    if (!isAnomaly) {
      wasAnomalyRef.current = false;
    }

    if (!isPowerSurge) {
      wasPowerSurgeRef.current = false;
    }

    if (!isLowPower) {
      wasLowPowerRef.current = false;
    }

    if (!isFrequencyUnstable) {
      wasFrequencyRef.current = false;
    }

    if (!isBillDueSoon) {
      wasBillDueRef.current = false;
    }
  }, [liveData?.voltage, liveData?.power, liveData?.frequency, liveData?.pumpActive, liveData?.isAnomaly, liveData?.alertEventType, billingData?.currentMonth?.daysRemaining, billingData?.currentMonth?.amount, language, t]);

  useEffect(() => {
    return () => {
      if (alertTimerRef.current) {
        clearTimeout(alertTimerRef.current);
      }
    };
  }, []);

  const emergencyContacts = [
    { name: t('electricityBoard'), phone: '1912' },
    { name: t('gramPanchayat'), phone: '1800-XXX-XXXX' },
    { name: t('fireEmergency'), phone: '101' },
  ];

  const powerSchedule = [
    { start: 6, end: 10 },
    { start: 12, end: 14 },
    { start: 18, end: 22 },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-900 p-4 md:p-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-6 mb-6 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">🏠 {t('dashboardTitle')}</h1>
            <p className="text-emerald-100 mt-1">{t('dashboardSubtitle')}</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setVoiceEnabled(!voiceEnabled)}
              className={`p-3 rounded-xl ${voiceEnabled ? 'bg-white/20' : 'bg-white/10'}`}>
              <Volume2 className={`w-6 h-6 ${voiceEnabled ? 'text-white' : 'text-white/50'}`} />
            </button>
            <div className={`w-3 h-3 rounded-full ${liveData?.voltage ? 'bg-white animate-pulse' : 'bg-gray-300'}`} />
          </div>
        </div>
        <div className="flex gap-2 mt-4 flex-wrap">
          <button onClick={speakVoltage} className="px-4 py-2 bg-white/20 rounded-lg text-sm hover:bg-white/30">🔊 {t('listenVoltage')}</button>
          <button onClick={speakBill} className="px-4 py-2 bg-white/20 rounded-lg text-sm hover:bg-white/30">🔊 {t('listenBill')}</button>
          <button onClick={speakPump} className="px-4 py-2 bg-white/20 rounded-lg text-sm hover:bg-white/30">🔊 {t('listenPumpStatus')}</button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <BigStatusCard icon={Zap} label={t('voltage')} 
          value={liveData?.voltage?.toFixed(0) || '---'} unit="V" 
          status={getVoltageStatus()} color="bg-yellow-500" onSpeak={speakVoltage} />
        
        <BigStatusCard icon={Zap} label={t('currentPowerLabel')}
          value={((liveData?.power || 0) / 1000).toFixed(1)} unit="kW"
          status="good" color="bg-blue-500" 
          onSpeak={() => { 
            if (voiceEnabled) {
              const powerKw = ((liveData?.power || 0) / 1000).toFixed(2);
              const message = t('voicePowerReading', { value: powerKw });
              speakText(message, getVoiceLanguage());
            }
            toast.success(`🔊 ${t('currentPowerLabel')}`); 
          }} />

        <PumpControlCard isOn={pumpOn} onToggle={togglePump} runtime={pumpRuntime} onSpeak={speakPump} t={t} />

        <CurrentBillCard 
          amount={billingData.currentMonth?.amount || 0}
          units={billingData.currentMonth?.units?.toFixed(0) || 0}
          dueDate="5 Jan 2026" onSpeak={speakBill}
          onPay={() => toast.success(t('redirectingToPayment'))}
          t={t} />

        <WeatherCard temp={28} humidity={65} condition="sunny" t={t} />
        <ElectricityScheduleCard schedule={powerSchedule} t={t} />

        <div className="md:col-span-2 lg:col-span-3">
          <EmergencyContactsCard contacts={emergencyContacts} t={t} />
        </div>
      </div>

      {/* Alert Notification */}
      {activeAlert && (
        <div className={`fixed top-4 left-4 right-4 text-white p-4 rounded-xl shadow-lg animate-pulse flex items-center gap-3 z-50 ${
          activeAlert.type === 'high-voltage'
            ? 'bg-red-500'
            : activeAlert.type === 'low-voltage'
              ? 'bg-orange-500'
              : activeAlert.type === 'anomaly'
                ? 'bg-purple-500'
                : 'bg-amber-500'
        }`}>
          <AlertTriangle className="w-6 h-6" />
          <div className="flex-1">
            <p className="font-bold">⚠️ {activeAlert.title}</p>
            <p className="text-sm">{activeAlert.message}</p>
          </div>
          <button
            onClick={() => speakText(activeAlert.message, getVoiceLanguage())}
            className="p-2 bg-white/20 rounded-lg"
          >
            <Volume2 className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}
