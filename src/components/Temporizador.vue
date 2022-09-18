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
import { INICIAR_CRONOMETRO, PARAR_CRONOMETRO } from '@/store/metodos-cronometro'

export default defineComponent({
  name: 'Temporizador',
  emits: ['aoTemporizadorFinalizado'],
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
      this.store.commit(INICIAR_CRONOMETRO);
      

    },
    finalizar() {
      this.store.commit(PARAR_CRONOMETRO);
      console.log("PARANDO...")
      console.log(this.temporizador)
      this.$emit('aoTemporizadorFinalizado', this.temporizador.tempoEmSegundos);

    }

  },
})
</script>