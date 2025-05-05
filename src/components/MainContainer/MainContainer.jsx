import Dashboard from '../Dashboard/Dashboard'
import WpsEmployer from '../WpsEmployer/WpsEmployer'
import WpsEmployees from '../WpsEmployees/WpsEmployees';

import SimplifiedEmployees from '../SimplifiedEmployees/SimplifiedEmployees'
import SimplifiedEmployer from '../SimplifiedEmployer/SimplifiedEmployer'

import MinistriesEmployees from '../MinistriesEmployees/MinistriesEmployees'
import MinistriesEmployer from '../MinistriesEmployer/MinistriesEmployer'

import Navbar from 'react-bootstrap/Navbar'

import 'bootstrap/dist/css/bootstrap.min.css'
import HowTo from '../Support/how';
import ContactUs from '../Support/contact';
import { Container } from 'react-bootstrap';

import logoImg from '../../assets/logo.png'
import NavbarItems from '../NavbarItems/NavbarItems';

import './MainContainer.css'
import useWindowSize from '../../hooks/useWindowSize';
import { useState } from 'react';

const MainContainer = ({urlLink}) => {
    const windowSize = useWindowSize()
    const [showMiniMenu, setShowMiniMenu] = useState(false)

    return <div>

            <Navbar style={{backgroundColor: "rgba(0, 128, 128, 0.1)"}}>
                    <Container fluid>
                        <Navbar.Brand className='d-flex justify-content-center align-items-center gap-2' href="/salaries/">
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
                            {urlLink.includes('wps') && <>
                                <span className="material-symbols-rounded form-icon-font-style">table</span>
                                <span className="form-name-font-style">WPS FORM</span>
                            </>}
                            {urlLink.includes('simplified') && <>
                                <span className="material-symbols-rounded form-icon-font-style">draft</span>
                                <span className="form-name-font-style">SIMPLIFIED FORM</span>
                            </>}
                            {urlLink.includes('ministries') && <>
                                <span className="material-symbols-rounded form-icon-font-style">domain</span>
                                <span className="form-name-font-style">NON WPS / MINISTRIES FORM</span>
                            </>}
                            
                            {urlLink.includes('support') && <>
                                <span className="material-symbols-rounded form-icon-font-style">support</span>
                                <span className="form-name-font-style">SUPPORT</span>
                            </>}    
                        </span> 

                    
                        {
                            windowSize.width < 900 ?
                            <span className="material-symbols-rounded" style={{cursor: "pointer"}} onClick={() => setShowMiniMenu(!showMiniMenu)}>menu</span>
                            :
                            <NavbarItems urlLink={urlLink} closeMiniMenu={() => setShowMiniMenu(false)}/>
                        }
                    
                    </Container>
                </Navbar>

                {
                    showMiniMenu && windowSize.width < 900 && <div className='mini-menu'>
                        <span className="material-symbols-rounded" 
                        style={{cursor: "pointer", position: "absolute", top: "10px", right: "10px"}} 
                        onClick={() => setShowMiniMenu(!showMiniMenu)}>close</span>

                        <NavbarItems urlLink={urlLink} closeMiniMenu={() => setShowMiniMenu(false)}/>
                    </div>
                }


                <div className="main-container-style">
                    {urlLink === '/salaries/wps/dashboard' && <Dashboard formType={"wps"} />}
                    {urlLink === '/salaries/wps/employer' && <WpsEmployer />}
                    {urlLink === '/salaries/wps/employees' && <WpsEmployees />}

                    {urlLink === '/salaries/simplified/dashboard' && <Dashboard formType={"simplified"} />}
                    {urlLink === '/salaries/simplified/employer' && <SimplifiedEmployer />}
                    {urlLink === '/salaries/simplified/employees' && <SimplifiedEmployees />}

                    {urlLink === '/salaries/ministries/dashboard' && <Dashboard formType={"ministries"} />}
                    {urlLink === '/salaries/ministries/employer' && <MinistriesEmployer />}
                    {urlLink === '/salaries/ministries/employees' && <MinistriesEmployees />}

                    {urlLink === '/salaries/support' && <ContactUs />}
                    {urlLink === '/salaries/support/how' && <HowTo />}
                    {urlLink === '/salaries/support/contact' && <ContactUs />}
                </div>
            </div>
}

export default MainContainer;