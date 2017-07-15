import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent {
  number = 0;
  ref;

  @Output() gameStarted = new EventEmitter<number>();

  startGame() {
    console.log('game started');
    this.ref = setInterval(() => {
      this.gameStarted.emit(this.number++);
    }, 1000);
  }

  stopGame() {
    console.log('game stopped');
    clearInterval(this.ref);
  }
}
