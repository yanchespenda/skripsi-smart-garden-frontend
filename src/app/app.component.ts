import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { map } from 'rxjs/operators';

import { GridCardData } from './interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  cards: GridCardData[] = [
    {
      title: 'Sensor Udara',
      cards: [
        {
          title: 'Suhu', cols: 2, rows: 1, callbackId: 1, idService: 'dht-temperature'
        },
        {
          title: 'Kelembaban', cols: 2, rows: 1, callbackId: 2, idService: 'dht-humidity'
        }
      ]
    },
    {
      title: 'Sensor Tanah',
      cards: [
        {
          title: 'Suhu', cols: 2, rows: 1, callbackId: 3, idService: 'soil-temperature'
        },
        {
          title: 'Kelembaban', cols: 2, rows: 1, callbackId: 4, idService: 'soil-moisture'
        }
      ]
    },
    {
      title: 'Air Tampungan',
      cards: [
        {
          title: 'Tinggi', cols: 2, rows: 1, callbackId: 5, idService: 'water-level'
        }
      ]
    }
  ];

  constructor(private breakpointObserver: BreakpointObserver) {}
}
