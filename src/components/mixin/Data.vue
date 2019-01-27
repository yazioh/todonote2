<script>
/**
 * Appの data 操作に関するロジックを分離した
 * 
 */

// DATA
import Todo from '../../classes/Todo.js'
import Task from '../../classes/Task.js'
import Tag from '../../classes/Tag.js'
import TagRef from '../../classes/TagRef.js'

// DBはlocalStorage
import Store from '../../classes/Store.js'
import DataStore from '../../classes/DataStore.js'
// LocalStorage の キー
const DbConf = new Store('CONFIG')
const DbTodos = new DataStore('TODO',Todo)
const DbTasks = new DataStore('TASK',Task)
const DbTags = new DataStore('TAG',Tag)
const DbTagRefs = new DataStore('TAGREF',TagRef)

let CONFs = {}
let lastTodoId = 0

export default {
  template: `<!-- no template -->`,
  data: function(){
      return {
          TODOs : [],
          TASKs : [],
          TAGs : [],
          TAGREFs: [],
          // ----------
          TodoId : '',
          TaskId : '',
          TagId : '',
      }
  },

  //----------------------------
  // mixin されてもよいアクセサ  
  // 他のモジュールからは Read Only にしたい
  // CONFs 由来のは conf をプレフィックス
  // 他は dataをプレフィクス
  computed:{
      confOriginWeekDay:function(){
          // read only
          return CONFs.originWeekday
      },
      
      confWeekMin : function(){
        return 60 * CONFs.dayHours * CONFs.weekDays
      }
  },

  //----------------------------
  // conf を操作する場合 
  // それ以外 data をプレフィクス
  // _ から始まるのは基本的に他から読んじゃダメなやつ
  methods: {
    confSave:function(){
      DbConf.save(CONFs)
    },

    confLoad:function(){
      DbConf.load()
      let load  = DbConf.get()
      CONFs.lastView = load.lastView || 'main'
      CONFs.originWeekday = 1 // 月曜日にしたい
      CONFs.dayHours = 8 
      CONFs.weekDays = 5 
      // 更新を記録
      this.confSave()
    },

    dataSave:function(){
      DbTasks.save()
      DbTodos.save()
      DbTags.save()
      DbTagRefs.save()
    },

    dataLoad:function(){
      this.TODOs = DbTodos.load()
      this.TASKs = DbTasks.load()
      this.TAGs = DbTags.load()
      this.TAGREFs = DbTagRefs.load()

      // this._setDumyTask()
      if(this.TODOs.length){
        this.TODOs.forEach(theTodo => {
          theTodo.setTasks(this.dataTasksInTodo(theTodo.id))
          theTodo.setTags(this.dataTagsInTodo(theTodo.id))
        });
      }
      // console.log(this.TODOs)
      this.dataSave()
    },

    /**
     * @return Array[Task]
     */
    dataTasksInTodo( id ){
      // console.log(this.TASKs)
      return this.TASKs.filter((theTask)=>{
        return (theTask.todoId === id && !theTask.isDelete())
      })
    },

    /**
     * @return Array[Tag]
     */
    dataTagsInTodo( id ){
      let refs = this.TAGREFs.filter((theTask) => {
        return (theTask.todoId === id && !theTask.isDelete())
      })
      return refs.map((theTagRef) => {
        return this.DbTags.getById(theTagRef.TagId)
      })
    },

    dataNewTodo(){
        return new Todo({
            id: this._dataNextTodoId()
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

    _dataNextTaskId: function(){
        CONFs.lastTaskId ++
        this.confSave()
        return 'K'+CONFs.lastTaskId
    },

    _dataNextTodoId: function(){
        lastTodoId++
        return 'FD'+lastTodoId
    },

    _dataNextTagId: function(){
        CONFs.lassTagId ++
        this.confSave()
        return 'G'+ CONFs.lassTagId 
    },

    _setDumyTask: function(){
        DbTasks.clearAll()
        this.TASKs = [
            this._task("なんかかか","v", 1),
            this._task("なんかかか","_", 1),
            this._task("なんかかか","_", 1),
            this._task("なんかかか","_", 2),
            this._task("なんかかか","_", 3),
            this._task("なんかかか","_", 4),
            this._task("なんかかか","_", 5),
            this._task("なんかかか","_", 6),
        ]

        DbTodos.clearAll()
        this.TODOs = [
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

    } ,
    _task: function (label, stat, no){
        let fakeId = 'FD'+ no 
        return DbTasks.add({
            id: '',
            todoId: fakeId ,
            label: label || '(no label)',
            status: stat || '_'
        })
    },
      
    _todo: function(title, area ){
      let todoId = this._dataNextTodoId()        
      return DbTodos.add({
          "id": todoId,
          "title": title,
          "area" : area,
          "unitTime": 15,
          "schedule": '20190102',
          'remarks':'あけおめことよろ',
          "tasks": this.TASKs.filter((task) => { 
              return ( task.todoId === todoId )
          })
      })
    }
  },

  // life sycle fooks
  
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