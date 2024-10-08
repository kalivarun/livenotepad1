const WebSocket = require('ws');
const PORT = process.env.PORT || 8080;

// Create a WebSocket server
const wss = new WebSocket.Server({ port: PORT }, () => {
    console.log(`WebSocket server is running on port ${PORT}`);
});

// Listen for connection events
wss.on('connection', (ws) => {
    console.log('New client connected');

    // Send a message to the newly connected client
    ws.send('Welcome new client!');

    // Listen for messages from the client
    ws.on('message', (message) => {
        console.log(`Received: ${message}`);
        // Broadcast message to all connected clients
        wss.clients.forEach(client => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    // Handle client disconnect
    ws.on('close', () => {
        console.log('Client disconnected');
    });
});
