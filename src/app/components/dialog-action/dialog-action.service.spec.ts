import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Action, ActionDetail, ActionHistory } from 'src/app/interfaces';

import { DialogActionService } from './dialog-action.service';

describe('DialogActionService', () => {
  let service: DialogActionService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        DialogActionService
      ]
    });
    service = TestBed.inject(DialogActionService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(async () => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('action should be return value from observable', () => {
    const actionDummy: Action = {
      automationEnable: false,
      automationParameter: [
        {
          enable: true,
          sensor: 'soil.temperature',
          operator: '>=',
          value: 30
        },
        {
          enable: false,
          sensor: 'soil.moisture',
          operator: '<=',
          value: 30
        }
      ],
      automationAttemp: 10,
      lastAction: '2021-05-31T05:15:00.000Z',
      routineTaskEnable: true,
      routineTaskSkipIfExceedParameter: true,
      routineTaskTime: '2021-05-28T05:15:44.862Z'
    };

    service.action().subscribe(value => {
      expect(value).toEqual(actionDummy);
    });

    const request = httpMock.expectOne(`${service.actionURL}setting`);
    expect(request.request.method).toBe('GET');
    request.flush(actionDummy);
  });

  it('history should be return value from observable', () => {
    const historyDummy: ActionHistory = {
      list: [
        {
          createdAt: '2021-05-31T05:15:00.080Z',
          action: 'START',
          from: 'ROUTINE'
        },
        {
          createdAt: '2021-05-31T04:41:06.758Z',
          action: 'STOP',
          from: 'DASHBOARD'
        },
        {
          createdAt: '2021-05-31T04:40:55.805Z',
          action: 'START',
          from: 'DASHBOARD'
        }
      ],
      total: 3
    };

    service.history().subscribe(value => {
      expect(value).toEqual(historyDummy);
    });

    const request = httpMock.expectOne(`${service.actionURL}history`);
    expect(request.request.method).toBe('GET');
    request.flush(historyDummy);
  });

  it('detail should be return value from observable', () => {
    const detail = 'routine';
    const detailDummy: ActionDetail = {
      routineTaskEnable: true,
      routineTaskSkipIfExceedParameter: true,
      routineTaskTime: '2021-05-28T05:15:44.862Z'
    };

    service.actionDetail(detail).subscribe(value => {
      expect(value).toEqual(detailDummy);
    });

    const request = httpMock.expectOne(`${service.actionURL}setting-${detail}`);
    expect(request.request.method).toBe('GET');
    request.flush(detailDummy);
  });
});
