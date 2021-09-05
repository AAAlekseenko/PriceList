import {Injectable} from '@angular/core';
import {StateRateItem} from "../interfaces/state-rate-item";
import {RateChild} from "../interfaces/rate-child";
import {FinalPriceArray} from "../interfaces/final-price-array";
import {FormValueInterface} from "../interfaces/form-value";

@Injectable({
  providedIn: 'root'
})
export class CountPriceService {

  constructor() {
  }

  countPrice(suitableTypes: StateRateItem[], formValue: FormValueInterface) {
    console.log(suitableTypes)
    let price = null;
    const finalPriceArray: FinalPriceArray[] = [];
    suitableTypes.forEach((item: StateRateItem) => {
      price = item.price * formValue.kilometer;
      const checkChild = item.child && item.child.age >= formValue.age;

      if (checkChild && !item.child.withLuggage) {
        price = this.countChildPrice(price, item.child)
      }

      if (item.luggageBefore && item.luggageBefore < formValue.weight) {
        if (item.type === 'Аэрофлот' && (typeof item.luggage !== "boolean" && item.luggage)) {
          price += item.luggage;
        } else if (item.afterMaxLuggagePrice && (typeof item.luggageBefore !== "boolean")) {
          price += (formValue.weight - item.luggageBefore) * item.afterMaxLuggagePrice
        }
      }

      if (checkChild && item.child.withLuggage) {
        price = this.countChildPrice(price, item.child)
      }

      price = Math.ceil(price)

      finalPriceArray.push({price: price, type: item.type, name: item.name})
    })
    console.log(finalPriceArray)
    return finalPriceArray
  }

  countChildPrice(price: number, child: RateChild): number {
    return price * ((100 - child.discount) / 100)
  }
}
