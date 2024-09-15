import BaseService from '@/services/BaseService';

const table = '<%= tableName %>' as const;

type TabelaType = typeof table;

export default class <%= serviceName %> extends BaseService<TabelaType> {
  constructor() {
    super(table);
  }
}
