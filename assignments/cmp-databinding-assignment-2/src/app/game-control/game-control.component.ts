import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent {
  private ref: number;
  private num = 0;
  @Output() increment = new EventEmitter<number>();

  onStopGame() {
    clearInterval(this.ref);
  }

  onStartGame() {
    this.ref = setInterval(() => {
      this.increment.emit(this.num);
      this.num++;
    }, 1000);
  }

}
