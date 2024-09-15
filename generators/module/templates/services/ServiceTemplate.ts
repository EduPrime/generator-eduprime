import BaseService from '@/services/BaseService'

 const table = 'institution' as const // Modifique para sua tabela

type <%= serviceTypeName %> = typeof table

export default class <%= serviceName %> extends BaseService<<%= serviceTypeName %>> {
  constructor() {
     super(table) // Passando o nome da tabela para a classe base
  }
}
