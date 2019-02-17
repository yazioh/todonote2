<!--
  編集ダイアログ

-->
<template>
  <div>
    <b-modal ref="modal" size="lg" 
      :ok-only="true"
      ok-title="保存" ok-variant="light" ok-size="sm"
      @ok="onOkClick"
      :header-class="nowAreaColor"      
      :body-class="nowAreaColor"      
      :footer-class="nowAreaColor"      
    >
        <div slot="modal-header" style="width:100%" >
          <b-form-row >
            <b-col md="1" cols="2"><!-- 付箋色選択 -->
              <b-btn id="areaSelect" variant="light" @click="showAreaSelect" >
                <iconFont :name="nowAreaIcon" />
             </b-btn>
            </b-col>

            <b-col md="7" cols="10"><!-- タイトル変更 -->
              <b-input v-model.trim="edit.title" placeHolder="サマリ・概要" />
            </b-col>

            <b-col md="3" cols="6"><!-- 単位時間選択 -->
              <b-input-group prepend="1U" append="min">
                <b-select :options="unitTimes" 
                  v-model="edit.unitTime" 
                  @cahnge="onChangeUnitTime"
                />
              </b-input-group>
            </b-col>
            
            <!-- <b-col cols="1" class="text-right">
              <b-btn size="sm" variant="light" 
                 @click="hide" >
                <iconFont name="times" />
             </b-btn>
            </b-col> -->
          </b-form-row>
        </div>

        <b-row>
          <b-col md="8"><!-- 左側 -->

            <ul id="doingTask" class="taskList"><!-- 未達成タスク -->
              <li v-for="task in doingTasks" :key="task.id">
                <b-form-row>
                  <b-col cols="11">
                    <b-form-checkbox 
                      v-model="task.status" 
                        value="v"
                        unchecked-value="_"
                        @change="onCheckUpdate($event, task)"
                      >
                        <span v-if="1">{{ task.label }}</span>
                        <b-input v-else v-model="task.label" />
                      </b-form-checkbox>
                  </b-col>
                  <b-col cols="1" class="text-right">
                    <b-btn size="sm" variant="light" style="width:100%">
                      <iconFont name="ellipsis-v" />
                    </b-btn>
                  </b-col>
                </b-form-row>
              </li>

            </ul>

            <b-input-group class="mt10"><!-- 新規タスク -->
                <b-input-group-text slot="prepend" >
                    <iconFont name="plus-circle" /><!-- (+) -->
                </b-input-group-text>

                <input type="text" class="form-control"
                  v-model.trim="edit.newTaskLabel" 
                  @blur="onBlurNewTask(edit.newTaskLabel, $event)" 
                  @keyup.enter="onBlurNewTask(edit.newTaskLabel, $event)"
                />
            </b-input-group>


            <b-form-row><!-- 完了タスク -->
              <b-col sm="9">{{ edit.title }} (済)</b-col>
              <b-col sm="3" class="text-right">
                  {{ doneEstimateTime }} / {{ totalEstimateTime }} m
              </b-col>
            </b-form-row>

            <ul id="doneTask"  class="taskList"><!-- 完了タスク -->
              <li v-for="task in doneTasks" :key="task.id">
                <b-form-row>
                  <b-col cols="10">
                    <b-form-checkbox 
                      v-model="task.status" 
                        value="v"
                        unchecked-value="_"
                        @change="onCheckUpdate($event, task)"
                      >
                        {{ task.label }}
                      </b-form-checkbox>
                  </b-col>
                  <b-col cols="2">
                    22:33
                  </b-col>
                </b-form-row>
              </li>
            </ul>

          </b-col><!-- /左側 -->
          <b-col md="4"> <!-- 右側 -->

            <b-form-row>
              <b-col sm="6" >作業見積り</b-col>
              <b-col sm="6" class="text-right">
                  {{ doingEstimateTime }} / {{ totalEstimateTime }} m
              </b-col>
            </b-form-row>

            <h5>schedule</h5>
            <ul id="asignWeek">
              <li v-for="(week,i) in weeks" :key="i" class="mb10">
                <b-form-row>
                  <b-col sm="4">
                    <b-btn size="sm" variant="light" style="width:100%">
                      {{ week.label }}
                    </b-btn>
                  </b-col>

                  <b-col sm="3">{{ fuzzyTime(week.task) }}</b-col>
                  <b-col sm="5">
                    <b-progress 
                      :value="week.done" 
                      :max="2400"                      
                      style="margin-to:0.5rem"
                    >
                       <b-progress-bar variant="success" :value="week.done" />
                       <b-progress-bar :variant="taskVariant(week)" :striped="true" :value="week.task - week.done" />
                    </b-progress>
                  </b-col>
                </b-form-row>
                <div style="padding-top:0.25rem;">
                  <b-btn size="sm">1</b-btn>
                  <b-btn size="sm">1</b-btn>
                  <b-btn size="sm">1</b-btn>
                  <b-btn size="sm">1</b-btn>
                  <b-btn size="sm">1</b-btn>
                  <b-btn size="sm">1</b-btn>
                  <b-btn size="sm">1</b-btn>
                </div>
              </li>
            </ul>

          </b-col>
        </b-row>
    </b-modal>

    <b-popover show ref="pop1" target="areaSelect" title="優先順位">
      <b-form-row>
        <b-col sm="6" v-for="area in areas" :key="area.name">
        <b-btn  
          style="width:100%; text-align:center"
          :class="area.color"
          variant="light"
          triggers="click"
          @click="changeArea(area)"
          ><iconFont :name="area.icon" />
            <br />{{ area.title }}
          </b-btn>
        </b-col>
      </b-form-row>
    </b-popover>
  </div>
