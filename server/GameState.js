export class GameState {
  constructor() {
    this.state = {
      teams: {
        red:    { funding: 100, shrimp: 50, energy: 0 },
        blue:   { funding: 100, shrimp: 50, energy: 0 },
        green:  { funding: 100, shrimp: 50, energy: 0 },
        yellow: { funding: 100, shrimp: 50, energy: 0 }
      },
      lobby: {
        red:    { flamingo: null, dropper: null, congress: null },
        blue:   { flamingo: null, dropper: null, congress: null },
        green:  { flamingo: null, dropper: null, congress: null },
        yellow: { flamingo: null, dropper: null, congress: null }
      },
      gameStarted: false
    };
  }

  getState() {
    return this.state;
  }

  assignRole(team, role, playerId) {
    // if already taken, ignore
    if (this.state.lobby[team][role]) return false;
    this.state.lobby[team][role] = playerId;
    return true;
  }

  unassignRole(playerId) {
    // remove player from any slot they occupy
    for (const team in this.state.lobby) {
      for (const role in this.state.lobby[team]) {
        if (this.state.lobby[team][role] === playerId) {
          this.state.lobby[team][role] = null;
        }
      }
    }
  }

  startGame() {
    this.state.gameStarted = true;
  }


  // helpers for team-based updates
  updateFunding(team, delta) {
    const t = this.state.teams[team];
    t.funding = Math.max(0, t.funding + delta);
  }

  updateShrimp(team, delta) {
    const t = this.state.teams[team];
    t.shrimp = Math.max(0, t.shrimp + delta);
  }

  updateEnergy(team, delta) {
    const t = this.state.teams[team];
    t.energy = Math.min(100, Math.max(0, t.energy + delta));
  }
}
