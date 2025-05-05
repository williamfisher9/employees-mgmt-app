import React, { Component } from 'react'

import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css'

import TableStats from '../TableStats/TableStats'

import './Tablespagination.css'

class TablesPagination extends Component {

    render() {

        let pages = [];
        const numberOfPages = Math.ceil(this.props.totalNumberOfRecords / this.props.numberOfRecordsPerPage);
        const activePageNumber = this.props.activePageNumber;
        if (numberOfPages <= 5) {
            for (let i = 1; i <= numberOfPages; i++) {
                pages.push(

                    <div key={i}
                        onClick={() => this.props.getActivePageData(i)}
                        className="pageItem "
                        style={i === activePageNumber
                            ? { backgroundColor: "rgb(41, 43, 44)", color: "white" }
                            : { backgroundColor: "transparent", color: "rgb(41, 43, 44)" }}
                    >{i}</div>

                );
            }
        } else {

            for (let i = 1; i <= 3; i++) {
                pages.push(

                    <div key={i}
                        onClick={() => this.props.getActivePageData(i)}
                        className="pageItem "
                        style={i === activePageNumber
                            ? { backgroundColor: "rgb(41, 43, 44)", color: "white" }
                            : { backgroundColor: "transparent", color: "rgb(41, 43, 44)" }}
                    >{i}</div>

                );
            }

            if (activePageNumber < numberOfPages - 1 && activePageNumber > 3) {
                pages[2] = (
                    <div key={activePageNumber}
                        onClick={() => this.getActivePageData(activePageNumber)}
                        className="pageItem"
                        style={{ backgroundColor: "rgb(41, 43, 44)", color: "white" }}
                    >{activePageNumber}</div>
                );
            }

            pages.push(

                <div key={'ellipsis-2'}
                    className="ellipsisItem"
                    style={{ backgroundColor: "transparent", color: "rgb(41, 43, 44)" }}
                >...</div>

            );

            if (activePageNumber === numberOfPages - 1) {

                pages[2] = (
                    <div key={'ellipsis-2'}
                        className="ellipsisItem"
                        style={{ backgroundColor: "transparent", color: "rgb(41, 43, 44)" }}
                    >...</div>
                )

                pages[3] = (
                    <div key={activePageNumber}
                        onClick={() => this.getActivePageData(activePageNumber)}
                        className="pageItem"
                        style={{ backgroundColor: "rgb(41, 43, 44)", color: "white" }}
                    >{activePageNumber}</div>
                )
            }

            pages.push(

                <div key={numberOfPages}
                    onClick={() => this.props.getActivePageData(numberOfPages)}
                    className="pageItem"
                    style={numberOfPages === activePageNumber
                        ? { backgroundColor: "rgb(41, 43, 44)", color: "white" }
                        : { backgroundColor: "transparent", color: "rgb(41, 43, 44)" }}
                >{numberOfPages}</div>

            );

        }

        return (
            <div className="d-flex justify-content-center">
                <div className="mb-3 rounded d-flex justify-content-center align-items-center pagination-actions-container">
                    <div className="d-flex justify-content-center align-items-center">
                        <div className="paginationButtonStyler rounded" style={{ marginRight: "20px" }} onClick={() => this.props.moveToPreviousPage(activePageNumber, numberOfPages)}>
                            <span className="navigator">Back</span>
                        </div>

                        {pages}

                        <div className="paginationButtonStyler rounded" style={{ marginRight: "20px", marginLeft: "20px" }} onClick={() => this.props.moveToNextPage(activePageNumber, numberOfPages)}>
                            <span className="navigator">Next</span>
                        </div>
                    </div>

                    <div className="d-flex justify-content-center align-items-center">
                    <div style={{fontSize: "13px", lineHeight: "30px", height: "30px"}}>
                        <span>
                            {(activePageNumber - 1) * parseInt(this.props.numberOfRecordsPerPage) + 1} - {
                                parseInt(activePageNumber) !== parseInt(numberOfPages)
                                    ? parseInt(activePageNumber * this.props.numberOfRecordsPerPage)
                                    : parseInt(this.props.totalNumberOfRecords)
                            } of {parseInt(this.props.totalNumberOfRecords)}
                        </span>
                    </div>

                    <Form.Control type="text" name="pageNumberToGo"
                        style={{ fontSize: "13px", lineHeight: "30px", width: "60px", height: "30px", marginRight: "5px", textAlign: "middle", verticalAlign: "middle" }}
                        onChange={this.props.moveToPageNumberHandler} value={this.props.pageNumberToGoTo}
                        autoComplete="off"
                        maxLength="4" />

                    <div className="paginationButtonStyler rounded" onClick={() => this.props.moveToPage()}>
                        <span className="navigator">Go</span>
                    </div>
                        </div>


                    <TableStats completeRecordsTotalAmount={this.props.completeRecordsTotalAmount} numberOfCompleteRecords={this.props.numberOfCompleteRecords} />

                </div>



            </div>
        )
    }

}

export default TablesPagination;