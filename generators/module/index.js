import Generator from 'yeoman-generator';

export default class extends Generator {
  async prompting() {
    this.answers = await this.prompt([
      {
        type: 'input',
        name: 'moduleName',
        message: 'Qual é o nome do módulo? (ex.: class-registration)',
        default: 'class-registration',
      },
    ]);
  }
  
  writing() {
    const modulePath = `src/modules/${this.answers.moduleName}`;
    const rawModuleName = this.answers.moduleName;
  
    // Formatar o nome do módulo
    const moduleName = this._capitalize(rawModuleName); // ex.: ClassRegistration
    const moduleRoute = this._kebabCase(rawModuleName); // ex.: class-registration
    const displayName = this._startCase(rawModuleName); // ex.: Class Registration
  
    // Derivar nomes adicionais
    const serviceName = `${moduleName}Service`; // ex.: ClassRegistrationService
    const componentName = moduleName; // Usar o nome do módulo como nome do componente
    const serviceInstanceName = `${this._camelCase(moduleName)}Service`; // ex.: classRegistrationService
    const routePath = moduleRoute; // Usar o moduleRoute como routePath
    const routeName = displayName; // Usar displayName como nome da rota
    const routeDisplayName = displayName; // Usar displayName para exibição
    const moduleDisplayName = displayName; // Usar displayName para o nome do módulo
    const order = 4; // Ordem padrão, pode ser ajustada
    const requiredRoles =  ['public', 'admin']; // Roles necessárias
  
    // Copiar e processar os templates
    this.fs.copyTpl(
      this.templatePath('views/ModuleTemplate.vue'),
      this.destinationPath(`${modulePath}/views/${componentName}.vue`),
      {
        moduleName,
        componentName,
        serviceName,
        serviceInstanceName,
        displayName,
      }
    );
  
    this.fs.copyTpl(
      this.templatePath('routes.ts'),
      this.destinationPath(`${modulePath}/routes.ts`),
      {
        componentName,
        moduleRoute,
        routePath,
        routeName,
        moduleDisplayName,
        routeDisplayName,
        order,
        requiredRoles,
      }
    );
  
    this.fs.copyTpl(
      this.templatePath('index.ts'),
      this.destinationPath(`${modulePath}/index.ts`),
      { serviceName, componentName, serviceInstanceName, routesFile: 'routes' }
    );
  
    // Copiar o template do serviço
    this.fs.copyTpl(
      this.templatePath('services/ServiceTemplate.ts'),
      this.destinationPath(`${modulePath}/services/${serviceName}.ts`),
      { serviceName }
    );
  
    // Copiar o template do componente
    this.fs.copyTpl(
      this.templatePath('components/ComponentTemplate.vue'),
      this.destinationPath(`${modulePath}/components/${componentName}.vue`),
      { componentName }
    );
  }
  _capitalize(string) {
    return string
      .replace(/(^|\s|-)\S/g, (match) => match.toUpperCase())
      .replace(/-/g, '');
  }
  
  _kebabCase(string) {
    return string
      .replace(/\s+/g, '-')
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .toLowerCase();
  }
  
  _startCase(string) {
    return string
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (match) => match.toUpperCase());
  }
  
  _camelCase(string) {
    const s = string.replace(/-./g, x => x[1].toUpperCase());
    return s.charAt(0).toLowerCase() + s.slice(1);
  }  
  
}
