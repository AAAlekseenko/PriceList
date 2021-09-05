import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {stateRate} from "./stateRate";
import {AirFlot, RJD} from "../consts/const";
import {RateChild} from "../interfaces/rate-child";
import {StateRateItem} from "../interfaces/state-rate-item";
import {FinalPriceArray} from "../interfaces/final-price-array";
import {SetArrayEmit} from "../interfaces/set-array-emit";

@Component({
  selector: 'app-form-class',
  templateUrl: './form-class.component.html',
  styleUrls: ['./form-class.component.scss']
})

export class FormClassComponent implements OnInit {

  public searchForm: FormGroup;
  private suitableTypes: StateRateItem[] = [];

  public airFinalPrice: FinalPriceArray[] = [];
  public railwayFinalPrice: FinalPriceArray[] = [];

  @Output() submitDate = new EventEmitter<SetArrayEmit>();

  constructor() {
    this.searchForm = new FormGroup({
      kilometer: new FormControl(null),
      age: new FormControl(null),
      weight: new FormControl(null)
    })
  }

  ngOnInit(): void {

  }


  public submit(e: Event) {
    e.preventDefault()
    this.checkRate()

  }


  private checkRate() {
    this.suitableTypes = [];
    this.airFinalPrice = [];
    this.railwayFinalPrice = [];

    for (const typeRate in stateRate) {
      for (const rate in stateRate[typeRate]) {
        if (stateRate[typeRate][rate].maxLuggage > this.searchForm.value.weight) {
          this.suitableTypes.push(stateRate[typeRate][rate])
        }
      }
    }

    let railway: StateRateItem[] = [];
    let air: StateRateItem[] = [];

    if (this.suitableTypes) {

      this.suitableTypes.forEach((item: StateRateItem) => {
        if (item.type === RJD) {
          railway.push(item)
        } else {
          air.push(item)
        }
      })
      this.countAir(air)
      this.countRailway(railway)
      this.submitDate.emit({'РЖД': this.railwayFinalPrice, 'Аерофлот': this.airFinalPrice})
    }
  }

  private countAir(arr: StateRateItem[]) {
    let price = null;
    arr.forEach((item: StateRateItem) => {
      price = item.price * this.searchForm.value.kilometer;
      const checkChild = item.child && item.child.age >= this.searchForm.value.age;

      if (checkChild && !item.child.withLuggage) {
        price = FormClassComponent.countChildPrice(price, item.child)
      }

      if (item.luggageBefore) {
        if (item.luggageBefore < this.searchForm.value.weight) {
          // @ts-ignore
          price += item.luggage;
        }
      }

      if (checkChild && item.child.withLuggage) {
        price = FormClassComponent.countChildPrice(price, item.child)
      }

      price = Math.ceil(price)
      this.airFinalPrice.push({price: price, name: item.name, type: item.type})
    })
  }

  private countRailway(arr: StateRateItem[]) {
    let price = null;
    arr.forEach((item: StateRateItem) => {
      price = item.price * this.searchForm.value.kilometer;
      const checkChild = item.child && item.child.age >= this.searchForm.value.age;

      if (checkChild && !item.child.withLuggage) {
        price = FormClassComponent.countChildPrice(price, item.child)
      }

      if (item.luggageBefore) {
        if (item.luggageBefore < this.searchForm.value.weight && item.afterMaxLuggagePrice) {
          price += (this.searchForm.value.weight - item.luggageBefore) * item.afterMaxLuggagePrice
        }
      }

      if (checkChild && item.child.withLuggage) {
        price = FormClassComponent.countChildPrice(price, item.child)
      }
      price = Math.ceil(price)
      this.railwayFinalPrice.push({price: price, name: item.name, type: item.type})
    })
  }

  private static countChildPrice(price: number, child: RateChild): number {
    return price * ((100 - child.discount) / 100)
  }
}
