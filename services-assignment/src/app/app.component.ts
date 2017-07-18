import { Component, OnInit } from '@angular/core';

import { UserService } from './services/user.service';
import { CounterService } from './services/counter.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent implements OnInit {
  activeToInactive: number;
  inactiveToActive: number;

  constructor(private counterService: CounterService) {
    counterService.actionsUpdated.subscribe(() => this.onActionsUpdate());
  }

  ngOnInit() {
    this.onActionsUpdate();
  }

  onActionsUpdate() {
    this.activeToInactive = this.counterService.activeToInactiveActions;
    this.inactiveToActive = this.counterService.inactiveToActiveActions;
  }

}
