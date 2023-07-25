import frappe from '@/assets/cattpuccin/frappe.css' assert { type: 'css' };
import latte from '@/assets/cattpuccin/latte.css' assert { type: 'css' };
import macchiato from '@/assets/cattpuccin/macchiato.css' assert { type: 'css' };
import mocha from '@/assets/cattpuccin/mocha.css' assert { type: 'css' };

const palette = 'frappe';

export function loadPalette() {
  const styleSheet = new CSSStyleSheet();
  switch (palette) {
    case 'frappe':
      styleSheet.replaceSync(frappe);
      break;
    case 'latte':
      styleSheet.replaceSync(latte);
      break;
    case 'macchiato':
      styleSheet.replaceSync(macchiato);
      break;
    case 'mocha':
      styleSheet.replaceSync(mocha);
      break;
    default:
      styleSheet.replaceSync(frappe);
      break;
  }

  document.adoptedStyleSheets = [styleSheet];
}
