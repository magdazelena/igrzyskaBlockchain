/* tslint:disable:no-any */
import { Entity, model, property } from '@loopback/repository';

/**
 * The model class is generated from OpenAPI schema - addCoffee
 * A transaction named addCoffee
 */


@model()
export class Transaction extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  userId: string;

  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  serviceId: string;

  @property({
    type: 'number',
    required: true,
    default: 0,
  })
  points: number;

  @property({
    type: 'number',
    required: true,

  })
  date: number;

  @property({
    type: 'string',
    required: true,

  })
  signature: string;




  constructor(data?: Partial<Transaction>) {
    super(data);
  }
}

export interface TransactionRelations {
  // describe navigational properties here
}

export type TransactionWithRelations = Transaction & TransactionRelations;






