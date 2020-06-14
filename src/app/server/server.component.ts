import { Component, OnInit, Input } from '@angular/core';
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

  @Input() serverInput: Server;

  ngOnInit(): void {
    this.setServerStatus(this.serverInput.isOnline)
  }

  setServerStatus(isOnline: boolean): void {
    if (isOnline) {
      this.serverInput.isOnline = true;
      this.color = '#66BB6A';
      this.buttonText = 'Shut Down';
    } else {
      this.serverInput.isOnline = false;
      this.color = '#FF6B6B';
      this.buttonText = 'Start';
    }
  }

  toggleStatus(onlineStatus: boolean): void {
    console.log(this.serverInput.name, ':', onlineStatus);
    this.setServerStatus(!onlineStatus);
  }

}
