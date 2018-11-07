const mutations = {
    // 全局的变量方法
    SET_TOKEN:(state,token)=>{
        state.token = token
    },
    SET_USERNAME:(state,username)=>{
        state.username = username
    }
}
export default mutations