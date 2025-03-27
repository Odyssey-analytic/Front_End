export const connectToUserStream = (): WebSocket => {
    const socket = new WebSocket('wss://your-server-url/ws/active-users'); // our WebSocket Address !!!!!!!!!!!!!!!!!!!!!!
  
    socket.onopen = () => {
      console.log('WebSocket connected ✅');
    };
  
    socket.onerror = (err) => {
      console.error('WebSocket error ❌', err);
    };
  
    return socket;
  };
  