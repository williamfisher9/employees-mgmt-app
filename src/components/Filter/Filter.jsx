import { Form } from "react-bootstrap";
import './Filter.css'

const Filter = ({filterApplied, filterFieldValueChangeHandler, filterFieldValue, clearFilter, filterData}) => {

    let clearFilterStyleIfFilterApplied = filterApplied ? {
        backgroundColor: "#1979a9", border: "1px solid #1979a9",
        fontSize: "17px", fontWeight: "bold", color: "white", transition: "0.5s"
    } : null;

    let filterFieldStyleIfFilterApplied = filterApplied ? { border: "4px solid #1979a9" } : null;

        

        return (
            <div className="d-flex justify-content-between" style={{position: "relative", width: "350px", height: "37px"}}>
                <Form.Control type="text" name="filterFieldValue"
                    style={{ ...filterFieldStyleIfFilterApplied, 
                        fontSize: "13px", lineHeight: "37px", width: "100%", height: "37px", paddingRight: "5px", position: "absolute", top: "0", left: "0" }}
                    onChange={filterFieldValueChangeHandler}
                    value={filterFieldValue}
                    autoComplete="off"
                    maxLength="100" />

                <div className="filter-btn border rounded px-2" style={{position: "absolute", top: "50%", right: "70px", transform: "translateY(-50%)", cursor: "pointer"}} 
                onClick={filterData}>
                    <span className="navigator">Filter</span>
                </div>

                <div className="filter-btn border rounded px-2" style={{position: "absolute", top: "50%", right: "10px", transform: "translateY(-50%)", cursor: "pointer", ...clearFilterStyleIfFilterApplied }}
                    onClick={clearFilter}>
                    <span className="navigator">Clear</span>
                </div>
            </div>

        )
}

export default Filter;