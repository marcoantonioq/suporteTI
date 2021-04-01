'use strict';
import { toHtml as SOtoHtml } from './System.js';

const elements = {
  info_system: SOtoHtml(),
};

export function render(elID) {
  try {
    const el = document.getElementById(elID);
    el.innerHTML = elements[elID];
  } catch (e) {
    console.log(`Elemento não encontrado: ${elID}: ${e}`);
  }
}
