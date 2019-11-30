/* tslint:disable:no-any */
import { model, property } from '@loopback/repository';

/**
 * The model class is generated from OpenAPI schema - addCoffee
 * A transaction named addCoffee
 */
@model({ name: 'getUser' })
export class GetUser {
  constructor(data?: Partial<GetUser>) {
    if (data != null && typeof data === 'object') {
      Object.assign(this, data);
    }
  }

  /**
   *
   */
  @property({ name: 'id' })
  id?: string;

}

