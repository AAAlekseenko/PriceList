import {Component} from '@angular/core';
import {FinalPriceArray} from "./interfaces/final-price-array";
import { RJD } from "./consts/const";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
    public railwayPriceArray: FinalPriceArray[] = [];
    public airPriceArray: FinalPriceArray[] = [];

    public getArrays(array: any) {
      this.railwayPriceArray = [];
      this.airPriceArray = [];

      for (const arrayItem in array) {
          if (arrayItem === RJD) {
            this.railwayPriceArray = array[arrayItem]
          } else {
            this.airPriceArray = array[arrayItem]
          }
      }
    }
}
