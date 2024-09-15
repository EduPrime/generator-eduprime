import { flame, flameOutline } from 'ionicons/icons';
import <%= componentName %> from './views/<%= componentName %>.vue';

const routes = [
  {
    path: '/<%= moduleRoute %>',
    name: '<%= routeName %>',
    component: <%= componentName %>,
    meta: {
      moduleName: '<%= moduleDisplayName %>',
      moduleIcon: flameOutline,
      icon: flame,
      name: '<%= routeDisplayName %>',
      order: <%= order %>,
      requiredRole: [<%- requiredRoles.map(role => `'${role}'`).join(', ') %>],
    },
  },
];

export default routes;
