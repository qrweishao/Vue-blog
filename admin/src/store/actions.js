// 封装的请求request
import request from '@/utils/request'
// actions里面的代码和mutations里面的代码主要区别在于 actions里面乐意写异步代码 而mutations只能写同步代码 所以 我们会把业务代码放到actions里面
const actions = {
    async saveArticle({commit,state},{id,title,tags,content,isPublished}){
        request({
            method:'post',
            url:`/articles/update/${id}`,
            data:{
                title,
                tags,
                content,
                isPublished
            }
        }).then(res=>{
            console.log(res)
        }).catch(err=>{
            console.log(err)
        })
        commit('SET_CURRENT_ARTICLE',{id,title,tags,content,isPublished})
    }
}
export default actions