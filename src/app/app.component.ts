import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
    public railwayPriceArray: any = [];
    public airPriceArray: any = [];

    public getArrays(e: any) {
      this.railwayPriceArray = [];
      this.airPriceArray = [];
      for (const arrayItem in e) {
        e[arrayItem].forEach((item: any) => {
          if (item.type === 'РЖД') {
            this.railwayPriceArray.push(item)
          } else {
            this.airPriceArray.push(item)
          }
        })
      }
    }
}
