import { LitElement, html } from 'lit';
import { add, update, subscribe } from '../data/employees.js';
import { Router } from '@vaadin/router';
import './confirm-dialog.js';
import { employeeFormStyles } from '../styles/employee-form.styles.js';
import { t as translate, getLang, onLangChange } from '../translations.js';

const Departments = ['Analytics', 'Tech'];
const Positions = ['Junior', 'Medior', 'Senior'];
const normalize = (v) => (v ?? '').toString().trim();

export class EmployeeForm extends LitElement {
  static styles = employeeFormStyles;

  static properties = {
    form: { state: true },
    editId: { state: true },
    errors: { state: true },
    allItems: { state: true },
    confirmingUpdate: { state: true },
    draft: { state: true },
    lang: { state: true },
  };

  constructor() {
    super();
    this.form = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      dateOfEmployment: '',
      department: '',
      position: '',
    };
    this.editId = null;
    this.errors = {};
    this.allItems = [];
    this.unsubscribe = null;
    this.confirmingUpdate = false;
    this.draft = null;
    this.lang = getLang();
    this._offLang = onLangChange((l) => {
      this.lang = l;
    });
  }

  connectedCallback() {
    super.connectedCallback();
    this.unsubscribe = subscribe((list) => {
      this.allItems = list;
      const match = location.pathname.match(/\/edit\/([^/]+)/);
      if (match && match[1]) {
        const id = decodeURIComponent(match[1]);
        if (id !== this.editId) this.editId = id;
        const emp = list.find((x) => x.id === this.editId);
        if (emp) {
          this.form = {
            firstName: normalize(emp.firstName),
            lastName: normalize(emp.lastName),
            email: normalize(emp.email),
            phone: normalize(emp.phone),
            dateOfBirth: normalize(emp.dateOfBirth),
            dateOfEmployment: normalize(emp.dateOfEmployment),
            department: normalize(emp.department),
            position: normalize(emp.position),
          };
        }
      }
    });
  }

  disconnectedCallback() {
    this.unsubscribe?.();
    this._offLang?.();
    super.disconnectedCallback();
  }

  setField(key, value) {
    this.form = { ...this.form, [key]: value };
    if (this.errors[key]) this.validateField(key);
  }

  validateField(key) {
    const value = normalize(this.form[key]);
    let msg = '';
    if (['firstName', 'lastName', 'email'].includes(key) && !value) msg = translate('required');
    if (key === 'email' && value) {
      const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      if (!ok) msg = translate('invalidEmail');
      const clash = this.allItems.find((e) => normalize(e.email).toLowerCase() === value.toLowerCase());
      if (clash && (!this.editId || clash.id !== this.editId)) msg = translate('emailExists');
    }
    if (key === 'phone' && value && !/^\+?[0-9 ()-]{7,}$/.test(value)) msg = translate('invalidPhone');
    this.errors = { ...this.errors, [key]: msg };
    return !msg;
    }

  validateAll() {
    const keys = ['firstName', 'lastName', 'email', 'phone', 'dateOfBirth', 'dateOfEmployment'];
    const ok = keys.map((k) => this.validateField(k)).every(Boolean);
    let good = ok;
    if (!normalize(this.form.department)) {
      this.errors = { ...this.errors, department: translate('pleaseSelect') };
      good = false;
    }
    if (!normalize(this.form.position)) {
      this.errors = { ...this.errors, position: translate('pleaseSelect') };
      good = false;
    }
    return good;
  }

  submit(e) {
    e.preventDefault();
    if (!this.validateAll()) return;
    if (this.editId) {
      this.draft = { ...this.form };
      this.confirmingUpdate = true;
    } else {
      add(this.form);
      Router.go('/');
    }
  }

  confirmUpdate() {
    if (this.editId && this.draft) {
      update(this.editId, this.draft);
    }
    this.confirmingUpdate = false;
    this.draft = null;
    Router.go('/');
  }

  render() {
    const departmentValue = normalize(this.form.department);
    const positionValue = normalize(this.form.position);
    const fullName = `${normalize(this.form.firstName)} ${normalize(this.form.lastName)}`.trim();
    const deptMap = translate('departmentLabels') || {};
    const posMap = translate('positionLabels') || {};
    const deptOptions = Departments.map((v) => ({ value: v, label: deptMap[v] || v }));
    const posOptions = Positions.map((v) => ({ value: v, label: posMap[v] || v }));

    return html`
      <div class="page">
        <div class="title">${this.editId ? translate('editEmployeeTitle') : translate('addEmployeeTitle')}</div>
        <div class="card">
          <form @submit=${this.submit} novalidate>
            <div class="form-grid">
              ${this.renderField(translate('firstName'), 'firstName')}
              ${this.renderField(translate('lastName'), 'lastName')}
              ${this.renderDate(translate('dateOfEmployment'), 'dateOfEmployment')}
              ${this.renderDate(translate('dateOfBirth'), 'dateOfBirth')}
              ${this.renderField(translate('phone'), 'phone', { placeholder: '+90 532 123 45 67' })}
              ${this.renderField(translate('email'), 'email', { type: 'email' })}
              ${this.renderSelect(translate('department'), 'department', deptOptions, departmentValue)}
              ${this.renderSelect(translate('position'), 'position', posOptions, positionValue)}
              <div></div>
            </div>
            <div class="actions">
              <button type="submit" class="btn save">${translate('save')}</button>
              <button type="button" class="btn cancel" @click=${() => history.back()}>${translate('cancel')}</button>
            </div>
          </form>
        </div>
      </div>

      <confirm-dialog
        .open=${this.confirmingUpdate}
        .message=${`${translate('selectedEmployeeRecordLabel')} ${fullName || this.form.email || translate('thisRecord')} ${translate('willBeUpdated')}`}
        @confirm=${this.confirmUpdate}
        @cancel=${() => {
          this.confirmingUpdate = false;
          this.draft = null;
        }}>
      </confirm-dialog>
    `;
  }

  renderField(label, key, opts = {}) {
    const type = opts.type || 'text';
    return html`
      <div class="field">
        <span class="label">${label}</span>
        <input
          type=${type}
          .value=${this.form[key]}
          placeholder=${opts.placeholder || ''}
          @input=${(e) => this.setField(key, e.target.value)}
          ?required=${['firstName', 'lastName', 'email'].includes(key)}
        />
        ${this.errors[key] ? html`<div class="error">${this.errors[key]}</div>` : ''}
      </div>
    `;
  }

  renderDate(label, key) {
    return html`
      <div class="field">
        <span class="label">${label}</span>
        <input
          type="date"
          .value=${this.form[key]}
          @input=${(e) => this.setField(key, e.target.value)}
          required
        />
      </div>
    `;
  }

  renderSelect(label, key, options, val) {
    return html`
      <div class="field">
        <span class="label">${label}</span>
        <div class="select-wrap">
          <select .value=${val} @change=${(e) => this.setField(key, e.target.value)} required>
            <option value="">${translate('pleaseSelect')}</option>
            ${options.map((o) => html`<option value=${o.value} ?selected=${val === o.value}>${o.label}</option>`)}
          </select>
        </div>
        ${this.errors[key] ? html`<div class="error">${this.errors[key]}</div>` : ''}
      </div>
    `;
  }
}

customElements.define('employee-form', EmployeeForm);
