import React, { Component } from 'react';

import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Moment from 'moment';

import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css'

import './SimplifiedEmployer.css'

import MessageBuilder from '../MessageBuilder/MessageBuilder';
import { BACKEND_URL } from '../../constants/constants';


class SimplifiedEmployer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            formType: "simplified",
            employerName: "",
            emailAddress: "",
            phoneNumber: "",
            paymentType: "10",
            valueDate: "",
            debtorAccountNumber: "",
            deliveryRequired: false,
            deliveryPersonName: "",
            deliveryPersonId: "",
            errors: {},
            showMessageFlag: false,
            defaultAccountNumberLength: 16
        }
    }

    handleLocalChange = (event) => {
        let targetName = event.target.name;
        if (targetName === "employerName" || targetName === "deliveryPersonName") {
            let value = event.target.value;
            let employerNamePattern = new RegExp(/[^A-Za-z ]/ig);
            value = value.replace(employerNamePattern, '');
            event.target.value = value.toUpperCase();
        }

        if (targetName === "debtorAccountNumber" || targetName === "phoneNumber") {
            let value = event.target.value;
            //let employerNamePattern = new RegExp(/[^0-9]/ig);
            value = value.replace(/[^0-9]/ig, '');
            event.target.value = value;
        }

        if (targetName === "deliveryPersonId") {
            let value = event.target.value;
            //let employerNamePattern = new RegExp(/[^A-Za-z0-9]/ig);
            value = value.replace(/[^A-Za-z0-9/]/ig, '');
            event.target.value = value;
        }

        this.setState({ [event.target.name]: event.target.value });
    }

    handleDeliverPersonCheckbox = (event) => {
        event.target.checked ? this.setState({ deliveryRequired: true }) : this.setState({ deliveryRequired: false })
    }

    handleDateField = (date) => {
        if (date !== null) {
            this.setState({ valueDate: date });
        }
    }

    validateAndSaveChanges = () => {

        let errors = {};
        let formIsValid = true;

        //employerName
        if (!this.state.employerName) {
            formIsValid = false;
            errors["employerName"] = "Field is required";
        }

        //delivery details
        if (this.state.deliveryRequired && !this.state.deliveryPersonId) {
            formIsValid = false;
            errors["deliveryPersonId"] = "Field is required";
        }

        if (this.state.deliveryRequired && !this.state.deliveryPersonName) {
            formIsValid = false;
            errors["deliveryPersonName"] = "Field is required";
        }

        //debtorAccountNumber
        if (!this.state.debtorAccountNumber) {
            formIsValid = false;
            errors["debtorAccountNumber"] = "Field is required";
        }

        //debtorAccountNumber length
        if (this.state.debtorAccountNumber && this.state.debtorAccountNumber.length !== this.state.defaultAccountNumberLength) {
            formIsValid = false;
            errors["debtorAccountNumber"] = `Account number should be ${this.state.defaultAccountNumberLength}-digit long`;
        }



        //phoneNumber
        if (!this.state.phoneNumber) {
            formIsValid = false;
            errors["phoneNumber"] = "Field is required";
        }

        //valueDate
        if (!this.state.valueDate) {
            formIsValid = false;
            errors["valueDate"] = "Field is required";
        }

        //email validation
        let emailPattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (!emailPattern.test(this.state.emailAddress)) {
            formIsValid = false;
            errors["emailAddress"] = "Enter a valid email address";
        }

        this.setState({ errors: errors, showMessageFlag: false });

        if (formIsValid) {
            axios.put(`${BACKEND_URL}/api/employers`, this.state)
                .then((response) => {
                    console.log(response.data)
                    if (response.status === 200) {
                        this.setState({
                            id: response.data.id,
                            showMessageFlag: true,
                            showMessageContent: { type: "success", content: "Record updated successfuly!" }
                        })
                    } else {
                        this.setState({
                            showMessageFlag: true,
                            showMessageContent: { type: "error", content: "Failed to update the record!" }
                        })
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

    }

    trimFunction = (event) => {
        this.setState({ [event.target.name]: event.target.value.trim() });
    }

    reloadComponent = () => {
        let formType = "simplified";
        axios.get(`${BACKEND_URL}/api/employers/${formType}`)
            .then(res => {
                if (res.data.length === 0) {
                    console.log("no employers exists in the DB!");
                    this.setState({ valueDate: new Date(), paymentMonth: Moment(new Date()).format("MM").toString(), paymentYear: Moment(new Date()).format("YYYY").toString() });
                } else {
                    res.data.valueDate = new Date(Moment(res.data.valueDate));
                    this.setState(res.data);
                }
            })
    }

    componentDidMount() {
        this.reloadComponent();
    }

    hideMessageBuilderModal = () => {
        this.setState({ showMessageFlag: false })
    }

    render() {
        return (
            <div className="mx-3">

                <div className="d-flex justify-content-end text-right">
                    <Button style={{ width: "150px" }} variant="outline-dark" className="ml-2 d-inline" onClick={this.validateAndSaveChanges}>
                        <span style={{}} >Save</span>
                    </Button>
                </div>

                <hr />

                {
                    this.state.showMessageFlag ?
                        (

                            <MessageBuilder
                                errorType={this.state.showMessageContent.type}
                                messageContent={this.state.showMessageContent.content}
                                hideMessageBuilderModal={this.hideMessageBuilderModal}
                                showModal={this.state.showMessageFlag} />

                        )
                        : null
                }

                <Container>

                    <Form className="mt-2">
                        <Row>

                            <Col xs={12} xl={6} md={12} className="">
                                <Form.Group controlId="employerName">

                                    <div className="text-left"><Form.Label>Payer Name *</Form.Label></div>

                                    <Form.Control type="text" name="employerName"
                                        style={this.state.errors["employerName"] ? { border: "2px red solid" } : null}
                                        onChange={this.handleLocalChange} value={this.state.employerName}
                                        onBlur={this.trimFunction}
                                        maxLength="35" />

                                    {
                                        this.state.errors["employerName"] ?
                                            (
                                                <div className="text-left" >
                                                    <span style={{ color: "red", fontSize: "12px" }}>{this.state.errors["employerName"]}</span>
                                                </div>
                                            )
                                            :
                                            (
                                                <div className="text-left" >
                                                    <span style={{ display: "inline-block" }}></span>
                                                </div>
                                            )
                                    }

                                </Form.Group>
                            </Col>

                            <Col xs={12} xl={6} md={12} className="">
                                <Form.Group controlId="debtorAccountNumber">
                                    <div className="text-left"><Form.Label>Debtor Acc. No. *</Form.Label></div>
                                    <Form.Control type="text" name="debtorAccountNumber"
                                        style={this.state.errors["debtorAccountNumber"] ? { border: "2px red solid" } : null}
                                        onChange={this.handleLocalChange} value={this.state.debtorAccountNumber} onBlur={this.trimFunction}
                                        maxLength={this.state.defaultAccountNumberLength} />

                                    {
                                        this.state.errors["debtorAccountNumber"] ?
                                            (
                                                <div className="text-left" >
                                                    <span style={{ color: "red", fontSize: "12px" }}>{this.state.errors["debtorAccountNumber"]}</span>
                                                </div>
                                            )
                                            :
                                            (
                                                <div className="text-left" >
                                                    <span style={{ display: "inline-block" }}></span>
                                                </div>
                                            )
                                    }

                                </Form.Group>
                            </Col>

                            <Col xs={12} xl={4} md={12} className="">
                                <Form.Group controlId="emailAddress">

                                    <div className="text-left"><Form.Label>Email Address *</Form.Label></div>

                                    <Form.Control type="text" name="emailAddress"
                                        style={this.state.errors["emailAddress"] ? { border: "2px red solid" } : null}
                                        onChange={this.handleLocalChange} value={this.state.emailAddress} onBlur={this.trimFunction}
                                        maxLength="35" />

                                    {
                                        this.state.errors["emailAddress"] ?
                                            (
                                                <div className="text-left" >
                                                    <span style={{ color: "red", fontSize: "12px" }}>{this.state.errors["emailAddress"]}</span>
                                                </div>
                                            )
                                            :
                                            (
                                                <div className="text-left" >
                                                    <span style={{ display: "inline-block" }}></span>
                                                </div>
                                            )
                                    }

                                </Form.Group>
                            </Col>

                            <Col xs={12} xl={4} md={12} className="">
                                <Form.Group controlId="phoneNumber">

                                    <div className="text-left"><Form.Label>Phone Number *</Form.Label></div>

                                    <Form.Control type="text" name="phoneNumber"
                                        style={this.state.errors["phoneNumber"] ? { border: "2px red solid" } : null}
                                        onChange={this.handleLocalChange} value={this.state.phoneNumber} onBlur={this.trimFunction}
                                        maxLength="13" />

                                    {
                                        this.state.errors["phoneNumber"] ?
                                            (
                                                <div className="text-left" >
                                                    <span style={{ color: "red", fontSize: "12px" }}>{this.state.errors["phoneNumber"]}</span>
                                                </div>
                                            )
                                            :
                                            (
                                                <div className="text-left" >
                                                    <span style={{ display: "inline-block" }}></span>
                                                </div>
                                            )
                                    }

                                </Form.Group>
                            </Col>

                            <Col xs={12} xl={4} md={12} className="">
                                <Form.Group controlId="paymentType">
                                    <div className="text-left"><Form.Label>Payment Type *</Form.Label></div>
                                    <Form.Control as="select" name="paymentType" onChange={this.handleLocalChange} value={this.state.paymentType} >
                                        <option value="10">Salary</option>
                                        <option value="11">Bonus</option>
                                        <option value="12">Allowance</option>
                                        <option value="13">Others</option>
                                        <option value="14">Dividend</option>
                                        <option value="15">End of service benefit</option>
                                        <option value="16">Overtime Payment</option>
                                        <option value="17">Monthly pension salary</option>
                                        <option value="18">Charity Payment</option>
                                        <option value="19">Monthly Social Security Salary</option>
                                        <option value="20">Social Security onetime payment</option>
                                        <option value="21">Deposit Operation</option>
                                        <option value="22">Account Management</option>
                                        <option value="23">Customer to Cooperate</option>
                                        <option value="24">Customer to Customer</option>
                                        <option value="25">Reversal of Debit/ Credit Transaction</option>
                                        <option value="26">Court Order</option>
                                        <option value="27">Government Payment</option>
                                        <option value="28">Government Fee Collection</option>
                                        <option value="29">Government Penalty Payment</option>
                                        <option value="30">Property Tax</option>
                                        <option value="31">Cooperate Tax</option>
                                        <option value="32">Income Tax</option>
                                        <option value="33">Value added Tax</option>
                                        <option value="34">Import / Export Tax</option>
                                        <option value="35">Municipality Tax</option>
                                        <option value="36">Tourism Tax</option>
                                        <option value="37">IPO subscription</option>
                                        <option value="38">IPO refund</option>
                                        <option value="39">Market Shares Payment</option>
                                        <option value="40">Interest Payment</option>
                                        <option value="41">Loan Disbursement</option>
                                        <option value="42">Full & final loan settlement</option>
                                        <option value="43">Loan installment payment</option>
                                        <option value="44">Loan insurance refund</option>
                                        <option value="45">Mortgage installment</option>
                                        <option value="46">Credit card payment</option>
                                        <option value="47">Utility payment</option>
                                        <option value="48">Bills to vendor/ company</option>
                                        <option value="49">Service payment</option>
                                        <option value="50">Insurance payment</option>
                                        <option value="51">Rent of lease</option>
                                        <option value="52">Fees collection</option>
                                        <option value="53">School fees</option>
                                        <option value="54">Membership fees</option>
                                    </Form.Control>

                                    <div className="text-left" >
                                        <span style={{ display: "inline-block" }}></span>
                                    </div>

                                </Form.Group>
                            </Col>

                            <Col xs={12} xl={4} md={4} className="">
                                <Form.Group controlId="valueDate">
                                    <div className="text-left"><Form.Label>Value Date *</Form.Label></div>
                                    <DatePicker className="form-control" name="valueDate" selected={this.state.valueDate}
                                        onChange={this.handleDateField}
                                        dateFormat="dd/MM/yyyy" todayButton="Today" withPortal
                                        style={this.state.errors["valueDate"] ? { border: "2px red solid" } : null} />
                                </Form.Group>
                            </Col>

                        </Row>

                        <hr />

                        <Row className="my-2">
                            <Col xs={12} xl={6} md={6} className='d-flex gap-2'>
                                <input style={{ marginLeft: "3px" }} type="checkbox" onChange={this.handleDeliverPersonCheckbox} checked={this.state.deliveryRequired}
                                    name="deliveryRequired" id="deliveryRequired" />
                                <label htmlFor="deliveryRequired"> Include delivery person details in the generated form.</label>
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={12} xl={6} md={6} className="">
                                <Form.Group controlId="deliveryPersonName">
                                    <div className="text-left"><Form.Label>Delivery Person Name *</Form.Label></div>
                                    <Form.Control type="text" name="deliveryPersonName"
                                        style={this.state.errors["deliveryPersonName"] ? { border: "2px red solid" } : null}
                                        onChange={this.handleLocalChange} value={this.state.deliveryPersonName} onBlur={this.trimFunction}
                                        maxLength="70"
                                        disabled={this.state.deliveryRequired ? false : true} />

                                    {
                                        this.state.errors["deliveryPersonName"] ?
                                            (
                                                <div className="text-left" >
                                                    <span style={{ color: "red", fontSize: "12px" }}>{this.state.errors["deliveryPersonName"]}</span>
                                                </div>
                                            )
                                            :
                                            (
                                                <div className="text-left" >
                                                    <span style={{ display: "inline-block" }}></span>
                                                </div>
                                            )
                                    }

                                </Form.Group>
                            </Col>

                            <Col xs={12} xl={6} md={6} className="">
                                <Form.Group controlId="deliveryPersonId">
                                    <div className="text-left"><Form.Label>Delivery Person ID *</Form.Label></div>
                                    <Form.Control type="text" name="deliveryPersonId"
                                        style={this.state.errors["deliveryPersonId"] ? { border: "2px red solid" } : null}
                                        onChange={this.handleLocalChange} value={this.state.deliveryPersonId} onBlur={this.trimFunction}
                                        maxLength="17"
                                        disabled={this.state.deliveryRequired ? false : true} />

                                    {
                                        this.state.errors["deliveryPersonId"] ?
                                            (
                                                <div className="text-left" >
                                                    <span style={{ color: "red", fontSize: "12px" }}>{this.state.errors["deliveryPersonId"]}</span>
                                                </div>
                                            )
                                            :
                                            (
                                                <div className="text-left" >
                                                    <span style={{ display: "inline-block" }}></span>
                                                </div>
                                            )
                                    }

                                </Form.Group>
                            </Col>

                        </Row>

                    </Form>
                </Container>
            </div >
        );
    }
}

export default SimplifiedEmployer;