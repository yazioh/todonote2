<!-- 押した状態を保持するだけのボタン -->
<template>
    <b-btn variant="variant" :pressed="status"><slot /></b-btn>
</template>
<script>
export default {
    props:{
        color: { default: '' },
        color: { default: '' },
    },
    computed:{
        variant:function(){
            return this.color ? this.color: 'light'
        },
        size:function(){
            return this.size ? this.size: 'small'
        }
    },
    data: function(){
        return {
            status: false
        }
    },
    created: function(){},
    mounted: function(){}
}
</script>
<style scoped>

</style>
