import Router from 'koa-router'
import { base_API } from '../config'
import checkToken from '../utils/checkToken'
// 引入登录注册的控制器
import UserController from '../Controller/UserController'
const router = new Router()
router.get('/',async ctx=>{
    ctx.body = '欢迎使用vue-blog接口测试服务器'
})

// 所有的路由都写在这里
// 前端所有的请求过来的时候都是http://localhost:3000/api/...
router.prefix(`${base_API}`)

// 登录
router.post('/login',UserController.login)
// 登出
// 只要是登陆后才能看到的内容都需要验证一下token的合法性
router.get('/logout',checkToken,UserController.logout)

export default router