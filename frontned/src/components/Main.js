import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

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
    if(this.state.redirect)
        return <Redirect to={{
            pathname: '/tickets',
            state: { id: '123' }
             }}
        />
    }
    render(){
        return <div>
            <div className="balanceHeader">
                <div className='moneyBalance'>
                    <div className="moneyQuota">{this.state.balance} PLN</div>
                    <div className="moneyAdd" onClick={this.addMoney}>Doładuj</div>
                </div>
                <div className="tokenBalance">
                    {this.state.tokens}
                </div>
            </div>
            <div className="options">
                <div className="item" onClick={this.buyTickets} >
                {this.renderRedirect()}
                </div>
                <div className="item">

                </div>
            </div>
        </div>
    }
}

export default Main;