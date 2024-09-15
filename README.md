
# generator-eduprime

> Yeoman generator para criar módulos e listas de dados para o EduPrime

## Sobre o EduPrime

**EduPrime** é um ERP modular voltado para a gestão escolar, desenvolvido com o **Ionic Framework 8** e **Vue.js 3**. Ele automatiza processos escolares e facilita a gestão de diferentes módulos, como cadastro de alunos, professores e turmas, adaptando-se às necessidades de cada instituição.

## O que é o generator-eduprime?

O **generator-eduprime** é uma ferramenta de automação baseada no Yeoman, criada para facilitar a criação de novos módulos e listas de dados dentro do projeto EduPrime. Ele gera automaticamente a estrutura de arquivos necessários, economizando tempo e garantindo consistência.

## Instalação

Para instalar o generator-eduprime e o Yeoman, execute o seguinte comando:

```bash
npm install -g yo @eduprime/generator-eduprime
```

## Uso

### Criando um novo módulo

1. Execute o seguinte comando no terminal:

   ```bash
   yo @eduprime/eduprime:module
   ```

2. O gerador solicitará o nome do módulo, por exemplo:

   ```
   ? What is the name of the module? (e.g., class-registration)
   ```

3. Digite o nome do módulo e o gerador criará automaticamente a estrutura com arquivos essenciais como:
   - Arquivo `.vue` na pasta `views`
   - Arquivo `routes.ts` para definir as rotas
   - Arquivo `index.ts` para exportar os componentes e serviços

### Criando uma nova página de listagem de dados (list)

1. Para gerar uma página de listagem para uma tabela existente, execute:

   ```bash
   yo @eduprime/eduprime:list
   ```

2. O gerador solicitará o nome da tabela no banco de dados e em qual módulo você deseja adicionar a lista:

   ```
   ? Qual é o nome da tabela? course
   ? Selecione o módulo onde deseja instalar o componente de lista: student-id
   ```

3. O gerador criará:
   - Um arquivo `TabelaList.vue` na pasta `components` do módulo selecionado
   - Um arquivo `TabelaService.ts` na pasta `services` do módulo para lidar com operações de dados

### Integrando ao projeto principal

Após gerar o módulo ou lista, integre-o ao projeto principal registrando as rotas e componentes gerados. O EduPrime já está configurado para adicionar módulos dinamicamente.

## Vantagens de usar o generator-eduprime

1. **Automação**: Facilita a criação de novos módulos e páginas de listagem de dados.
2. **Consistência**: Garante que todas as funcionalidades sigam a mesma estrutura e padrão.
3. **Escalabilidade**: Permite adicionar novos módulos e funcionalidades sem comprometer a organização do código.
4. **Produtividade**: Aumenta a produtividade dos desenvolvedores, reduzindo o esforço manual.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

## Licença

[BSD-3](LICENSE)

## Autor

Hermes Alves
