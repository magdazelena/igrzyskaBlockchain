import React, {Component} from 'react';


class Main extends Component {
    constructor(props){
        super(props);
        this.state ={
            balance: 0,
            tokens: 0
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
                <div className="item" onClick={this.buyTickets}>

                </div>
                <div className="item">

                </div>
            </div>
        </div>
    }
}

export default Main;