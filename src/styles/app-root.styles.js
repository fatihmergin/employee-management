import { css } from 'lit';

export const appRootStyles = css`
  :host{
    display:block;
    background:#f7f7f8;
    min-height:100vh;
  }
  #outlet{
    min-height:calc(100vh - 56px);
  }
`;
