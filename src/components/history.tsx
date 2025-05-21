// src/components/HistoryList.tsx

import React from 'react';
import { List, Typography } from 'antd';
import dayjs from 'dayjs';

interface HistoryProps {
  history: any[];
}

const HistoryList: React.FC<HistoryProps> = ({ history }) => {
  return (
    <div style={{ padding: 16,display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography.Title level={5}>Conversion History</Typography.Title>
      <List
        size="small"
        bordered
        style={{ width: 350, overflowY: 'auto' }}
        dataSource={history}
        renderItem={(item) => (
          <List.Item>
            <div>
                <Typography.Text strong>{item.from} to {item.to}</Typography.Text>
                <br />

            {dayjs(item.date).format('YYYY-MM-DD HH:mm')} – {item.amount} {item.from} → {item.result.toFixed(2)} {item.to}
            </div>
          </List.Item>
        )}
      />
    </div>
  );
};

export default HistoryList;
