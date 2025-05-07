import Navbar from 'react-bootstrap/Navbar'

import 'bootstrap/dist/css/bootstrap.min.css'
import { Container } from 'react-bootstrap';

import logoImg from '../../assets/logo.png'
import NavbarItems from '../NavbarItems/NavbarItems';

import './MainContainer.css'
import useWindowSize from '../../hooks/useWindowSize';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../../constants/constants';
import Cookies from 'js-cookie';
import { Outlet, useLocation } from 'react-router-dom';

const MainContainer = () => {
    const windowSize = useWindowSize()
    const [showMiniMenu, setShowMiniMenu] = useState(false)

    const location = useLocation()

    useEffect(() => {
        console.log(location.pathname)
        axios
          .get(`${BACKEND_URL}/api/forms`, { headers: { Authorization: `Bearer ${Cookies.get("token")}` }})
          .then((res) => {})
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

    return <div>

            <Navbar style={{backgroundColor: "rgba(0, 128, 128, 0.1)"}}>
                    <Container fluid>
                        <Navbar.Brand className='d-flex justify-content-center align-items-center gap-2' href="/salaries/home">
                            <img
                            alt=""
                            src={logoImg}
                            width="50"
                            height="50"
                            className="d-inline-block align-top rounded"
                            />
                            <span className="form-name-font-style store-name">WILLIAM FISHER BOOKSTORE</span>
                            
                            
                        </Navbar.Brand>

                        <span className='d-flex justify-content-center align-items-center'>
                            {location.pathname.startsWith('/salaries/detailed') && <>
                                <span className="material-symbols-rounded form-icon-font-style">table</span>
                                <span className="form-name-font-style">DETAILED FORM</span>
                            </>}
                            {location.pathname.startsWith('/salaries/simplified') && <>
                                <span className="material-symbols-rounded form-icon-font-style">draft</span>
                                <span className="form-name-font-style">SIMPLIFIED FORM</span>
                            </>}
                            {location.pathname.startsWith('/salaries/deductions') && <>
                                <span className="material-symbols-rounded form-icon-font-style">domain</span>
                                <span className="form-name-font-style">DEDUCTIONS FORM</span>
                            </>}
                            
                            {location.pathname.startsWith('/salaries/support') && <>
                                <span className="material-symbols-rounded form-icon-font-style">support</span>
                                <span className="form-name-font-style">SUPPORT</span>
                            </>}    
                        </span> 

                    
                        {
                            windowSize.width < 900 ?
                            <span className="material-symbols-rounded" style={{cursor: "pointer"}} onClick={() => setShowMiniMenu(!showMiniMenu)}>menu</span>
                            :
                            <NavbarItems urlLink={location.pathname} closeMiniMenu={() => setShowMiniMenu(false)}/>
                        }
                    
                    </Container>
                </Navbar>

                {
                    showMiniMenu && windowSize.width < 900 && <div className='mini-menu'>
                        <span className="material-symbols-rounded" 
                        style={{cursor: "pointer", position: "absolute", top: "10px", right: "10px"}} 
                        onClick={() => setShowMiniMenu(!showMiniMenu)}>close</span>

                        <NavbarItems urlLink={location.pathname} closeMiniMenu={() => setShowMiniMenu(false)}/>
                    </div>
                }


                <div className="main-container-style">
                   <Outlet />
                </div>
            </div>
}

export default MainContainer;