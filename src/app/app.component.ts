//import { PlayersService } from './players.service';
import { Player } from './models/player';
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
//import { PlayersLocalService } from './playerslocal.service';
import { PlayersService } from './players.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {

  players: Player[] = [];
  survivors: Player[] = [];
  playersSubscription: Subscription;

  start = false;
  end = false;

  currentPlayer: Player;

  constructor(private playersService: PlayersService) {

    this.playersSubscription = this.playersService.playersSubject.subscribe(
      (players: Player[]) => {
        console.log(players);
        this.players = players;
        this.survivors = this.players.filter((player) => player.assignedPlayer === undefined);
      }
    );
    this.playersService.emitPlayers();

    this.currentPlayer = null;
  }

  beginDurty() {
    this.start = true;
    if (this.survivors.length === 0) {
      this.end = true;
    }
  }

  getRandomInt(max: number) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  assignPlayer() {
    const survivors = this.players.filter((player: Player) => {
      return player.isAssigned === false && player.name !== this.currentPlayer.name;
    });

    this.currentPlayer.assignedPlayer = survivors[this.getRandomInt(survivors.length)];
    this.currentPlayer.assignedPlayer.isAssigned = true;

    this.playersService.setPlayers(this.players);
  }

  resetTirage() {
    this.playersService.initPlayers();
  }

  ngOnDestroy() {
    this.playersSubscription.unsubscribe();
  }

}
