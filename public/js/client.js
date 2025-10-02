let socket;
let state = {};
let subscribers = [];

export function connect(onStateUpdate) {
  subscribers.push(onStateUpdate);

  if (!socket) {
    socket = new WebSocket(`ws://${window.location.hostname}:8080`);
    socket.addEventListener("open", () => console.log("✅ Connected to server"));

    socket.addEventListener("message", (msg) => {
      const { event, data } = JSON.parse(msg.data);
      if (event === "STATE_UPDATE") {
        state = data;
        subscribers.forEach(fn => fn(state));
      }
    });
  }
}

export function sendEvent(event, data) {
  socket?.send(JSON.stringify({ event, data }));
}

export function getState() {
  return state;
}