</template>
<script>
//------------------------------------------
import areas from '../mixin/areas'
import calDate from '../mixin/calDate'
// DATA
// import Todo from '../../classes/Todo.js'
// import Task from '../../classes/Task.js'

const WEEK_MAX = 5 * 8 * 60 // min 
const UNIT_TIME_OPTIONS =[
  5,6,10,15,20,30,45,60
]


export default {
  mixins:[areas,calDate],

  props:{
    conf:{}, // App.Comfs
    // 
    editTodo:{}
  },

  computed:{
    // @return num (単位:分) 
    totalEstimateTime:function(){
      return this.edit.tasks.length * this.edit.unitTime
    },
    // @return num (単位:分) 
    doingEstimateTime:function(){
      return this.doingTasks.length * this.edit.unitTime
    },
    // @return num (単位:分) 
    doneEstimateTime:function(){
      return this.doneTasks.length * this.edit.unitTime
    },

    nowAreaColor:function(){
      return this.areaColor(this.edit.area)
    },

    nowAreaIcon:function(){
      return this.areaIconName(this.edit.area)
    },

    doingTasks:function(){
      return this.edit.tasks.filter((task) => {
        return task.status !=='v'
      })
    },
    doneTasks:function(){
      return this.edit.tasks.filter((task) => {
        return task.status ==='v'
      })
    },
  },

  data:function(){
    return {
      edit:{},

      unitTimes: UNIT_TIME_OPTIONS,

      weeks:[
        {label: '今週',   start:'2019/01/01', task:1600, done:840 },
        {label: '来週',   start:'2019/01/01', task:360, done:20 },
        {label: '1月3週', start:'2019/01/01', task:520, done:0 },
        {label: '1月4週', start:'2019/01/01', task:1000, done:55 },
        {label: '2月1週', start:'2019/01/01', task:2500, done:0 }
      ]
    }
  },

  methods:{
    show:function(){
      console.log(this.editTodo)

      this.$nextTick(()=>{
        console.log(this.editTodo)
        this.edit = Object.assign({}, this.editTodo)
        // = this.editTodo.id
        // this.edit.area = this.editTodo.area
        // this.edit.title = this.editTodo.title
        // this.edit.unitTime = this.editTodo.unitTime

        this.$refs.modal.show()
      })
    },
    hide: function(){
      this.$refs.modal.hide()
    },

    fuzzyTime: function(t){
      switch(true){
        case t<60 :
          return (t*1).toFixed(0) + ' m'
        case t< 400 :
          return (t/60).toFixed(1) + ' h'
      }
      return (t/480).toFixed(1) + ' d'
    },

    showAreaSelect:function(){
      this.$refs.pop1.$emit('open')
    },

    changeArea:function(area){
      this.$refs.pop1.$emit('close')
      this.edit.area = area.name // a1 .. a4
    },
    
    // Save Todo
    onOkClick: function(){
      this.$emit("update",{
        from:"edit",
        payload: this.edit
      })
    },

    taskVariant: function(week){
      return (week.task >= WEEK_MAX )? 'danger' : 'info'
    },

    onCheckUpdate:function(checkd,task){
      task.status = checkd
      console.log(task, checkd)
      //this.$forceUpdate()
    },

    onBlurNewTask:function(text, $e){
      console.log(text,$e)
      if(text){
        this.edit.tasks.push({id:this.getNewTaskId(), label:''+ text, status:'_', edit:false})
      }
      this.edit.newTaskLabel=''
    },

    onChangeUnitTime: function(){

    },

    getNewTaskID: function(){
      'tempYYYYMMDD'+(uu++)
    },
  },
  
  created: function(){
    console.log("editor view created ")
    // dmy data
    this.edit.tasks=[
        {id:"001",label:'aaaaaaaa', status:'_', edit:false},
        {id:"002",label:'aaaa', status:'_', edit:false},
        {id:"003",label:'aaaa', status:'_', edit:false},
        {id:"004",label:'bbbbbbbbb', status:'_', edit:false},
        {id:"005",label:'vvvvvvvvv', status:'_', edit:false},
        {id:"101",label:'aaaaaaaa', status:'v', edit:false},
        {id:"102",label:'aaaa', status:'v', edit:false},
    ]
  },

  mounted:function(){
    console.log("editor view mounted ")
  },

}
let uu = 100
</script>
<style>

.taskList{
  margin-top: 0.5rem;
}

.taskList > li{
  padding-bottom: 0.5rem
} 
</style>