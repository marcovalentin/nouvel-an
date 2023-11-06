import { Injectable } from '@angular/core';
import { Player } from './models/player';
import { Subject } from 'rxjs';

import { AngularFireDatabase } from '@angular/fire/database';
import { DataSnapshot } from '@angular/fire/database/interfaces';

import * as playersData from '../assets/data/nouvel-an-data-2024.json';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  constructor(private db: AngularFireDatabase) {
    this.getPlayers();
  }

  players: Player[] = [];
  playersSubject = new Subject<Player[]>();

  emitPlayers() {
    this.playersSubject.next(this.players);
  }

  savePlayers() {
    this.db.database.ref('/players').set(this.players);
  }

  setPlayers(players: Player[]) {
    this.players = players;
    this.savePlayers();
  }

  getPlayers() {
    this.db.database.ref('/players')
      .on('value', (data: DataSnapshot) => {
          this.players = data.val() ? data.val() : [];
          this.emitPlayers();
        }
      );
  }

  initPlayers() {
    this.players = playersData.players ? playersData.players : [];
    this.savePlayers();
  }
}
