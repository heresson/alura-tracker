<template>
  <div class="is-flex is-align-items-center is-justify-content-space-between">

    <Cronometro :tempoEmSegundos="tempoEmSegundos" />

    <Botao @clicado="iniciar" icone="fas fa-play" texto="play" :desabilitado="cronometroIniciado" />
    
    <Botao @clicado="finalizar" icone="fas fa-stop" texto="stop" :desabilitado="!cronometroIniciado" />

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Cronometro from './Cronometro.vue'
import Botao from './Botao.vue'

export default defineComponent({
  name: 'Temporizador',
  emits: ['aoTemporizadorFinalizado'],
  components: {
    Cronometro,
    Botao,
  },
  data() {
    return {
      tempoEmSegundos: 0,
      cronometro: 0,
      cronometroIniciado: false,
    }
  },

  methods: {
    iniciar() {
      this.cronometro = setInterval(() => {
        this.tempoEmSegundos += 1
      }, 1000);
      this.cronometroIniciado = true;

    },
    finalizar() {
      clearInterval(this.cronometro);
      this.cronometroIniciado = false;
      this.$emit('aoTemporizadorFinalizado', this.tempoEmSegundos);
      this.tempoEmSegundos = 0;
    }

  },
})
</script>