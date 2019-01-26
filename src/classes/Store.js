// とりあえず、DB代わり。
// localStorage へ保存を代行
/**
 * Store
 * localStorageのキーと 1:1 で接続して R/W する
 * 運用上は、もう一個上でデータ管理する
 */
const TODAY = new Date();

export default class Store {
    constructor(StoreName){
        if(!window.localStorage){
            throw new Error("local storage Access Error")
        }
        this.LS = window.localStorage
        this.name = StoreName 
        this.list = []
        this.serial = 1
    }

    save(){
        this.LS.setItem(this.name, JSON.stringify({
            sreial: this.serial,
            list: this.list
        }));
    }
    
    load(){ 
        console.log(this.LS.getItem(this.name))
        let lsVar=  JSON.parse(this.LS.getItem(this.name) || "{}");
        this.serial = lsVar.serial || 1
        this.list = lsVar.list || []
    }

    get(filterFunc){
        if(!filterFunc){
            return this.list
        }
        return this.list.filter(filterFunc)
    }
}
