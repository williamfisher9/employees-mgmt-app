import React, { Component } from 'react';
import './Dashboard.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'

import { GiMoneyStack } from 'react-icons/gi'
import { IoPeopleOutline } from 'react-icons/io5'
import { BACKEND_URL } from '../../constants/constants';

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            numberOfRecords: 0,
            totalAmount: 0
        }
    }

    getDashboardData = (formType) => {
        axios.get(`${BACKEND_URL}/api/dashboard/${formType}`).then(res => {
            this.setState({
                totalAmount: res.data.totalAmount.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                numberOfRecords: res.data.numberOfRecords
            })
        })
    }

    componentDidMount = () => {
        this.getDashboardData(this.props.formType);
    }

    render() {
        return (
            <div className="d-flex justify-content-center align-items-center flex-wrap gap-3">

                <div className="widget-style">
                    <div className="text-right">
                        <IoPeopleOutline style={{ fontSize: "50px", color: "#000" }} />
                        </div>
                        <p style={{ color: "#000" }} className="text-left h3">{this.state.numberOfRecords}</p>
                        <p className="text-black text-left h5">Employees Records</p>
                </div>

                <div className="widget-style">
                    <div className="text-right">
                            <GiMoneyStack style={{ fontSize: "50px", color: "#000" }} />
                        </div>
                        <p style={{ color: "#000" }} className="text-left h3">USD {this.state.totalAmount}</p>
                        <p className="text-black text-left h5">Total Amount</p>
                </div>

            </div>
        );
    }
}

export default Dashboard;