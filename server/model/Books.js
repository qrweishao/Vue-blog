import query from '../utils/query'
import escape from '../utils/escape'

class Books {
    async getAllBooks(){
        return await query('SELECT * FROM RD_LIST')
    }
}
export default new Books()