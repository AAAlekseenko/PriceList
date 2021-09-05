import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {stateRate} from "./stateRate";
import {StateRateItem} from "../interfaces/state-rate-item";
import {CountPriceService} from "../services/count-price.service";
import {FinalPriceArray} from "../interfaces/final-price-array";

@Component({
  selector: 'app-form-class',
  templateUrl: './form-class.component.html',
  styleUrls: ['./form-class.component.scss'],
  providers: [CountPriceService]
})

export class FormClassComponent  {
  public searchForm: FormGroup;

  @Output() submitDate = new EventEmitter<FinalPriceArray[]>();

  constructor(private countPriceService: CountPriceService) {
    this.searchForm = new FormGroup({
      kilometer: new FormControl(null),
      age: new FormControl(null),
      weight: new FormControl(null)
    })
  }

  public submit(e: Event) {
    e.preventDefault()
    this.checkRate()
  }

  private checkRate() {
    const suitableTypes: StateRateItem[] = [];

    for (const typeRate in stateRate) {
      for (const rate in stateRate[typeRate]) {
        if (stateRate[typeRate][rate].maxLuggage > this.searchForm.value.weight) {
          suitableTypes.push(stateRate[typeRate][rate])
        }
      }
    }

    if (suitableTypes) {
      const finalCountPriceArray: FinalPriceArray[] = this.countPriceService.countPrice(suitableTypes, this.searchForm.value)
      this.submitDate.emit(finalCountPriceArray)
    }
  }
}
