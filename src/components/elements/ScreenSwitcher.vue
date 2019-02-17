<template>
    <div class="screen" v-if="show">
        <div class="main">
            <slot />
        </div>
        <div class="menuBar">
            <slot name="menuBar" />
        </div>
    </div>
</template>
<script>
export default {
    props:{
        lotate:{},
        show:{
            default: false
        }
    }
}
</script>
<style scoped>
.screen {
    margin: 0;
    position: relative;
    width:100%; 
    height:calc(100% - 10px);
}
</style>