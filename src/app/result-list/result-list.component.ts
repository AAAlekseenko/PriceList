import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {FinalPriceArray} from "../interfaces/final-price-array";
import {AirFlot, RJD} from "../consts/const";

@Component({
  selector: 'app-result-list',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.scss']
})
export class ResultListComponent implements OnChanges{

  @Input() finalPriceArray: FinalPriceArray[] = [];

  public airIsEmpty = true;
  public railwayIsEmpty = true;

  public airArray: FinalPriceArray[] = []
  public railwayArray: FinalPriceArray[] = []

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.finalPriceArray) {
      this.airArray = this.finalPriceArray.filter((el) => el.type === AirFlot)
      this.railwayArray = this.finalPriceArray.filter((el) => el.type === RJD)
    }
    this.airIsEmpty = !this.airArray.length;
    this.railwayIsEmpty = !this.railwayArray.length;
  }
}
