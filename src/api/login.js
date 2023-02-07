import axios from 'axios'
import store from '../redux/store'
import { message } from "../componments/common/alert";
import WebIM from '../utils/WebIM'
const domain = window.location.protocol + '//a1.easemob.com';
export const getToken = (phoneNumber, smsCode) => {
    return axios.post(domain + '/inside/app/user/login/V2?appkey=easemob-demo%23chatdemoui', {
        phoneNumber: phoneNumber,
        smsCode: smsCode
    })
        .then(function (response) {
            console.log(response);
            const { token, chatUserName } = response.data
            message.success('登录成功')
            loginByToken(chatUserName, token)
            return true
        })
        .catch(function (error) {
            switch (error.response.data.errorInfo) {
                case "UserId password error.":
                    message.error('用户名或密码错误！')
                    break;
                case `UserId ${phoneNumber} does not exist.`:
                    message.error('登录用户不存在')
                    break;
                case 'phone number illegal':
                    message.error('请输入正确的手机号')
                    break;
                case 'SMS verification code error.':
                    message.error('验证码错误')
                    break;
                case 'Sms code cannot be empty':
                    message.error('验证码不能为空')
                    break;
                case 'Please send SMS to get mobile phone verification code.':
                    message.error('请使用短信验证码登录')
                    break;
                default:
                    message.error('登录失败，请重试！')
                    break;
            }
            return false
        });
}

export const loginByToken = (username, token) => {
    WebIM.conn.open({
        user: username.trim().toLowerCase(),
        accessToken: token,
    })
    sessionStorage.setItem('webim_auth', JSON.stringify({ user: username, pwd: '', accessToken: token }))
}