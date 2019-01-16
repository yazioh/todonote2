/**
 * ステータス判定用
 */
const STATUS_OK = 'o'
const STATUS_DELETE = 'x'

/**
 * TAG Project や MileStone として期限設定やグルーピングに使う
 *  
 */
 export default class TagRef {
    constructor (json = {}){
        this.todoID = json.todoID || ''
        this.tagID = json.tagID || ''
        this.status = json.status || STATUS_OK
    }
}