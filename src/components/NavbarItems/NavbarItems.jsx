import { AiOutlineHome } from "react-icons/ai";
import { BsPerson } from "react-icons/bs";
import { GiSmartphone } from "react-icons/gi";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { MdDashboard } from "react-icons/md";
import { RiLightbulbFlashLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import useWindowSize from "../../hooks/useWindowSize";

const NavbarItems = ({urlLink, closeMiniMenu}) => {
    const windowSize = useWindowSize()

    if(urlLink.includes('wps'))
        return <div className={`d-flex justify-content-center align-items-center gap-4 ${windowSize.width < 900 ? 'flex-column pt-5' : null}`}>
            <Link to="/salaries/wps/dashboard" onClick={closeMiniMenu} className='text-decoration-none'>
                <div className='text-black text-center'>
                    <div><MdDashboard style={{ fontSize: "25px" }} /></div>
                    <div style={{ fontSize: "13px" }}>Overview</div>
                </div>
            </Link>

            <Link to="/salaries/wps/employer" onClick={closeMiniMenu} className='text-decoration-none'>
                <div className='text-black text-center'>
                        <div><BsPerson style={{ fontSize: "25px" }} /></div>
                        <div style={{ fontSize: "13px" }}>Employer</div>
                    </div>
            </Link>

            <Link to="/salaries/wps/employees" onClick={closeMiniMenu} className='text-decoration-none'>
                <div className='text-black text-center'>
                        <div><HiOutlineUserGroup style={{ fontSize: "25px" }} /></div>
                        <div style={{ fontSize: "13px" }}>Employees</div>
                    </div>
            </Link>

            <Link to="/salaries/" onClick={closeMiniMenu} className='text-decoration-none'>
                <div className='text-black text-center'>
                        <div><AiOutlineHome style={{ fontSize: "25px" }} /></div>
                        <div style={{ fontSize: "13px" }}>Home</div>
                    </div>
            </Link>
    </div>




if(urlLink.includes('simplified'))
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

        <Link to="/salaries/" onClick={closeMiniMenu} className='text-decoration-none'>
            <div className='text-black text-center'>
                    <div><AiOutlineHome style={{ fontSize: "25px" }} /></div>
                    <div style={{ fontSize: "13px" }}>Home</div>
                </div>
        </Link>
</div>



if(urlLink.includes('ministries'))
    return <div className={`d-flex justify-content-center align-items-center gap-4 ${windowSize.width < 900 ? 'flex-column pt-5' : null}`}>
        <Link to="/salaries/ministries/dashboard" onClick={closeMiniMenu} className='text-decoration-none'>
            <div className='text-black text-center'>
                <div><MdDashboard style={{ fontSize: "25px" }} /></div>
                <div style={{ fontSize: "13px" }}>Overview</div>
            </div>
        </Link>

        <Link to="/salaries/ministries/employer" onClick={closeMiniMenu} className='text-decoration-none'>
            <div className='text-black text-center'>
                    <div><BsPerson style={{ fontSize: "25px" }} /></div>
                    <div style={{ fontSize: "13px" }}>Employer</div>
                </div>
        </Link>

        <Link to="/salaries/ministries/employees" onClick={closeMiniMenu} className='text-decoration-none'>
            <div className='text-black text-center'>
                    <div><HiOutlineUserGroup style={{ fontSize: "25px" }} /></div>
                    <div style={{ fontSize: "13px" }}>Employees</div>
                </div>
        </Link>

        <Link to="/salaries/" onClick={closeMiniMenu} className='text-decoration-none'>
            <div className='text-black text-center'>
                    <div><AiOutlineHome style={{ fontSize: "25px" }} /></div>
                    <div style={{ fontSize: "13px" }}>Home</div>
                </div>
        </Link>
</div>





if(urlLink.includes('support'))
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

        <Link to="/salaries/" onClick={closeMiniMenu} className='text-decoration-none'>
            <div className='text-black text-center'>
                    <div><AiOutlineHome style={{ fontSize: "25px" }} /></div>
                    <div style={{ fontSize: "13px" }}>Home</div>
                </div>
        </Link>
</div>
}

export default NavbarItems;