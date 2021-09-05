import {Component, EventEmitter} from '@angular/core';
import {FinalPriceArray} from "./interfaces/final-price-array";
import { RJD } from "./consts/const";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

    public finalPriceArray: FinalPriceArray[] = [];

    public getArrays(array: any) {
      this.finalPriceArray = array;
    }
}
