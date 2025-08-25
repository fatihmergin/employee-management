import { css } from 'lit';

export const confirmDialogStyles = css`
  :host { 
    --brand:#ff6200; --brand-600:#e45700; 
    --ink:#0f172a; --line:#e5e7eb; --purple:#5146d8; 
  }

  .backdrop{
    position:fixed; inset:0; background:rgba(15,23,42,.45);
    display:flex; align-items:center; justify-content:center; z-index:9999;
  }
  .modal{
    width:min(520px, calc(100% - 24px));
    background:#fff; border-radius:12px; box-shadow:0 20px 60px rgba(0,0,0,.2);
    border:1px solid #eef0f4; overflow:hidden;
  }
  .head{
    display:flex; align-items:center; justify-content:space-between;
    padding:14px 18px 6px;
  }
  .title{ font-size:20px; font-weight:800; color:var(--brand); }
  .close{
    border:none; background:transparent; color:var(--brand);
    font-size:20px; line-height:1; cursor:pointer; padding:6px;
  }
  .body{ padding:0 18px 6px; color:#374151; }
  .msg{ margin:6px 0 2px; }

  .actions{
    display:flex; flex-direction:column; gap:10px; padding:14px 18px 18px;
  }
  .btn{
    width:100%; height:40px; border-radius:10px; font-weight:700; cursor:pointer;
  }
  .proceed{ background:var(--brand); color:#fff; border:none; }
  .proceed:hover{ background:var(--brand-600); }
  .cancel{ background:#fff; color:#4b5563; border:2px solid #c7c9ef; }
  .cancel:hover{ background:#f3f4ff; }
`;
