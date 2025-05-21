// src/components/Converter.tsx

import React, { useEffect, useState } from 'react';
import { Select, InputNumber, Button, Spin, Typography, message } from 'antd';
import axios from 'axios';
import { addToHistory, getHistory } from '../utils/storage';
import { SwapOutlined } from '@ant-design/icons';
import './Converter.css';

const { Option } = Select;
const { Title, Text } = Typography;

interface ConverterProps {
  setHistory: React.Dispatch<React.SetStateAction<any[]>>;
}

const Converter: React.FC<ConverterProps> = ({ setHistory }) => {
  const [currencies, setCurrencies] = useState<Record<string, any>>({});
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('EUR');
  const [amount, setAmount] = useState(1);
  const [result, setResult] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchCurrencies = async () => {
    try {
      const res = await axios.get('https://currency-calculator-backend.vercel.app/currencies');
      setCurrencies(res.data.data);
    } catch (err) {
      message.error('Failed to fetch currencies');
    }
  };

  const convert = async () => {
    setLoading(true);
    try {
      const res = await axios.get('https://currency-calculator-backend.vercel.app/convert', {
        params: { from, to, amount }
      });
      setResult(res.data.result);

      const newItem = {
        date: new Date().toISOString(),
        from,
        to,
        amount,
        result: res.data.result
      };

      addToHistory(newItem);
      setHistory(getHistory()); // 🔥 Update parent state after storing

    } catch {
      message.error('Conversion failed');
    } finally {
      setLoading(false);
    }
  };

  const swapCurrencies = () => {
    setFrom(to);
    setTo(from);
    setResult(null);
  };

  useEffect(() => {
    fetchCurrencies();
  }, []);

  return (
    <div className="converter-container">
      <Title level={3} className="title">Currency Exchange</Title>

      <div className="currency-box">
        {/* <div className="currency-select-row">
          <Button className="currency-btn">{from}</Button>
          <Button className="swap-btn" shape="circle" icon={<SwapOutlined />} onClick={swapCurrencies} />
          <Button className="currency-btn">{to}</Button>
        </div> */}
<div className="currency-select-row" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
  <Select
    value={from}
    onChange={(value) => {
      setFrom(value);
      setResult(null);
    }}
     style={{ width: 120 }}
  className="currency-select"
    placeholder="From"
    loading={Object.keys(currencies).length === 0}
  >
    {Object.entries(currencies).map(([code, data]) => (
      <Option key={code} value={code}>
        {code} - {data.name}
      </Option>
    ))}
  </Select>

  <Button
    className="swap-btn"
    shape="circle"
    icon={<SwapOutlined />}
    onClick={swapCurrencies}
  />

  <Select
    value={to}
    onChange={(value) => {
      setTo(value);
      setResult(null);
    }}
 style={{ width: 120 }}
  className="currency-select"
      placeholder="To"
    loading={Object.keys(currencies).length === 0}
  >
    {Object.entries(currencies).map(([code, data]) => (
      <Option key={code} value={code}>
        {code} - {data.name}
      </Option>
    ))}
  </Select>
</div>
        <div className="exchange-card">
          <div className="input-section">
            <Text className="currency-label red">{from}</Text>
            <InputNumber
              value={amount}
              onChange={(val) => setAmount(val || 0)}
              min={1}
              className="input-number"
            />
          </div>

          <div className="input-section">
            <Text className="currency-label blue">{to}</Text>
            <InputNumber
              value={result || 0}
              readOnly
              className="input-number"
            />
          </div>
        </div>
      </div>

      {loading ? <Spin style={{ marginTop: 20 }} /> : (
        <Button className="buy-btn" onClick={convert}>Convert</Button>
      )}
    </div>
  );
};

export default Converter;
