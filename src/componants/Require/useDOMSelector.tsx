import { useEffect, useState } from 'react';

// usefull for dev purpose when React refresh mount or unmount components
let useDOMSelectorMem = document.querySelector('#useDOMSelectorMem') as HTMLDivElement;
if (!useDOMSelectorMem) {
  document.body.insertAdjacentHTML('beforeend', `<div id="useDOMSelectorMem" style="display: none"></div>`);
  useDOMSelectorMem = document.querySelector('#useDOMSelectorMem') as HTMLDivElement;
}

const MEM = new Map();
window.MEM = MEM;


// For selecting a single element
export function useDOMSelector(selector, cnCss = 'cn-moved') {
  const [uniq, setUniq] = useState<string>('blank');
  const [element, setElement] = useState<HTMLDivElement>(null);

  useEffect(() => {

    // Select the element and add the unique class to it
    let elementBySelector;

    if (MEM.has(selector)) {
      elementBySelector = document.querySelector(`[cn-uniq="${MEM.get(selector)}"]`) as HTMLDivElement;
    }

    if (!elementBySelector) {

      const uniqId = Math.random().toString(36).substring(2, 9);
      setUniq(uniqId);
      MEM.set(selector, uniqId);

      const selectedElement = document.querySelector(selector) as HTMLDivElement;
      if (selectedElement) {
        selectedElement.setAttribute('cn-uniq', uniqId);
        selectedElement.setAttribute('cn-css', cnCss);
        selectedElement.classList.add('cn-gradio-pristine');
        setElement(selectedElement);
      }
      else {
        throw new Error(`Element not found for selector: ${selector}`);
      }
    }

    return () => {
      if (element && element.parentNode) {
        useDOMSelectorMem.appendChild(element);
      }
    };
  }, [selector]); // added uniq as a dependency as well

  return element;
}
