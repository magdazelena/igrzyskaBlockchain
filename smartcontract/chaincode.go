/*
 * SPDX-License-Identifier: Apache-2.0
 */

package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"strconv"

	"github.com/hyperledger/fabric/core/chaincode/shim"
	sc "github.com/hyperledger/fabric/protos/peer"
)

// Chaincode is the definition of the chaincode structure.
type Chaincode struct {
}

//User struct
type User struct {
	ID      string `json:"id"`
	Name    string `json:"name"`
	Balance int    `json:"balance"`
}

//ServiceToGet struct
type ServiceToGet struct {
	ID     string `json:"id"`
	Name   string `json:"name"`
	Points int    `json:"points"`
}

//ServiceToUse struct
type ServiceToUse struct {
	ID     string `json:"id"`
	Name   string `json:"name"`
	Points int    `json:"points"`
}

//TransactionUsed struct
type TransactionUsed struct {
	UserID         string `json:"userId"`
	ServiceToUseID string `json:"serviceToUseId"`
	Points         int    `json:"points"`
	Date           int64  `json:"date"`
	Signature      string `json:"signature"`
}

//TransactionReceived struct
type TransactionReceived struct {
	UserID         string `json:"userId"`
	ServiceToGetID string `json:"serviceToGetId"`
	Points         int    `json:"points"`
	Date           int64  `json:"date"`
	Signature      string `json:"signature"`
}

// Init is called when the chaincode is instantiated by the blockchain network.
func (cc *Chaincode) Init(stub shim.ChaincodeStubInterface) sc.Response {
	fcn, params := stub.GetFunctionAndParameters()
	fmt.Println("Init()", fcn, params)
	return shim.Success(nil)
}

// Invoke is called as a result of an application request to run the chaincode.
func (cc *Chaincode) Invoke(stub shim.ChaincodeStubInterface) sc.Response {
	fcn, params := stub.GetFunctionAndParameters()

	// Route to the appropriate handler function to interact with the ledger appropriately
	if fcn == "initLedger" {
		return cc.initLedger(stub)
	} else if fcn == "queryAll" {
		return cc.queryAll(stub)
	} else if fcn == "get_users" {
		return cc.getUsers(stub)
	} else if fcn == "get_services_to_use" {
		return cc.getServicesToUse(stub)
	} else if fcn == "get_services_to_get" {
		return cc.getServicesToGet(stub)
	} else if fcn == "get_user" {
		return cc.getUser(stub, params)
	} else if fcn == "transaction_used" {
		return cc.transactionUsed(stub, params)
	} else if fcn == "transaction_received" {
		return cc.transactionReceived(stub, params)
	}
	return shim.Error("Invalid Smart Contract function name.")

}

func (cc *Chaincode) getUsers(stub shim.ChaincodeStubInterface) sc.Response {

	startKey := "User0"
	endKey := "User999"

	resultsIterator, err := stub.GetStateByRange(startKey, endKey)
	if err != nil {
		return shim.Error(err.Error())
	}
	defer resultsIterator.Close()

	// buffer is a JSON array containing QueryResults
	var buffer bytes.Buffer
	buffer.WriteString("[")

	bArrayMemberAlreadyWritten := false
	for resultsIterator.HasNext() {
		queryResponse, err := resultsIterator.Next()
		if err != nil {
			return shim.Error(err.Error())
		}
		// Add a comma before array members, suppress it for the first array member
		if bArrayMemberAlreadyWritten == true {
			buffer.WriteString(",")
		}
		// Record is a JSON object, so we write as-is
		buffer.WriteString(string(queryResponse.Value))

		bArrayMemberAlreadyWritten = true
	}
	buffer.WriteString("]")

	return shim.Success(buffer.Bytes())
}

