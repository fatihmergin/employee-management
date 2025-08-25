import { LitElement, html } from 'lit';
import { subscribe, remove } from '../data/employees.js';
import { Router } from '@vaadin/router';
import './confirm-dialog.js';
import { employeeListStyles } from '../styles/employee-list.styles.js';
import { t as translate, getLang, onLangChange } from '../translations.js';

export class EmployeeList extends LitElement {
  static styles = employeeListStyles;

  static properties = {
    items: { state: true },
    page: { state: true },
    pageSize: { state: true },
    view: { state: true },
    query: { state: true },
    pendingDelete: { state: true },
    lang: { state: true },
  };

  constructor() {
    super();
    this.items = [];
    this.page = 1;
    this.pageSize = 10;
    this.view = 'list';
    this.query = '';
    this.pendingDelete = null;
    this._unsub = subscribe((s) => {
      this.items = s;
      this.page = 1;
    });
    this.searchDebounce = null;
    this.lang = getLang();
    this._offLang = onLangChange((l) => {
      this.lang = l;
    });
  }

  disconnectedCallback() {
    this._unsub?.();
    this._offLang?.();
    super.disconnectedCallback();
  }

  get filtered() {
    const q = this.query.trim().toLowerCase();
    if (!q) return this.items;
    return this.items.filter((e) => {
      const hay = [e.firstName, e.lastName, e.email, e.phone, e.department, e.position].map((v) =>
        (v ?? '').toString().toLowerCase()
      );
      return hay.some((v) => v.includes(q));
    });
  }

  get pageCount() {
    return Math.max(1, Math.ceil(this.filtered.length / this.pageSize));
  }

  get paged() {
    const start = (this.page - 1) * this.pageSize;
    return this.filtered.slice(start, start + this.pageSize);
  }

  goToPage(p) {
    this.page = Math.min(this.pageCount, Math.max(1, p));
  }

  formatPhone(p) {
    if (!p) return '';
    return p.replace(/(\+?\d{2})(\d{3})(\d{3})(\d{2})(\d{2})/, '$1 $2 $3 $4 $5');
  }

  getDepartmentLabel(v) {
    const map = translate('departmentLabels') || {};
    return map[v] || v || '';
  }

  getPositionLabel(v) {
    const map = translate('positionLabels') || {};
    return map[v] || v || '';
  }

  iconSearch() {
    return html`<svg viewBox="0 0 24 24" fill="currentColor"><path
          d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79L20 21.5 21.5 20l-6-6zM9.5 14C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
        /></svg>`;
  }
  iconList() {
    return html`<svg class="icon" viewBox="0 0 24 24" fill="currentColor"><path
          d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z"
        /></svg>`;
  }
  iconGrid() {
    return html`<svg class="icon" viewBox="0 0 24 24" fill="currentColor"><path
          d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z"
        /></svg>`;
  }
  iconEdit() {
    return html`<svg class="icon" viewBox="0 0 24 24" fill="currentColor"><path
          d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zm18-.92a1 1 0 000-1.41l-2.12-2.12a1 1 0 00-1.41 0l-1.01 1.01 3.75 3.75 1.01-1.01z"
        /></svg>`;
  }
  iconTrash() {
    return html`<svg class="icon" viewBox="0 0 24 24" fill="currentColor"><path
          d="M9 3h6l1 1h4v2H4V4h4l1-1zm1 6h2v9h-2V9zm4 0h2v9h-2V9zM6 9h2v9H6V9z"
        /></svg>`;
  }
  iconChevronLeft() {
    return html`<svg class="icon" viewBox="0 0 24 24" fill="currentColor"><path
          d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z"
        /></svg>`;
  }
  iconChevronRight() {
    return html`<svg class="icon" viewBox="0 0 24 24" fill="currentColor"><path
          d="M8.59 16.59 10 18l6-6-6-6-1.41 1.41L13.17 12z"
        /></svg>`;
  }

  onSearchInput(e) {
    const val = e.target.value;
    clearTimeout(this.searchDebounce);
    this.searchDebounce = setTimeout(() => {
      this.query = val;
      this.page = 1;
    }, 250);
  }

  startDeleteConfirmation(emp) {
    this.pendingDelete = emp;
  }

  cancelDeleteConfirmation() {
    this.pendingDelete = null;
  }

  confirmDeleteAction() {
    if (this.pendingDelete) {
      remove(this.pendingDelete.id);
      this.pendingDelete = null;
    }
  }

