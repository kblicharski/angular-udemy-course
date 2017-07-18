import { Component, OnInit } from '@angular/core';

import { CounterService } from './services/counter.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  activeToInactive = 0;
  inactiveToActive = 0;

  constructor(private counterService: CounterService) { }

  ngOnInit() {
    this.activeToInactive = this.counterService.activeToInactiveActions;
    this.inactiveToActive = this.counterService.inactiveToActiveActions;
  }
}
