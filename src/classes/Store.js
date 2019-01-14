// DB
export default class Store {
    constructor(StoreName){
        if(!window.localStorage){
            throw new Error("local storage Access Error")
        }
        this.LS = window.localStorage
        this.name = StoreName 
    }

    save(val){
        if(!val){
            this.LS.removeItem(this.name)
        }else{
            this.LS.setItem(this.name, JSON.stringify(val));
        }
    }
    
    load(){ 
        console.log(this.LS.getItem(this.name))
        return JSON.parse(this.LS.getItem(this.name) || "{}");
    }
}
