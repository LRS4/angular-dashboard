import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ServerMessage } from '../shared/server-message';
import { Server } from '../shared/server';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.scss']
})
export class ServerComponent implements OnInit {

  constructor() { }

  public color: string;
  public buttonText: string;
  public isLoading: boolean;
  public serverStatus: string;

  @Input() serverInput: Server;
  @Output() serverAction = new EventEmitter<ServerMessage>();

  ngOnInit(): void {
    this.setServerStatus(this.serverInput.isOnline)
  }

  setServerStatus(isOnline: boolean): void {
    if (isOnline) {
      this.serverInput.isOnline = true;
      this.serverStatus = 'Online';
      this.color = '#66BB6A';
      this.buttonText = 'Shut Down';
    } else {
      this.serverInput.isOnline = false;
      this.serverStatus = 'Offline';
      this.color = '#FF6B6B';
      this.buttonText = 'Start';
    }
  }

  setLoadingState() {
    this.color = '#FFCA28';
    this.buttonText = 'Pending...';
    this.isLoading = true;
    this.serverStatus = 'Loading';
  }

  sendServerAction(isOnline: boolean) {
    console.log('sendServerAction called!');
    this.setLoadingState();
    const payload = this.buildPayload(isOnline);
    this.serverAction.emit(payload);
  }

  buildPayload(isOnline: boolean): ServerMessage {
    if(isOnline) {
      return {
        id: this.serverInput.id,
        payload: 'deactivate'
      }
    } else {
      return {
        id: this.serverInput.id,
        payload: 'activate'
      }
    }
  }

  // toggleStatus(onlineStatus: boolean): void {
  //   console.log(this.serverInput.name, ':', onlineStatus);
  //   this.setServerStatus(!onlineStatus);
  // }

}
