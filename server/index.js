import express from 'express';
import { WebSocketServer } from 'ws';
import { createServer } from 'http';
import { GameState } from './GameState.js';

const PORT = 8080;

const app = express();
app.use(express.static('public'));

const server = createServer(app);
const wss = new WebSocketServer({ server });

// Shared global game state
const state = new GameState();

function broadcast(event, data) {
  const msg = JSON.stringify({ event, data });
  wss.clients.forEach(client => {
    if (client.readyState === 1) client.send(msg);
  });
}

wss.on('connection', (ws) => {    
  console.log('✅ Client connected');

  // Send initial state
  ws.send(JSON.stringify({ event: 'STATE_UPDATE', data: state.getState() }));

ws.on("message", (msg) => {
  try {
    const { event, data } = JSON.parse(msg);
    const { team, amount } = data;

    switch (event) {
      case "INCREMENT_FUNDING":
        state.updateFunding(team, amount);
        break;
      case "INCREMENT_SHRIMP":
        state.updateShrimp(team, amount);
        break;
      case "INCREMENT_ENERGY":
        state.updateEnergy(team, amount);
        break;
    }

    broadcast("STATE_UPDATE", state.getState());

  } catch (e) {
    console.error("Invalid message:", msg);
  }
});
});


server.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
