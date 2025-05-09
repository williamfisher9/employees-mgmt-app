import { useEffect, useState } from 'react';
import './Dashboard.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'

import { GiMoneyStack } from 'react-icons/gi'
import { IoPeopleOutline } from 'react-icons/io5'
import { BACKEND_URL } from '../../constants/constants';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const Dashboard = ({formType}) => {
    const naviagte = useNavigate();
    const [numberOfRecords, setNumberOfRecords] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);

    const getDashboardData = (formType) => {
        axios
        .get(`${BACKEND_URL}/api/dashboard/${formType}`, { headers: { Authorization: `Bearer ${Cookies.get("token")}` }}).then(res => {
            this.setState({
                totalAmount: res.data.totalAmount.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                numberOfRecords: res.data.numberOfRecords
            })
        })
        .catch((err) => {
            if (err.status == 401 || err.status == 403) {
                Cookies.remove('isAuthenticated'); 
                                Cookies.remove('userId');
                                Cookies.remove('token');
                                Cookies.remove('authorityId');
                                Cookies.remove('username');
            naviagte("/salaries/login")
          }
          });
    }

    useEffect(() => {
        getDashboardData(formType);
    }, [])

    return <div className="d-flex justify-content-center align-items-center flex-wrap gap-3">

                <div className="widget-style">
                    <div className="text-right">
                        <IoPeopleOutline style={{ fontSize: "50px", color: "#000" }} />
                        </div>
                        <p style={{ color: "#000" }} className="text-left h3">{numberOfRecords}</p>
                        <p className="text-black text-left h5">Employees Records</p>
                </div>

                <div className="widget-style">
                    <div className="text-right">
                            <GiMoneyStack style={{ fontSize: "50px", color: "#000" }} />
                        </div>
                        <p style={{ color: "#000" }} className="text-left h3">USD {totalAmount}</p>
                        <p className="text-black text-left h5">Total Amount</p>
                </div>

            </div>
}

export default Dashboard;