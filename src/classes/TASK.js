/**
 * ステータス判定用
 */
const STATUS_YET = '_'
const STATUS_DONE = 'v'
const STATUS_DELETE = 'x'

/**
 * ブレイクダウンされたタスク
 */
export default class Task {

  constructor (json = {}) {
    this.id = json.id || ''
    this.todoId = json.todoId || ''
    this.label = json.label || 'any task'
    this.status = json.status || STATUS_YET
    this.regdt = json.regdt || new Date()
    this.updt = json.updt || new Date()    
  }

  toJson () {
    return {
      id    : this.id     || '',
      todoId: this.todoId || '',
      label : this.label  || '',
      status: this.status || '',
      regdt : this.regdt  || '',
      updt  : this.updt   || '', 
    }
  }
  setId (serial, today) {
    this.id = 'K' + serial
    //  ('' + today.getFullYear()).substr(-2) +
    //  ('00' + (1 + today.getMonth())).substr(-2) +
    //  ('00' + today.getDate()).substr(-2)
    return this.id
  }

  isDelete () {
    return (this.status === STATUS_DELETE)
  }
  isGoing () {
    return (this.status !== STATUS_DELETE)
  }
  isChecked () {
    return (this.status === STATUS_DONE)
  }

  checkd (flg) {
    this.status = (!flg || (flg === STATUS_YET)) ? STATUS_YET : STATUS_DONE
    return this.status
  }
}