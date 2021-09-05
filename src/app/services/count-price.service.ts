import {Injectable} from '@angular/core';
import {StateRateItem} from "../interfaces/state-rate-item";
import {RateChild} from "../interfaces/rate-child";
import {FinalPriceArray} from "../interfaces/final-price-array";

@Injectable({
  providedIn: 'root'
})
export class CountPriceService {

  constructor() {
  }


  countPrice(suitableTypes: any[], formValue: any) {
    let price = null;
    const finalPriceArray: any = [];
    suitableTypes.forEach((item: StateRateItem) => {
      price = item.price * formValue.kilometer;
      const checkChild = item.child && item.child.age >= formValue.age;

      if (checkChild && !item.child.withLuggage) {
        price = this.countChildPrice(price, item.child)
      }

      if (item.luggageBefore && item.luggageBefore < formValue.weight) {
        if (item.type === 'Аэрофлот') {
          // @ts-ignore
          price += item.luggage;
        } else if (item.afterMaxLuggagePrice) {
          price += (formValue.weight - item.luggageBefore) * item.afterMaxLuggagePrice
        }
      }

      if (checkChild && item.child.withLuggage) {
        price = this.countChildPrice(price, item.child)
      }

      price = Math.ceil(price)

      finalPriceArray.push({price: price, type: item.type, name: item.name})
    })
    return finalPriceArray
  }

  private countChildPrice(price: number, child: RateChild): number {
    return price * ((100 - child.discount) / 100)
  }
}
