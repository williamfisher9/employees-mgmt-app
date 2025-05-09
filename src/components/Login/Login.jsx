import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Login.css'
import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

import logoImg from '../../assets/logo.png'
import { BACKEND_URL } from '../../constants/constants';
import { Button } from 'react-bootstrap';

const Login = () => {
    const navigate = useNavigate();
    const [formFields, setFormFields] = useState({emailAddress: "", password: ""})
    const [formFieldsErrors, setFormFieldsErrors] = useState({emailAddress: "", password: ""})
    const [loginRequestError, setLoginRequestError] = useState("");

    const [loading, setLoading] = useState(false);

    const {state} = useLocation();

    const handleFieldChange = () => {
        setFormFields({...formFields, [event.target.name]: event.target.value})
    }
    
    const handleLoginRequest = () => {
        event.preventDefault();
        let hasErrors = false;
        let newErrors = {};

        if(formFields.emailAddress.trim() == ""){
            newErrors["emailAddress"] = "Email address is required"
            hasErrors=true;
        }

        if(formFields.password.trim() == ""){
            newErrors["password"] = "Password field is required"
            hasErrors=true;
        }

        setFormFieldsErrors(newErrors);


        if(!hasErrors){
            setLoading(true)
            axios.post(`${BACKEND_URL}/public/auth/login`, {"username": formFields.emailAddress, "password": formFields.password})
            .then((res) => {
                setLoading(false)
                if(res.status == 200){
                    Cookies.set("token", res.data.message.token);
                    Cookies.set("username", res.data.message.username);
                    Cookies.set("userId", res.data.message.userId);
                    Cookies.set("isAuthenticated", JSON.stringify(res.data.message.isAuthenticated));
                    setLoginRequestError("")
                    navigate(`/salaries/home`)
                }
                
            })
            .catch((err) => {
                setLoading(false)
                console.log(err)
                setLoginRequestError(err.response.data.message)
            })
        }

    }

    const [passwordFieldType, setPasswordFieldType] = useState("password")
    const [passwordFieldVisibilityIcon, setPasswordFieldVisibilityIcon] = useState("visibility");

    const handleShowPassword = () => {
        if(passwordFieldType == "password"){
            setPasswordFieldType("text")
            setPasswordFieldVisibilityIcon("visibility_off")
        } else {
            setPasswordFieldType("password")
            setPasswordFieldVisibilityIcon("visibility")
        }
    }

    return <div className='outer-container'>
        <form className='form-container' onSubmit={handleLoginRequest}>
            <img src={logoImg} alt='logo' style={{height: "75px"}} />

            <p className="form-name-font-style store-name">WILLIAM FISHER BOOKSTORE</p>

            <div className='inner-form-container'>
            {
            state?.message && 
            <p className='form-message'>{state?.message}</p>
            }

            <div className='form-field-group'>
                <input type='text' placeholder='Email Address' className='text-field' name='emailAddress' onChange={handleFieldChange}/>
                <span className="material-symbols-rounded form-field-icon">person</span>
                <p className='form-field-error'>{formFieldsErrors.emailAddress}</p>
            </div>

            <div className='form-field-group'>
                <input type={passwordFieldType} placeholder='Password' className='text-field' name='password' onChange={handleFieldChange} autoComplete='off'/>
                <span className="material-symbols-rounded form-field-icon">password</span>
                <span className="material-symbols-rounded show-password-icon" onClick={handleShowPassword}>{passwordFieldVisibilityIcon}</span>
                <p className='form-field-error'>{formFieldsErrors.password}</p>
            </div>

            <input type='submit' value="Sign In" className='rounded-0 text-white px-4 py-2' style={{backgroundColor: "teal", border: "none", outline: "none"}}/>

            
            {
                loginRequestError != "" ?
                <p style={{color: "red"}}>{loginRequestError}</p> :
                null
            }

            </div>


        </form>
    </div>
}

export default Login;