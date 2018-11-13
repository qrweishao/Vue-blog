import {getToken,setToken,removeToken} from '@/utils/auth'
const state = {
    // 全局变量和属性
    token:getToken(),
    username:''
}
export default state