<template>
    <Box>
        <div class="columns">

            <div class="column is-4">
                <div v-if="!permitirEdicao">
                {{ tarefa.descricao || 'Tarefa sem descrição' }}
                </div>
                <div class="columns" v-if="permitirEdicao">
                    <input type="text" class="input" v-model="novoNome">
                    <button class="button" @click="editarTarefa">OK</button>
                </div>
            </div>
            <div class="column is-4">
                {{ typeof (tarefa.projeto) === 'undefined' ? 'Tarefa sem projeto definido' : tarefa.projeto.nome }}
            </div>
            <div class="column">
                <Cronometro :tempoEmSegundos="tarefa.duracaoEmSegundos" />
            </div>
            <div class="column is-1">
                <button class="button ml-2" @click="permitirEdicao = !permitirEdicao">
                    <span class="icon is-small">
                        <i class="fas fa-pencil-alt"></i>
                    </span>
                </button>
            </div>
            <div class="column is-1">
                <button class="button ml-2 is-danger" @click="excluir(tarefa.id)">
                    <span class="icon is-small">
                        <i class="fas fa-trash"></i>
                    </span>
                </button>
            </div>
        </div>
    </Box>
</template>

<script lang="ts">
import ITarefa from '@/interfaces/ITarefa';
import { defineComponent, PropType } from 'vue'
import Cronometro from './Cronometro.vue';
import Box from './Box.vue';
import { useStore } from '@/store';
import { ATUALIZA_TAREFA, REMOVE_TAREFA } from '@/store/metodos-tarefas';

export default defineComponent({
    name: 'Tarefa',
    data () {
        return {
            novoNome: '',
            permitirEdicao: false,
            tarefaEditada: {},
        }
    },
    components: {
        Cronometro,
        Box
    },
    props: {
        tarefa: {
            type: Object as PropType<ITarefa>,
            required: true,
        }
    },
    setup() {
        const store = useStore()
        return {
            store,
        }
    },
    methods: {
        excluir(id: string) {
            this.store.commit(REMOVE_TAREFA, id);
        },
        editarTarefa(){
            this.store.commit(ATUALIZA_TAREFA, {
                descricao: this.novoNome,
                id: this.tarefa.id,
                duracaoEmSegundos: this.tarefa.duracaoEmSegundos,
                projeto: this.tarefa.projeto
            });
            this.permitirEdicao = false;
            
        }
    }

})

</script>

