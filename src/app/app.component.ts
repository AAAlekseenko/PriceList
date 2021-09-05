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

    public getArrays(e: any) {
      console.log(e)
      this.railwayPriceArray = [];
      this.airPriceArray = [];
      for (const arrayItem in e) {
        e[arrayItem].forEach((item: any) => {
          if (item.type === RJD) {
            this.railwayPriceArray.push(item)
          } else {
            this.airPriceArray.push(item)
          }
        })
      }
    }
}
