<template>
    <Formulario @aoSalvarTarefa="salvarTarefa" />
    <div class="lista">
        <Tarefa v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" />

        <Box v-if="listaEstaVazia">
            Você não está muito produtivo hoje =/
        </Box>
    </div>


</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import Formulario from '../components/Formulario.vue';
import Tarefa from '../components/Tarefa.vue'
import ITarefa from '../interfaces/ITarefa';
import Box from '../components/Box.vue';
import { useStore } from '@/store';
import { ADICIONA_TAREFA } from '@/store/metodos-tarefas';
import { OBTER_TAREFAS } from '@/store/tipo-acoes';


export default defineComponent({
    name: "App",
    components: { Formulario, Tarefa, Box },
    computed: {
        listaEstaVazia(): boolean {
            return this.tarefas.length === 0
        }
    },
    methods: {
        salvarTarefa(tarefa: ITarefa) {
            this.store.commit(ADICIONA_TAREFA, tarefa)
        },
    },
    setup() {
        const store = useStore()
        store.dispatch(OBTER_TAREFAS)
        return {
            tarefas: computed(() => store.state.tarefas),
            store,
        }
    },
});
</script>
