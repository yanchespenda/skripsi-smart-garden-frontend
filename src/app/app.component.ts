import {
  BreakpointObserver
} from '@angular/cdk/layout';
import {
  Component
} from '@angular/core';
import {
  ConnectionService
} from 'ng-connection-service';

import {
  GridCardData
} from './interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

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
    },
    {
      title: 'Air Tampungan',
      cards: [{
        title: 'Tinggi',
        cols: 2,
        rows: 1,
        callbackId: 5,
        idService: 'water-level'
      }]
    }
  ];

  constructor(
    private breakpointObserver: BreakpointObserver,
    private connectionService: ConnectionService
  ) {
    // tslint:disable-next-line: deprecation
    this.connectionService.monitor().subscribe(isConnected => {
      this.isConnected = isConnected;
    });
  }
}
