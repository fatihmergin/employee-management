# Employee Management

A small employee management SPA built with **Lit** web components and **Vaadin Router**.  
Includes table & card views, debounced search, pagination, add/edit/delete flows, **EN/TR localization**, and **localStorage** persistence.

---

## ✨ Features
- Employee list in **Table** and **Cards** (toggle)  
- **Search** with 250 ms debounce  
- **Pagination**  
- **Add / Edit / Delete** (confirmation dialogs for edit & delete)  
- **Form validation** (required fields, email format, unique email, phone)  
- **Localization**: English & Turkish (instant switch)  
- **Responsive layout** (no CSS framework)  
- **Persistence** via `localStorage`

---

## 🛠 Tech Stack
- **Lit 3** (Web Components, Shadow DOM)  
- **Vaadin Router** (client-side routing)  
- **@web/dev-server** (ESM dev server)  
- **Vitest + jsdom** (unit tests)  

---

## ⚙️ Install

### Prerequisites
- Node.js 18+  
- npm 9+  

Check versions:
```bash
node -v
npm -v
```

### Using Git (recommended)
```bash
git clone https://github.com/fatihmergin/employee-management.git
cd employee-management
npm i
```

### Using ZIP
1. On GitHub click **Code → Download ZIP**  
2. Extract the archive and open a terminal in the extracted folder  
3. Install dependencies:
```bash
npm i
```

---

## 🚀 Run (dev)
```bash
npm run dev
```

Open the URL printed in the terminal (typically [http://localhost:8000](http://localhost:8000))  
Entry point: `index.html → src/app-root.js`  

If you downloaded as ZIP:
```bash
npm i && npm run dev
```

---

## 🧪 Testing & Coverage
- Unit tests for **components, router, data store, translations**  
- Tools: **Vitest + jsdom**  
- Coverage target: **≥ 85%** (current: ~99%)  

Run tests:
```bash
npm run test:run
npm run coverage
```

Open the HTML report:
```
coverage/index.html
```

---

## 📜 Available Scripts
```bash
npm run dev        # start dev server (@web/dev-server)
npm run start      # alias of dev
npm run test:run   # run unit tests (vitest)
npm run coverage   # generate coverage report (coverage/)
```

---

## 📂 Project Structure
```
src/
  app-root.js
  router.js
  translations.js
  styles/
    app-root.styles.js
    app-nav.styles.js
    confirm-dialog.styles.js
    employee-form.styles.js
    employee-list.styles.js
  components/
    app-nav.js
    confirm-dialog.js
    employee-form.js
    employee-list.js
  data/
    employees.js
assets/
  logo.jpeg
  employees-logo.png
  add-new-logo.png
  turkish.png
  english.png
index.html
```

---

## 🌍 Localization (EN/TR)
- Language follows the root tag: `<html lang="en">` or `<html lang="tr">`.  
- Toggle language instantly via the navbar flag button.  
- Canonical values stored in state:  
  - Department: **Analytics | Tech**  
  - Position: **Junior | Medior | Senior**  
- Labels localized in `src/translations.js`.  

Programmatic switch:
```js
import { setLang } from './src/translations.js';
setLang('tr'); // or 'en'
```

---

## 💾 State & Persistence
- Reactive store in `src/data/employees.js`:  
  - `subscribe(fn)`, `add(emp)`, `update(id, patch)`, `remove(id)`  
- Data persists to **localStorage** under the key `employeesList`.  

Reset data:
```js
localStorage.removeItem('employeesList');
```

---

## ♿ Accessibility
- Keyboard focus styles (`:focus-visible`)  
- ARIA labels on search and dialogs  
- Buttons fully keyboard-operable  
- On small screens: table scrolls horizontally, preserving columns  

---

> ⚡ This case-study app has **no backend**; all persistence is client-side.
