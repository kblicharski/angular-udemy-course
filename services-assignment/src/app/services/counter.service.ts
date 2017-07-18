export class CounterService {
  activeToInactiveActions = 0;
  inactiveToActiveActions = 0;

  setToActive() {
    this.inactiveToActiveActions += 1
  }

  setToInactive() {
    this.activeToInactiveActions += 1
  }
}
