import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { DialogActionService } from '@component/dialog-action/dialog-action.service';
import { DateTime } from 'luxon';
import { merge, Subscription, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { ActionHistoryList } from 'src/app/interfaces';

export interface DataTableElement extends ActionHistoryList {
  no: number;
}

@Component({
  selector: 'app-dialog-action-history',
  templateUrl: './dialog-action-history.component.html',
  styleUrls: ['./dialog-action-history.component.scss']
})
export class DialogActionHistoryComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  resultsLength = 0;
  pageIndex = 0;
  pageSize = 10;
  displayedColumns: string[] = ['no', 'createdAt', 'action', 'from'];
  dataSource: DataTableElement[] = [];
  dataSourceSubscription: Subscription;

  constructor(
    public dialogRef: MatDialogRef<DialogActionHistoryComponent>,
    private dialogActionService: DialogActionService
  ) { }

  createdAtFormat(date: string): string {
    return DateTime.fromISO(date).toFormat('LLL dd, yyyy HH:mm:ss');
  }

  initTable(): void {
    this.dataSourceSubscription = merge(this.paginator.page)
    .pipe(
      startWith({}),
      switchMap(() => {
        const currentPage = this.paginator.pageIndex + 1;
        return this.dialogActionService.history(currentPage);
      }),
      map(data => {
        this.resultsLength = data.total;

        return data.list;
      }),
      catchError(() => {
        return observableOf([]);
      })
    ).subscribe(data => {
      let currentNo = this.paginator.pageIndex * this.paginator.pageSize;
      this.dataSource = data.map((item: ActionHistoryList) => {
        currentNo++;
        return {
          no: currentNo,
          createdAt: item.createdAt,
          action: item.action,
          from: item.from
        };
      });
    });
  }

  ngAfterViewInit(): void {
    this.initTable();
  }

  ngOnDestroy(): void {
    if (this.dataSourceSubscription) {
      this.dataSourceSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
  }

}
