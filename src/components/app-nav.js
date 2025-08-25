import { LitElement, html } from 'lit';
import { Router } from '@vaadin/router';
import { getLang, setLang, onLangChange, t as translate } from '../translations.js';
import { navStyles } from '../styles/app-nav.styles.js';

export class AppNav extends LitElement {
  static styles = navStyles;
  static properties = { lang: { state: true } };

  constructor(){
    super();
    this.lang = getLang();
    this._offLang = onLangChange(l => { this.lang = l; });
  }
  disconnectedCallback(){ this._offLang?.(); super.disconnectedCallback(); }

  navigateTo(event, path){ event.preventDefault(); Router.go(path); }
  toggleLanguage(){ setLang(this.lang === 'tr' ? 'en' : 'tr'); }

  render(){
    const isTurkish = this.lang === 'tr';
    const flagSrc = isTurkish ? '/assets/turkish.png' : '/assets/english.png';
    const flagAlt = isTurkish ? (translate('langTR') || 'Türkçe') : (translate('langEN') || 'English');

    const currentPath = location.pathname || '/';
    const isHomePage = currentPath === '/';
    const isCreatePage = currentPath === '/new' || currentPath === '/add';

    return html`
      <nav aria-label=${translate('mainNav') || 'Main navigation'}>
        <a class="left"
           href="/"
           @click=${(e)=>this.navigateTo(e,'/')}
           aria-label=${translate('employeeList') ?? 'Employee List'}>
          <img src="/assets/logo.jpeg" alt="ING" height="20" />
          <span class="brand">ING</span>
        </a>

        <div class="right">
          <a class="navlink"
             href="/"
             @click=${(e)=>this.navigateTo(e,'/')}
             aria-current=${isHomePage ? 'page' : undefined}
             title=${translate('employees') ?? 'Employees'}>
            <img src="/assets/employees-logo.png" alt="" aria-hidden="true" loading="eager" decoding="async" width="18" height="18" />
            <span>${translate('employees') ?? 'Employees'}</span>
          </a>

          <a class="navlink"
             href="/new"
             @click=${(e)=>this.navigateTo(e,'/new')}
             aria-current=${isCreatePage ? 'page' : undefined}
             title=${translate('addEmployeeNav') ?? 'Add New'}>
            <img src="/assets/add-new-logo.png" alt="" aria-hidden="true" loading="eager" decoding="async" width="18" height="18" />
            <span>${translate('addEmployeeNav') ?? 'Add New'}</span>
          </a>

          <button class="flag"
                  type="button"
                  @click=${this.toggleLanguage}
                  aria-label=${isTurkish ? 'Switch to English' : "Türkçe'ye geç"}>
            <img src=${flagSrc} alt=${flagAlt} loading="eager" decoding="async">
            <abbr>${isTurkish ? 'TR' : 'EN'}</abbr>
          </button>
        </div>
      </nav>
    `;
  }
}

customElements.define('app-nav', AppNav);
