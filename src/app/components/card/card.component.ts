import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CardData, ChartJsFormat, UniversalSelect } from 'src/app/interfaces';
import { ChartComponent } from '@component/chart/chart.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogDateComponent } from '@component/dialog-date/dialog-date.component';
import { AppService } from 'src/app/app.service';
import { DateTime } from 'luxon';
import { interval, Subscription } from 'rxjs';
import { ConnectionService } from 'ng-connection-service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit, OnDestroy {

  @ViewChild('chartContainer') chartContainer: ChartComponent;
  @Input() cardData: CardData;

  isConnected = true;
  isOfflineData = false;

  refreshIntervalCounter = interval(30 * 1000);
  refreshInterval: Subscription;

  lastUpdate: string = null;

  type = 'line';
  data: ChartJsFormat = {
    labels: [],
    datasets: []
  };
  options = {
    responsive: true,
    maintainAspectRatio: false,
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
  };

  currentDate = 1;
  localStorageName: string;
  localStorageNameOffline: string;
  dateFormatSelect: UniversalSelect[] = [
    {
      value: 1,
      viewValue: 'Last 30 data'
    },
    {
      value: 2,
      viewValue: 'Last 1 hour (list per minutes)'
    },
    {
      value: 3,
      viewValue: 'Last 24 hours (list per hour)'
    },
    {
      value: 4,
      viewValue: 'Last 30 Days (list per day)'
    },
    {
      value: 5,
      viewValue: 'Last 12 Months (list per month)'
    },
  ];

  lineColor: string[] = [
    'rgb(66, 133, 244)',
    'rgb(244, 180, 0)',
    'rgb(219, 68, 55)',
    'rgb(0,150,136)'
  ];

  constructor(
    private matDialog: MatDialog,
    private connectionService: ConnectionService,
    private appService: AppService,
  ) {
    this.connectionService.monitor().subscribe(isConnected => {
      this.isConnected = isConnected;
    });
  }

  actionDateChange(): void {
    const dialogRef = this.matDialog.open(DialogDateComponent, {
      data: {
        dateFormatSelect: this.dateFormatSelect,
        currentDate: this.currentDate
      }
    });
    // tslint:disable-next-line: deprecation
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.currentDate = result;
        localStorage.setItem(this.localStorageName, this.currentDate.toString());
        this.initData();
      }
    });
  }

  actionRefresh(): void {
    this.initData();
  }

  manageData(res: ChartJsFormat): void {
    this.data = {
      labels: res.labels.map(item => {
        const parse = DateTime.fromISO(item);
        if (this.currentDate === 1) {
          return parse.toLocaleString(DateTime.TIME_24_WITH_SECONDS);
        } else if (this.currentDate === 2 ) {
          return parse.toFormat('HH:mm');
        } else if (this.currentDate === 3 ) {
          return parse.toFormat('HH:mm');
        } else if (this.currentDate === 4 ) {
          return parse.toLocaleString(DateTime.DATE_SHORT);
        } else if (this.currentDate === 5) {
          return parse.toFormat('LLLL kkkk');
        }
        return DateTime.fromISO(item).toLocaleString(DateTime.DATETIME_FULL);
      }).reverse(),
      datasets: res.datasets.map((item, index) => {
        return {
          label: item.label,
          data: item.data.reverse(),
          backgroundColor: this.lineColor[index],
          borderColor: this.lineColor[index],
          fill: false
        };
      })
    };

    this.lastUpdate = res.lastUpdate ? DateTime.fromISO(res.lastUpdate).toFormat('LLL dd, yyyy HH:mm:ss') : null;
  }

  initOffline(): void {
    const getLocalStorage = localStorage.getItem(this.localStorageNameOffline);
    if (getLocalStorage) {
      try {
        const parseData = JSON.parse(getLocalStorage);
        if (parseData) {
          this.isOfflineData = true;
          this.manageData(parseData);
        }
      } catch (error) { }
    }
  }

  initData(): void {
    if (!this.isConnected) {
      this.initOffline();
      return;
    }
    // tslint:disable-next-line: deprecation
    this.appService.getSensor(this.cardData.idService, this.currentDate).subscribe(res => {
      this.manageData(res);
      localStorage.setItem(this.localStorageNameOffline, JSON.stringify(res).toString());
    });
  }

  destroyInterval(): void {
    if (this.refreshInterval) {
      this.refreshInterval.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.localStorageName = `config-card-${this.cardData.callbackId}`;
    this.localStorageNameOffline = `offline-card-${this.cardData.callbackId}-${this.currentDate}`;

    const getLocalStorage = localStorage.getItem(this.localStorageName);
    if (getLocalStorage) {
      try {
        this.currentDate = Number(getLocalStorage);
      } catch (error) {
        this.currentDate = 1;
      }
    } else {
      localStorage.setItem(this.localStorageName, this.currentDate.toString());
    }
    this.initData();

    this.refreshInterval = this.refreshIntervalCounter.subscribe(res => {
      this.initData();
    });
  }

  ngOnDestroy(): void {
    this.destroyInterval();
  }

}
