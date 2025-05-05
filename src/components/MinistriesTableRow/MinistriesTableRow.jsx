import React, { Component } from 'react';

import Form from 'react-bootstrap/Form';

import { BsExclamationCircle, BsCheckCircle } from 'react-icons/bs'

class MinistriesTableRow extends Component {


    constructor(props) {
        super(props);
        this.state = {
            showErrorMessageFlag: false
        }
    }

    numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    renderBankSwitch = bankId => {
        switch (bankId) {
            case 'ROUTING1': return 'BANK ONE';
            case 'ROUTING2': return 'BANK TWO';
            case 'ROUTING3': return 'BANK THREE';
            case 'ROUTING4': return 'BANK FOUR';
            case 'ROUTING5': return 'BANK FIVE';
            case 'ROUTING6': return 'BANK SIX';
            case 'ROUTING7': return 'BANK SEVEN';
            case 'ROUTING8': return 'BANK EIGHT';
            case 'ROUTING9': return 'BANK NINE';
            default: return 'else';
        }
    }

    render() {

        let styler = { fontSize: "11px", padding: "7px", background: "#dededc", border: "1px solid #999966" };
        let banksDataListStyler = { fontSize: "11px", padding: "7px", background: "#dededc", border: "1px solid #999966", width: "115px" };
        let errorBorder = { border: "3px solid red" };
        return (

            this.props.employees.map(employee => {
                return <tr id={employee.id} key={employee.id}>
                    <td style={{ verticalAlign: "middle" }}>
                        <Form.Group>
                            <Form.Check
                                checked={employee.zIsChecked}
                                onChange={this.props.selectedRecordsHandler}
                                name="selectedCheckbox"
                                value={employee.id} id={employee.id}
                            />
                        </Form.Group>
                    </td>
                    <td>
                        <span style={{ fontSize: "11px" }}>
                            {employee.zRecordIndex + 1}
                        </span>
                    </td>
                    <td>

                        <Form.Group controlId={"accountNumber-" + employee.id}>
                            <Form.Control type="text"
                                onChange={this.props.changeHandler} name="accountNumber" value={employee.accountNumber}
                                style={
                                    employee.errors.filter(item => {
                                        return item.field === "accountNumber";
                                    }).length !== 0 ? { ...styler, ...errorBorder } : { ...styler }
                                }
                                onPaste={this.props.pasteHandler}
                                onBlur={this.props.blurHandler}
                                autoComplete="off"
                                maxLength="30"
                                size="lg" />
                            {
                                employee.errors.filter(item => {
                                    return item.field === "accountNumber";
                                }).map((filteredRecords, index) => (
                                    <Form.Text key={index} className="text-left text-danger">
                                        <li>
                                            {filteredRecords.message}
                                        </li>
                                    </Form.Text>
                                ))
                            }
                        </Form.Group>

                    </td>
                    <td >
                        <Form.Group controlId={"employeeName-" + employee.id}>
                            <Form.Control type="text" name="employeeName"
                                onPaste={this.props.pasteHandler}
                                style={
                                    employee.errors.filter(item => {
                                        return item.field === "employeeName";
                                    }).length !== 0 ? { ...styler, ...errorBorder } : { ...styler }
                                }
                                onChange={this.props.changeHandler} value={employee.employeeName}
                                onBlur={this.props.blurHandler}
                                autoComplete="off"
                                maxLength="70"
                                size="lg" />
                            {
                                employee.errors.filter(item => {
                                    return item.field === "employeeName";
                                }).map((filteredRecords, index) => (
                                    <Form.Text key={index} className="text-left text-danger">
                                        <li>
                                            {filteredRecords.message}
                                        </li>
                                    </Form.Text>
                                ))
                            }
                        </Form.Group>
                    </td>
                    <td>

                        <input
                            type="text"
                            list="employeeBanksList"
                            id={"employeeBank-" + employee.id}
                            style={banksDataListStyler}
                            name="employeeBank"
                            className="rounded"
                            onPaste={this.props.pasteHandler}
                            onBlur={this.props.blurHandler}
                            onChange={this.props.changeHandler}
                            value={employee.employeeBank}
                        />

                        <datalist
                            id="employeeBanksList"
                        >
                            <option value="ROUTING1">BANK ONE</option>
                            <option value="ROUTING2">BANK TWO</option>
                            <option value="ROUTING3">BANK THREE</option>
                            <option value="ROUTING4">BANK FOUR</option>
                            <option value="ROUTING5">BANK FIVE</option>
                            <option value="ROUTING6">BANK SIX</option>
                            <option value="ROUTING7">BANK SEVEN</option>
                            <option value="ROUTING8">BANK EIGHT</option>
                            <option value="ROUTING9">BANK NINE</option>
                        </datalist>

                        {
                            employee.errors.filter(item => {
                                return item.field === "employeeBank";
                            }).map((filteredRecords, index) => (
                                <Form.Text key={index} className="text-left text-danger">
                                    <li>
                                        {filteredRecords.message}
                                    </li>
                                </Form.Text>
                            ))
                        }

                    </td>

                    <td>

                        <Form.Group controlId={"idNumber-" + employee.id}>
                            <Form.Control type="text"
                                onChange={this.props.changeHandler} name="idNumber" value={employee.idNumber}
                                style={
                                    employee.errors.filter(item => {
                                        return item.field === "idNumber";
                                    }).length !== 0 ? { ...styler, ...errorBorder } : { ...styler }
                                }
                                onPaste={this.props.pasteHandler}
                                onBlur={this.props.blurHandler}
                                autoComplete="off"
                                maxLength="17"
                                size="lg" />
                            {
                                employee.errors.filter(item => {
                                    return item.field === "idNumber";
                                }).map((filteredRecords, index) => (
                                    <Form.Text key={index} className="text-left text-danger">
                                        <li>
                                            {filteredRecords.message}
                                        </li>
                                    </Form.Text>
                                ))
                            }
                        </Form.Group>

                    </td>

                    <td>

                        <Form.Group controlId={"amount-" + employee.id}>
                            <Form.Control type="number" step="0.1" name="amount"
                                onPaste={this.props.pasteHandler}
                                style={
                                    employee.errors.filter(item => {
                                        return item.field === "amount";
                                    }).length !== 0 ? { ...styler, ...errorBorder } : { ...styler }
                                }
                                onChange={this.props.changeHandler} value={employee.amount}
                                onBlur={this.props.blurHandler}
                                autoComplete="off"
                                min="0"
                                max="999999999.999"
                                size="lg" />
                            {
                                employee.errors.filter(item => {
                                    return item.field === "amount";
                                }).map((filteredRecords, index) => (
                                    <Form.Text key={index} className="text-left text-danger">
                                        <li>
                                            {filteredRecords.message}
                                        </li>
                                    </Form.Text>
                                ))
                            }
                        </Form.Group>

                    </td>

                    <td>

                        <Form.Group controlId={"deductions-" + employee.id}>
                            <Form.Control type="number" step="0.1" name="deductions"
                                onPaste={this.props.pasteHandler}
                                style={
                                    employee.errors.filter(item => {
                                        return item.field === "deductions";
                                    }).length !== 0 ? { ...styler, ...errorBorder } : { ...styler }
                                }
                                onChange={this.props.changeHandler} value={employee.deductions}
                                onBlur={this.props.blurHandler}
                                autoComplete="off"
                                min="0"
                                max="999999999.999"
                                size="lg" />
                            {
                                employee.errors.filter(item => {
                                    return item.field === "deductions";
                                }).map((filteredRecords, index) => (
                                    <Form.Text key={index} className="text-left text-danger">
                                        <li>
                                            {filteredRecords.message}
                                        </li>
                                    </Form.Text>
                                ))
                            }
                        </Form.Group>

                    </td>





                    <td>
                        <Form.Control type="text" name="netAmount"
                            style={
                                employee.errors.filter(item => {
                                    return item.field === "netAmount";
                                }).length !== 0 ? { ...styler, ...errorBorder } : { ...styler }
                            }
                            disabled
                            value={
                                this.numberWithCommas((parseFloat(employee.amount) - parseFloat(employee.deductions)).toFixed(3))
                            }
                            size="lg" />
                        {
                            employee.errors.filter(item => {
                                return item.field === "netAmount";
                            }).map((filteredRecords, index) => (
                                <Form.Text key={index} className="text-left text-danger">
                                    <li>
                                        {filteredRecords.message}
                                    </li>
                                </Form.Text>
                            ))
                        }
                    </td>





                    <td>

                        <Form.Group controlId={"note-" + employee.id}>
                            <Form.Control type="text" name="note"
                                onPaste={this.props.pasteHandler}
                                style={
                                    employee.errors.filter(item => {
                                        return item.field === "note";
                                    }).length !== 0 ? { ...styler, ...errorBorder } : { ...styler }
                                }
                                onChange={this.props.changeHandler}
                                value={employee.note ? employee.note : ""}
                                onBlur={this.props.blurHandler}
                                autoComplete="off"
                                maxLength="70"
                                size="lg" />
                            {
                                employee.errors.filter(item => {
                                    return item.field === "note";
                                }).map((filteredRecords, index) => (
                                    <Form.Text key={index} className="text-left text-danger">
                                        <li>
                                            {filteredRecords.message}
                                        </li>
                                    </Form.Text>
                                ))
                            }
                        </Form.Group>

                    </td>

                    <td>
                        {
                            employee.zRecordStatus === "COMPLETE"
                                ? <BsCheckCircle style={{ fontSize: "17px", display: "inline-block", marginRight: "5px", color: "green" }} />
                                : <BsExclamationCircle style={{ fontSize: "17px", display: "inline-block", marginRight: "5px", color: "red" }} />
                        }
                    </td>

                </tr>
            })

        );
    }

}

export default MinistriesTableRow;