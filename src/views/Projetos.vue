<template>
     <section class="projetos">
    <h1 class="title">Projetos</h1>
    <form @submit.prevent="salvarProjeto">
      <div class="field">
        <label for="nomeDoProjeto" class="label"> Nome do Projeto </label>
        <input
          type="text"
          class="input"
          v-model="nomeProjeto"
          id="nomeDoProjet"
        />
      </div>
      <div class="field">
        <button class="button" type="submit">Salvar</button>
      </div>
    </form>
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="projeto in listaProjetos" :key="projeto.id">
          <td>{{ projeto.id }}</td>
          <td>{{ projeto.nome }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script lang="ts">

import { defineComponent } from "vue";
import IProjeto from '../interfaces/IProjeto'

export default defineComponent({
    name: 'Projetos',
    data() {
        return {
            nomeProjeto: '',
            listaProjetos: [] as IProjeto[],
        }
    },
    methods: {
        salvarProjeto() {
            const projeto: IProjeto = {
                nome: this.nomeProjeto,
                id: new Date().toISOString()
            }

            this.listaProjetos.push(projeto)
            this.nomeProjeto = ''

        }
    }
})

</script>

<style scoped>
    .projetos {
      padding: 1.25rem;
    }
</style>