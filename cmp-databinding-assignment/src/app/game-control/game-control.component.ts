import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent {
  number = 0;
  interval;

  @Output() gameStarted = new EventEmitter<number>();

  onStartGame() {
    console.log('game started');

    // Prevents the user from spamming many intervals and breaking the game
    if(!this.interval) {
      this.interval = setInterval(() => {
        this.gameStarted.emit(this.number++);
      }, 1000);
    }
  }

  onStopGame() {
    console.log('game stopped');
    clearInterval(this.interval);
  }
}
