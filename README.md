
# generator-eduprime

> Yeoman generator para criar módulos e CRUD para o EduPrime

## Sobre o EduPrime

**EduPrime** é um ERP modular voltado para a gestão escolar, desenvolvido com o **Ionic Framework 8** e **Vue.js 3**. Ele simplifica e automatiza processos escolares, permitindo que diferentes módulos (como cadastro de alunos, professores, turmas, etc.) sejam gerenciados de forma independente.

O grande diferencial do EduPrime é sua arquitetura modular, onde cada funcionalidade é implementada como um módulo separado. Esses módulos podem ser adicionados ou removidos conforme a necessidade, permitindo que o sistema cresça ou se adapte a diferentes contextos escolares sem comprometer a performance ou a organização do código.

Cada módulo do EduPrime é gerenciado como um submódulo Git, facilitando a colaboração entre desenvolvedores e a manutenção de partes específicas do sistema.

## O que é o generator-eduprime?

O **generator-eduprime** é uma ferramenta de automação baseada no Yeoman, criada para facilitar a criação de novos módulos dentro do projeto EduPrime. Com ele, você pode rapidamente gerar todos os arquivos e estruturas necessários para adicionar um novo módulo ao EduPrime, sem a necessidade de fazer tudo manualmente.

## Instalação

Para instalar o generator-eduprime globalmente, execute o seguinte comando:

```bash
npm install -g @eduprime/generator-eduprime
```

## Uso

### Criando um novo módulo

Para criar um novo módulo, como por exemplo o módulo de cadastro de turmas (`class-registration`), siga os passos abaixo:

1. No terminal, execute o comando:

   ```bash
   yo @eduprime/eduprime:module
   ```

2. O gerador solicitará o nome do módulo:

   ```
   ? What is the name of the module? (e.g., class-registration)
   ```

3. Digite o nome do módulo, por exemplo `class-registration`.

O gerador criará automaticamente a estrutura necessária com os arquivos essenciais:

- Um arquivo `.vue` na pasta `views` para a interface de usuário.
- Um arquivo `routes.ts` para definir as rotas do módulo.
- Um arquivo `index.ts` para exportar os componentes e serviços do módulo.

### Adicionando o módulo ao projeto principal

Após gerar o módulo, você pode adicioná-lo como um submódulo Git no projeto principal do EduPrime. Isso facilita a colaboração e o versionamento de cada módulo individualmente.

Para adicionar o submódulo, use o comando:

```bash
git submodule add <url-do-repositorio> src/modules/<nome-do-modulo>
```

Exemplo:

```bash
git submodule add https://github.com/seu-usuario/class-registration.git src/modules/class-registration
```

### Configurando as rotas e o menu

O gerador criará automaticamente as rotas do novo módulo. Para que ele seja integrado ao menu da aplicação, basta importar e registrar essas rotas no projeto principal. O EduPrime já está configurado para adicionar módulos de forma dinâmica, baseando-se nas rotas definidas.

## Vantagens de usar o generator-eduprime

1. **Automação**: Automatiza a criação de novos módulos, economizando tempo e reduzindo erros manuais.
2. **Consistência**: Garante que todos os módulos sigam a mesma estrutura e padrão, facilitando a manutenção futura.
3. **Escalabilidade**: Facilita a adição de novos módulos sem comprometer o desempenho ou aumentar a complexidade do código.
4. **Facilidade de Colaboração**: Cada módulo é gerenciado como um submódulo Git, permitindo que diferentes equipes trabalhem em diferentes partes do sistema sem interferências.
5. **Integração Simples**: Após a criação, o módulo é facilmente integrado ao projeto principal do EduPrime, com rotas e componentes automaticamente configurados.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

## Licença

[ISC](LICENSE)

## Autor

Hermes Alves