<script>


// このエリアにアプリケーション定数を定義できるよね
/**
 * 共通ステータス
 */
const STATUS = {
    'o':'OK',
    '!':'UPDATED',
    'x':'DELETED'
} 

export default {
    tempplate: '<!-- ->',
    computed:{
        statusLabels:function(){
            return STATUS
        }

    },
    data: function(){
        return {
            currentScreen:"main",
            screens:{

            },
        }
    },
    methods: {
        onScreenInit:function(name,payload){
            this.screens[name]={
              "name": name,
              "open": (this.cuurentScreeen==name)
            }
            console.log(name)
        },
        selectScreen:function(screenName){

        },
    },
    created: function(){
        // console.log("mixn", "view selector")
    }

}
</script>