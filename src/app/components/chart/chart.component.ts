import { Component, ElementRef, EventEmitter, Input, NgZone, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

import {
  Chart,
  LineController,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip
} from 'chart.js';

Chart.register(LineController, CategoryScale, LinearScale, PointElement, LineElement, Tooltip);

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, OnChanges {
  chart: any;

  @Input() type: any;
  @Input() data: any;
  @Input() options: any;
  @Output() clickCanvas = new EventEmitter();
  @Output() clickDataset = new EventEmitter();
  @Output() clickElements = new EventEmitter();
  @Output() clickElement = new EventEmitter();

  private canvas: any;

  constructor(private elementRef: ElementRef, private ngZone: NgZone) { }

  ngOnInit(): void {
    this.create();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.chart) {
      if (changes.type || changes.options) {
        this.create();
      } else if (changes.data) {
        const currentValue = changes.data.currentValue;
        ['datasets', 'labels', 'xLabels', 'yLabels'].forEach(property => {
          this.chart.data[property] = currentValue[property];
        });
        this.chart.update();
      }
    }
  }

  private create(): void {
    this.ngZone.runOutsideAngular(() => {
      if (this.canvas) {
        this.elementRef.nativeElement.removeChild(this.canvas);
      }
      this.canvas = document.createElement('canvas');
      this.elementRef.nativeElement.appendChild(this.canvas);
      this.chart = new Chart(this.canvas, {
        type: this.type,
        data: this.data,
        options: this.options,
        /* options: {
          color: '#ffffff',
          backgroundColor: 'red',
          borderColor: 'blue',

          responsive: true,
          // tooltips: {
          //     mode: 'index',
          //     intersect: false,
          // },
          hover: {
              mode: 'nearest',
              intersect: true
          },
          scales: {
              x: {
                  display: true,
              },
              y: {
                  display: true,
              }
          },
          font: {
            family: 'Roboto, "Helvetica Neue", sans-serif'
            // color: 'rgba(255, 255, 255, 0.87)'
          },

          plugins: {
            legend: {
              // color:
            },
            tooltip: {
              mode: 'index',
              intersect: false,
            }
          }
        } */
      });
      this.canvas.onclick = e => {
        this.ngZone.run(() => {
          this.clickCanvas.next(e);
          if (this.clickDataset.observers.length) {
            this.clickDataset.next(this.chart.getDatasetAtEvent(e));
          }
          if (this.clickElements.observers.length) {
            this.clickElements.next(this.chart.getElementsAtEvent(e));
          }
          if (this.clickElement.observers.length) {
            this.clickElement.next(this.chart.getElementAtEvent(e));
          }
        });
      };
    });
  }

}
