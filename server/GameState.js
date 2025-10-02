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
