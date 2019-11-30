import { DateType } from "@loopback/repository";

const yaml = require('js-yaml');
const { FileSystemWallet, Gateway } = require('fabric-network');
const fs = require('fs');

const path = require('path');

const configPath = path.join(process.cwd(), 'server/config.json');
const configJSON = fs.readFileSync(configPath, 'utf8');
const config = JSON.parse(configJSON);
var userName = config.appAdmin;
var gatewayDiscovery = config.gatewayDiscovery;
var connection_file = config.connection_file;


// connect to the connection file
const ccpPath = path.join(process.cwd(), 'server/' + connection_file);
const ccpJSON = fs.readFileSync(ccpPath, 'utf8');
const ccp = JSON.parse(ccpJSON);

// A wallet stores a collection of identities for use
const wallet = new FileSystemWallet('./../server/wallet');

export module BlockChainModule {

  export class BlockchainClient {
    async connectToNetwork() {


      const gateway = new Gateway();

      try {

        await gateway.connect(ccp, { wallet, identity: userName, discovery: gatewayDiscovery });

        // Connect to our local fabric
        const network = await gateway.getNetwork('mychannel');


        console.log('Connected to mychannel. ');

        // Get the contract we have installed on the peer
        const contract = await network.getContract('workinprogress');


        let networkObj = {
          contract: contract,
          network: network
        };

        return networkObj;

      } catch (error) {
        console.log(`Error processing transaction. ${error}`);
        console.log(error.stack);
      } finally {
        console.log('Done connecting to network.');
        // gateway.disconnect();
      }

    }

    //async addMember(args: any) {
    //call addMember smart contract function
    //$TODO: dynamically call submitTransaction
    // let response = await args.contract.submitTransaction(args.function,
    //   args.id, args.organization, args.address, args.memberType);
    // return response;
    //}



    //async queryByKey2(contract: any, keyPassed: any) {
    // let str = 'query'
    // let response = await keyPassed.contract.submitTransaction('query', 'arg1', 'arg2');
    // let response = await contract.submitTransaction('query', keyPassed);
    // console.log('query by key response: ')
    // console.log(JSON.parse(response.toString()))
    // console.log(response.length)
    // if (response.length === 2) {
    //   response = `${keyPassed} does not exist`;
    //   return response;
    // }
    //response = JSON.parse(response.toString());
    //  return response;
    // }

    async get_user(contract: any, id: any) {
      // let str = 'query'
      // let response = await keyPassed.contract.submitTransaction('query', 'arg1', 'arg2');
      let response = await contract.evaluateTransaction('get_user', id);
      //  response = JSON.parse(response.toString());
      return response;

    }

    async get_services_to_use(contract: any) {
      let response = await contract.evaluateTransaction('get_services_to_use');
      // console.log(response.toString())
      return response;
    }

    async get_services_to_get(contract: any) {
      let response = await contract.evaluateTransaction('get_services_to_get');
      // console.log(response.toString())
      return response;
    }

    async transsaction_recevied(contract: any, id: any, serviceid: any, points: any, date: Number, signature: any) {
      let response = await contract.evaluateTransaction('transsaction_recevied', id, serviceid, points, date, signature);
      // console.log(response.toString())
      return response;
    }

    async transsaction_used(contract: any, id: any, serviceid: any, points: any, date: Number, signature: any) {
      let response = await contract.evaluateTransaction('transsaction_used', id, serviceid, points, date, signature);
      // console.log(response.toString())
      return response;
    }



    //async deleteByKey(contract: any, keyPassed: any) {
    ///
    //   let response = await contract.submitTransaction('deleteKey', keyPassed);
    //   console.log('delete by key response: ')
    //  console.log(JSON.parse(response.toString()))
    //  console.log(response.length)
    //  if (response.length === 2) {
    //     response = `${keyPassed} does not exist`;
    //      return response;
    //    }
    //    response = JSON.parse(response.toString());
    //    return response;

    // }


  }
}
