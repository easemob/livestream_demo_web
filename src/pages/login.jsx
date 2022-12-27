import React, {useState, useEffect} from "react";
import i18next from "i18next";
import './login.css'
import closeIcon from '../assets/images/close.png'
import loading from '../assets/images/union.png'
import { message } from "../componments/common/alert";
import axios from 'axios'
import { openIM } from '../api/layout'
import { getToken } from "../api/login";
import { useNavigate } from "react-router-dom";
const domain = window.location.protocol+'//a1.easemob.com';
let timer;
let times = 60;
const Login = () => {
    const [notice, setNotice] = useState({
        show: false,
        text: ''
    })
    const navigate = useNavigate();
    const [values, setValues] = useState({
        phoneNumber: '',
        code: '',
    });
    const [disabled, setdisabled] = useState(true)
    const [loginBtn, setLoginBtn] = useState(i18next.t('Login'))
    let [smsBtnText, setSmsBtnText] = useState(i18next.t('Get Code'))
    

    const handleChange = (prop) => (event) => {
        let value = event.target.value
        value = event.target.value.replace(/\D/, '')
        if (prop === 'phoneNumber' && event.target.value.length > 11) {
            value = value.substr(0, 11)
        }
        if (prop === 'code' && event.target.value.length > 6) {
            value = value.substr(0, 6)
        }

        setValues({ ...values, [prop]: value });
    };

    const handleLogin = () => {
        getToken(values.phoneNumber, values.code).then((res) => {
	        if(res){
                navigate('/main')
            }
        })
    }

    const handleClickClear = () => {
        setValues({
            ...values,
            phoneNumber: ''
        })
    }

    const getCode = () => {
        if(!values.phoneNumber){
            return message.error('请输入正确的手机号')
        }
        axios.post(domain+`/inside/app/sms/send/${values.phoneNumber}`, {
            phoneNumber: values.phoneNumber
        })
        .then((response) => {
            message.success('短信已发送')
            countDown()
        })
        .catch(function (error) {
            console.log('error', error.response);
            if(error.response.status == '400'){
                if(error.response.data?.errorInfo == 'phone number illegal'){
                    message.error('请输入正确的手机号！')
                }else if(error.response.data?.errorInfo == 'Please wait a moment while trying to send.'){
                    message.error('你的操作过于频繁，请稍后再试！')
                }else if(error.response.data?.errorInfo.includes('exceed the limit')){
                    message.error('获取已达上限！')
                }else{
                    message.error(error.response.data?.errorInfo)
                }
            }
        });
    }

    const countDown = () => {
        timer && clearTimeout(timer)
        timer = setTimeout(() => {
            setSmsBtnText(times--)
            if (times === 0) {
                times = 60
                setSmsBtnText(i18next.t('Get Code'))
                return clearTimeout(timer)
            }
            countDown()
        }, 1000)
    }

    useEffect(() => {
        if (values.phoneNumber && values.code) {
            setdisabled(false)
        } else {
            setdisabled(true)
        }
    }, [values.phoneNumber , values.code])

    return(
    <div className='login-container'>
    <div className='login-form'>
        <div className='login-form-icon'></div>
        <div className='login-form-AC'>
            {i18next.t('Login Easemob Live Stream')}
        </div>
        {notice.show ? <div className='login-form-notice'>
            {notice.text}
        </div> : null}
        <div className='input-box'>
            <input className='login-form-input' 
                placeholder={i18next.t('Mobile Number')} 
                onChange={handleChange('phoneNumber')}
                value={values.phoneNumber}></input>
            {
                values.phoneNumber &&
                <img
                    src={closeIcon}
                    alt="close"
                    onClick={handleClickClear}
                    className='close-btn' />
            }
        </div>
        <div className='input-box'>
            <input type="text" className='login-form-input' placeholder={i18next.t('Verification Code')} value={values.code} onChange={handleChange('code')}></input>
            <span className="verify-code" onClick={getCode}>{smsBtnText}</span>
        </div>

        <div className='loading-box'>
            <input disabled={disabled} type='button' className='login-form-input button' value={loginBtn} onClick={handleLogin} ></input>
            {
                !loginBtn && <img className='loading-img' src={loading} alt="" />
            }
        </div>
    </div>
    <div className='login-copyright'>
        Copyright © easemob 2022
    </div>
</div>)
}

export default Login