<!-- -->
<template>
    <div>
        <testTitle />

        
        aa<InputLabel v-model="text1"/>aa


        <ButtonToggle color="primary">aaa</ButtonToggle>
    </div>
</template>
<script>
import ButtonToggle from '../form/ButtonToggle'
import InputLabel from '../form/InputLabel'
console.log(InputLabel)

export default {
    components:{
        testTitle:{
            template: `<h1>test</h1>`
        },
        ButtonToggle:ButtonToggle,
        InputLabel:InputLabel,

    },
    props:{},
    computed:{
    },
    data: function(){
        return {
            text1:'hoge'
        }
    },
    created: function(){},
    mounted: function(){}
}
</script>
<style scoped>

</style>
