// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/context';



/* tslint:disable:no-any */
import { operation, param, requestBody } from '@loopback/rest';

//import { TransactionUsed } from '../models/transaction-used.model';
//import { TransactionReceived } from '../models/transaction-received.model';
//import { ResponseMessage } from '../models/response-message.model';
import { BlockChainModule } from '../blockchainClient';
import { ObjectType } from '@loopback/repository';
import { User } from '../models/user.model';
import { Services } from '../models/services.model';
import { Transaction } from '../models/transaction.model';

let blockchainClient = new BlockChainModule.BlockchainClient();
/**
 * The controller class is generated from OpenAPI spec with operations tagged
 * by addCoffee
 * A transaction named addCoffee
 */

const UserArrayType = {
  type: 'array',
  items: {
    type: 'array',
    items: {
      'x-ts-type': User
    },
  }
};

const ServicesToUseArrayType = {
  type: 'array',
  items: {
    type: 'array',
    items: {
      'x-ts-type': Services
    },
  }
};

const ServicesToGetArrayType = {
  type: 'array',
  items: {
    type: 'array',
    items: {
      'x-ts-type': Services
    },
  }
};





export class TokenControllerController {
  constructor() { }


  @operation('get', '/get_user/{id}', {
    responses: {
      '200': {
        description: 'ResponseMessage model instance',
        content: { 'application/json': { schema: { 'x-ts-type': User } } },
      },
    },
  })
  async getUserCreate(@param({ name: 'id', in: 'path' }) id: string): Promise<String> {

    try {
      let networkObj = await blockchainClient.connectToNetwork();

      let resp = await blockchainClient.get_user(networkObj!.contract, id);
      return JSON.parse(resp.toString());

    } catch (error) {
      let responseMessage = { message: error, statusCode: '400' };
      return JSON.stringify(responseMessage);
    }
  }

  @operation('get', '/get_users', {
    responses: {
      '200': {
        description: 'ResponseMessage model instance',
        content: { 'application/json': { schema: UserArrayType } },
      },
    },
  })
  async getUsers(): Promise<String> {

    try {
      let networkObj = await blockchainClient.connectToNetwork();

      let resp = await blockchainClient.get_users(networkObj!.contract);
      return JSON.parse(resp.toString());

    } catch (error) {
      let responseMessage = { message: error, statusCode: '400' };
      return JSON.stringify(responseMessage);
    }
  }

  @operation('get', '/get_services_to_use', {
    responses: {
      '200': {
        description: 'ResponseMessage model instance',
        content: { 'application/json': { schema: ServicesToUseArrayType } },
      },
    },
  })
  async getServicesToUse(): Promise<String> {

    try {
      let networkObj = await blockchainClient.connectToNetwork();

      let resp = await blockchainClient.get_services_to_use(networkObj!.contract);
      return JSON.parse(resp.toString());

    } catch (error) {
      let responseMessage = { message: error, statusCode: '400' };
      return JSON.stringify(responseMessage);
    }
  }

  @operation('get', '/get_services_to_get', {
    responses: {
      '200': {
        description: 'ResponseMessage model instance',
        content: { 'application/json': { schema: ServicesToGetArrayType } },
      },
    },
  })
  async getServicesToGet(): Promise<String> {

    try {
      let networkObj = await blockchainClient.connectToNetwork();

      let resp = await blockchainClient.get_services_to_get(networkObj!.contract);
      return JSON.parse(resp.toString());

    } catch (error) {
      let responseMessage = { message: error, statusCode: '400' };
      return JSON.stringify(responseMessage);
    }
  }


  @operation('post', '/transaction_used', {
    responses: {
      '200': {
        description: 'ResponseMessage model instance',
        content: { 'application/json': { schema: { 'x-ts-type': ServicesToGetArrayType } } },
      },
    },
  })
  async transactionUsedCreate(@requestBody() requestBody: Transaction): Promise<Object> {

    try {
      let networkObj = await blockchainClient.connectToNetwork();



      return await blockchainClient.transaction_used(networkObj!.contract, JSON.stringify(requestBody));



    } catch (error) {
      return { message: error, statusCode: '400' };
    }
  }


  @operation('post', '/transaction_get', {
    responses: {
      '200': {
        description: 'ResponseMessage model instance',
        content: { 'application/json': { schema: { 'x-ts-type': ServicesToGetArrayType } } },
      },
    },
  })
  async transactionReceviedCreate(@requestBody() requestBody: Transaction): Promise<Object> {

    try {
      let networkObj = await blockchainClient.connectToNetwork();

      return await blockchainClient.transaction_recevied(networkObj!.contract, JSON.stringify(requestBody));


    } catch (error) {
      return { message: error, statusCode: '400' };
    }
  }









}







