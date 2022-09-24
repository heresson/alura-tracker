import IProjeto from "@/interfaces/IProjeto";
import ITarefa from "@/interfaces/ITarefa";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { InjectionKey } from 'vue'
import { ADICIONA_PROJETO, ALTERA_PROJETO, DEFINIR_PROJETOS, EXCLUI_PROJETO } from "./metodos-projetos";
import { ADICIONA_TAREFA, ATUALIZA_TAREFA, REMOVE_TAREFA } from "./metodos-tarefas";
import INotificacao from "@/interfaces/INotificacao";
import { NOTIFICAR } from "./metodos-notificacoes";
import ICronometro from "@/interfaces/ICronometro";
import { FALHA_CRONOMETRO, INICIAR_CRONOMETRO, PARAR_CRONOMETRO, ZERAR_CRONOMETRO } from "./metodos-cronometro";
import { OBTER_PROJETOS } from "./tipo-acoes";
import http from '@/http'

interface Estado {
    projetos: IProjeto[],
    tarefas: ITarefa[],
    notificacoes: INotificacao[],
    temporizador: ICronometro,
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
    state: {
        projetos: [],
        tarefas: [],
        notificacoes: [],
        temporizador: {
            cronometro: 0,
            tempoEmSegundos: 0,
            cronometroIniciado: false,
            falha: false,
        }
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
        [DEFINIR_PROJETOS](state, projetos: IProjeto[]) {
            state.projetos = projetos
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
        [NOTIFICAR](state, novaNotificacao: INotificacao) {
            novaNotificacao.id = new Date().toISOString();
            state.notificacoes.push(novaNotificacao)
            setTimeout(() => {
                state.notificacoes = state.notificacoes.filter( notificacao => notificacao.id != novaNotificacao.id)
            }, 3000);
        },
        [INICIAR_CRONOMETRO](state) {
            state.temporizador.tempoEmSegundos = 0
            state.temporizador.cronometro = setInterval(() => {
                state.temporizador.tempoEmSegundos +=1;
            }, 1000);
            state.temporizador.cronometroIniciado = true
        },
        [PARAR_CRONOMETRO](state) {
            clearInterval(state.temporizador.cronometro);
            state.temporizador.cronometroIniciado = false;
            
        },
        [FALHA_CRONOMETRO](state, isFalha: boolean) {
            state.temporizador.falha = isFalha;
        },
        [ZERAR_CRONOMETRO](state) {
            state.temporizador = {
                cronometro: 0,
                tempoEmSegundos: 0,
                cronometroIniciado: false,
                falha: false,
            }
        },
        
    },
    actions: {
        [OBTER_PROJETOS] ({ commit }) {
            http.get('projetos')
            .then(resposta => commit(DEFINIR_PROJETOS, resposta.data) )
        },
    },
})

export function useStore(): Store<Estado> {
    return vuexUseStore(key)
}