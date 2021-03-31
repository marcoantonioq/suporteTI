'use strict';
import { SO } from './System.js';

const elements = {
  info_system: SO.toHtml(),
};

export function render(elID) {
  try {
    const el = document.getElementById(elID);
    el.innerHTML = elements[elID];
  } catch (e) {
    console.log(`Elemento não existe: ${elID}: ${e}`);
  }
}
