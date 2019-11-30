/* tslint:disable:no-any */
import { model, property } from '@loopback/repository';

/**
 * The model class is generated from OpenAPI schema - addCoffee
 * A transaction named addCoffee
 */
@model({ name: 'transactionReceived' })
export class TransactionReceived {
  constructor(data?: Partial<TransactionReceived>) {
    if (data != null && typeof data === 'object') {
      Object.assign(this, data);
    }
  }

  /**
   *
   */
  @property({ UserID: 'userId', ServiceToGetId: 'serviceToGetId', Points: 'points', Date: 'date', Signature: 'signature' })
  UserID: string;
  ServiceToGetId: string;
  Points: string;
  Date: Number;
  Signature: string


}

