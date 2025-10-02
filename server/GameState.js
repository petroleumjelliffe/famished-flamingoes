export class GameState {
  constructor() {
    this.state = {
      funding: 100,
      shrimp: 50,
      flamingoEnergy: 0
    };
  }

  getState() {
    return this.state;
  }

  updateFunding(delta) {
    this.state.funding = Math.max(0, this.state.funding + delta);
  }

  updateShrimp(delta) {
    this.state.shrimp = Math.max(0, this.state.shrimp + delta);
  }

  updateEnergy(delta) {
    this.state.flamingoEnergy = Math.min(100, Math.max(0, this.state.flamingoEnergy + delta));
  }
}
