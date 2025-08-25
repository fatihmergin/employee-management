import { css } from 'lit';

export const navStyles = css`
  :host{ display:block; }

  nav{
    height:56px;
    display:flex; align-items:center; justify-content:space-between;
    padding:0 16px;
    background:#fff;
    position:sticky; top:0; z-index:1000;
    gap:12px;
    box-shadow:0 1px 0 rgba(0,0,0,.06);
  }

  .left{
    display:flex; align-items:center; gap:10px;
    text-decoration:none;
  }
  .brand{ font-weight:700; color:#ff6200; letter-spacing:.2px; }

  .right{
    display:flex; align-items:center; gap:16px;
    min-width:0;
  }

  a{
    text-decoration:none;
    color:#ff6200;
    font-weight:500;
    border:0;
  }
  a:hover{ opacity:.85; }

  .right .navlink[aria-current="page"] span{ }
  .right .navlink{
    display:inline-flex; align-items:center; gap:8px;
  }
  .right .navlink img{
    width:18px; height:18px; display:block; object-fit:contain; margin-top:5px;
  }
  .right .navlink span{ white-space:nowrap; }

  .flag{
    cursor:pointer; border:1px solid #eee; background:#fff; font-size:14px;
    display:inline-flex; align-items:center; gap:8px; padding:6px 10px;
    border-radius:10px;
  }
  .flag img{
    width:20px; height:14px; object-fit:cover; border-radius:3px; display:block;
  }
  .flag abbr{ text-decoration:none; color:#111827; font-weight:600; }

  :where(a,button):focus-visible{
    outline:2px solid #ff6200; outline-offset:2px;
  }

  @media (max-width:520px){
    nav{ padding:0 12px; }
    .right{ gap:10px; }
    .right .navlink span{ font-size:14px; }
    .right .navlink img{ width:16px; height:16px; }
    .brand{ font-size:14px; }
    .flag{ padding:5px 8px; }
  }
`;
