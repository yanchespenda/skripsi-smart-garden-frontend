import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { AppService } from './app.service';
import { ChartJsFormat } from './interfaces';

describe('AppService', () => {
  let service: AppService;
  let httpMock: HttpTestingController;

  const realSensor = 'dht-temperature';
  const fakeSensor = 'fake-sensor';
  const dateFormat = 1;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        AppService
      ]
    });
    service = TestBed.inject(AppService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(async () => {
    httpMock.verify();
  });

  it('should be created', async () => {
    expect(service).toBeTruthy();
  });

  it(`getSensor with ${realSensor} should return value from observable`, () => {
    const dummySensor: ChartJsFormat = {
      datasets: [
        {
          label: 'Nilai',
          data: [
            0,
            1,
            2,
            3,
            4,
          ],
        }
      ],
      labels: [
        'Label 1',
        'Label 2',
        'Label 3',
        'Label 4',
        'Label 5',
      ],
      lastUpdate: '2021-05-29T05:18:31.349Z'
    };

    service.getSensor(realSensor, dateFormat).subscribe(value => {
      expect(value).toEqual(dummySensor);
    });

    const request = httpMock.expectOne(`${service.baseSensorServices}/${realSensor}?date-format=${dateFormat}`);
    expect(request.request.method).toBe('GET');
    request.flush(dummySensor);
  });

  it('should return an error when the server returns a 404', async () => {
    service.getSensor(fakeSensor, dateFormat).subscribe(() => {
      fail('expected an error, not value');
    }, error => {
      expect(error.message).toContain('Not Found');
    });

    const request = httpMock.expectOne(`${service.baseSensorServices}/${fakeSensor}?date-format=${dateFormat}`);
    expect(request.request.method).toBe('GET');
    request.flush({
      statusCode: 404,
      message: 'Cannot GET /api/sensor/dht-temperaturec',
      error: 'Not Found'
    }, {
      status: 404,
      statusText: 'Not Found'
    });
  });

});
