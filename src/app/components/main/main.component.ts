import { Component, OnInit } from '@angular/core';
import { ConnectionService } from 'ng-connection-service';
import { GridCardData } from 'src/app/interfaces';

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
    private connectionService: ConnectionService
  ) {
    // tslint:disable-next-line: deprecation
    this.connectionService.monitor().subscribe(isConnected => {
      this.isConnected = isConnected;
    });
  }

  ngOnInit(): void {}

}
