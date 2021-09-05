import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {stateRate} from "./stateRate";

@Component({
  selector: 'app-form-class',
  templateUrl: './form-class.component.html',
  styleUrls: ['./form-class.component.scss']
})

export class FormClassComponent implements OnInit {

  public searchForm: FormGroup;
  private suitableTypes: any = [];

  public airFinalPrice: any = [];
  public railwayFinalPrice: any = [];

  @Output() submitDate = new EventEmitter<any>();

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

    let railway: any[] = [];
    let air: any[] = [];

    if (this.suitableTypes) {

      this.suitableTypes.forEach((item: any) => {
        if (item.type === 'РЖД') {
          railway.push(item)
        } else {
          air.push(item)
        }
      })
      this.countAir(air)
      this.countRailway(railway)
      this.submitDate.emit({'РЖД': this.railwayFinalPrice, 'Аэрофлот': this.airFinalPrice})
    }
  }

  private countAir(arr: any) {
    let price = null;
    arr.forEach((item: any) => {
      price = item.price * this.searchForm.value.kilometer;
      const checkChild = item.child && item.child.age >= this.searchForm.value.age;

      if (checkChild && !item.child.withLuggage) {
        price = FormClassComponent.countChildPrice(price, item.child)
      }

      if (item.luggageBefore) {
        if (item.luggageBefore < this.searchForm.value.weight) {
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

  private countRailway(arr: any) {
    let price = null;
    arr.forEach((item: any) => {
      price = item.price * this.searchForm.value.kilometer;
      const checkChild = item.child && item.child.age >= this.searchForm.value.age;

      if (checkChild && !item.child.withLuggage) {
        price = FormClassComponent.countChildPrice(price, item.child)
      }

      if (item.luggageBefore) {
        if (item.luggageBefore < this.searchForm.value.weight) {
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

  private static countChildPrice(price: number, child: any): number {
    return price * ((100 - child.discount) / 100)
  }
}
