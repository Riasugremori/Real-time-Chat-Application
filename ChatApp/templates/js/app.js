function connectToRoom(roomName) {
    if (socket) socket.close();
  
    const protocol = window.location.protocol === 'https:' ? 'wss://' : 'ws://';
    const host = window.location.host;
  
    socket = new WebSocket(`${protocol}${host}/ws/chat/${roomName}/?token=${token}`);
  
    socket.onopen = () => {
      console.log('Connected to WebSocket');
      messagesDiv.innerHTML = `<div>Connected to room: ${roomName}</div>`;
    };
  
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const messageElement = document.createElement('div');
      messageElement.textContent = `${data.username}: ${data.message}`;
      messagesDiv.appendChild(messageElement);
      messagesDiv.scrollTop = messagesDiv.scrollHeight;
    };
  
    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
      const errorMessage = document.createElement('div');
      errorMessage.textContent = 'WebSocket connection failed. Please try again.';
      messagesDiv.appendChild(errorMessage);
    };
  
    socket.onclose = () => {
      console.log('WebSocket connection closed');
      const messageElement = document.createElement('div');
      messageElement.textContent = 'Disconnected from the server.';
      messagesDiv.appendChild(messageElement);
    };
  }
  