import { EventEmitter, Output } from '@angular/core';

export class CounterService {
  activeToInactiveActions = 0;
  inactiveToActiveActions = 0;

  @Output() actionsUpdated = new EventEmitter<void>();

  setToActive() {
    this.inactiveToActiveActions++;
    this.updateActions();
  }

  setToInactive() {
    this.activeToInactiveActions++;
    this.updateActions();
  }

  updateActions() {
    this.actionsUpdated.emit();
  }
}
