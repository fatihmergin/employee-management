const storageKey = 'employeesList';

const seedData = [
  { id: '1', firstName: 'Fatih',  lastName: 'Ergin', email: 'fatih@example.com',   phone: '+90123456789', department: 'Tech',      position: 'Senior',  dateOfBirth: '1815-12-10', dateOfEmployment: '1843-01-01' },
  { id: '2', firstName: 'Enes',lastName: 'Aydin',   email: 'enes@example.com', phone: '+90125550123', department: 'Analytics', position: 'Senior',  dateOfBirth: '1906-12-09', dateOfEmployment: '1952-06-01' }
];

function readStorage(){
  try{
    const raw = localStorage.getItem(storageKey);
    return raw ? JSON.parse(raw) : seedData.slice();
  }catch{
    return seedData.slice();
  }
}

let employeesList = readStorage();
const subscribers = new Set();
const snapshot = () => employeesList.map(e => ({ ...e }));
const notify = () => subscribers.forEach(fn => fn(snapshot()));
const persist = () => { try { localStorage.setItem(storageKey, JSON.stringify(employeesList)); } catch {} };

export function subscribe(fn){
  subscribers.add(fn);
  fn(snapshot());
  return () => subscribers.delete(fn);
}

export function add(emp){
  const id = emp?.id ?? (globalThis.crypto?.randomUUID?.() ?? String(Date.now()));
  employeesList = [{ ...emp, id }, ...employeesList];
  persist(); notify();
}

export function update(id, patch){
  employeesList = employeesList.map(e => e.id === id ? { ...e, ...patch, id: e.id } : e);
  persist(); notify();
}

export function remove(id){
  employeesList = employeesList.filter(e => e.id !== id);
  persist(); notify();
}
  