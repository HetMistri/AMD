const ALERT_HISTORY_KEY = 'gm_dashboard_alert_history_v1';

const safeParse = (value, fallback) => {
  try {
    const parsed = JSON.parse(value);
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
};

export const getDashboardAlertHistory = () => {
  if (typeof window === 'undefined') return [];
  const stored = window.localStorage.getItem(ALERT_HISTORY_KEY);
  const alerts = safeParse(stored, []);
  return Array.isArray(alerts) ? alerts : [];
};

export const addDashboardAlertToHistory = (alert) => {
  if (typeof window === 'undefined' || !alert) return;
  const existing = getDashboardAlertHistory();
  const updated = [alert, ...existing].slice(0, 200);
  window.localStorage.setItem(ALERT_HISTORY_KEY, JSON.stringify(updated));
};

export const updateDashboardAlertStatus = (alertId, status) => {
  if (typeof window === 'undefined') return;
  const existing = getDashboardAlertHistory();
  const updated = existing.map((item) =>
    item.id === alertId ? { ...item, status, updated_at: new Date().toISOString() } : item
  );
  window.localStorage.setItem(ALERT_HISTORY_KEY, JSON.stringify(updated));
};

export const removeDashboardAlertsFromHistory = (alertIds = []) => {
  if (typeof window === 'undefined') return;
  const idSet = new Set(alertIds);
  const existing = getDashboardAlertHistory();
  const updated = existing.filter((item) => !idSet.has(item.id));
  window.localStorage.setItem(ALERT_HISTORY_KEY, JSON.stringify(updated));
};
