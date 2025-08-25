import { css } from 'lit';

export const employeeListStyles = css`
  :host{
    --brand:#ff6200;
    --line:#e5e7eb;
  }

  .page{ padding:32px 24px; max-width:1600px; margin:0 auto; }
  .header{ display:flex; align-items:center; justify-content:space-between; margin:8px 0 12px; gap:12px; flex-wrap:wrap; }
  .title{ font-size:22px; font-weight:700; color:var(--brand); margin:0; }
  .header-right{ display:flex; align-items:center; gap:12px; min-width:0; }

  .search{
    position:relative; display:inline-flex; align-items:center;
    background:#fff; border:1px solid var(--line);
    border-radius:12px; height:38px; padding:0 12px 0 34px;
    box-shadow:0 1px 2px rgba(17,24,39,.03);
  }
  .search input{
    border:none; outline:none; background:transparent;
    width:clamp(160px,32vw,280px);
    color:#0f172a; min-width:0; font-size:16px;
  }
  .search svg{ position:absolute; left:10px; width:16px; height:16px; color:#94a3b8; }
  .search input::placeholder{ color:#9aa2af; }

  .toggle{ display:inline-flex; gap:8px; padding:6px; border:1px solid var(--line); border-radius:12px; background:#fff; }
  .iconbtn{ border:none; background:transparent; padding:6px; border-radius:8px; cursor:pointer; }
  .iconbtn[aria-pressed="true"]{ background:var(--brand); color:#fff; }
  .icon{ width:18px; height:18px; display:inline-block; vertical-align:middle; }

  .card{
    background:#fff; border:1px solid var(--line); border-radius:14px;
    box-shadow:0 6px 18px rgba(17,24,39,.06); overflow:hidden;
  }

  .table-scroll{
    overflow-x:auto; overflow-y:hidden;
    -webkit-overflow-scrolling:touch;
    max-width:100%;
    touch-action:pan-x;
    overscroll-behavior-x:contain;
  }
  .table-scroll table{
    min-width:960px;
    width:100%;
    border-collapse:collapse;
  }

  thead th{
    font-weight:600; color:var(--brand); background:#fff;
    padding:14px 12px; text-align:left; font-size:13px;
    border-bottom:1px solid var(--line); white-space:nowrap;
  }
  tbody td{
    padding:18px 12px; border-bottom:1px solid var(--line);
    color:#0f172a; font-size:14px; vertical-align:top;
  }
  tbody tr:hover{ background:#fafafa; }
  .checkbox{ width:44px; }

  .actions{ width:120px; text-align:right; white-space:nowrap; }
  .actions .iconbtn{ padding:6px; margin-left:6px; color:var(--brand); background:transparent; border:none; cursor:pointer; }
  .actions .iconbtn.delete{ color:#ff6200; }
  .actions .iconbtn .icon{ width:18px; height:18px; display:inline-block; }

  .grid{ display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:24px; }
  .emp-card{
    background:#fff; border:1px solid var(--line); border-radius:10px;
    box-shadow:0 6px 16px rgba(17,24,39,.08); padding:18px 20px;
  }
  .row{ display:grid; grid-template-columns:1fr 1fr; gap:6px 24px; }
  .cell{ display:flex; flex-direction:column; gap:6px; min-width:0; }
  .label{ color:#9aa2af; font-size:12px; }
  .value{ color:#0f172a; font-size:14px; font-weight:600; overflow-wrap:anywhere; }
  .card-actions{ margin-top:14px; display:flex; gap:10px; flex-wrap:wrap; }
  .btn{ display:inline-flex; align-items:center; gap:8px; border:none; border-radius:8px; padding:8px 12px; cursor:pointer; color:#fff; font-weight:600; touch-action:manipulation; }
  .btn svg{ width:16px; height:16px; }
  .btn-edit{ background:#5146d8; }
  .btn-edit:hover{ filter:brightness(.95); }
  .btn-del{ background:#ff6200; }
  .btn-del:hover{ filter:brightness(.95); }

  .pager{ display:flex; align-items:center; justify-content:center; gap:8px; padding:14px 0 18px; flex-wrap:wrap; }
  .pagebtn,.pagenum{ border:none; background:transparent; padding:6px 8px; cursor:pointer; color:#0f172a; }
  .pagenum{ width:28px; height:28px; border-radius:999px; display:grid; place-items:center; }
  .pagenum.active{ background:var(--brand); color:#fff; }
  .dots{ color:#9aa2af; }

  @media (max-width:1100px){
    .grid{ grid-template-columns:1fr; }
  }
  @media (max-width:900px){
    .col-hide-sm{ display:none; }
    tbody td{ padding:14px 10px; }
  }
  @media (max-width:680px){
    .page{ padding:20px 14px; }
    .header{ gap:10px; }
    .search{ width:100%; }
    .search input{ width:100%; }
    .header-right{ width:100%; justify-content:space-between; }
  }
  @media (max-width:520px){
    .row{ grid-template-columns:1fr; }
    .btn{ width:100%; justify-content:center; }
  }
  @media (max-width:360px){
    .pagenum{ display:none; }
    .pagenum.active{ display:grid; }
  }

  @media (max-width:900px){
    .table-scroll .col-hide-sm{ display:table-cell; }
  }
`;
