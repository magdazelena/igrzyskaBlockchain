import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faBus, faTrain, faCarSide, faBusAlt, faTaxi, faTicketAlt, faLeaf } from '@fortawesome/free-solid-svg-icons'

class Main extends Component {
    constructor(props){
        super(props);
        this.state ={
            balance: 37.80,
            tokens: 3, 
            redirect: false,
            user: null
        }
        this.buyTickets = this.buyTickets.bind(this);
    }
    setStateAsync(state) {
        return new Promise((resolve) => {
          this.setState(state, resolve)
        });
      }
    componentDidMount = async () => {
        const response =  await fetch('http://localhost:3001/get_user/User1', {
            method: 'GET'
        });
        const {balance, id} = await response.json();
        await this.setStateAsync({
            tokens: balance,
            user: id
        })
        if(this.props.history.location.state !== undefined){
            this.setState({
                balance: this.state.balance - this.props.history.location.state.ticketPrice
            })
        }
    }
    componentDidUpdate = (prevProps) => {
        if(this.props.history !== prevProps.history){
            if(this.props.history.location.state !== undefined){
                this.setState({
                    balance: this.state.balance - this.props.history.location.state.ticketPrice,
                    tokens: this.state.tokens - this.props.history.location.state.tokens
                })
            }
        }
    }
    addMoney = () => {
        this.setState({
            balance: this.state.balance+10
        })
    }
    buyTickets = ()=>{
        //route to tickets component
        this.setState({
            redirect: true
        })
        
    }
    renderRedirect = ()=>{
    if(this.state.redirect){
        this.props.history.push('/tickets', {tokens: this.state.tokens, user: this.state.user})
        return <Redirect to={{
            pathname: '/tickets'
             }}
        />

    }
        
    }
    render(){
        return (<div>
            <div className="balanceHeader">
                <div className='moneyBalance'>
                    <div className="moneyQuota">{parseFloat(this.state.balance).toFixed(2)} PLN</div>
                    <div className="moneyAdd" onClick={this.addMoney}>
                        <FontAwesomeIcon icon={faPlus} />
                        Doładuj
                    </div>
                </div>
                <div className="tokenBalance">
                    <FontAwesomeIcon icon={faLeaf}/>
                    {this.state.tokens}
                    <span className="undertitle">Balans tokenów</span>
                </div>
            </div>
            <div className="options">
                <div className="item" onClick={this.buyTickets} >
                {this.renderRedirect()}
                <FontAwesomeIcon icon={faBus} />
                    Komunikacja miejska
                </div>
                <div className="item">
                    <FontAwesomeIcon icon={faCarSide} />
                    MobiParking
                </div>
                <div className="item">
                    <FontAwesomeIcon icon={faTrain} />
                    PKP
                </div>
                <div className="item" >
                <FontAwesomeIcon icon={faBusAlt} />
                    PKS
                </div>
                <div className="item">
                    <FontAwesomeIcon icon={faTaxi} />
                    Taxi
                </div>
                <div className="item">
                    <FontAwesomeIcon icon={faTicketAlt} />
                    Kino
                </div>
            </div>
        </div>)
    }
}

export default Main;