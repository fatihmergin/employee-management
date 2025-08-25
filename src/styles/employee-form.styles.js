import { css } from 'lit';

export const employeeFormStyles = css`
  :host{
    --brand:#ff6200;
    --brand-600:#e45700;
    --line:#e5e7eb;
    --txt:#0f172a;
    --muted:#64748b;
    --calendar-filter: invert(47%) sepia(88%) saturate(2329%) hue-rotate(2deg) brightness(101%) contrast(102%);
  }

  .page{ padding:32px 24px; max-width:1160px; margin:0 auto; }
  .title{ font-size:22px; font-weight:700; color:var(--brand); margin:6px 0 16px; }

  .card{
    background:#fff;
    border:1px solid var(--line);
    border-radius:14px;
    box-shadow:0 6px 18px rgba(17,24,39,.06);
    padding:24px 24px 32px;
  }

  .form-grid{
    display:grid;
    grid-template-columns:repeat(3,minmax(0,1fr));
    gap:28px 32px;
    margin-top:6px;
  }

  .field{ display:flex; flex-direction:column; gap:8px; }
  .label{ font-size:13px; color:#374151; }

  input, select{
    width:100%;
    height:38px;
    box-sizing:border-box;
    padding:6px 12px;
    border:1px solid var(--line);
    border-radius:6px;
    background:#fff;
    color:var(--txt);
    outline:none;
  }

  input:focus, select:focus{
    border-color:var(--brand);
    box-shadow:0 0 0 2px rgba(255,98,0,.15);
  }

  input[type="date"]::-webkit-calendar-picker-indicator{
    opacity:1;
    filter:var(--calendar-filter);
  }

  .select-wrap{ position:relative; }
  .select-wrap select{ appearance:none; padding-right:38px; cursor:pointer; }

  .select-wrap::after{
    content:"";
    position:absolute;
    right:12px;
    top:50%;
    transform:translateY(-50%);
    width:0; height:0;
    border-left:6px solid transparent;
    border-right:6px solid transparent;
    border-top:7px solid var(--muted);
    pointer-events:none;
  }

  .select-wrap:hover::after{ border-top-color:var(--brand); }

  .actions{ display:flex; justify-content:center; gap:28px; margin-top:28px; }

  .btn{
    min-width:220px;
    height:40px;
    border-radius:10px;
    cursor:pointer;
    font-weight:600;
  }

  .save{ background:var(--brand); color:#fff; border:none; }
  .save:hover{ background:var(--brand-600); }

  .cancel{ background:transparent; color:#4b5563; border:2px solid #c7c9ef; }
  .cancel:hover{ background:#f3f4ff; }

  .error{ color:#b91c1c; font-size:12px; margin-top:6px; }

  @media (max-width:1100px){
    .form-grid{ grid-template-columns:repeat(2,minmax(0,1fr)); }
  }

  @media (max-width:720px){
    .form-grid{ grid-template-columns:1fr; }
  }

  @media (max-width:560px){
    .actions{
      display:flex;
      flex-wrap:wrap;
      gap:10px;
      justify-content:stretch;
      width:100%;
    }
    .btn{
      min-width:0;
      flex:1 1 calc(50% - 10px);
      height:44px;
    }
  }

  @media (max-width:380px){
    .btn{ flex-basis:100%; }
  }
`;
