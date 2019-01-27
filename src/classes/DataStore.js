
// とりあえず、DB代わり。
// localStorage へ保存を代行
/**
 * Store
 * localStorageのキーと 1:1 で接続して R/W する
 *
 */
import Store from './Store.js'

/**
 * ステータス判定(デフフォルト)用
 */
// const STATUS_OK = 'o'
const STATUS_DELETE = 'x'

export default class DataStore extends Store {
  constructor (storeName, ItemClass) {
    super(storeName)
    // data list 扱う --------------------
    this.list = []
    this.serial = 1
    this.ItemClass = ItemClass
  }

  save () {
    let saveList = this.list.map((Item) => {
      return Item.toJson()
    })
    super.save({
      sreial: this.serial,
      list: saveList
    })
  }

  load () {
    let lsVar = JSON.parse(this.LS.getItem(this.name) || '{}')
    this.serial = lsVar.serial || 1
    let list = lsVar.list || []
    this.list = list.map((param) => {
      return new this.ItemClass(param)
    })
    return this.get()
  }

  clearAll () {
    this.list = []
    this.serial = 1
    this.save()
  }

  get (filterFunc) {
    if (!filterFunc) {
      return this.list
    }
    return this.list.filter(filterFunc)
  }

  getById (id) {
    return this.list.find((Item) =>{ return Item.id === id })
  }

  getNextId () {
    return this.serial++
  }

  add (param) {
    let addItem = new this.ItemClass((!param.toJson) ? param : param.toJson())
    if (!param.id) {
      addItem.setId(this.getNextId(), new Date())
    }
    addItem.regdt = new Date()
    addItem.updt = new Date()
    this.list.push(addItem)
    this.save()
    // ついでに返す
    return addItem
  }

  update (upItem) {
    let theItem = this.list.find((Item) => { return (Item.id === upItem.id) })
    if (!theItem) {
      console.log('not found update id', upItem)
      return
    }
    Object.assign(theItem, upItem)
    theItem.updt = new Date()
    this.save()
  }

  // 論理削除（物理削除はあとで）
  delete (deleteID) {
    let theItem = this.list.find((Item) => { return (Item.id === deleteID) })
    if (theItem.delete) {
      theItem.delete()
    } else {
      theItem.status = STATUS_DELETE
    }
    this.save()
  }
}
