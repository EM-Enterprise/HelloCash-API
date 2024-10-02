import { Customer } from "./Customer";
import { Invoice } from "./Invoice";

export interface BuyHistory {
  set(key: Customer | 'unkown', value: Array<Invoice>): void;

  get(key: Customer | 'unkown'): Array<Invoice> | undefined;
}