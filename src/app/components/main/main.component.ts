import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogActionComponent } from '@component/dialog-action/dialog-action.component';
import { DialogChangePasswordComponent } from '@component/dialog-change-password/dialog-change-password.component';
import { DialogConfirmComponent } from '@component/dialog-confirm/dialog-confirm.component';
import { DialogMcuTokenComponent } from '@component/dialog-mcu-token/dialog-mcu-token.component';
import { ConnectionService } from 'ng-connection-service';
import { GridCardData } from 'src/app/interfaces';
import { OauthService } from 'src/app/services/oauth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  isConnected = true;

  cards: GridCardData[] = [{
      title: 'Sensor Udara',
      cards: [{
          title: 'Suhu',
          cols: 2,
          rows: 1,
          callbackId: 1,
          idService: 'dht-temperature'
        },
        {
          title: 'Kelembaban',
          cols: 2,
          rows: 1,
          callbackId: 2,
          idService: 'dht-humidity'
        }
      ]
    },
    {
      title: 'Sensor Tanah',
      cards: [{
          title: 'Suhu',
          cols: 2,
          rows: 1,
          callbackId: 3,
          idService: 'soil-temperature'
        },
        {
          title: 'Kelembaban',
          cols: 2,
          rows: 1,
          callbackId: 4,
          idService: 'soil-moisture'
        }
      ]
    }
  ];

  constructor(
    // private breakpointObserver: BreakpointObserver,
    private connectionService: ConnectionService,
    private matDialog: MatDialog,
    private oauthService: OauthService,
  ) {
    // tslint:disable-next-line: deprecation
    this.connectionService.monitor().subscribe(isConnected => {
      this.isConnected = isConnected;
    });
  }

  mcuToken(): void {
    const dialogRef = this.matDialog.open(DialogMcuTokenComponent, {
      maxWidth: '450px',
      width: '100%'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // this.oauthService.credentialsDestroy(this.redirectOauth);
      }
    });
  }

  changePassword(): void {
    const dialogRef = this.matDialog.open(DialogChangePasswordComponent, {
      maxWidth: '450px',
      width: '100%'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // this.oauthService.credentialsDestroy(this.redirectOauth);
      }
    });
  }

  signOut(): void {
    const dialogRef = this.matDialog.open(DialogConfirmComponent, {
      data: {
        title: 'Signout',
        content: 'Are you sure want signout?'
      },
      maxWidth: '400px',
      width: '100%'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.oauthService.credentialsDestroy(this.redirectOauth);
      }
    });
  }

  redirectOauth(): void {
    window.open('/', '_self');
  }

  action(): void {
    const dialogRef = this.matDialog.open(DialogActionComponent, {
      maxWidth: '450px',
      width: '100%'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // this.oauthService.credentialsDestroy(this.redirectOauth);
      }
    });
  }

  ngOnInit(): void {}

}