func (cc *Chaincode) getServicesToUse(stub shim.ChaincodeStubInterface) sc.Response {
	startKey := "ServiceToUse0"
	endKey := "ServiceToUse999"

	resultsIterator, err := stub.GetStateByRange(startKey, endKey)
	if err != nil {
		return shim.Error(err.Error())
	}
	defer resultsIterator.Close()

	// buffer is a JSON array containing QueryResults
	var buffer bytes.Buffer
	buffer.WriteString("[")

	bArrayMemberAlreadyWritten := false
	for resultsIterator.HasNext() {
		queryResponse, err := resultsIterator.Next()
		if err != nil {
			return shim.Error(err.Error())
		}
		// Add a comma before array members, suppress it for the first array member
		if bArrayMemberAlreadyWritten == true {
			buffer.WriteString(",")
		}
		// Record is a JSON object, so we write as-is
		buffer.WriteString(string(queryResponse.Value))

		bArrayMemberAlreadyWritten = true
	}
	buffer.WriteString("]")

	return shim.Success(buffer.Bytes())
}

func (cc *Chaincode) getServicesToGet(stub shim.ChaincodeStubInterface) sc.Response {
	startKey := "ServiceToGet0"
	endKey := "ServiceToGet999"

	resultsIterator, err := stub.GetStateByRange(startKey, endKey)
	if err != nil {
		return shim.Error(err.Error())
	}
	defer resultsIterator.Close()

	// buffer is a JSON array containing QueryResults
	var buffer bytes.Buffer
	buffer.WriteString("[")

	bArrayMemberAlreadyWritten := false
	for resultsIterator.HasNext() {
		queryResponse, err := resultsIterator.Next()
		if err != nil {
			return shim.Error(err.Error())
		}
		// Add a comma before array members, suppress it for the first array member
		if bArrayMemberAlreadyWritten == true {
			buffer.WriteString(",")
		}
		// Record is a JSON object, so we write as-is
		buffer.WriteString(string(queryResponse.Value))

		bArrayMemberAlreadyWritten = true
	}
	buffer.WriteString("]")

	return shim.Success(buffer.Bytes())
}

func (cc *Chaincode) getUser(stub shim.ChaincodeStubInterface, params []string) sc.Response {
	if len(params) != 1 {
		return shim.Error("Incorrect number of arguments. Expecting 1")
	}

	userAsBytes, _ := stub.GetState(params[0])
	return shim.Success(userAsBytes)
}

func (cc *Chaincode) transactionUsed(stub shim.ChaincodeStubInterface, params []string) sc.Response {
	if len(params) != 1 {
		return shim.Error("Incorrect number of arguments. Expecting 1")
	}

	var transactionUsed TransactionUsed
	transactionUsedAsBytes := []byte(params[0])
	json.Unmarshal(transactionUsedAsBytes, &transactionUsed)

	var user User
	userAsBytes, _ := stub.GetState(transactionUsed.UserID)
	json.Unmarshal(userAsBytes, &user)

	if user.Balance < transactionUsed.Points {
		return shim.Error("Insufficient balance")
	}

	user.Balance = user.Balance - transactionUsed.Points
	userAsBytes, _ = json.Marshal(user)
	stub.PutState(user.ID, userAsBytes)

	transactionUsedKey := fmt.Sprintf("transactionUsed.%s.%d", transactionUsed.UserID, transactionUsed.Date)

	stub.PutState(transactionUsedKey, transactionUsedAsBytes)

	return shim.Success(nil)
}

func (cc *Chaincode) transactionReceived(stub shim.ChaincodeStubInterface, params []string) sc.Response {
	if len(params) != 1 {
		return shim.Error("Incorrect number of arguments. Expecting 1")
	}

	var transactionReceived TransactionReceived
	transactionReceivedAsBytes := []byte(params[0])
	json.Unmarshal(transactionReceivedAsBytes, &transactionReceived)

	var user User
	userAsBytes, _ := stub.GetState(transactionReceived.UserID)
	json.Unmarshal(userAsBytes, &user)

	user.Balance = user.Balance + transactionReceived.Points
	userAsBytes, _ = json.Marshal(user)
	stub.PutState(user.ID, userAsBytes)

	transactionReceivedKey := fmt.Sprintf("transactionReceived.%s.%d", transactionReceived.UserID, transactionReceived.Date)

	stub.PutState(transactionReceivedKey, transactionReceivedAsBytes)

	return shim.Success(nil)
}

