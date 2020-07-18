import { Component, OnInit, OnDestroy } from '@angular/core';
import { Server } from '../../shared/server';
import { ServerService } from 'src/app/services/server.service';
import { Observable } from 'rxjs/Rx';
import { AnonymousSubscription } from 'rxjs/Subscription';
import { ServerMessage } from 'src/app/shared/server-message';

// const SAMPLE_SERVERS: Server[] = [
//   { id: 1, name: 'dev-web', isOnline: true },
//   { id: 2, name: 'dev-mail', isOnline: false },
//   { id: 3, name: 'prod-web', isOnline: true },
//   { id: 4, name: 'prod-mail', isOnline: true },
// ]

@Component({
  selector: 'app-section-health',
  templateUrl: './section-health.component.html',
  styleUrls: ['./section-health.component.scss']
})
export class SectionHealthComponent implements OnInit, OnDestroy {

  constructor(private _serverService: ServerService) { }

  public servers: Server[];
  public timerSubscription: AnonymousSubscription;

  ngOnInit(): void {
    this.refreshData();
  }

  ngOnDestroy() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  refreshData() {
    this._serverService.getServers().subscribe(res => {
      console.log(res);
      this.servers = res;
    });

    this.subscribeToData();
  }

  subscribeToData() {
    this.timerSubscription = Observable
      .timer(5000)
      .first()
      .subscribe(() => this.refreshData());
  }

  sendMessage(message: ServerMessage) {
    this._serverService.handleServerMessage(message)
      .subscribe(res => console.log('Message sent to server:', message), err => console.log('Error', err));
  }
}
