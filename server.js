const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Store the current text content to broadcast to new clients
let currentContent = '';

// Broadcast to all clients
const broadcast = (data) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

// Handle connection events
wss.on('connection', (ws) => {
  console.log('New client connected');
  
  // Send the current content to the newly connected client
  if (currentContent) {
    ws.send(currentContent);
  }

  // Listen for messages from clients
  ws.on('message', (message) => {
    console.log(`Received message: ${message}`);
    currentContent = message; // Update the stored content

    // Broadcast the new content to all clients
    broadcast(message);
  });

  // Handle client disconnection
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

// Start the server
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
