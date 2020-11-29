import {FormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlayersService } from './players.service';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireModule } from '@angular/fire';

const config = {
  apiKey: 'AIzaSyCpwjLIhnZ9gTGaSQVUQOJ3JMnWxbHQw4I',
  authDomain: 'cadeaunoel-e140d.firebaseapp.com',
  databaseURL: 'https://cadeaunoel-e140d.firebaseio.com',
  projectId: 'cadeaunoel-e140d',
  storageBucket: 'cadeaunoel-e140d.appspot.com',
  messagingSenderId: '455608366904',
  appId: '1:455608366904:web:82a1215e151e13dc27f3cd'
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AngularFireModule.initializeApp(config),
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFireDatabaseModule
  ],
  providers: [PlayersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
