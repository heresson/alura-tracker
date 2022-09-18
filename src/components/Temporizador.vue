<template>
  <div class="is-flex is-align-items-center is-justify-content-space-between">

    <Cronometro :tempoEmSegundos="temporizador.tempoEmSegundos" />

    <Botao @clicado="iniciar" icone="fas fa-play" texto="play" :desabilitado="temporizador.cronometroIniciado" />

    <Botao @clicado="finalizar" icone="fas fa-stop" texto="stop" :desabilitado="!temporizador.cronometroIniciado" />

  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import Cronometro from './Cronometro.vue'
import Botao from './Botao.vue'
import { useStore } from '@/store'
import { INICIAR_CRONOMETRO, PARAR_CRONOMETRO, ZERAR_CRONOMETRO } from '@/store/metodos-cronometro'

export default defineComponent({
  name: 'Temporizador',
  emits: ['aoTemporizadorFinalizado', 'aoTemporizadorIniciado'],
  components: {
    Cronometro,
    Botao,
  },
  setup() {
    const store = useStore()
    return {
      temporizador: computed(() => store.state.temporizador),
      store,
    }
  },


  methods: {
    iniciar() {
      this.$emit('aoTemporizadorIniciado');

      if (!this.temporizador.falha) {
        this.store.commit(INICIAR_CRONOMETRO);
      }
    },
    finalizar() {
      this.store.commit(PARAR_CRONOMETRO);
      this.$emit('aoTemporizadorFinalizado', this.temporizador.tempoEmSegundos);
      this.store.commit(ZERAR_CRONOMETRO);
    }

  },
})
</script>