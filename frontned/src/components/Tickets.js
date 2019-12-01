import React, {Component} from 'react';

class Tickets extends Component{
    constructor(props){
        super(props);
        
    }
    render(){
        console.log(this.state)
        return <div>
            <div className="listTickets">
                <div className="ticket">
                    Bilet 20 minutowy 
                </div>
            </div>
        </div>
    }
}

export default Tickets;