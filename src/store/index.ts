import IProjeto from "@/interfaces/IProjeto";
import ITarefa from "@/interfaces/ITarefa";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { InjectionKey } from 'vue'
import { ADICIONA_PROJETO, ALTERA_PROJETO, EXCLUI_PROJETO } from "./metodos-projetos";
import { ADICIONA_TAREFA, ATUALIZA_TAREFA, REMOVE_TAREFA } from "./metodos-tarefas";
import INotificacao, { TipoNotificacao } from "@/interfaces/INotificacao";


interface Estado {
    projetos: IProjeto[],
    tarefas: ITarefa[],
    notificacoes: INotificacao[],
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
    state: {
        projetos: [],
        tarefas: [],
        notificacoes: [
            {
                id: 1,
                texto: 'Uma notificacao de sucesso',
                titulo: 'sucesso',
                tipo: TipoNotificacao.SUCESSO
            },
            {
                id: 2,
                texto: 'Uma notificacao de atencao',
                titulo: 'sucesso',
                tipo: TipoNotificacao.ATENCAO
            },
            {
                id: 3,
                texto: 'Uma notificacao de falha',
                titulo: 'sucesso',
                tipo: TipoNotificacao.FALHA
            },
        ],
    },
    mutations: {
        [ADICIONA_PROJETO](state, nomeDoProjeto: string) {
            const projeto = {
                id: new Date().toISOString(),
                nome: nomeDoProjeto
            } as IProjeto
            state.projetos.push(projeto)
        },
        [ALTERA_PROJETO](state, projeto: IProjeto) {
            const index = state.projetos.findIndex(proj => proj.id == projeto.id)
            state.projetos[index] = projeto
        },
        [EXCLUI_PROJETO](state, id: string) {
            state.projetos = state.projetos.filter(proj => proj.id != id)
        },
        [ADICIONA_TAREFA](state, tarefa: ITarefa) {
            tarefa.id = new Date().toISOString()
            state.tarefas.push(tarefa)
        },
        [ATUALIZA_TAREFA](state, tarefa: ITarefa) {
            const indice = state.tarefas.findIndex(p => p.id == tarefa.id)
            state.tarefas[indice] = tarefa
        },
        [REMOVE_TAREFA](state, id: string) {
            state.tarefas = state.tarefas.filter(p => p.id != id)
        },
    }
})

export function useStore(): Store<Estado> {
    return vuexUseStore(key)
}