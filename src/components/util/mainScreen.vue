<template>
    <div class="container-fluid screen">
        <slot  v-if="show" />
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
