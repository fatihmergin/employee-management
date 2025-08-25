import { Router } from '@vaadin/router';
import './components/employee-list.js';
import './components/employee-form.js';

export const routes = [
  { path: '/', component: 'employee-list' },
  { path: '/new', component: 'employee-form' },
  { path: '/add', component: 'employee-form' },
  { path: '/edit/:id', component: 'employee-form' },
  { path: '(.*)', redirect: '/' }
];

export function initRouter(outletEl){
  const targetEl = outletEl || document.querySelector('main') || document.body;
  const router = new Router(targetEl);
  router.setRoutes(routes);
  return router;
}
