import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faBus, faTrain, faCarSide, faBusAlt, faTaxi, faTicketAlt, faLeaf } from '@fortawesome/free-solid-svg-icons'

class Main extends Component {
    constructor(props){
        super(props);
        this.state ={
            balance: 0,
            tokens: 0, 
            redirect: false
        }
        this.buyTickets = this.buyTickets.bind(this);
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
        this.setState({
            redirect: false
        })
        return <Redirect to={{
            pathname: '/tickets',
            state: this.state
             }}
        />
    }
        
    }
    render(){
        return <div>
            <div className="balanceHeader">
                <div className='moneyBalance'>
                    <div className="moneyQuota">{this.state.balance} PLN</div>
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
        </div>
    }
}

export default Main;