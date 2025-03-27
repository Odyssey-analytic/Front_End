import { useEffect, useState } from 'react';
import { connectToUserStream } from '../services/socket'; 

interface UserData {
  timestamp: string;
  count: number;
}

export function useRealTimeUsers() {
  const [labels, setLabels] = useState<string[]>([]);
  const [userCounts, setUserCounts] = useState<number[]>([]);

  useEffect(() => {
    const socket = connectToUserStream();

    socket.onmessage = (event) => {
      try {
        const data: UserData = JSON.parse(event.data);
        setLabels((prev) => [...prev.slice(-9), data.timestamp]);
        setUserCounts((prev) => [...prev.slice(-9), data.count]);
      } catch (err) {
        console.error('Invalid WebSocket data:', event.data);
      }
    };

    return () => {
      socket.close();
    };
  }, []);

  return { labels, userCounts };
}
