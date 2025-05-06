import React, { Component } from 'react';

import Badge from 'react-bootstrap/Badge'
import 'bootstrap/dist/css/bootstrap.min.css'

class TableStats extends Component {

    numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    render() {
        return (
            <div>
                <Badge variant="dark" className="m-1 p-2" style={{fontSize: "10px"}}>Complete Records Count: {this.props.numberOfCompleteRecords}</Badge>
                <Badge variant="dark" className="m-1 p-2" style={{fontSize: "10px"}}>Total Amount: USD {this.numberWithCommas(this.props.completeRecordsTotalAmount.toFixed(2))}</Badge>
            </div>
        );
    }
}

export default TableStats;