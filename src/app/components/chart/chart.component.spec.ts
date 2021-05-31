import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from 'src/app/app.module';

import { ChartComponent } from './chart.component';

describe('ChartComponent', () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppModule
      ],
      declarations: [ ChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartComponent);
    component = fixture.componentInstance;

    component.type = 'line';
    component.data = {
      labels: [],
      datasets: []
    };
    component.options  = {
      responsive: true,
      maintainAspectRatio: false,
      hover: {
        mode: 'nearest',
        intersect: true
      },
      locale: 'id-ID',
      scales: {
        x: {
          display: true,
          type: 'time',
          offset: true,
          ticks: {
            color: '#9E9E9E',
            font: {
              family: 'Roboto, "Helvetica Neue", sans-serif'
            }
          },
          borderColor: '#9E9E9E',
          beginAtZero: true,
          time: {
            displayFormats: {
              minute: 'HH:mm',
              hour: 'HH:mm',
              day: 'LLL dd',
              month: 'LLLL',
              quarter: 'LLLL yyyy',
              year: 'yyyy'
            }
          }
        },
        y: {
          display: true,
          ticks: {
            color: '#9E9E9E',
            font: {
              family: 'Roboto, "Helvetica Neue", sans-serif'
            }
          },
          borderColor: '#9E9E9E',
          beginAtZero: true,
        },
      },
      font: {
        family: 'Roboto, "Helvetica Neue", sans-serif'
      },
      plugins: {
        legend: {
          labels: {
            color: '#9E9E9E',
            font: {
              family: 'Roboto, "Helvetica Neue", sans-serif'
            }
          }
        },
        tooltip: {
          mode: 'index',
          intersect: false,
          titleFont: {
            family: 'Roboto, "Helvetica Neue", sans-serif'
          }
        }
      }
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
