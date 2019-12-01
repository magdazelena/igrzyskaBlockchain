/* tslint:disable:no-any */
import { model, property } from '@loopback/repository';

/**
 * The model class is generated from OpenAPI schema - addCoffee
 * A transaction named addCoffee
 */
@model({ name: 'transactionUsed' })
export class TransactionUsed {
  constructor(data?: Partial<TransactionUsed>) {
    if (data != null && typeof data === 'object') {
      Object.assign(this, data);
    }
  }

  /**
   *
   */
  @property({ UserID: 'userId',ServiceToUseID:'serviceToUseId',Points:'points',Date:'date',Signature:'signature'})
  UserID: string;
  ServiceToUseID:string;
  Points:string;
  Date:Number;
  Signature:string


}