func (cc *Chaincode) initLedger(stub shim.ChaincodeStubInterface) sc.Response {
	deleteAll(stub)

	users := []User{
		User{ID: "User0", Name: "A", Balance: 0},
		User{ID: "User1", Name: "B", Balance: 0},
		User{ID: "User2", Name: "C", Balance: 0},
	}

	servicesToGet := []ServiceToGet{
		ServiceToGet{ID: "ServiceToGet0", Name: "Rower", Points: 1},
		ServiceToGet{ID: "ServiceToGet1", Name: "Bilety", Points: 2},
		ServiceToGet{ID: "ServiceToGet2", Name: "Segregacja", Points: 3},
	}

	servicesToUse := []ServiceToUse{
		ServiceToUse{ID: "ServiceToUse0", Name: "Rower", Points: 1},
		ServiceToUse{ID: "ServiceToUse1", Name: "Bilety", Points: 2},
	}

	i := 0
	for i < len(users) {
		fmt.Println("i is ", i)
		usersAsBytes, _ := json.Marshal(users[i])
		stub.PutState("User"+strconv.Itoa(i), usersAsBytes)
		fmt.Println("Added", users[i])
		i = i + 1
	}

	i = 0
	for i < len(servicesToGet) {
		fmt.Println("i is ", i)
		servicesToGetAsBytes, _ := json.Marshal(servicesToGet[i])
		stub.PutState("ServiceToGet"+strconv.Itoa(i), servicesToGetAsBytes)
		fmt.Println("Added", servicesToGet[i])
		i = i + 1
	}

	i = 0
	for i < len(servicesToUse) {
		fmt.Println("i is ", i)
		servicesToUseAsBytes, _ := json.Marshal(servicesToUse[i])
		stub.PutState("ServiceToUse"+strconv.Itoa(i), servicesToUseAsBytes)
		fmt.Println("Added", servicesToUse[i])
		i = i + 1
	}

	return shim.Success(nil)
}

func (cc *Chaincode) queryAll(stub shim.ChaincodeStubInterface) sc.Response {

	startKey := ""
	endKey := ""

	resultsIterator, err := stub.GetStateByRange(startKey, endKey)
	if err != nil {
		return shim.Error(err.Error())
	}
	defer resultsIterator.Close()

	// buffer is a JSON array containing QueryResults
	var buffer bytes.Buffer
	buffer.WriteString("[")

	bArrayMemberAlreadyWritten := false
	for resultsIterator.HasNext() {
		queryResponse, err := resultsIterator.Next()
		if err != nil {
			return shim.Error(err.Error())
		}
		// Add a comma before array members, suppress it for the first array member
		if bArrayMemberAlreadyWritten == true {
			buffer.WriteString(",")
		}
		buffer.WriteString("{\"Key\":")
		buffer.WriteString("\"")
		buffer.WriteString(queryResponse.Key)
		buffer.WriteString("\"")

		buffer.WriteString(", \"Record\":")
		// Record is a JSON object, so we write as-is
		buffer.WriteString(string(queryResponse.Value))
		buffer.WriteString("}")
		bArrayMemberAlreadyWritten = true
	}
	buffer.WriteString("]")

	fmt.Printf("- queryAll:\n%s\n", buffer.String())

	return shim.Success(buffer.Bytes())
}

func deleteAll(stub shim.ChaincodeStubInterface) error {
	startKey := ""
	endKey := ""

	resultsIterator, err := stub.GetStateByRange(startKey, endKey)
	if err != nil {
		return err
	}
	defer resultsIterator.Close()

	for resultsIterator.HasNext() {
		queryResponse, err := resultsIterator.Next()
		if err != nil {
			return err
		}
		stub.DelState(queryResponse.Key)
	}

	return nil
}
