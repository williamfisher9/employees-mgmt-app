import { AiOutlineHome } from "react-icons/ai";
import { BsPerson } from "react-icons/bs";
import { GiSmartphone } from "react-icons/gi";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { MdDashboard } from "react-icons/md";
import { RiLightbulbFlashLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import useWindowSize from "../../hooks/useWindowSize";
import Cookies from "js-cookie";
import { PiSignOut } from "react-icons/pi";

const NavbarItems = ({urlLink, closeMiniMenu}) => {
    const windowSize = useWindowSize()
    const navigate = useNavigate()

    if(urlLink.startsWith('/salaries/detailed'))
        return <div className={`d-flex justify-content-center align-items-center gap-4 ${windowSize.width < 900 ? 'flex-column pt-5' : null}`}>
            <Link to="/salaries/detailed/dashboard" onClick={closeMiniMenu} className='text-decoration-none'>
                <div className='text-black text-center'>
                    <div><MdDashboard style={{ fontSize: "25px" }} /></div>
                    <div style={{ fontSize: "13px" }}>Overview</div>
                </div>
            </Link>

            <Link to="/salaries/detailed/employer" onClick={closeMiniMenu} className='text-decoration-none'>
                <div className='text-black text-center'>
                        <div><BsPerson style={{ fontSize: "25px" }} /></div>
                        <div style={{ fontSize: "13px" }}>Employer</div>
                    </div>
            </Link>

            <Link to="/salaries/detailed/employees" onClick={closeMiniMenu} className='text-decoration-none'>
                <div className='text-black text-center'>
                        <div><HiOutlineUserGroup style={{ fontSize: "25px" }} /></div>
                        <div style={{ fontSize: "13px" }}>Employees</div>
                    </div>
            </Link>

            <Link to="/salaries/home" onClick={closeMiniMenu} className='text-decoration-none'>
                <div className='text-black text-center'>
                        <div><AiOutlineHome style={{ fontSize: "25px" }} /></div>
                        <div style={{ fontSize: "13px" }}>Home</div>
                    </div>
            </Link>

            <div className='text-decoration-none' style={{cursor: 'pointer'}} onClick={() => {navigate("/salaries/login"); 
                        Cookies.remove('isAuthenticated'); 
                                Cookies.remove('userId');
                                Cookies.remove('token');
                                Cookies.remove('authorityId');
                                Cookies.remove('username');}}>
                        <div className='text-black text-center'>
                        <div><PiSignOut style={{ fontSize: "25px" }} /></div>
                        <div style={{ fontSize: "13px" }}>Sign Out</div>
                    </div>
                    </div>
    </div>




if(urlLink.startsWith('/salaries/simplified'))
    return <div className={`d-flex justify-content-center align-items-center gap-4 ${windowSize.width < 900 ? 'flex-column pt-5' : null}`}>
        <Link to="/salaries/simplified/dashboard" onClick={closeMiniMenu} className='text-decoration-none'>
            <div className='text-black text-center'>
                <div><MdDashboard style={{ fontSize: "25px" }} /></div>
                <div style={{ fontSize: "13px" }}>Overview</div>
            </div>
        </Link>

        <Link to="/salaries/simplified/employer" onClick={closeMiniMenu} className='text-decoration-none'>
            <div className='text-black text-center'>
                    <div><BsPerson style={{ fontSize: "25px" }} /></div>
                    <div style={{ fontSize: "13px" }}>Payer</div>
                </div>
        </Link>

        <Link to="/salaries/simplified/employees" onClick={closeMiniMenu} className='text-decoration-none'>
            <div className='text-black text-center'>
                    <div><HiOutlineUserGroup style={{ fontSize: "25px" }} /></div>
                    <div style={{ fontSize: "13px" }}>Beneficiaries</div>
                </div>
        </Link>

        <Link to="/salaries/home" onClick={closeMiniMenu} className='text-decoration-none'>
            <div className='text-black text-center'>
                    <div><AiOutlineHome style={{ fontSize: "25px" }} /></div>
                    <div style={{ fontSize: "13px" }}>Home</div>
                </div>
        </Link>

        <div className='text-decoration-none' style={{cursor: 'pointer'}} onClick={() => {navigate("/salaries/login"); 
                        Cookies.remove('isAuthenticated'); 
                                Cookies.remove('userId');
                                Cookies.remove('token');
                                Cookies.remove('authorityId');
                                Cookies.remove('username');}}>
                        <div className='text-black text-center'>
                        <div><PiSignOut style={{ fontSize: "25px" }} /></div>
                        <div style={{ fontSize: "13px" }}>Sign Out</div>
                    </div>
                    </div>
</div>



if(urlLink.startsWith('/salaries/deductions'))
    return <div className={`d-flex justify-content-center align-items-center gap-4 ${windowSize.width < 900 ? 'flex-column pt-5' : null}`}>
        <Link to="/salaries/deductions/dashboard" onClick={closeMiniMenu} className='text-decoration-none'>
            <div className='text-black text-center'>
                <div><MdDashboard style={{ fontSize: "25px" }} /></div>
                <div style={{ fontSize: "13px" }}>Overview</div>
            </div>
        </Link>

        <Link to="/salaries/deductions/employer" onClick={closeMiniMenu} className='text-decoration-none'>
            <div className='text-black text-center'>
                    <div><BsPerson style={{ fontSize: "25px" }} /></div>
                    <div style={{ fontSize: "13px" }}>Employer</div>
                </div>
        </Link>

        <Link to="/salaries/deductions/employees" onClick={closeMiniMenu} className='text-decoration-none'>
            <div className='text-black text-center'>
                    <div><HiOutlineUserGroup style={{ fontSize: "25px" }} /></div>
                    <div style={{ fontSize: "13px" }}>Employees</div>
                </div>
        </Link>

        <Link to="/salaries/home" onClick={closeMiniMenu} className='text-decoration-none'>
            <div className='text-black text-center'>
                    <div><AiOutlineHome style={{ fontSize: "25px" }} /></div>
                    <div style={{ fontSize: "13px" }}>Home</div>
                </div>
        </Link>

        <div className='text-decoration-none' style={{cursor: 'pointer'}} onClick={() => {navigate("/salaries/login"); 
                        Cookies.remove('isAuthenticated'); 
                                Cookies.remove('userId');
                                Cookies.remove('token');
                                Cookies.remove('authorityId');
                                Cookies.remove('username');}}>
                        <div className='text-black text-center'>
                        <div><PiSignOut style={{ fontSize: "25px" }} /></div>
                        <div style={{ fontSize: "13px" }}>Sign Out</div>
                    </div>
                    </div>
</div>





if(urlLink.startsWith('/salaries/support'))
    return <div className={`d-flex justify-content-center align-items-center gap-4 ${windowSize.width < 900 ? 'flex-column pt-5' : null}`}>
        <Link to="/salaries/support/contact" onClick={closeMiniMenu} className='text-decoration-none'>
            <div className='text-black text-center'>
                    <div><GiSmartphone style={{ fontSize: "25px" }} /></div>
                    <div style={{ fontSize: "13px" }}>Contact Us</div>
                </div>
        </Link>
        
        <Link to="/salaries/support/how" onClick={closeMiniMenu} className='text-decoration-none'>
            <div className='text-black text-center'>
                <div><RiLightbulbFlashLine style={{ fontSize: "25px" }} /></div>
                <div style={{ fontSize: "13px" }}>How To</div>
            </div>
        </Link>

        <Link to="/salaries/home" onClick={closeMiniMenu} className='text-decoration-none'>
            <div className='text-black text-center'>
                    <div><AiOutlineHome style={{ fontSize: "25px" }} /></div>
                    <div style={{ fontSize: "13px" }}>Home</div>
                </div>
        </Link>

        <div className='text-decoration-none' style={{cursor: 'pointer'}} onClick={() => {navigate("/salaries/login"); 
                        Cookies.remove('isAuthenticated'); 
                                Cookies.remove('userId');
                                Cookies.remove('token');
                                Cookies.remove('authorityId');
                                Cookies.remove('username');}}>
                        <div className='text-black text-center'>
                        <div><PiSignOut style={{ fontSize: "25px" }} /></div>
                        <div style={{ fontSize: "13px" }}>Sign Out</div>
                    </div>
                    </div>
</div>







if(urlLink.startsWith('/salaries/home'))
    return <div className={`d-flex justify-content-center align-items-center gap-4 ${windowSize.width < 900 ? 'flex-column pt-5' : null}`}>
        <div className='text-decoration-none' style={{cursor: 'pointer'}} onClick={() => {navigate("/salaries/login"); 
                        Cookies.remove('isAuthenticated'); 
                                Cookies.remove('userId');
                                Cookies.remove('token');
                                Cookies.remove('authorityId');
                                Cookies.remove('username');}}>
                        <div className='text-black text-center'>
                        <div><PiSignOut style={{ fontSize: "25px" }} /></div>
                        <div style={{ fontSize: "13px" }}>Sign Out</div>
                    </div>
                    </div>
</div>
}

export default NavbarItems;