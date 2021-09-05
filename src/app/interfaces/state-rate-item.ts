import {RateChild} from "./rate-child";

export interface StateRateItem {
  afterMaxLuggagePrice?: number,
  child: RateChild,
  luggage?: boolean | number,
  luggageBefore: number | boolean,
  maxLuggage: number,
  name: string,
  price: number,
  type: string,
}
