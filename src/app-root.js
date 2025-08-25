import { LitElement, html } from 'lit';
import { Router } from '@vaadin/router';
import './components/app-nav.js';
import './components/employee-list.js';
import './components/employee-form.js';
import { appRootStyles } from './styles/app-root.styles.js';

export class AppRoot extends LitElement {
  static styles = appRootStyles;

  firstUpdated() {
    const outletEl = this.renderRoot?.querySelector('#outlet');
    this.router = new Router(outletEl || this.shadowRoot);
    this.router.setRoutes([
      { path: '/', component: 'employee-list' },
      { path: '/new', component: 'employee-form' },
      { path: '/edit/:id', component: 'employee-form' },
      { path: '(.*)', redirect: '/' }
    ]);
  }

  render() {
    return html`
      <app-nav></app-nav>
      <div id="outlet"></div>
    `;
  }
}

customElements.define('app-root', AppRoot);
