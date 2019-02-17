<!--
    ラベルとテキストボックスの切り替え
-->
<template>
    <div>
        <input type="text" 
            v-if="mode==='edit'" 
            ref="input"
            v-model="lVal" 
            @blur="onFocus(false)"
            />
        <label v-else 
            @focus="onFocus(true)"
            >{{ mkdown(lVal) }}</label>
    </div>
</template>
<script>
export default {
    props:{
        value:{}
    },
    data:function(){
        return {
            lLal: "",
            mode: 'show',
        }
    },
    methods: {
        mkdown:function(txt){
            return txt // TODO 
        },
        onFocus: function(sw){
            this.mode = sw ? 'edit': 'show'
            if(sw){
                this.$nextTick((sw)=>{
                    this.$refs.input.focus() 
                })
            }
        }
    },
    created: function(){
        this.lVal= this.value
    },
    watch:{
        value:function(  ){
            this.lVal = this.value
        }
    }
}
</script>

