// とりあえず、DB代わり。
// localStorage へ保存を代行
/**
 * Store
 * localStorageのキーと 1:1 で接続して R/W する
 *
 */
export default class Store {
  constructor (storeName) {
    if (!window.localStorage) {
      throw new Error('local storage Access Error')
    }
    this.LS = window.localStorage
    this.name = storeName
    this.vars = {}
  }

  save (vars) {
    this.vars = vars
    this.LS.setItem(this.name, JSON.stringify(vars))
    this.LS.removeItem('undefined')
  }

  load () {
    this.vars = JSON.parse(this.LS.getItem(this.name) || '{}')
  }

  get () {
    return this.vars
  }
}
