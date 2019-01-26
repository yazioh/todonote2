<script>
/**
 * Appの data 操作に関するロジックを分離した
 * 
 * 
 */

// DATA
import Todo from '../../classes/Todo.js'
import Task from '../../classes/Task.js'
import Tag from '../../classes/Tag.js'

// DBはlocalStorage
import Store from '../../classes/Store.js'
// LocalStorage の キー
const DbConf = new Store('CONFIG')
const DbTodos = new Store('TODO')
const DbTasks = new Store('TASK')
const DbTags = new Store('TAG')
const DbTagRefs = new Store('TAG_REF')
let CONFs = {}




export default {
    template: `<!-- no template -->`,
    data: function(){
        return {
            dataConfig:{
                week_max_min: 5 * 8 * 60 // min 
            },
            TODOs : {},
            TASKs : {},
            TAGs : {},
            TAGREFs:{},
            // ----------
            TodoId : '',
            TaskId : '',
            TagId : '',
        }
    },
    //----------------------------
    // mixin されてもよいアクセサ  
    // 他のモジュールからは Read Only にしたい
    computed:{
        confOriginWeekDay:function(){
            // read only
            return CONFs.originWeekday
        },
    },
    //----------------------------
    methods: {
        confSave:function(){
            DbConf.save(CONFs)
        },

        confLoad:function(){
            let load  = DbConf.load()
            CONFs.lastView = load.lastView || 'main'
            CONFs.lastTodoID = load.lastTodoID || 1000
            CONFs.lastTaskID = load.lastTaskID || 1000
            CONFs.lassTagID = load.lassTagID || 1000
            CONFs.originWeekday = 1 // 月曜日にしたい
            // 更新を記録
            this.confSave()
        },

        dataSave:function(){
            DbTasks.save(this.TASKs.map((task) => {
                return task.toJson()
            }))
            DbTodos.save(this.TODOs.map((task) => {
                return task.toJson()
            }))
            DbTags.save(this.TAGs)
            DbTags.save(this.TAGREFs)
        },

        dataLoad:function(){
            let tasks = []// DbTasks.load()
            this.TASKs =(tasks.length) ? tasks : [
                this._task("なんかかか","v", 1),
                this._task("なんかかか","_", 1),
                this._task("なんかかか","_", 1),
                this._task("なんかかか","_", 2),
                this._task("なんかかか","_", 3),
                this._task("なんかかか","_", 4),
                this._task("なんかかか","_", 5),
                this._task("なんかかか","_", 6),
            ]

            let todos = []//DbTodos.load()
            this.TODOs = (todos.length) ? todos : [
                this._todo("hoge",'a1' ),
                this._todo("hoge2",'a1'),
                this._todo("hoge3",'a1'),
                this._todo("hoge4",'a1'),
                this._todo("hoge5",'a2'),
                this._todo("hoge6",'a2'),
                this._todo("hoge7",'a1'),
                this._todo("hoge8",'a2'),
                this._todo("hoge9",'a2'),
                this._todo("hoge10",'a2'),
                this._todo("hoge11",'a2'),
                this._todo("hoge12",'a3'),
                this._todo("hoge13",'a4'),
                this._todo("hoge14",'a4'),
                this._todo("hoge15",'a3'),
                this._todo("hoge16",'a4'),
                this._todo("hoge17",'a4'),
                this._todo("hoge18",'a4'),
                this._todo("hoge19",'a4'),
                this._todo("hoge20",'a3'),
            ]

            let tags = DbTags.load()
            this.TAGs = (tags.length) ? tags : []

            console.log(this.TODOs)
            this.dataSave()
        },

        dataNewTodo(){
            return new Todo({
                id: this._dataNextTodoID()
            })
        },

        dataUpdateEdit: function( json ){
            console.log(json)
            let theTodo = this.TODOs.find((todo)=>{
                 return (todo.id === json.id)
            })
            if(!theTodo){
                this.TODOs.push(json)
            }else{
                theTodo = Object.assign(theTodo, json)
            }
            this.dataSave()
        },

        _dataNextTaskID: function(){
            CONFs.lastTaskID ++
            this.confSave()
            return 'K'+CONFs.lastTaskID
        },

        _dataNextTodoID: function(){
            CONFs.lastTodoID ++
            this.confSave()
            return 'D'+CONFs.lastTodoID
        },

        _dataNextTagID: function(){
            CONFs.lassTagID ++
            this.confSave()
            return 'G'+ CONFs.lassTagID 
        },

        _task: function (label, stat, no){
            let fakeID = 'D'+(CONFs.lastTodoID + no) 
            return new Task({
                id: this._dataNextTaskID(),
                TodoID: fakeID ,
                label: label || '(no label)',
                status: stat || '_'
            })
        },
        
        _todo: function(title, area ){
            let todoId = this._dataNextTodoID()        
            return new Todo({
                "id": todoId,
                "title": title,
                "area" : area,
                "unitTime": 15,
                "schedule": '20190102',
                'remarks':'あけおめことよろ',
                "tasks": this.TASKs.filter((task) => { 
                    return ( task.TodoID === todoId )
                })
            })
        }

    },

    created:function(){
        console.log("created data")
        this.confLoad()
        this.dataLoad()
    }, 
    mounted: function(){
        console.log("mounted data")

    }
}


// ダミーデータ


</script>