<template>
    <div class="screen">
        <div class="main">
            <slot />
        </div>
        <div class="menuBar">
            <slot name="menuBar" />
        </div>
    </div>
</template>
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