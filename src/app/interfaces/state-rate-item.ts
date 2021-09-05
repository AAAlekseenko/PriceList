import {RateChild} from "./rate-child";

export interface StateRateItem {
  afterMaxLuggagePrice?: number,
  child: RateChild,
  luggage: boolean,
  luggageBefore: number,
  maxLuggage: number,
  name: string,
  price: number,
  type: string,
}
