// 首先连接mysql数据库

//封装一个query方法 方便我们进行sql语句的执行
import mysql from 'mysql'
import { db, dbName } from '../config'
import fs from 'fs'
import path from 'path'
// 需要创建一个数据库 并且能够将sql文件夹下的sql文件执行
const sqlContent = fs.readFileSync(path.resolve(__dirname,'..','./sql/vue_blog.sql'),'utf-8')
// 第一次连接数据库的时候 没有指定数据库名称 这次连接的目的是为了能够创建一个vue_blog数据库
// 并且将数据库文件执行 执行完毕后vue_blog数据库就有对应的表
const init = mysql.createConnection(db)
init.connect()
// 判断如果数据库存在 则不需要再执行下面的代码
let pool
init.query('CREATE DATABASE vue_blog',err=>{
    Object.assign(db,dbName)
    pool = mysql.createPool(db)
    if(err){
        console.log("数据库已存在")
    }else{
        query(sqlContent).then(res=>{
            console.log('数据库创建成功')
        }).catch(err=>{
            console.log(err)
        })
    }
})
init.end()

export default function query(sql,values){
    return new Promise((resolve,reject)=>{
        pool.getConnection(function(err,connection){
            if(err){
               reject(err);
            }else{
                connection.query(sql,values,(err,data)=>{
                    if(err){
                        reject(err);
                    }else{
                        resolve(data);
                    }
                    connection.release()
                })
            }
        })
    })
}