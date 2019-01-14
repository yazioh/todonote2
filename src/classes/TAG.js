/**
 * ステータス判定用
 */
const STATUS_OK = 'o'
const STATUS_DELETE = 'x'

/**
 * TAG Project や MileStone として期限設定やグルーピングに使う
 *  
 */
 
export default class TAG {
    constructor (json = {}){
        this.id = json.id || this.newID()
        this.title = json.title || 'any tag'
        this.expire = json.expire || ''
        this.status = json.status || STATUS_OK

        this.regdt = json.regdt || new Date()
        this.updt = json.updt || new Date()
    }
}