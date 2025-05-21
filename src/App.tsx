import React, { useEffect, useState } from 'react';
import Converter from './components/converter';
import HistoryList from './components/history';
import { getHistory } from './utils/storage';
import './App.css';


const App: React.FC = () => {
    const [history, setHistory] = useState<any[]>([]);

     useEffect(() => {
    setHistory(getHistory());
  }, []);


  return (
    <div className="app-container">
       <Converter setHistory={setHistory} />
      <HistoryList history={history} />
    </div>
  );
};

export default App;
