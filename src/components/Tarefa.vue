<template>
    <div class="box has-text-weight-bold">
        <div class="columns">

        <div class="column is-7">
            Descrição de uma tarefa
        </div>
        <div class="column">
            <Cronometro />
        </div>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import Cronometro from './Cronometro.vue';

export default defineComponent({
    name: 'Tarefa',
    components: {
        Cronometro
    }

})

</script>

<style scoped>
    .box {
        background: #FAF0CA;
    }
</style>