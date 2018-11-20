import Books from '../model/Books'

class BooksController {
    async getBooksList(ctx){
        ctx.body = await Books.getAllBooks()
    }
}
export default new BooksController()