  renderListTable() {
    return html`
      <div class="card">
        <div class="table-scroll">
          <table>
            <thead>
              <tr>
                <th class="checkbox"><input type="checkbox" /></th>
                <th>${translate('firstName')}</th>
                <th>${translate('lastName')}</th>
                <th class="col-hide-sm">${translate('dateOfEmployment')}</th>
                <th class="col-hide-sm">${translate('dateOfBirth')}</th>
                <th class="col-hide-sm">${translate('phone')}</th>
                <th>${translate('email')}</th>
                <th class="col-hide-sm">${translate('department')}</th>
                <th class="col-hide-sm">${translate('position')}</th>
                <th class="actions">${translate('actions')}</th>
              </tr>
            </thead>
            <tbody>
              ${this.paged.map(
                (e) => html`
                  <tr>
                    <td class="checkbox"><input type="checkbox" /></td>
                    <td>${e.firstName}</td>
                    <td>${e.lastName}</td>
                    <td class="col-hide-sm">${e.dateOfEmployment || ''}</td>
                    <td class="col-hide-sm">${e.dateOfBirth || ''}</td>
                    <td class="col-hide-sm">${this.formatPhone(e.phone)}</td>
                    <td>${e.email}</td>
                    <td class="col-hide-sm">${this.getDepartmentLabel(e.department)}</td>
                    <td class="col-hide-sm">${this.getPositionLabel(e.position)}</td>
                    <td class="actions">
                      <button class="iconbtn" .title=${translate('edit')} @click=${() =>
                        Router.go('/edit/' + e.id)}>${this.iconEdit()}</button>
                      <button class="iconbtn delete" .title=${translate('delete')} @click=${() =>
                        this.startDeleteConfirmation(e)}>${this.iconTrash()}</button>
                    </td>
                  </tr>
                `
              )}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  renderCardGrid() {
    return html`
      <div class="grid">
        ${this.paged.map(
          (e) => html`
            <div class="emp-card">
              <div class="row">
                <div class="cell"><span class="label">${translate('firstName')}</span><span class="value">${e.firstName}</span></div>
                <div class="cell"><span class="label">${translate('lastName')}</span><span class="value">${e.lastName}</span></div>
                <div class="cell"><span class="label">${translate('dateOfEmployment')}</span><span class="value">${e.dateOfEmployment || ''}</span></div>
                <div class="cell"><span class="label">${translate('dateOfBirth')}</span><span class="value">${e.dateOfBirth || ''}</span></div>
                <div class="cell"><span class="label">${translate('phone')}</span><span class="value">${this.formatPhone(e.phone)}</span></div>
                <div class="cell"><span class="label">${translate('email')}</span><span class="value">${e.email}</span></div>
                <div class="cell"><span class="label">${translate('department')}</span><span class="value">${this.getDepartmentLabel(e.department)}</span></div>
                <div class="cell"><span class="label">${translate('position')}</span><span class="value">${this.getPositionLabel(e.position)}</span></div>
              </div>
              <div class="card-actions">
                <button class="btn btn-edit" @click=${() => Router.go('/edit/' + e.id)}>${this.iconEdit()} ${translate('edit')}</button>
                <button class="btn btn-del" @click=${() => this.startDeleteConfirmation(e)}>${this.iconTrash()} ${translate('delete')}</button>
              </div>
            </div>
          `
        )}
      </div>
    `;
  }

  renderPager() {
    const nums = [this.page - 1, this.page, this.page + 1].filter((n) => n >= 1 && n <= this.pageCount);
    return html`
      <div class="pager">
        <button class="pagebtn" @click=${() => this.goToPage(this.page - 1)} aria-label=${translate('prev')}>${this.iconChevronLeft()}</button>
        ${nums[0] > 1
          ? html`<button class="pagenum" @click=${() => this.goToPage(1)}>1</button><span class="dots">…</span>`
          : ''}
        ${nums.map(
          (n) =>
            html`<button class="pagenum ${n === this.page ? 'active' : ''}" @click=${() => this.goToPage(n)}>${n}</button>`
        )}
        ${nums.at(-1) < this.pageCount
          ? html`<span class="dots">…</span><button class="pagenum" @click=${() => this.goToPage(this.pageCount)}>${this.pageCount}</button>`
          : ''}
        <button class="pagebtn" @click=${() => this.goToPage(this.page + 1)} aria-label=${translate('next')}>${this.iconChevronRight()}</button>
      </div>
    `;
  }

  render() {
    const deleteName = this.pendingDelete
      ? `${this.pendingDelete.firstName ?? ''} ${this.pendingDelete.lastName ?? ''}`.trim() ||
        this.pendingDelete.email ||
        translate('thisRecord')
      : '';

    return html`
      <div class="page">
        <div class="header">
          <h2 class="title">${translate('employeeList')}</h2>
          <div class="header-right">
            <label class="search" aria-label=${translate('searchAria')}>
              ${this.iconSearch()}
              <input
                type="text"
                .placeholder=${translate('searchPlaceholder')}
                .value=${this.query}
                @input=${this.onSearchInput}
              />
            </label>
            <div class="toggle" role="group" aria-label="view toggle">
              <button class="iconbtn" aria-pressed=${this.view === 'list'} @click=${() => (this.view = 'list')} .title=${translate('viewList')}>${this.iconList()}</button>
              <button class="iconbtn" aria-pressed=${this.view === 'table'} @click=${() => (this.view = 'table')} .title=${translate('viewTable')}>${this.iconGrid()}</button>
            </div>
          </div>
        </div>

        ${this.view === 'list' ? this.renderListTable() : this.renderCardGrid()}
        ${this.renderPager()}

        <confirm-dialog
          .open=${!!this.pendingDelete}
          .message=${this.pendingDelete
            ? `${translate('selectedEmployeeRecordLabel')} ${deleteName || translate('thisRecord')} ${translate('willBeDeleted')}`
            : ''}
          @confirm=${this.confirmDeleteAction}
          @cancel=${this.cancelDeleteConfirmation}>
        </confirm-dialog>
      </div>
    `;
  }
}

customElements.define('employee-list', EmployeeList);
