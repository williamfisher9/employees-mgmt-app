import { Link, useNavigate } from "react-router-dom";

import axios from "axios";

import { GoFile } from "react-icons/go";
import { ImTable2 } from "react-icons/im";
import { BiSupport } from "react-icons/bi";
import { FaRegBuilding } from "react-icons/fa";

import { Col, Container, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./FormSelector.css";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../constants/constants";
import Cookies from "js-cookie";
import logoImg from '../../assets/logo.png'

const FormSelector = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/forms`, { headers: { Authorization: `Bearer ${Cookies.get("token")}` }})
      .then((res) => {
        if (res.status === 200 && res.data !== "") {
          setData(res.data);
        }
      })
      .catch((err) => {
                  if (err.status == 401 || err.status == 403) {
                      Cookies.remove('isAuthenticated'); 
                                      Cookies.remove('userId');
                                      Cookies.remove('token');
                                      Cookies.remove('authorityId');
                                      Cookies.remove('username');
                  window.location.assign("/salaries/login")
                }
                });
  }, []);

  return <Container className="p-4">
    <div className='d-flex justify-content-center align-items-center gap-2 flex-column' href="/salaries/home">
                        <img
                        alt=""
                        src={logoImg}
                        width="75"
                        height="75"
                        className="d-inline-block align-top rounded"
                        />
                        
                        <span className="h5 mb-5">WILLIAM FISHER BOOKSTORE</span>
                        
                    </div>
        
                    <div className="form-selector-bg d-flex justify-content-center align-items-start flex-wrap rounded p-4" style={{width: "100%"}}>
                          {data.map((form) => <div className="d-flex justify-content-center align-items-center flex-column form-type" onClick={() => navigate(form.link)} key={form.id}>
                                
                                <div className="text-center mb-2">

                                <span className="material-symbols-rounded" style={{fontSize: "45px", color: "black"}}>{form.icon}</span>
                                </div>

                                <div className="mb-2 text-center text-nowrap h5">
                                  <span className="font-style">{form.header}</span>
                                </div>

                                <div>
                                  <p className="text-muted text-center">{form.body}</p>
                                </div>
            </div>
        )}
      </div>
    </Container>
};

export default FormSelector;
