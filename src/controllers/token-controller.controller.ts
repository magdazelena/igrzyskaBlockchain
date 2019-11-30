// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/context';



/* tslint:disable:no-any */
import { operation, param, requestBody } from '@loopback/rest';
import { GetUser } from '../models/get-user.model';
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


  @operation('post', '/get_user', {
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


  

}







