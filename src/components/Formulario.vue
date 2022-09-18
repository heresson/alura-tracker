<template>
  <div class="box">
    <div class="columns">
      <div class="column is-5" role="form" aria-label="Formulário para iniciar uma nova tarefa">
        <input class="input" type="text" placeholder="Qual tarefa você deseja iniciar?" v-model="descricao" />
      </div>
      <div class="column is-3">
        <div class="select">
          <select v-model="idProjeto">
            <option value="">Selecione o projeto</option>
            <option :value="projeto.id" v-for="projeto in projetos" :key="projeto.id">
              {{ projeto.nome }}
            </option>
          </select>
        </div>
      </div>
      <div class="column">
        <Temporizador @aoTemporizadorFinalizado="salvarTarefa" @aoTemporizadorIniciado="iniciarTarefa" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import Temporizador from "./Temporizador.vue";
import { useStore } from 'vuex'

import { key } from '@/store'
import { NOTIFICAR } from "@/store/metodos-notificacoes";
import { TipoNotificacao } from "@/interfaces/INotificacao";
import { FALHA_CRONOMETRO } from "@/store/metodos-cronometro";

export default defineComponent({
  name: "Formulario",
  emits: ['aoSalvarTarefa'],
  components: {
    Temporizador,
  },
  data() {
    return {
      descricao: '',
      idProjeto: ''
    }
  },
  methods: {
    iniciarTarefa() {
      if (this.idProjeto == '') {
        this.store.commit(FALHA_CRONOMETRO, true);

        this.store.commit(NOTIFICAR, {
          titulo: 'Erro ao Iniciar Tarefa',
          texto: `Um projeto deve ser selecionado ao iniciar uma tarefa`,
          tipo: TipoNotificacao.FALHA,
        })
      } else {
        this.store.commit(FALHA_CRONOMETRO, false);
      }
    },
    salvarTarefa(tempoEmSegundos: number): void {
      this.$emit('aoSalvarTarefa', {
        duracaoEmSegundos: tempoEmSegundos,
        descricao: this.descricao,
        projeto: this.projetos.find(proj => proj.id == this.idProjeto)
      })
      this.descricao = ''
    }
  },
  setup() {
    const store = useStore(key)
    return {
      projetos: computed(() => store.state.projetos),
      store
    }
  }
});
</script>
<style scoped>
.button {
  margin-left: 8px;
}

.box {
  background-color: var(--bg-primario);
  color: var(--texto-primario);
}
</style>