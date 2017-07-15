import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent {
  gameStatus = false;
  @Output() gameStarted = new EventEmitter<number>();



  startGame() {
    console.log('game started');
    this.gameStatus = true;
  }

  stopGame() {
    console.log('game stopped');
    this.gameStatus = false;
  }
}
