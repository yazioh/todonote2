// 依存関係
import Store from './Store.js'
import Tag from './Tag.js'

/**
 * ステータス判定用
 */
const STATUS_OK = 'o'
const STATUS_DELETE = 'x'

class Tags {
  constructor (key) {
    this.storeName = key || 'TAGs'
    this.Store = new Store(this.storeName)
    this.tagList = this.Store.load()
    if (!this.tagList.count) {
      this.tagList = []
      this.Store.save(this.tagList)
    }
  }

  all () {
    return this.tagList
  }

  tetByTodoId (todoID) {
    return this.tagList.filter(Tag => {
      return (Tag.todoId === todoId && Tag.isActive())
    })
  }

  tetByName (name) {
    // あれ？できなくね？ｗ
  }
}

/**
 * TAG Project や MileStone として期限設定やグルーピングに使う
 *
 */
export default class TagRef {
  constructor (json = {}) {
    this.todoId = json.todoId || ''
    this.tagId = json.tagId || ''
    this.status = json.status || STATUS_OK
  }

  isActive () {

  }
}
