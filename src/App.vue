<template>
  <div id="app" :class="appClass">
    <b-row id="main" class="no-gutters h100" :style="mainHeight" >
      <b-col md="11" style="height:100%" >

        <!-- メインエリア（排他選択する） -->
        <MainScreen ref="main" 
          :show="true" @show="viewActive"
          :lotate="lotate" 
        >
            <TodoNoteMainView 
              :TODOs="QueryTODOs" 
              @update="onUpdate" 
              @edit="onEdit"
            />
        </MainScreen>

        <!-- -->
        <MainScreen ref="flat" :show="false" :lotate="lotate" @show="viewActive">
          flat View 
        </MainScreen>
        
        <!-- -->
        <MainScreen ref="tag" :show="false" :lotate="lotate" @show="viewActive">
          tag  View
        </MainScreen>
        
        <!-- -->
        <MainScreen ref="tag" :show="false" :lotate="lotate" @show="viewActive">
          tag  View
        </MainScreen>

      </b-col>
      <b-col md="1">
        <!-- クエリーコントロールPC -->
        <TodoNoteSideBar 
          :state="appSideBarState" 
          :conf="dataConfig"
          @state="onUpdateSidebarState"
          @edit="onEdit" />
     </b-col>
    </b-row>
    <!-- Editor View -->
    <TodoNoteEditView ref="edit" 
      :conf="dataConfig"
      :editTodo="EditTodo" 
      @update="onEditorUpdate" 
    />
</div>
</template>
<script>

// vue controller
import MainScreen from './components/util/mainScreen'
import TodoNoteViewSelector from './components/mixin/ViewSelector'

// router 使ってないのでこちらで制御している
// Views
import TodoNoteMainView from './components/view/TodoNoteMainView'
import TodoNoteEditView from './components/view/TodoNoteEditView'
import TodoNoteSideBar from './components/view/TodoNoteSideBar'
import TodoNoteFooter from './components/view/TodoNoteFooter'

import query from './components/mixin/query'

// accesser to Models 
import data from './components/mixin/data'

// 現在どのモードで表示しているか判定 
// これは手動判定の必要がある
const BootStrapBreakPoint = {
  'xl':1200,
  'lg':992,
  'md':768,
  'sm':576,
  'xs':0,
}
// タブバーの表示サイズ
const UI_BAR_HEIGHT = 80;
const UI_BAR_WIDTH_S = 60;
const UI_BAR_WIDTH_L = 120;

export default {
  name: 'App',
  mixins:[data, query, TodoNoteViewSelector],
  components: {
    MainScreen,
    TodoNoteSideBar,
    TodoNoteFooter,
    TodoNoteMainView,
    TodoNoteEditView,
  },
  props:{
  },
  computed:{
    appClass: function(){
      return [
        'screen-'+this.size,
        'screen-'+this.lotate,
        'side-bar-'+ (this.appSideBarState.open ? 'open':'close')
      ]
    },
    QueryTODOs : function(){
      return this.queryLiveTodo( this.TODOs )
    },
    mainHeight: function(){
      return 'height:100%';
    },

    footerHeight: function(){
      return 'height:0';
    }

  },
  data:function(){
    return {
      size: '',
      lotate: '',
      windowWidth: '',
      windowHeight: '',
      view:{
        editor: false
      },

      appSideBarState:{
        show: true,
        open: false,
      },

      // for 編集 View
      EditTodo:{},
    }
  },
  methods:{
    /**
     * ビューコンポネントの更新ハンドラ
     * 画面描画切り替え 指示
     */
    onUpdate: function( payload ){
      // 
      this.$forceUpdate()
    },

    onUpdateSidebarState: function (payload) {
      // console.log(2,payload)
      // TODO サニタイズとか
      Object.assign(this.appSideBarState, payload)
    },

    /**
     * 表示されたビューからクエリー条件を受け取るイベントハンドラ
     */
    onCondition: function( payload ){
    },

    /**
     * TODO表示のクエリーイベントハンドラ
     */
    onQuery: function( payload ){

    },

    onEdit:function(todo){
      // seek 
      this.EditTodo = (todo) ? todo :this.dataNewTodo();
      console.log(this.EditTodo)
      this.$refs.edit.show()
    },

    onEditorUpdate :function(data){
      
      this.EditTodo = this.dataUpdateEdit(data.payload)
      this.view.editor = false;
    },

    /**
     * ブラウザー画面のリサイズ判定
     * Bootstrap の GRID表示 モード追跡
     */
    onWindowResize: function(){
      this.windowWidth = window.innerWidth;
      this.windowHeight = window.innerHeight;
      this.size = Object.keys(BootStrapBreakPoint).find((ix) => {
        return (this.windowWidth >= BootStrapBreakPoint[ix] )
      })
      this.lotate = ((this.windowWidth - UI_BAR_WIDTH_S) > (this.windowHeight-UI_BAR_HEIGHT))? "landscape": "portrait"
    }
  },

  /**
   * 描画前起動処理
   */
  created:function(){
    console.log("app created")
  },
  /**
   * 物理マウント完了時
   */
  mounted: function () {
    window.addEventListener('resize', this.onWindowResize)
    this.onWindowResize()
  },

}




</script>
<style>
  html,body,#app{
    height:100%; 
    width:100%;
    overflow: hidden;
  }
  ul, ol, dl, li, dd, dt{
    list-style: none;
    margin: 0;
    padding: 0;
  }
  #main, #main >*{
      height:100%;
  }  
  .screen-sm #main, .screen-xs #main {
    height:auto;
  }
  #app.screen-sm , #app.screen-xs {
    overflow: auto;
  }

  .bgc-area1{
      background-color: rgba(255,180,180,0.75);
  }
  .bgc-area2{
      background-color: rgba(255,255,180,0.75);
  }
  .bgc-area3{
      background-color: rgba(180,180,255,0.75);
  }
  .bgc-area4{
      background-color: #9F9;
  }

  .mt0  { margin-top:  0px !important; }
  .mt10 { margin-top: 10px !important; }
  .mt20 { margin-top: 20px !important; }
  .mt30 { margin-top: 30px !important; }
  .mt40 { margin-top: 40px !important; }

  .mb0  { margin-bottom:  0px !important; }
  .mb10 { margin-bottom: 10px !important; }
  .mb20 { margin-bottom: 20px !important; }
  .mb30 { margin-bottom: 30px !important; }
  .mb40 { margin-bottom: 40px !important; }

  .innertWrap {
    padding: .5rem;
  }

  p { margin-bottom: 0 }
  p + p { margin-top: 1rem }
</style>
