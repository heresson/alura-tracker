import { TipoNotificacao } from "@/interfaces/INotificacao"
import { store } from "@/store"
import { NOTIFICAR } from "@/store/metodos-notificacoes"

export const notificacaoMixin = {
  methods: {
    notificar(tipo: TipoNotificacao, titulo: string, texto: string): void {
      store.commit(NOTIFICAR, {
        titulo,
        texto,
        tipo
      })
    },
  }
}