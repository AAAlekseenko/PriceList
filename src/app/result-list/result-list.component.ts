import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-result-list',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.scss']
})
export class ResultListComponent implements OnChanges{

  @Input() airPriceArray: any = [];
  @Input() railwayPriceArray: any = [];

  public airArrayIsEmpty = true;
  public railwayArrayIsEmpty = true;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
      this.airArrayIsEmpty = this.airPriceArray.length ?  false : true
      this.railwayArrayIsEmpty = this.railwayPriceArray.length ?  false : true
  }

}
