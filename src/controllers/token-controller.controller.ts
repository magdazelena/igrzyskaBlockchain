// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/context';



/* tslint:disable:no-any */
import { operation, param, requestBody } from '@loopback/rest';
import { GetUser } from '../models/get-user.model';
import { TransactionUsed } from '../models/transaction-used.model';
import { TransactionReceived } from '../models/transaction-received.model';
//import { ResponseMessage } from '../models/response-message.model';
import { BlockChainModule } from '../blockchainClient';
import { ObjectType } from '@loopback/repository';

let blockchainClient = new BlockChainModule.BlockchainClient();
/**
 * The controller class is generated from OpenAPI spec with operations tagged
 * by addCoffee
 * A transaction named addCoffee
 */

export class TokenControllerController {
  constructor() { }


  @operation('get', '/get_user', {
    responses: {
      '200': {
        description: 'ResponseMessage model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Object } } },
      },
    },
  })
  async getUserCreate(@requestBody() requestBody: GetUser): Promise<Object> {

    try {
      let networkObj = await blockchainClient.connectToNetwork();

      let resp = await blockchainClient.get_user(networkObj!.contract, requestBody.id);
      return resp;

    } catch (error) {
      let responseMessage = { message: error, statusCode: '400' };
      return responseMessage;
    }
  }

  @operation('get', '/get_services_to_use', {
    responses: {
      '200': {
        description: 'ResponseMessage model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Object } } },
      },
    },
  })
  async getServicesToUseCreate(@requestBody() requestBody: GetUser): Promise<Object> {

    try {
      let networkObj = await blockchainClient.connectToNetwork();

      let resp = await blockchainClient.get_services_to_use(networkObj!.contract);
      return resp;

    } catch (error) {
      let responseMessage = { message: error, statusCode: '400' };
      return responseMessage;
    }
  }

  @operation('get', '/get_services_to_get', {
    responses: {
      '200': {
        description: 'ResponseMessage model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Object } } },
      },
    },
  })
  async getServicesToGetCreate(@requestBody() requestBody: GetUser): Promise<Object> {

    try {
      let networkObj = await blockchainClient.connectToNetwork();

      let resp = await blockchainClient.get_services_to_get(networkObj!.contract);
      return resp;

    } catch (error) {
      let responseMessage = { message: error, statusCode: '400' };
      return responseMessage;
    }
  }






  @operation('post', '/transaction_used', {
    responses: {
      '200': {
        description: 'ResponseMessage model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Object } } },
      },
    },
  })
  async transactionUsedCreate(@requestBody() requestBody: TransactionUsed): Promise<Object> {

    try {
      let networkObj = await blockchainClient.connectToNetwork();

      let resp = await blockchainClient.transsaction_used(networkObj!.contract, requestBody.UserID, requestBody.ServiceToUseID, requestBody.Points, requestBody.Date, requestBody.Signature);
      return resp;

    } catch (error) {
      let responseMessage = { message: error, statusCode: '400' };
      return responseMessage;
    }
  }

  @operation('post', '/transaction_received', {
    responses: {
      '200': {
        description: 'ResponseMessage model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Object } } },
      },
    },
  })
  async transactionReceivedCreate(@requestBody() requestBody: TransactionReceived): Promise<Object> {

    try {
      let networkObj = await blockchainClient.connectToNetwork();

      let resp = await blockchainClient.transsaction_recevied(networkObj!.contract, requestBody.UserID, requestBody.ServiceToGetId, requestBody.Points, requestBody.Date, requestBody.Signature);
      return resp;

    } catch (error) {
      let responseMessage = { message: error, statusCode: '400' };
      return responseMessage;
    }
  }




}







