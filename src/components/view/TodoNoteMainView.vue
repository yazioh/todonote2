<template>
  <div class="wapper">
    <b-form-row class="task-area task-hurry">
      <b-col md="6" lg="8" >
        <TodoArea type="a1" :todo="tasksA1" @update="onUpdate" @edit="onEdit" />
      </b-col>
      <b-col md="6" lg="4">
        <TodoArea type="a2" :todo="tasksA2" @update="onUpdate" @edit="onEdit" />
      </b-col>
    </b-form-row>

    <b-form-row class="task-area task-slow">
      <b-col md="6" lg="8">
        <TodoArea type="a3" :todo="tasksA3" @update="onUpdate" @edit="onEdit" />
      </b-col>
      <b-col md="6" lg="4">
        <TodoArea type="a4" :todo="tasksA4" @update="onUpdate" @edit="onEdit" />
      </b-col>
    </b-form-row>
  </div>
</template>
<script>

import TodoArea from '../elements/TodoArea'
import query from '../mixin/query'

export default {

  components:{
    TodoArea
  },
  mixins:[query],
  props:{
    "TODOs":{}
  },
  computed: {

    tasksA1:function(){
      return this.queryTodosInArea(this.TODOs, 'a1')
    },
    tasksA2:function(){
      return this.queryTodosInArea(this.TODOs, 'a2')
    },
    tasksA3:function(){
      return this.queryTodosInArea(this.TODOs, 'a3')
    },
    tasksA4:function(){
      return this.queryTodosInArea(this.TODOs, 'a4')
    },

  },
  data: function() {
    return {
    }
  },
  methods: {
    onUpdate: function(payload){
      console.log("MainView relayed", payload)
      this.$emit("update",payload)
    },

    onEdit: function (todo){
      this.$emit("edit", todo)
    }
  },
  created:function(){

  },
  mounted:function(){
    this.$emit("init")
  }
}



</script>
<style scoped>
  .wapper {
    width: 100%;
    height:100%;
    overflow: hidden;
  }
  .task-area > div {
    padding-top: 0.5rem;
  }
  .task-area > *{
    height: 100%; 
    position: relative;
  }
  .task-area > *>div{
    height: 100%; 
  }
  .task-hurry{
    height:60%;
  }
  .task-slow{
    height:40%;
  }

  /* SPは 縦積みに*/
  .screen-sm .wapper{
    height: auto;
  }
  .screen-sm .task-hurry{
    height: auto;
  }
  .screen-sm .task-slow{
    height: auto;
  }

</style>
