import React, { Component } from 'react';

import Form from 'react-bootstrap/Form';

import { BsExclamationCircle, BsCheckCircle } from 'react-icons/bs'

class WpsTableRow extends Component {


    constructor(props) {
        super(props);
        this.state = {
            showErrorMessageFlag: false
        }
    }

    getSum = (a, b, c, d) => {
        return (a + b - c - d).toFixed(3);
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

    renderIdTypeSwitch = idType => {
        switch (idType) {
            case 'P':
                return 'Passport';
            case 'C':
                return 'ID';
            default:
                return 'else';
        }
    }

    render() {

        let styler = { fontSize: "11px", padding: "7px", background: "#dededc", border: "1px solid #999966" };
        let banksDataListStyler = { fontSize: "11px", padding: "7px", background: "#dededc", border: "1px solid #999966", width: "115px" };
        let idTypeDataListStyler = { fontSize: "11px", padding: "7px", background: "#dededc", border: "1px solid #999966", width: "50px" };
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
                                onChange={this.props.changeHandler} name="accountNumber"
                                value={employee.accountNumber}
                                style={
                                    employee.errors.filter(item => {
                                        return item.field === "accountNumber";
                                    }).length !== 0 ? { ...styler, ...errorBorder } : { ...styler }
                                }
                                onPaste={this.props.pasteHandler}
                                onBlur={this.props.blurHandler}
                                autoComplete="off"
                                maxLength="30"
                                size="md" />
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
                    <td>
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
                                size="md" />
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
                        <input
                            type="text"
                            list="idTypesList"
                            id={"idType-" + employee.id}
                            className="rounded"
                            name="idType"
                            onChange={this.props.changeHandler}
                            style={idTypeDataListStyler}
                            onBlur={this.props.blurHandler}
                            onPaste={this.props.pasteHandler}
                            value={employee.idType}
                        />

                        <datalist
                            id="idTypesList"
                        >
                            <option value="P">Passport</option>
                            <option value="C">ID</option>
                        </datalist>

                        {
                            employee.errors.filter(item => {
                                return item.field === "idType";
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
                            <Form.Control name="idNumber"
                                style={
                                    employee.errors.filter(item => {
                                        return item.field === "idNumber";
                                    }).length !== 0 ? { ...styler, ...errorBorder } : { ...styler }
                                }
                                onChange={this.props.changeHandler} value={employee.idNumber}
                                onPaste={this.props.pasteHandler}
                                onBlur={this.props.blurHandler}
                                autoComplete="off"
                                maxLength="17"
                                type="text"
                                size="md" />
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


                        <Form.Group controlId={"numberOfWorkingDays-" + employee.id}>
                            <Form.Control type="number" name="numberOfWorkingDays"
                                style={
                                    employee.errors.filter(item => {
                                        return item.field === "numberOfWorkingDays";
                                    }).length !== 0 ? { ...styler, ...errorBorder } : { ...styler }
                                }
                                onChange={this.props.changeHandler} value={employee.numberOfWorkingDays}
                                onPaste={this.props.pasteHandler}
                                onBlur={this.props.blurHandler}
                                autoComplete="off"
                                min="0"
                                max="999"
                                size="md" />
                            {
                                employee.errors.filter(item => {
                                    return item.field === "numberOfWorkingDays";
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


                        <Form.Group controlId={"nmberOfExtraHours-" + employee.id}>
                            <Form.Control type="number" name="numberOfExtraHours"
                                onPaste={this.props.pasteHandler}
                                style={
                                    employee.errors.filter(item => {
                                        return item.field === "nmberOfExtraHours";
                                    }).length !== 0 ? { ...styler, ...errorBorder } : { ...styler }
                                }
                                onChange={this.props.changeHandler} value={employee.numberOfExtraHours}
                                onBlur={this.props.blurHandler}
                                autoComplete="off"
                                min="0"
                                max="999"
                                size="md" />
                            {
                                employee.errors.filter(item => {
                                    return item.field === "numberOfExtraHours";
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

                        <Form.Group controlId={"basicSalary-" + employee.id}>
                            <Form.Control name="basicSalary"
                                type="number"
                                step="0.1"
                                onPaste={this.props.pasteHandler}
                                style={
                                    employee.errors.filter(item => {
                                        return item.field === "basicSalary";
                                    }).length !== 0 ? { ...styler, ...errorBorder } : { ...styler }
                                }
                                onChange={this.props.changeHandler} value={employee.basicSalary}
                                onBlur={this.props.blurHandler}
                                autoComplete="off"
                                min="0"
                                max="999999999.999"
                                size="md" />
                            {
                                employee.errors.filter(item => {
                                    return item.field === "basicSalary";
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


                        <Form.Group controlId={"extraIncome-" + employee.id}>
                            <Form.Control type="number"
                                step="0.1" name="extraIncome"
                                onPaste={this.props.pasteHandler}
                                style={
                                    employee.errors.filter(item => {
                                        return item.field === "extraIncome";
                                    }).length !== 0 ? { ...styler, ...errorBorder } : { ...styler }
                                }
                                onChange={this.props.changeHandler} value={employee.extraIncome}
                                onBlur={this.props.blurHandler}
                                autoComplete="off"
                                min="0"
                                max="999999999.999"
                                size="md" />
                            {
                                employee.errors.filter(item => {
                                    return item.field === "extraIncome";
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
                            <Form.Control type="number"
                                step="0.1" name="deductions"
                                style={
                                    employee.errors.filter(item => {
                                        return item.field === "deductions";
                                    }).length !== 0 ? { ...styler, ...errorBorder } : { ...styler }
                                }
                                onPaste={this.props.pasteHandler}
                                onChange={this.props.changeHandler} value={employee.deductions}
                                onBlur={this.props.blurHandler}
                                autoComplete="off"
                                min="0"
                                max="999999999.999"
                                size="md" />
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

                        <Form.Group controlId={"socialSecurityDeductions-" + employee.id}>
                            <Form.Control type="number"
                                step="0.1" name="socialSecurityDeductions"
                                style={
                                    employee.errors.filter(item => {
                                        return item.field === "socialSecurityDeductions";
                                    }).length !== 0 ? { ...styler, ...errorBorder } : { ...styler }
                                }
                                onPaste={this.props.pasteHandler}
                                onChange={this.props.changeHandler} value={employee.socialSecurityDeductions}
                                onBlur={this.props.blurHandler}
                                autoComplete="off"
                                min="0"
                                max="999999999.999"
                                size="md" />
                            {
                                employee.errors.filter(item => {
                                    return item.field === "socialSecurityDeductions";
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
                        <Form.Control type="text" name="netSalary"
                            style={
                                employee.errors.filter(item => {
                                    return item.field === "netSalary";
                                }).length !== 0 ? { ...styler, ...errorBorder } : { ...styler }
                            }
                            disabled
                            value={
                                this.numberWithCommas(this.getSum(parseFloat(employee.basicSalary), parseFloat(employee.extraIncome),
                                    parseFloat(employee.deductions), parseFloat(employee.socialSecurityDeductions)))
                            }
                            size="md" />
                        {
                            employee.errors.filter(item => {
                                return item.field === "netSalary";
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

export default WpsTableRow;