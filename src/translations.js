const DICT = {
  en: {
    departmentLabels: { Analytics: 'Analytics', Tech: 'Tech' },
    positionLabels: { Junior: 'Junior', Medior: 'Medior', Senior: 'Senior' },

    employees: 'Employees',
    addEmployeeNav: 'Add New',
    employeeList: 'Employee List',
    employeList: 'Employee List',

    addEmployeeTitle: 'Add Employee',
    editEmployeeTitle: 'Edit Employee',

    firstName: 'First Name',
    lastName: 'Last Name',
    dateOfEmployment: 'Date of Employment',
    dateOfBirth: 'Date of Birth',
    phone: 'Phone',
    email: 'Email',
    department: 'Department',
    position: 'Position',
    actions: 'Actions',

    pleaseSelect: 'Please Select',
    required: 'Required',
    invalidEmail: 'Invalid email',
    emailExists: 'Email already exists',
    invalidPhone: 'Invalid phone',

    save: 'Save',
    cancel: 'Cancel',
    edit: 'Edit',
    delete: 'Delete',
    proceed: 'Proceed',

    areYouSure: 'Are you sure?',
    close: 'Close',
    searchPlaceholder: 'Search...',
    searchAria: 'Search employees',
    viewList: 'List',
    viewTable: 'Table',
    prev: 'Prev',
    next: 'Next',

    selectedEmployeeRecordLabel: 'Selected Employee record of',
    willBeUpdated: 'will be updated',
    willBeDeleted: 'will be deleted',
    thisRecord: 'this record',

    langTR: 'Türkçe',
    langEN: 'English',
    switchToEnglish: 'Switch to English',
    switchToTurkish: 'Switch to Turkish',
  },

  tr: {
    departmentLabels: { Analytics: 'Analitik', Tech: 'Teknoloji' },
    positionLabels: { Junior: 'Junior - Başlangıç Seviye', Medior: 'Orta Düzey', Senior: 'Kıdemli' },

    employees: 'Personeller',
    addEmployeeNav: 'Ekle',
    employeeList: 'Personel Listesi',
    employeList: 'Personel Listesi',

    addEmployeeTitle: 'Çalışan Ekle',
    editEmployeeTitle: 'Çalışanı Düzenle',

    firstName: 'Ad',
    lastName: 'Soyad',
    dateOfEmployment: 'İşe Başlama Tarihi',
    dateOfBirth: 'Doğum Tarihi',
    phone: 'Telefon',
    email: 'E-posta',
    department: 'Departman',
    position: 'Pozisyon',
    actions: 'İşlemler',

    pleaseSelect: 'Lütfen seçin',
    required: 'Zorunlu alan',
    invalidEmail: 'Geçersiz e-posta',
    emailExists: 'E-posta zaten mevcut',
    invalidPhone: 'Geçersiz telefon',

    save: 'Kaydet',
    cancel: 'Vazgeç',
    edit: 'Düzenle',
    delete: 'Sil',
    proceed: 'Onayla',

    areYouSure: 'Emin misiniz?',
    close: 'Kapat',
    searchPlaceholder: 'Ara...',
    searchAria: 'Çalışanlarda ara',
    viewList: 'Liste',
    viewTable: 'Tablo',
    prev: 'Önceki',
    next: 'Sonraki',

    selectedEmployeeRecordLabel: 'Seçilen çalışan kaydı',
    willBeUpdated: 'güncellenecek',
    willBeDeleted: 'silinecek',
    thisRecord: 'bu kayıt',

    langTR: 'Türkçe',
    langEN: 'İngilizce',
    switchToEnglish: "İngilizce'ye geç",
    switchToTurkish: "Türkçe'ye geç",
  }
};

const LANG_EVENT = 'app-lang-changed';

export function getLang(){
  return document.documentElement.lang === 'tr' ? 'tr' : 'en';
}

export function setLang(lang){
  const next = lang === 'tr' ? 'tr' : 'en';
  if (document.documentElement.lang !== next){
    document.documentElement.lang = next;
    window.dispatchEvent(new CustomEvent(LANG_EVENT, { detail: { lang: next } }));
  }
}

export function onLangChange(handler){
  const fn = (e) => handler(e.detail.lang);
  window.addEventListener(LANG_EVENT, fn);
  return () => window.removeEventListener(LANG_EVENT, fn);
}

export function t(key){
  const l = getLang();
  const pack = DICT[l];
  if (pack && pack[key] !== undefined) return pack[key];
  if (DICT.en[key] !== undefined) return DICT.en[key];
  return key;
}
