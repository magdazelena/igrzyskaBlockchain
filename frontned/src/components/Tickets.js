import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faLeaf, faMinus } from '@fortawesome/free-solid-svg-icons'
import { json } from 'body-parser';
class Tickets extends Component{
    constructor(props){
        super(props);
        this.state ={
            tokens: 0,
            chosenTicket: false,
            redirect: false
        }
    }
    maxTokens = 0;
    componentDidMount=() =>{
        if(this.props.history.location.state !== undefined){
            this.setState({
                tokens: this.props.history.location.state.tokens
            })
            this.maxTokens = this.props.history.location.state.tokens;
        }
                
    }
    componentDidUpdate= (prevProps) =>{
        if(this.props.history.location.state !== undefined)
            if(this.props.history.location.state !== prevProps.history.location.state)
                this.setState({
                    tokens: this.props.history.location.state.tokens
                })
        if(this.props.history.location.state !== undefined)
            this.maxTokens = this.props.history.location.state.tokens
    }
    chooseTicket = (value) => {
        this.setState({
            chosenTicket: true,
            ticketValue: value,
            ticketPrice: value
        })
    }
    choiceList =  (<div className="listTickets">
                <div className="ticket" onClick={() =>this.chooseTicket(3.50)}>
                    Bilet 20 minutowy 
                </div>
                <div className="ticket" onClick={() =>this.chooseTicket(5.50)}>
                    Bilet 75 minutowy 
                </div>
                <div className="ticket" onClick={() =>this.chooseTicket(12)}>
                    Bilet 3-dniowy
                </div>
            </div>);
    useToken = ()=>{
        this.setState({
            tokens: this.state.tokens > 0 ? this.state.tokens - 1 :this.state.tokens,
            ticketPrice: this.state.ticketPrice > 0.50 && this.state.tokens > 0 ? this.state.ticketPrice - 0.50 : this.state.ticketPrice
        })
    }
    unuseToken = () => {
        this.setState({
            tokens: this.state.tokens < this.maxTokens ? this.state.tokens +1 : this.state.tokens,
            ticketPrice: this.state.ticketPrice < this.state.ticketValue && this.state.tokens < this.maxTokens? this.state.ticketPrice + 0.50 : this.state.ticketPrice
        })
    }
    pay = async()=>{
        await fetch('http://localhost:3001/transaction_used', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                "userId": this.props.history.location.state.user,
                "serviceId": 'ServiceToUse1',
                "points": this.maxTokens- this.state.tokens,
                "date": 15,
                "signature": "xxx"
            }),
        });
        this.setState({
            redirect: true
        })
    }
    renderRedirect = ()=> {
        if(this.state.redirect){
            this.props.history.push("/", {tokens: this.state.tokens, ticketPrice: this.state.ticketPrice})
            return <Redirect to={{
                pathname: '/'
                 }}
            />
        }
    }
    render(){
        let {ticketPrice, ticketValue} = this.state;
        return <div>
            {!this.state.chosenTicket?  this.choiceList: 
            (
                <div className="payScreen">
                    <span className="label">
                        Cena biletu:
                    </span>
                    <span className="value">
                        {parseFloat(ticketValue).toFixed(2)}
                    </span>
                    <div className="useTokens">
                        <div className="plus button" onClick={this.useToken}><FontAwesomeIcon icon={faPlus}/></div>
                        <div className="minus button" onClick={this.unuseToken}><FontAwesomeIcon icon={faMinus}/></div>
                        <div className="tokensQuota">Użyto <span className="tokensAmount">{this.maxTokens - this.state.tokens} z {this.maxTokens} <FontAwesomeIcon icon={faLeaf}/></span></div>
                    </div>
                    <span className="label">
                        Obniżka:
                    </span>
                    <span className="value">
                        {parseFloat(ticketValue - ticketPrice).toFixed(2)}
                    </span>
                    <div className="toPay">
                        <span className="label">
                            Do zapłaty:
                        </span>
                        <span className="amount">
                            {parseFloat(ticketPrice).toFixed(2)}
                        </span>
                    </div>
                    <div className="pay" onClick={this.pay}>
                        {this.renderRedirect()}
                        Zapłać
                    </div>
                </div>

            )}
        
        </div>
    }
}

export default Tickets;