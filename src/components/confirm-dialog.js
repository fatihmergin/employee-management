import { LitElement, html } from 'lit';
import { confirmDialogStyles } from '../styles/confirm-dialog.styles.js';
import { t as translate, getLang, onLangChange } from '../translations.js';

export class ConfirmDialog extends LitElement {
  static styles = confirmDialogStyles;

  static properties = {
    open: { type: Boolean, reflect: true },
    title: { type: String },
    message: { type: String },
    proceedText: { type: String },
    cancelText: { type: String },
    lang: { state: true },
  };

  constructor(){
    super();
    this.open = false;
    this.title = '';
    this.message = '';
    this.proceedText = '';
    this.cancelText = '';
    this.lang = getLang();
    this._offLang = onLangChange(l => { this.lang = l; });
  }

  disconnectedCallback(){
    this._offLang?.();
    super.disconnectedCallback();
  }

  updated(changed){
    if (changed.has('open') && this.open) {
      this.updateComplete.then(()=> this.renderRoot?.querySelector('.close')?.focus());
    }
  }

  closeDialog(){
    this.open = false;
    this.dispatchEvent(new CustomEvent('cancel'));
  }

  confirmAction(){
    this.dispatchEvent(new CustomEvent('confirm'));
    this.open = false;
  }

  render(){
    if(!this.open) return html``;

    const title   = this.title       || translate('areYouSure');
    const proceed = this.proceedText || translate('proceed');
    const cancel  = this.cancelText  || translate('cancel');

    return html`
      <div class="backdrop" @click=${(e)=>{ if(e.target===e.currentTarget) this.closeDialog(); }}>
        <div class="modal" role="dialog" aria-modal="true" aria-labelledby="dlg-title">
          <div class="head">
            <div id="dlg-title" class="title">${title}</div>
            <button class="close" @click=${this.closeDialog} aria-label=${translate('close')}>✕</button>
          </div>
          <div class="body">
            <div class="msg">${this.message}</div>
          </div>
          <div class="actions">
            <button class="btn proceed" @click=${this.confirmAction}>${proceed}</button>
            <button class="btn cancel"  @click=${this.closeDialog}>${cancel}</button>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('confirm-dialog', ConfirmDialog);
