import BaseService from '@/services/BaseService'

// const table = 'tabela' as const

type <%= serviceTypeName %> = typeof table

export default class <%= serviceName %> extends BaseService<<%= serviceTypeName %>> {
  constructor() {
    // super(table) // Passando o nome da tabela para a classe base
  }
}
