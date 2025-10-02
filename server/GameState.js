export class GameState {
  constructor() {
    this.state = {
      teams: {
        red:    { funding: 100, shrimp: 50, energy: 0 },
        blue:   { funding: 100, shrimp: 50, energy: 0 },
        green:  { funding: 100, shrimp: 50, energy: 0 },
        yellow: { funding: 100, shrimp: 50, energy: 0 }
      }
    };
  }

  getState() {
    return this.state;
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
