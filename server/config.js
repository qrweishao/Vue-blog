export const db = {
    host:"127.0.0.1",
    port:'3306',
    user:'root',
    password:'123456',
    multipleStatements:true //必须加上这句话 不然无法加载多条sql语句
}
export const dbName = {
    database:'vue_blog'
}

export const base_API = '/api'

export const secret = 'vue_blog'
