export class CounterService {
  private activeToInactiveCount = 0;
  private inactiveToActiveCount = 0;

  logActiveUser(): void {
    this.activeToInactiveCount++;
    console.log(this.activeToInactiveCount);
  }

  logInactiveUser(): void {
    this.inactiveToActiveCount++;
    console.log(this.inactiveToActiveCount);
  }
}
