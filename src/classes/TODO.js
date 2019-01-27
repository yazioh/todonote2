// 依存関係
import Task from './Task.js'

/**
 * ステータス判定用
 */
const STATUS_OK = 'o'
const STATUS_DELETE = 'x'

/**
 * TODO やることヘッダー
 */
export default class Todo {
  constructor (json = {}) {
    this.id = json.id || ''
    this.title = json.title || 'any to do'
    this.area = json.area || 'a4'
    this.unitTime = json.unitTime || 15
    this.schedule = json.schedule || ''
    this.remarks = json.remarks || ''
    this.status = json.status || STATUS_OK
    this.regdt = json.regdt || new Date()
    this.updt = json.updt || new Date()
    this.tasks = json.tasks || [new Task({
      TodoID: this.id,
      label: 'some work'
    })]
    this.tags = json.tags || []
  }

  // saveする際 重複部分はいらないので削る
  toJson () {
    return {
      id: this.id || '',
      title: this.title || '',
      area: this.area || '',
      unitTime: this.unitTime || '',
      schedule: this.schedule || '',
      remarks: this.remarks || '',
      status: this.status || '',
      regdt: this.regdt || '',
      updt: this.updt || ''
    }
  }

  setId (serial, today) {
    this.id = 'D' + serial
    //  ('' + today.getFullYear()).substr(-2) +
    //  ('00' + (1 + today.getMonth())).substr(-2) +
    //  ('00' + today.getDate()).substr(-2)
    this.refreshId(this.id)
    return this.id
  }

  setTasks (ary) {
    this.tasks = ary || []
  }

  setTags (ary) {
    this.tags = ary || []
  }

  refreshId (newId) {
    if (this.tasks.length) {
      this.tasks.forEach((Task) => {
        Task.todoId = newId
      })
    }
    if (this.tags.length) {
      this.tags.forEach((TagRef) => {
        TagRef.todoId = newId
      })
    }
  }

  isDelete () {
    return (this.status === STATUS_DELETE)
  }

  isGoing () {
    // console.log('sum', this.sumWorkTimeYet(), this.sumWorkTimeTotal())
    return (this.status !== STATUS_DELETE)
  }

  sumWorkTimeTotal () {
    let TASKs = this.getLiveTask()
    return TASKs.length * this.unitTime // min
  }

  sumWorkTimeYet () {
    let TASKs = this.getGoingTask()
    return TASKs.length * this.unitTime // min
  }

  validTasks () {
    if (!this.tasks || !this.tasks.filter) {
      return []
    }
    return this.tasks
  }

  // TODO Queryに移せるんじゃ？
  // 削除抜き
  getLiveTask () {
    return this.validTasks().filter((task) => {
      return !task.isDelete()
    })
  }
  // 未チェック
  getGoingTask () {
    return this.validTasks().filter((task) => {
      return !task.isGoing()
    })
  }


  sumWorkYet () {

  }

}
