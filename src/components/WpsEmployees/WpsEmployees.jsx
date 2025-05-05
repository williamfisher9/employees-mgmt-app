import React, { Component } from 'react';
import './WpsEmployees.css';
import axios from 'axios';
import WpsTableRow from '../WpsTableRow/WpsTableRow'
import Filter from '../Filter/Filter'

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal'

import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

import 'bootstrap/dist/css/bootstrap.min.css'
import TablesPagination from '../TablesPagination/TablesPagination';

import MessageBuilder from '../MessageBuilder/MessageBuilder';
import { BACKEND_URL } from '../../constants/constants';

class WpsEmployees extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            activePageData: [],
            zNumberOfRecordsPerPage: 50,
            zNumberOfRecords: 0,
            allChecked: false,
            showPdfTermsAndConditions: false,
            showExcelTermsAndConditions: false,
            bankAccountNumberLength: 16,
            bankName: "ROUTING1",
            bankShortName: "ONE",
            activePageNumber: 1,
            isLoading: false,
            showMessageFlag: false,
            showMessageContent: {},
            pageNumberToGoTo: 1,
            filterFieldValue: "",
            filterApplied: false,
            zMaxNumberOfRecordsForPdf: 150,
            employerDetails: {
                formType: "wps",
                employerName: "",
                employerCr: "",
                payerCr: "",
                emailAddress: "",
                phoneNumber: "",
                paymentType: "101",
                valueDate: "",
                paymentYear: "",
                paymentMonth: "",
                salaryFrequency: "M",
                debtorAccountNumber: "",
                deliveryPersonName: "",
                deliveryPersonId: "",
                deliveryRequired: false
            },
            numberOfCompleteRecords: 0,
            completeRecordsTotalAmount: 0
        }
    }

    componentDidMount() {
        let formType = "wps";
        axios.get(`${BACKEND_URL}/api/employers/${formType}`).then(res => {
            if (res.status === 200 && res.data !== "") {
                this.setState({
                    employerDetails: res.data
                }, () => {
                    //console.log(res.data)
                    this.reloadCompenent(false, {});
                })
            }
        }).catch(err => {
            console.log(err)
        })
    }

    getCompleteRecordsCount = (inData) => {
        let completeRecordsArray = inData.filter(element => { return element.zRecordStatus === "COMPLETE" });
        return completeRecordsArray.length;
    }

    getCompleteRecordsAmount = (inData) => {
        let sum = 0;
        for (let i in inData) {
            sum = parseFloat(sum) + parseFloat(inData[i].basicSalary) + parseFloat(inData[i].extraIncome) - parseFloat(inData[i].deductions) - parseFloat(inData[i].socialSecurityDeductions);
        }
        return sum;
    }

    reloadCompenent = (showMessage, showMessageContentObject) => {
        let formType = "wps";
        axios.get(`${BACKEND_URL}/api/employees/${formType}`)
            .then(res => {
                if (res.status === 200 && res.data.length !== 0) {
                    res.data.forEach((element, index) => {
                        element.zRecordIndex = index;
                        element.zIsChecked = false;
                        element.netSalary = element.basicSalary + element.extraIncome - element.deductions - element.socialSecurityDeductions;

                        element.basicSalary = parseFloat(element.basicSalary).toFixed(3);
                        element.extraIncome = parseFloat(element.extraIncome).toFixed(3);
                        element.deductions = parseFloat(element.deductions).toFixed(3);
                        element.socialSecurityDeductions = parseFloat(element.socialSecurityDeductions).toFixed(3);

                        element.zRecordStatus = this.validateItem(element, this.state.employerDetails).length > 0 ? "INCOMPLETE" : "COMPLETE";
                        element.errors = [];
                    });

                    this.setState({
                        data: res.data,
                        activePageData: this.loadActivePageData(1, res.data),
                        zNumberOfRecords: res.data.length,
                        activePageNumber: 1,
                        pageNumberToGoTo: 1,
                        isLoading: false,
                        allChecked: false,
                        filterFieldValue: "",
                        filterApplied: false,
                        showMessageFlag: showMessage,
                        showMessageContent: showMessageContentObject,
                        numberOfCompleteRecords: this.getCompleteRecordsCount(res.data),
                        completeRecordsTotalAmount: this.getCompleteRecordsAmount(res.data)
                    });

                } else if (res.status === 200 && res.data.length === 0) {
                    this.setState({
                        data: [],
                        activePageData: [],
                        zNumberOfRecords: 0,
                        isLoading: false,
                        allChecked: false,
                        filterFieldValue: "",
                        filterApplied: false,
                        showMessageFlag: showMessage,
                        showMessageContent: showMessageContentObject,
                        numberOfCompleteRecords: 0,
                        completeRecordsTotalAmount: 0
                    });
                }
            })
    }

    reloadActivePage = (activePageNumber) => {
        let formType = "wps";
        axios.get(`${BACKEND_URL}/api/employees/${formType}`)
            .then(res => {
                if (res.status === 200 && res.data.length !== 0) {
                    res.data.forEach((element, index) => {
                        element.zRecordIndex = index;
                        element.zIsChecked = false;
                        element.netSalary = element.basicSalary + element.extraIncome - element.deductions - element.socialSecurityDeductions;

                        element.basicSalary = parseFloat(element.basicSalary).toFixed(3);
                        element.extraIncome = parseFloat(element.extraIncome).toFixed(3);
                        element.deductions = parseFloat(element.deductions).toFixed(3);
                        element.socialSecurityDeductions = parseFloat(element.socialSecurityDeductions).toFixed(3);

                        element.zRecordStatus = this.validateItem(element, this.state.employerDetails).length > 0 ? "INCOMPLETE" : "COMPLETE";
                        element.errors = [];
                    });

                    this.setState({
                        data: res.data,
                        activePageData: this.loadActivePageData(activePageNumber, res.data),
                        zNumberOfRecords: res.data.length,
                        activePageNumber: activePageNumber,
                        allChecked: false,
                        filterFieldValue: "",
                        filterApplied: false,
                        numberOfCompleteRecords: this.getCompleteRecordsCount(res.data),
                        completeRecordsTotalAmount: this.getCompleteRecordsAmount(res.data)
                    });

                } else if (res.status === 200 && res.data.length === 0) {
                    this.setState({
                        data: [], activePageData: [], allChecked: false, pages: [], zNumberOfRecords: 0, filterFieldValue: "", filterApplied: false,
                        numberOfCompleteRecords: 0,
                        completeRecordsTotalAmount: 0
                    })
                }
            })

    }

    reloadActivePageAfterDeletingSelectedRecords = (numberOfDeletedRecords, pageNumber, oldDataLength) => {
        let formType = "wps";
        axios.get(`${BACKEND_URL}/api/employees/${formType}`)
            .then(res => {
                if (res.status === 200 && res.data.length !== 0) {
                    res.data.forEach((element, index) => {
                        element.zRecordIndex = index;
                        element.zIsChecked = false;
                        element.netSalary = element.basicSalary + element.extraIncome - element.deductions - element.socialSecurityDeductions;

                        element.basicSalary = parseFloat(element.basicSalary).toFixed(3);
                        element.extraIncome = parseFloat(element.extraIncome).toFixed(3);
                        element.deductions = parseFloat(element.deductions).toFixed(3);
                        element.socialSecurityDeductions = parseFloat(element.socialSecurityDeductions).toFixed(3);

                        element.zRecordStatus = this.validateItem(element, this.state.employerDetails).length > 0 ? "INCOMPLETE" : "COMPLETE";
                        element.errors = [];
                    });

                    let activePageNumber = -1;
                    if (pageNumber > Math.ceil(res.data.length / 50)) {
                        activePageNumber = Math.ceil(res.data.length / 50);
                    } else if (numberOfDeletedRecords === 50) {
                        activePageNumber = pageNumber - 1;
                    } else {
                        activePageNumber = pageNumber;
                    }

                    this.setState({
                        data: res.data,
                        activePageData: this.loadActivePageData(activePageNumber, res.data),
                        zNumberOfRecords: res.data.length,
                        activePageNumber: activePageNumber,
                        allChecked: false,
                        filterFieldValue: "",
                        filterApplied: false,
                        numberOfCompleteRecords: this.getCompleteRecordsCount(res.data),
                        completeRecordsTotalAmount: this.getCompleteRecordsAmount(res.data)
                    });

                } else if (res.status === 200 && res.data.length === 0) {
                    this.setState({
                        data: [], activePageData: [], allChecked: false, pages: [], zNumberOfRecords: 0, filterFieldValue: "", filterApplied: false,
                        numberOfCompleteRecords: 0,
                        completeRecordsTotalAmount: 0
                    })
                }
            })
    }

    validateItem = (item, employer) => {

        let errors = [];

        let alphaNumericPattern = new RegExp(/^[0-9a-zA-Z]+$/);
        let numericPattern = new RegExp(/^\d+$/);
        let charactersPattern = new RegExp(/^[a-zA-Z ]+$/);

        //if salary type, basic salary should not be 0 but net salary can be 0
        if (employer.paymentType && employer.paymentType.toString() === "101") {

            if (parseFloat(item.basicSalary) <= 0) {
                errors.push({ id: item.id, field: "basicSalary", message: "Min: 0.001" });
            }

            if (parseFloat(item.basicSalary) > 999999999.999) {
                errors.push({ id: item.id, field: "basicSalary", message: "Max: 999999999.999" });
            }

            if ((parseFloat(item.basicSalary) + parseFloat(item.extraIncome)
                - parseFloat(item.deductions) - parseFloat(item.socialSecurityDeductions)) < 0) {
                errors.push({ id: item.id, field: "netSalary", message: "Net >= 0" });
            }

        } else {
            //if non salary type, basic salary can be 0 but net salary should be gereater than 0

            if (parseFloat(item.basicSalary) < 0) {
                errors.push({ id: item.id, field: "basicSalary", message: "Min: 0" });
            }

            if (parseFloat(item.basicSalary) > 999999999.999) {
                errors.push({ id: item.id, field: "basicSalary", message: "Max: 999999999.999" });
            }

            if ((parseFloat(item.basicSalary) + parseFloat(item.extraIncome)
                - parseFloat(item.deductions) - parseFloat(item.socialSecurityDeductions)) <= 0) {
                errors.push({ id: item.id, field: "netSalary", message: "Net > 0" });
            }

        }

        if (item.idType === "C" && !numericPattern.test(item.idNumber)) {
            errors.push({ id: item.id, field: "idNumber", message: "Numeric" });
        }

        if (item.idType === "P" && !alphaNumericPattern.test(item.idNumber)) {
            errors.push({ id: item.id, field: "idNumber", message: "Alphanumeric" });
        }

        if (item.accountNumber && item.accountNumber.length !== this.state.bankAccountNumberLength && item.employeeBank === this.state.bankName) {
            errors.push({ id: item.id, field: "accountNumber", message: `${this.state.bankAccountNumberLength}-digits long for ${this.state.bankShortName}` });
        }

        if (item.accountNumber && item.accountNumber.length > 35) {
            errors.push({ id: item.id, field: "accountNumber", message: "Max length is 35" });
        }

        if (!item.accountNumber) {
            errors.push({ id: item.id, field: "accountNumber", message: "Required" });
        }

        if (!item.employeeBank || this.getBankNameByValue(item.employeeBank) === 'else') {
            errors.push({ id: item.id, field: "employeeBank", message: "Required" });
        }

        if (!item.idType || this.getIdTypeByValue(item.idType) === 'else') {
            errors.push({ id: item.id, field: "idType", message: "Required" });
        }

        if (!item.employeeName) {
            errors.push({ id: item.id, field: "employeeName", message: "Required" });
        }

        if (item.employeeName && !charactersPattern.test(item.employeeName)) {
            errors.push({ id: item.id, field: "employeeName", message: "Characters only" });
        }

        if (item.employeeName && item.employeeName.length > 70) {
            errors.push({ id: item.id, field: "employeeName", message: "Max length is 70" });
        }

        if (!item.idNumber) {
            errors.push({ id: item.id, field: "idNumber", message: "Required" });
        }

        return errors;
    }

    getIdTypeByValue = type => {
        switch (type) {
            case 'P': return 'Passport';
            case 'C': return 'ID';
            default: return 'else';
        }
    }

    getBankNameByValue = bankId => {
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


    loadActivePageData = (pageNumber, fullData) => {
        let resultArray = fullData.slice(((pageNumber - 1) * this.state.zNumberOfRecordsPerPage), pageNumber * this.state.zNumberOfRecordsPerPage).map(
            item => {
                let errors = this.validateItem(item, this.state.employerDetails);

                if (errors.length > 0) {
                    item.zRecordStatus = "INCOMPLETE";
                }

                return { ...item, errors: errors }
            }
        )

        return resultArray;
    }

    getActivePageData = (pageNumber) => {

        let resultArray = this.state.data.slice(((pageNumber - 1) * this.state.zNumberOfRecordsPerPage), pageNumber * this.state.zNumberOfRecordsPerPage).map(
            item => {

                let errors = this.validateItem(item, this.state.employerDetails);

                if (errors.length > 0) {
                    item.zRecordStatus = "INCOMPLETE";
                }

                return { ...item, errors: errors }
            }
        )

        this.setState({ activePageData: resultArray, activePageNumber: pageNumber, pageNumberToGoTo: pageNumber, allChecked: false, filterFieldValue: "", filterApplied: false });
    }


    addExtraRecords = (count = 50) => {
        let inCount = count;
        this.setState({ isLoading: true });
        let formType = "wps";
        axios.post(`${BACKEND_URL}/api/employees/${formType}/addRecords/${inCount}`)
            .then(res => {
                if (res.status === 200) {
                    this.reloadActivePage(this.state.activePageNumber);
                    this.setState({ showMessageFlag: false, isLoading: false, filterFieldValue: "", filterApplied: false })
                }
            }).catch(err => {
                console.log(err)
                this.setState({ showMessageFlag: true, showMessageContent: { type: "error", content: "Check logs!" }, isLoading: false, filterFieldValue: "", filterApplied: false })
            });
    }

    selectedRecordsHandler = (event) => {
        let itemName = event.target.name;
        let checked = event.target.checked;
        let itemId = event.target.id;
        this.setState(prevState => {
            let { activePageData, allChecked } = prevState;
            if (itemName === "selectAllCheckbox") {
                allChecked = checked;
                activePageData = activePageData.map(item => ({ ...item, zIsChecked: checked }));
            } else {
                activePageData = activePageData.map(item =>
                    item.id === parseInt(itemId) ? { ...item, zIsChecked: checked } : item
                );
                allChecked = activePageData.every(item => item.zIsChecked);
            }
            return { activePageData, allChecked };
        });
    }

    deleteSelectedRecords = () => {

        this.setState({ isLoading: true });
        let toBeDeletedList = this.state.activePageData.filter(item => {
            return item.zIsChecked
        })

        if (toBeDeletedList.length !== 0) {
            let resultsList = toBeDeletedList.map(item => { return item.id })
            let formType = "wps";
            axios.delete(`${BACKEND_URL}/api/employees/selected/${formType}/${resultsList}`)
                .then(res => {
                    if (res.status === 200) {
                        this.setState({ isLoading: false, filterFieldValue: "", filterApplied: false });
                        this.reloadActivePageAfterDeletingSelectedRecords(resultsList.length, this.state.activePageNumber, this.state.data.length);
                    }
                });
        } else {
            this.setState({ showMessageFlag: true, showMessageContent: { type: "error", content: "You need to select some records first!" }, isLoading: false, filterFieldValue: "", filterApplied: false })
        }
    }

    deleteIncompleteRecords = () => {
        this.setState({ isLoading: true });
        let formType = "wps";
        axios.delete(`${BACKEND_URL}/api/employees/${formType}/incomplete`)
            .then(res => {
                if (res.status === 200) {
                    if (res.data.code === "200") {
                        this.reloadCompenent(true, { type: "success", content: "Incomplete records deleted successfuly!" });
                    } else if (res.data.code === "204") {
                        this.setState({ showMessageFlag: true, showMessageContent: { type: "info", content: `${res.data.message}` }, isLoading: false, filterFieldValue: "", filterApplied: false })
                    } else {
                        console.log(res)
                        this.setState({ showMessageFlag: true, showMessageContent: { type: "error", content: "Check logs!" }, isLoading: false, filterFieldValue: "", filterApplied: false })
                    }
                }
            }).catch(err => {
                console.log(err)
                this.setState({ showMessageFlag: true, showMessageContent: { type: "error", content: "Check logs!" }, isLoading: false, filterFieldValue: "", filterApplied: false })
            });
    }

    deleteAllRecords = () => {
        this.setState({ isLoading: true });

        if (this.state.data.length !== 0) {
            let formType = "wps";
            axios.delete(`${BACKEND_URL}/api/employees/${formType}/all`)
                .then(res => {
                    if (res.status === 200) {
                        this.reloadCompenent(true, { type: "success", content: "All records deleted successfully." })
                    }
                }).catch(err => {
                    console.log(err);
                    this.setState({ showMessageFlag: true, showMessageContent: { type: "error", content: "Check logs!" }, isLoading: false, filterFieldValue: "", filterApplied: false })
                });
        } else {
            this.setState({ showMessageFlag: true, showMessageContent: { type: "error", content: "No records were found to delete!" }, isLoading: false, filterFieldValue: "", filterApplied: false })
        }
    }

    changeHandler = (event) => {

        let itemId = event.target.id.slice(event.target.id.indexOf("-") + 1, event.target.id.length);
        let targetName = event.target.name;

        if (targetName === "employeeName") {
            let value = event.target.value;
            let employeeNamePattern = new RegExp(/[^A-Za-z ]/ig);
            value = value.replace(employeeNamePattern, '');
            event.target.value = value.toUpperCase();
        }

        if (targetName === "accountNumber" || targetName === "numberOfWorkingDays" || targetName === "numberOfExtraHours") {
            let value = event.target.value;
            value = value.replace(/[^0-9]/ig, '');
            event.target.value = value;
        }

        if (targetName === "idNumber") {
            let value = event.target.value;
            //let employerNamePattern = new RegExp(/[^A-Za-z0-9]/ig);
            value = value.replace(/[^A-Za-z0-9/]/ig, '');
            event.target.value = value;
        }

        if (targetName === "basicSalary" || targetName === "extraIncome" || targetName === "deductions" || targetName === "socialSecurityDeductions") {
            let value = event.target.value;
            //let employerNamePattern = new RegExp(/[^A-Za-z0-9]/ig);

            if (parseFloat(event.target.value) > 999999999.999) {
                event.target.value = 999999999.999;
            } else {
                event.target.value = value;
            }

            //value = value.replace(/[^0-9./]/ig, '');

        }

        let dataRows = this.state.activePageData;

        let recordIndexInDataRows = -1;
        for (let i in dataRows) {
            if (dataRows[i].id.toString() === itemId.toString()) {
                recordIndexInDataRows = i;
            }
        }

        if (dataRows[recordIndexInDataRows].id.toString() === itemId.toString()) {
            if (targetName === "accountNumber") {
                dataRows[recordIndexInDataRows].accountNumber = event.target.value;
            } else if (targetName === "employeeName") {
                dataRows[recordIndexInDataRows].employeeName = event.target.value;
            } else if (targetName === "employeeBank") {
                dataRows[recordIndexInDataRows].employeeBank = event.target.value;
            } else if (targetName === "idType") {
                dataRows[recordIndexInDataRows].idType = event.target.value;
            } else if (targetName === "idNumber") {
                dataRows[recordIndexInDataRows].idNumber = event.target.value;
            } else if (targetName === "numberOfExtraHours") {
                dataRows[recordIndexInDataRows].numberOfExtraHours = event.target.value;
            } else if (targetName === "numberOfWorkingDays") {
                dataRows[recordIndexInDataRows].numberOfWorkingDays = event.target.value;
            } else if (targetName === "basicSalary") {
                if (event.target.value === "") {
                    event.target.value = 0;
                }
                dataRows[recordIndexInDataRows].basicSalary = event.target.value;
                dataRows[recordIndexInDataRows].netSalary = parseFloat(dataRows[recordIndexInDataRows].basicSalary) + parseFloat(dataRows[recordIndexInDataRows].extraIncome) - parseFloat(dataRows[recordIndexInDataRows].deductions) - parseFloat(dataRows[recordIndexInDataRows].socialSecurityDeductions);
            } else if (targetName === "deductions") {
                if (event.target.value === "") {
                    event.target.value = 0;
                };
                dataRows[recordIndexInDataRows].deductions = event.target.value;
                dataRows[recordIndexInDataRows].netSalary = parseFloat(dataRows[recordIndexInDataRows].basicSalary) + parseFloat(dataRows[recordIndexInDataRows].extraIncome) - parseFloat(dataRows[recordIndexInDataRows].deductions) - parseFloat(dataRows[recordIndexInDataRows].socialSecurityDeductions);
            } else if (targetName === "extraIncome") {
                if (event.target.value === "") {
                    event.target.value = 0;
                }
                dataRows[recordIndexInDataRows].extraIncome = event.target.value;
                dataRows[recordIndexInDataRows].netSalary = parseFloat(dataRows[recordIndexInDataRows].basicSalary) + parseFloat(dataRows[recordIndexInDataRows].extraIncome) - parseFloat(dataRows[recordIndexInDataRows].deductions) - parseFloat(dataRows[recordIndexInDataRows].socialSecurityDeductions);
            } else if (targetName === "socialSecurityDeductions") {
                if (event.target.value === "") {
                    event.target.value = 0;
                }
                dataRows[recordIndexInDataRows].socialSecurityDeductions = event.target.value;
                dataRows[recordIndexInDataRows].netSalary = parseFloat(dataRows[recordIndexInDataRows].basicSalary) + parseFloat(dataRows[recordIndexInDataRows].extraIncome) - parseFloat(dataRows[recordIndexInDataRows].deductions) - parseFloat(dataRows[recordIndexInDataRows].socialSecurityDeductions);
            }

        }

        this.setState({ activePageData: dataRows });
    }

    blurHandler = (event) => {
        let itemId = event.target.id.slice(event.target.id.indexOf("-") + 1, event.target.id.length);

        let dataRows = this.state.activePageData;

        let recordIndexInDataRows = -1;
        for (let i in dataRows) {
            if (dataRows[i].id.toString() === itemId.toString()) {
                recordIndexInDataRows = i;
            }
        }

        if (!dataRows[recordIndexInDataRows].numberOfExtraHours) {
            dataRows[recordIndexInDataRows].numberOfExtraHours = 0;
        }

        if (!dataRows[recordIndexInDataRows].numberOfWorkingDays) {
            dataRows[recordIndexInDataRows].numberOfWorkingDays = 0;
        }

        dataRows[recordIndexInDataRows].basicSalary = parseFloat(dataRows[recordIndexInDataRows].basicSalary).toFixed(3);
        dataRows[recordIndexInDataRows].extraIncome = parseFloat(dataRows[recordIndexInDataRows].extraIncome).toFixed(3);
        dataRows[recordIndexInDataRows].deductions = parseFloat(dataRows[recordIndexInDataRows].deductions).toFixed(3);
        dataRows[recordIndexInDataRows].socialSecurityDeductions = parseFloat(dataRows[recordIndexInDataRows].socialSecurityDeductions).toFixed(3);

        let errors = this.validateItem(dataRows[recordIndexInDataRows], this.state.employerDetails);

        axios.put(`${BACKEND_URL}/api/employees/wps`, dataRows[recordIndexInDataRows])
            .then(res => {
                if (res.status === 200) {
                    dataRows[recordIndexInDataRows].zRecordStatus = errors.length > 0 ? "INCOMPLETE" : "COMPLETE";
                    dataRows[recordIndexInDataRows].errors = errors;
                    dataRows[recordIndexInDataRows].id = res.data.id;

                    dataRows[recordIndexInDataRows].basicSalary = parseFloat(res.data.basicSalary).toFixed(3);
                    dataRows[recordIndexInDataRows].extraIncome = parseFloat(res.data.extraIncome).toFixed(3);
                    dataRows[recordIndexInDataRows].deductions = parseFloat(res.data.deductions).toFixed(3);
                    dataRows[recordIndexInDataRows].socialSecurityDeductions = parseFloat(res.data.socialSecurityDeductions).toFixed(3);

                    let recordIndexInData = -1;
                    //let duplicateAccount = 0;
                    for (let i in this.state.data) {
                        if (dataRows[recordIndexInDataRows].id.toString() === this.state.data[i].id.toString()) {
                            recordIndexInData = i;
                        }

                        //if (dataRows[recordIndexInDataRows].accountNumber.toString() === this.state.data[i].accountNumber.toString()) {
                        //    duplicateAccount = 1;
                        //}
                    }

                    let newDataArray = this.state.data;
                    newDataArray[recordIndexInData] = dataRows[recordIndexInDataRows]

                    //if (duplicateAccount === 1) {
                    //  this.setState({
                    //    data: newDataArray,
                    //  numberOfCompleteRecords: this.getCompleteRecordsCount(newDataArray),
                    //completeRecordsTotalAmount: this.getCompleteRecordsAmount(newDataArray),
                    //showMessageFlag: true,
                    //showMessageContent: { type: "error", content: `Account number is duplicated!` }
                    //})
                    //} else {

                    //}

                    this.setState({
                        data: newDataArray,
                        numberOfCompleteRecords: this.getCompleteRecordsCount(newDataArray),
                        completeRecordsTotalAmount: this.getCompleteRecordsAmount(newDataArray)
                    });


                }
            }).catch(err => {
                console.log("error")
            })

    }

    validateAndGeneratePdf = () => {
        let readyToGenerateFile = true;

        let incompleteRecordsArray = this.state.data.filter(element => {
            return element.zRecordStatus === "INCOMPLETE"
        });

        if (incompleteRecordsArray.length > 0) {
            readyToGenerateFile = false;
            this.setState({ showMessageFlag: true, showMessageContent: { type: "error", content: "Some records are still marked as INCOMPLETE!" } })
        } else if (this.state.data.length > this.state.zMaxNumberOfRecordsForPdf) {
            readyToGenerateFile = false;
            this.setState({ showMessageFlag: true, showMessageContent: { type: "error", content: `Number of records exceeds ${this.state.zMaxNumberOfRecordsForPdf}. Export excel indtead!` } })
        }

        if (readyToGenerateFile) {
            this.showPdfTermsAndConditionsHandler();
        }
    }

    validateAndGenerateExcel = () => {
        let readyToGenerateFile = true;

        let incompleteRecordsArray = this.state.data.filter(element => {
            return element.zRecordStatus === "INCOMPLETE"
        });

        if (incompleteRecordsArray.length > 0) {
            readyToGenerateFile = false;
            this.setState({ showMessageFlag: true, showMessageContent: { type: "error", content: "Some records are still marked as INCOMPLETE!" } })
        }

        if (readyToGenerateFile) {
            this.showExcelTermsAndConditionsHandler();
        }
    }

    showPdfTermsAndConditionsHandler = () => {
        this.setState({ showPdfTermsAndConditions: true })
    }

    showExcelTermsAndConditionsHandler = () => {
        this.setState({ showExcelTermsAndConditions: true })
    }

    pdfGenerationHandler = () => {
        this.setState({ isLoading: true, showPdfTermsAndConditions: false });
        let formType = "wps";
        axios.get(`${BACKEND_URL}/api/pdf/${formType}`)
            .then(res => {
                if (res.status === 200) {
                    if (res.data.code === "200") {
                        this.setState({ showMessageFlag: true, showMessageContent: { type: "success", content: `File created successfuly ${res.data.message}` }, showPdfTermsAndConditions: false, isLoading: false })
                    } else if (res.data.code === "204") {
                        this.setState({ showMessageFlag: true, showMessageContent: { type: "error", content: `${res.data.message}` }, showPdfTermsAndConditions: false, isLoading: false })
                    }
                } else {
                    console.log(res)
                    this.setState({ showMessageFlag: true, showMessageContent: { type: "error", content: "Request to generate the file failed!" }, showPdfTermsAndConditions: false, isLoading: false })
                }
            })
    }

    excelGenerationHandler = () => {
        this.setState({ isLoading: true, showExcelTermsAndConditions: false });
        let formType = "wps";
        axios.get(`${BACKEND_URL}/api/excel/${formType}`)
            .then(res => {
                if (res.status === 200) {
                    if (res.data.code === "200") {
                        this.setState({ showMessageFlag: true, showMessageContent: { type: "success", content: `File created successfuly ${res.data.message}` }, showPdfTermsAndConditions: false, isLoading: false })
                    } else if (res.data.code === "204") {
                        this.setState({ showMessageFlag: true, showMessageContent: { type: "error", content: `${res.data.message}` }, showPdfTermsAndConditions: false, isLoading: false })
                    }
                } else {
                    console.log(res)
                    this.setState({ showMessageFlag: true, showMessageContent: { type: "error", content: "Request to generate the file failed!" }, showPdfTermsAndConditions: false, isLoading: false })
                }
            })
    }

    pasteHandler = (event) => {

        let itemId = event.target.id.slice(event.target.id.indexOf("-") + 1, event.target.id.length);
        let verticalSplitArray = event.clipboardData.getData('Text').split("\n");
        let payloadObj = {
            formType: "wps",
            itemId: itemId,
            fieldName: event.target.name,
            payload: verticalSplitArray
        }
        this.setState({ isLoading: true });

        //timeout is used to workaround the onPaste/onBlur competition
        setTimeout(() => {
            axios.post(`${BACKEND_URL}/api/employees/pasteHandler`, payloadObj).then(res => {
                if (res.status === 200) {
                    this.reloadCompenent(false, {});
                }
            }).catch(err => {
                console.log(err)
                this.setState({ isLoading: false });
            })
        },
            500
        );

    }

    trimFunction = (event) => {
        this.setState({ [event.target.name]: event.target.value.trim() });
    }

    moveToNextPage = (activePageNumber, numberOfPages) => {
        //let activePageNumber = this.state.activePageNumber;
        //const numberOfPages = Math.ceil(this.state.zNumberOfRecords / this.state.zNumberOfRecordsPerPage);
        if (activePageNumber < numberOfPages) {
            this.setState({ activePageNumber: activePageNumber + 1, pageNumberToGoTo: activePageNumber + 1 }, () => {
                this.getActivePageData(this.state.activePageNumber)
            });
        }
    }

    moveToPreviousPage = () => {
        let activePageNumber = this.state.activePageNumber;
        if (activePageNumber > 1) {
            this.setState({ activePageNumber: activePageNumber - 1, pageNumberToGoTo: activePageNumber + 1 }, () => {
                this.getActivePageData(this.state.activePageNumber)
            });
        }
    }

    loadIncompleteRecords = () => {
        /*let filter = this.state.data.filter(element => {
            return element.zRecordStatus === "INCOMPLETE";
        })
     
        if (filter.length !== 0) {
            this.setState({ activePageNumber: filter })
        }*/

        this.setState({ showMessageFlag: true, showMessageContent: { type: "info", content: `under construction` }, showExcelTermsAndConditions: false, isLoading: false });

        console.log("loadIncompleteRecords clicked")
    }

    loadCompleteRecords = () => {
        /*let filter = this.state.data.filter(element => {
            return element.zRecordStatus === "INCOMPLETE";
        })
     
        if (filter.length !== 0) {
            this.setState({ activePageNumber: filter })
        }*/

        this.setState({ showMessageFlag: true, showMessageContent: { type: "info", content: `under construction` }, showExcelTermsAndConditions: false, isLoading: false });

        console.log("loadCompleteRecords clicked")
    }

    loadAllRecords = () => {
        /*let filter = this.state.data.filter(element => {
            return element.zRecordStatus === "INCOMPLETE";
        })
     
        if (filter.length !== 0) {
            this.setState({ activePageNumber: filter })
        }*/

        this.setState({ showMessageFlag: true, showMessageContent: { type: "info", content: `under construction` }, showExcelTermsAndConditions: false, isLoading: false });

        console.log("loadAllRecords clicked")
    }

    addThousandRecords = () => {
        this.setState({ isLoading: true })

        const recordsCount = 1000;

        axios.post(`${BACKEND_URL}/api/employees/wps/bulk/${recordsCount}`).then((res) => {
            if (res.status === 200) {
                this.reloadCompenent(false, {});
            }
        })
    }

    filterFieldValueChangeHandler = (event) => {
        this.setState({ filterFieldValue: event.target.value });
    }

    filterData = () => {

        if (this.state.filterFieldValue !== "" && this.state.filterFieldValue !== null) {
            let formType = "wps";
            axios.get(`${BACKEND_URL}/api/employees/${formType}`)
                .then(res => {
                    if (res.status === 200 && res.data.length !== 0) {
                        res.data.forEach((element, index) => {
                            element.zRecordIndex = index;
                            element.zIsChecked = false;
                            element.netSalary = element.basicSalary + element.extraIncome - element.deductions - element.socialSecurityDeductions;

                            element.basicSalary = parseFloat(element.basicSalary).toFixed(3);
                            element.extraIncome = parseFloat(element.extraIncome).toFixed(3);
                            element.deductions = parseFloat(element.deductions).toFixed(3);
                            element.socialSecurityDeductions = parseFloat(element.socialSecurityDeductions).toFixed(3);

                            element.zRecordStatus = this.validateItem(element, this.state.employerDetails).length > 0 ? "INCOMPLETE" : "COMPLETE";
                            element.errors = [];
                        });

                        let filteredData = res.data.filter((element) => {
                            return (element.employeeName !== null && element.employeeName.toString().includes(this.state.filterFieldValue))
                                || (element.numberOfWorkingDays !== null && element.numberOfWorkingDays.toString().includes(this.state.filterFieldValue))
                                || (element.numberOfExtraHours !== null && element.numberOfExtraHours.toString().includes(this.state.filterFieldValue))
                                || (element.idNumber !== null && element.idNumber.toString().includes(this.state.filterFieldValue))
                                || (element.basicSalary !== null && element.basicSalary.toString().includes(this.state.filterFieldValue))
                                || (element.extraIncome !== null && element.extraIncome.toString().includes(this.state.filterFieldValue))
                                || (element.deductions !== null && element.deductions.toString().includes(this.state.filterFieldValue))
                                || (element.socialSecurityDeductions !== null && element.socialSecurityDeductions.toString().includes(this.state.filterFieldValue))
                                || (element.accountNumber !== null && element.accountNumber.toString().includes(this.state.filterFieldValue))
                                || (element.employeeBank !== null && element.employeeBank.toString().includes(this.state.filterFieldValue))
                                || (element.idType !== null && element.idType.toString().includes(this.state.filterFieldValue))
                                || (element.zRecordStatus !== null && element.zRecordStatus.toString().includes(this.state.filterFieldValue))
                        });

                        //console.log(filteredData);

                        if (filteredData.length !== 0) {
                            this.setState({
                                data: filteredData,
                                activePageData: this.loadActivePageData(1, filteredData),
                                zNumberOfRecords: filteredData.length,
                                activePageNumber: 1,
                                pageNumberToGoTo: 1,
                                allChecked: false,
                                filterApplied: true
                            });
                        } else {
                            this.setState({
                                data: filteredData,
                                activePageData: this.loadActivePageData(1, filteredData),
                                zNumberOfRecords: filteredData.length,
                                activePageNumber: 1,
                                pageNumberToGoTo: 1,
                                allChecked: false,
                                filterApplied: true,
                                showMessageFlag: true,
                                showMessageContent: { type: "info", content: "No records were found!" }
                            })
                        }

                    } else if (res.status === 200 && res.data.length === 0) {
                        this.setState({
                            data: [], activePageData: [], allChecked: false, pages: [], zNumberOfRecords: 0, filterApplied: false,
                            numberOfCompleteRecords: 0,
                            completeRecordsTotalAmount: 0
                        })
                    }
                })
        } else {
            this.setState({
                showMessageFlag: true,
                showMessageContent: { type: "info", content: "Fill in the filter field first!" }
            })
        }
    }

    clearFilter = () => {
        if (this.state.filterApplied) {
            this.reloadCompenent(false, {});
        } else {
            this.setState({
                showMessageFlag: true,
                showMessageContent: { type: "info", content: "No filters are applied!" }
            })
        }
    }

    moveToPage = () => {

        let numberOfPages = Math.ceil(this.state.zNumberOfRecords / this.state.zNumberOfRecordsPerPage);
        if (this.state.pageNumberToGoTo >= 1 && this.state.pageNumberToGoTo <= numberOfPages) {
            this.setState({ activePageData: this.loadActivePageData(parseInt(this.state.pageNumberToGoTo), this.state.data), activePageNumber: parseInt(this.state.pageNumberToGoTo) })
        }
    }

    moveToPageNumberHandler = (event) => {
        let value = event.target.value;
        value = value.replace(/[^0-9]/ig, '');
        event.target.value = value;
        this.setState({ pageNumberToGoTo: event.target.value });
    }

    hideMessageBuilderModal = () => {
        this.setState({ showMessageFlag: false })
    }

    render() {
        return (
            <div className="mx-3">

                {
                    this.state.showMessageFlag  && <MessageBuilder
                                errorType={this.state.showMessageContent.type}
                                messageContent={this.state.showMessageContent.content}
                                hideMessageBuilderModal={this.hideMessageBuilderModal}
                                showModal={this.state.showMessageFlag} />
                }

                {
                    this.state.showPdfTermsAndConditions && <Modal size="xl" show={this.state.showPdfTermsAndConditions} onHide={() => this.setState({ showPdfTermsAndConditions: false })} animation={false}>
                                <Modal.Body className="text-center m-3 p-5" style={{ fontSize: "20px" }}>
                                    <h5 className="text-justify text-dark">Terms and Conditions:</h5>
                                    <hr />
                                    <ol>
                                        <li className="text-justify text-dark my-3">
                                            I/We acknowledge and understand that we are solely responsible for the accuracy of any information contained in this salary instruction file and that Meethaq shall be under no
                                            obligation to check or ensure that the name of any account holder/beneficiary (as given in my/our instructions) is identical or similar to the name(s) of the account holder(s)
                                            according to its records or knowledge and confirm that a transfer or payment to (or from as the case may be) an account having the same number as that given in my/our
                                            instructions shall constitute good and COMPLETE compliance by the Bank with my/our instructions.
                                    </li>
                                        <li className="text-justify text-dark my-3">
                                            I/We acknowledge and understand that Meethaq shall be under no obligation to process a transfer or payment to (or from as the case may be) accounts with incomplete or
                                            incorrect details
                                    </li>
                                        <li className="text-justify text-dark my-3">
                                            I/We request and authorize the Bank to debit my/our account(s) mentioned in the file with any charges/fees in respect of Salary Processing Services in accordance with the
                                            rates published by them from time to time, commencing this date of application and continuing until further notice.
                                    </li>
                                        <li className="text-justify text-dark my-3">
                                            I/We understand that any Salary Processing instruction given by me/us in relation to any account(s) is subject further to the terms and conditions governing such account(s).
                                    </li>
                                    </ol>
                                </Modal.Body>
                                <Container>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={() => this.setState({ showPdfTermsAndConditions: false })}>
                                            Close
                                    </Button>
                                        <Button variant="primary" onClick={() => this.pdfGenerationHandler()}>
                                            Generate File
                                    </Button>
                                    </Modal.Footer>
                                </Container>
                            </Modal>
                }

                {
                    this.state.showExcelTermsAndConditions && <Modal size="xl" show={this.state.showExcelTermsAndConditions} onHide={() => this.setState({ showExcelTermsAndConditions: false })} animation={false}>
                                <Modal.Body className="text-center m-3 p-5" style={{ fontSize: "20px" }}>
                                    <h5 className="text-justify text-dark">Terms and Conditions:</h5>
                                    <hr />
                                    <ol>
                                        <li className="text-justify text-dark my-3">
                                            I/We acknowledge and understand that we are solely responsible for the accuracy of any information contained in this salary instruction file and that Meethaq shall be under no
                                            obligation to check or ensure that the name of any account holder/beneficiary (as given in my/our instructions) is identical or similar to the name(s) of the account holder(s)
                                            according to its records or knowledge and confirm that a transfer or payment to (or from as the case may be) an account having the same number as that given in my/our
                                            instructions shall constitute good and COMPLETE compliance by the Bank with my/our instructions.
                                    </li>
                                        <li className="text-justify text-dark my-3">
                                            I/We acknowledge and understand that Meethaq shall be under no obligation to process a transfer or payment to (or from as the case may be) accounts with incomplete or
                                            incorrect details
                                    </li>
                                        <li className="text-justify text-dark my-3">
                                            I/We request and authorize the Bank to debit my/our account(s) mentioned in the file with any charges/fees in respect of Salary Processing Services in accordance with the
                                            rates published by them from time to time, commencing this date of application and continuing until further notice.
                                    </li>
                                        <li className="text-justify text-dark my-3">
                                            I/We understand that any Salary Processing instruction given by me/us in relation to any account(s) is subject further to the terms and conditions governing such account(s).
                                    </li>
                                    </ol>
                                </Modal.Body>
                                <Container>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={() => this.setState({ showExcelTermsAndConditions: false })}>
                                            Close
                                    </Button>
                                        <Button variant="primary" onClick={() => this.excelGenerationHandler()}>
                                            Generate File
                                    </Button>
                                    </Modal.Footer>
                                </Container>
                            </Modal>
                }

                {
                    this.state.isLoading && <Modal show={this.state.isLoading} animation={false} centered>
                                <Modal.Body className="text-center">
                                    <img src={"loading.gif"} width="400" height="300" alt="loader" />
                                    <div>Processing Your Request...</div>
                                </Modal.Body>
                            </Modal>
                }


                <div className="d-flex justify-content-between align-items-center actions-container gap-3">
                
                    <div className="d-flex gap-2">

                        <DropdownButton
                        align="start"
                            title="Actions"
                            id="actionsDdl"
                            variant="outline-dark" className="ml-2 d-inline"
                        >
                            <Dropdown.Item eventKey="1" onClick={() => this.addExtraRecords()}>Add Extra Blank Records</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item eventKey="2" onClick={this.deleteSelectedRecords}>Delete Selected Record(s)</Dropdown.Item>
                            <Dropdown.Item eventKey="3" onClick={this.deleteIncompleteRecords}>Delete Incomplete Record(s)</Dropdown.Item>
                            <Dropdown.Item eventKey="4" onClick={this.deleteAllRecords}>Delete All Record(s)</Dropdown.Item>

                            {/*<Dropdown.Item eventKey="4" onClick={this.addThousandRecords}>Add 1000 Records</Dropdown.Item>*/}

                        </DropdownButton>

                        <DropdownButton
                        align="start"
                            title="Export"
                            id="exportDdl"
                            variant="outline-dark" className="ml-2 d-inline"
                        >
                            <Dropdown.Item eventKey="1" onClick={this.validateAndGeneratePdf}>Export to PDF</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item eventKey="2" onClick={this.validateAndGenerateExcel}>Export to Excel</Dropdown.Item>
                        </DropdownButton>

                        {/*<DropdownButton
                            menuAlign="right"
                            title={"Filters"}
                            id="filtersDdl"
                            variant="outline-dark" className="ml-2 d-inline"
                        >
                            <Dropdown.Item value="Incomplete" eventKey="1" onClick={this.loadIncompleteRecords}>Incomplete Records</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item eventKey="2" onClick={this.loadCompleteRecords}>Complete Records</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item eventKey="3" onClick={this.loadAllRecords}>All Records</Dropdown.Item>
                        </DropdownButton>*/}

                    </div>

                    <Filter
                        filterData={this.filterData}
                        filterFieldValue={this.state.filterFieldValue}
                        clearFilter={this.clearFilter}
                        filterApplied={this.state.filterApplied}
                        filterFieldValueChangeHandler={this.filterFieldValueChangeHandler} />
                </div>

                <hr />

                <div className="">

                    <TablesPagination
                        numberOfRecordsPerPage={this.state.zNumberOfRecordsPerPage}
                        totalNumberOfRecords={this.state.zNumberOfRecords}
                        getActivePageData={this.getActivePageData}
                        moveToPreviousPage={this.moveToPreviousPage}
                        moveToNextPage={this.moveToNextPage}
                        activePageNumber={this.state.activePageNumber}
                        pageNumberToGoTo={this.state.pageNumberToGoTo}
                        moveToPageNumberHandler={this.moveToPageNumberHandler}
                        moveToPage={this.moveToPage}
                        completeRecordsTotalAmount={this.state.completeRecordsTotalAmount} numberOfCompleteRecords={this.state.numberOfCompleteRecords} />

                </div>

                <div>
                    <Table responsive="sm" striped hover size="sm">
                        <thead>
                            <tr >
                                <th width={'35px'}>
                                    <Form.Group>
                                        <Form.Check name="selectAllCheckbox" onChange={this.selectedRecordsHandler} checked={this.state.allChecked} />
                                    </Form.Group>
                                </th>
                                <th width={'55px'} style={{ textAlign: "middle", fontSize: "11px", verticalAlign: "middle" }}>#</th>
                                <th width={'225px'} style={{ textAlign: "middle", fontSize: "11px", verticalAlign: "middle" }}>Account Number</th>
                                <th width={'375px'} style={{ textAlign: "middle", fontSize: "11px", verticalAlign: "middle" }}>Employee Name</th>
                                <th style={{ textAlign: "middle", fontSize: "11px", verticalAlign: "middle" }}>Bank Name</th>
                                <th width={'50px'} style={{ textAlign: "middle", fontSize: "11px", verticalAlign: "middle" }}>ID Type</th>
                                <th width={'130px'} style={{ textAlign: "middle", fontSize: "11px", verticalAlign: "middle" }}>ID Number</th>
                                <th width={'60px'} style={{ textAlign: "middle", fontSize: "11px", verticalAlign: "middle" }}>Working Days</th>
                                <th width={'60px'} style={{ textAlign: "middle", fontSize: "11px", verticalAlign: "middle" }}>Extra Hours</th>
                                <th style={{ textAlign: "middle", fontSize: "11px", verticalAlign: "middle" }}>Basic Salary</th>
                                <th style={{ textAlign: "middle", fontSize: "11px", verticalAlign: "middle" }}>Extra Income</th>
                                <th style={{ textAlign: "middle", fontSize: "11px", verticalAlign: "middle" }}>Deductions</th>
                                <th style={{ textAlign: "middle", fontSize: "11px", verticalAlign: "middle" }}>Social Sec. Deductions</th>
                                <th style={{ textAlign: "middle", fontSize: "11px", verticalAlign: "middle" }}>Net Salary</th>
                                <th style={{ textAlign: "middle", fontSize: "11px", verticalAlign: "middle" }}>Status</th>
                            </tr>
                        </thead>
                        <tbody>

                            <WpsTableRow
                                employees={this.state.activePageData}
                                pasteHandler={this.pasteHandler}
                                blurHandler={this.blurHandler}
                                changeHandler={this.changeHandler}
                                selectedRecordsHandler={this.selectedRecordsHandler}
                            />

                        </tbody>
                    </Table>

                </div>
            </div>
        );
    }
}

export default WpsEmployees;