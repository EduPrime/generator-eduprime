import Generator from 'yeoman-generator';
import fs from 'fs';
import path from 'path';
import ts from 'typescript';

export default class extends Generator {
  async prompting() {
    this.answers = await this.prompt([
      {
        type: 'input',
        name: 'tableName',
        message: 'Qual é o nome da tabela?',
        validate: (input) => input ? true : 'O nome da tabela não pode ser vazio',
      }
    ]);

    const typeFilePath = path.join(this.destinationRoot(), 'src/types/database.types.ts');
    if (!fs.existsSync(typeFilePath)) {
      this.log('Arquivo de tipos não encontrado:', typeFilePath);
      return;
    }

    const tables = extractTables(typeFilePath);
    const { tableName } = this.answers;
    if (!tables.includes(tableName)) {
      this.log(`A tabela '${tableName}' não foi encontrada no arquivo de tipos.`);
      return;
    }

    const modulesPath = path.join(this.destinationRoot(), 'src/modules');
    if (!fs.existsSync(modulesPath)) {
      this.log('Pasta de módulos não encontrada:', modulesPath);
      return;
    }

    const moduleNames = fs.readdirSync(modulesPath).filter((file) => {
      const modulePath = path.join(modulesPath, file);
      return fs.statSync(modulePath).isDirectory();
    });

    if (moduleNames.length === 0) {
      this.log('Nenhum módulo encontrado na pasta de módulos.');
      return;
    }

    const moduleAnswer = await this.prompt([
      {
        type: 'list',
        name: 'moduleName',
        message: 'Selecione o módulo onde deseja instalar o componente de lista:',
        choices: moduleNames,
      },
    ]);

    this.answers.moduleName = moduleAnswer.moduleName;
  }

  writing() {
    const { tableName, moduleName } = this.answers;
    const modulePath = path.join('src/modules', moduleName);
    const serviceName = `${this._capitalize(tableName)}Service`;
    const componentName = `${this._capitalize(tableName)}List`;
  
    const serviceFilePath = path.join(modulePath, 'services', `${serviceName}.ts`);
    const componentFilePath = path.join(modulePath, 'components', `${componentName}.vue`);
  
    const servicesPath = path.join(modulePath, 'services');
    const componentsPath = path.join(modulePath, 'components');
  
    if (!fs.existsSync(servicesPath)) {
      fs.mkdirSync(servicesPath, { recursive: true });
    }
  
    if (!fs.existsSync(componentsPath)) {
      fs.mkdirSync(componentsPath, { recursive: true });
    }
  
    const typeFilePath = path.join(this.destinationRoot(), 'src/types/database.types.ts');
    const tablesAndFields = extractTablesAndFields(typeFilePath);
    const tableFields = tablesAndFields[tableName] || [];
  
    this.fs.copyTpl(
      this.templatePath('services/TabelaService.ts'),
      this.destinationPath(serviceFilePath),
      { serviceName, tableName }
    );
  
    this.fs.copyTpl(
      this.templatePath('components/TabelaList.vue'),
      this.destinationPath(componentFilePath),
      { componentName, serviceName, tableName, tableFields }
    );
  }  

  _capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}

function extractTables(typeFilePath) {
  const fileContent = fs.readFileSync(typeFilePath, 'utf-8');
  const sourceFile = ts.createSourceFile(
    typeFilePath,
    fileContent,
    ts.ScriptTarget.Latest,
    true
  );

  const tables = [];

  function visit(node) {
    if (ts.isInterfaceDeclaration(node) && node.name.text === 'Database') {
      node.members.forEach((schemaMember) => {
        if (ts.isPropertySignature(schemaMember) && schemaMember.name.getText() === 'public') {
          const publicSchemaType = schemaMember.type;
          if (ts.isTypeLiteralNode(publicSchemaType)) {
            publicSchemaType.members.forEach((publicMember) => {
              if (ts.isPropertySignature(publicMember) && publicMember.name.getText() === 'Tables') {
                const tablesType = publicMember.type;
                if (ts.isTypeLiteralNode(tablesType)) {
                  tablesType.members.forEach((tableMember) => {
                    if (ts.isPropertySignature(tableMember)) {
                      const tableName = tableMember.name.getText();
                      tables.push(tableName);
                    }
                  });
                }
              }
            });
          }
        }
      });
    }

    ts.forEachChild(node, visit);
  }

  visit(sourceFile);

  return tables;
}
function extractTablesAndFields(typeFilePath) {
  const tablesAndFields = {};
  const fileContent = fs.readFileSync(typeFilePath, 'utf-8');
  const sourceFile = ts.createSourceFile(
    typeFilePath,
    fileContent,
    ts.ScriptTarget.Latest,
    true
  );

  function visit(node) {
    // Encontrar a interface 'Database'
    if (ts.isInterfaceDeclaration(node) && node.name.text === 'Database') {
      node.members.forEach((schemaMember) => {
        // Procurar pelo schema 'public'
        if (ts.isPropertySignature(schemaMember) && schemaMember.name.getText() === 'public') {
          const publicSchemaType = schemaMember.type;
          if (ts.isTypeLiteralNode(publicSchemaType)) {
            publicSchemaType.members.forEach((publicMember) => {
              // Procurar pela seção 'Tables'
              if (ts.isPropertySignature(publicMember) && publicMember.name.getText() === 'Tables') {
                const tablesType = publicMember.type;
                if (ts.isTypeLiteralNode(tablesType)) {
                  tablesType.members.forEach((tableMember) => {
                    if (ts.isPropertySignature(tableMember)) {
                      const tableName = tableMember.name.getText();
                      tablesAndFields[tableName] = [];

                      const tableType = tableMember.type;
                      if (ts.isTypeLiteralNode(tableType)) {
                        tableType.members.forEach((tableProperty) => {
                          // Procurar a interface 'Row' que contém os campos da tabela
                          if (ts.isPropertySignature(tableProperty) && tableProperty.name.getText() === 'Row') {
                            const rowType = tableProperty.type;
                            if (ts.isTypeLiteralNode(rowType)) {
                              rowType.members.forEach((fieldMember) => {
                                if (ts.isPropertySignature(fieldMember)) {
                                  const fieldName = fieldMember.name.getText();
                                  tablesAndFields[tableName].push(fieldName);
                                }
                              });
                            }
                          }
                        });
                      }
                    }
                  });
                }
              }
            });
          }
        }
      });
    }

    ts.forEachChild(node, visit);
  }

  visit(sourceFile);

  return tablesAndFields;
}

