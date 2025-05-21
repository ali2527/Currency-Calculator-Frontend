export const getHistory = () => {
  const data = localStorage.getItem('conversion_history');
  return data ? JSON.parse(data) : [];
};

export const addToHistory = (record: any) => {
  const existing = getHistory();
  const updated = [record, ...existing];
  localStorage.setItem('conversion_history', JSON.stringify(updated));
};
