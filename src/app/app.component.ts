import {
  Component, OnInit
} from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private afMessaging: AngularFireMessaging) { }
  listen(): void {
    this.afMessaging.messages
      .subscribe((message) => { console.log(message); });
  }

  ngOnInit(): void {
    this.listen();
  }
}
