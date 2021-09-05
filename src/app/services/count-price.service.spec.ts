import {TestBed} from '@angular/core/testing';

import {CountPriceService} from './count-price.service';

describe('CountPriceService', () => {
  let service: CountPriceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountPriceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be countPrice', () => {
    expect(service.countPrice([{
      type: "РЖД",
      name: "Продвинутый",
      price: 2,
      luggageBefore: 20,
      maxLuggage: 60,
      afterMaxLuggagePrice: 50,
      child: {
        age: 8,
        discount: 30,
        withLuggage: false
      }
    },
      {
        type: "РЖД",
        name: "Люкс",
        price: 4,
        luggageBefore: false,
        maxLuggage: 60,
        child: {
          age: 16,
          discount: 20,
          withLuggage: true
        }
      },], {kilometer: 1, age: 1, weight: 55})).toEqual([
      {
        price: 1752,
        type: "РЖД",
        name: "Продвинутый"
      },
      {
        price: 4,
        type: "РЖД",
        name: "Люкс"
      }
    ]);
  });

  it('should be countChildPrice', () => {
    expect(service.countChildPrice(1000, {age: 7, discount: 30})).toBe(700);
  });

});
