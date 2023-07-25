export const findClassStartingWith = (element, prefix) => [...element.classList].find(className => className.startsWith(prefix));

// Debounce function
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export const removeExistingCss = debounce(() => {

  // CozyLogger.debug(`Pruning CSS links`);

  // Get the base URL
  const baseUrl = window.location.origin;

  // Get all link elements in the header
  const linkElements = document.querySelectorAll('link[rel="stylesheet"]');

  // Filter the link elements whose href starts with the base URL followed by "/assets"
  const svelteLinkElements = Array.from(linkElements).filter(link =>
    link.href.startsWith(`${baseUrl}/assets`)
  );

  // Remove the matching link elements from the header
  // CozyLogger.debug(`Removing ${svelteLinkElements.length} Svelte CSS links`)
  // svelteLinkElements.forEach(link => link.parentNode.removeChild(link));

  // http://127.0.0.1:5173/file=style.css

  // Filter the default link elements whose href starts with the base URL followed by "/file=style.css"
  const defaultLinkElements = Array.from(linkElements).filter(link =>
    // link.href.startsWith(`${baseUrl}/file=style.css`)
    // ||
    // link.href.startsWith(`file=style.css`)
    // ||
    link.href.startsWith(`${baseUrl}/theme.css`)
    ||
    link.href.startsWith(`theme.css`)
    // ||
    // link.href.startsWith(`${baseUrl}/assets/index.css`)
    // ||
    // link.href.startsWith(`assets/index.css`)
  );
  // CozyLogger.debug(`Removing ${defaultLinkElements.length} default CSS links`)
  defaultLinkElements.forEach(link => link.parentNode.removeChild(link));

  document.querySelectorAll('div').forEach(l => l.style.minWidth = '');
  document.querySelectorAll('div').forEach(l => l.style.flexGrow = '');
},100);

export function  observeOnLinks() {
  // setup a mutation observer to watch for new link elements
  // Create a new observer instance
  let observer = new MutationObserver((mutations) => {
    // Loop over each mutation that just occured
    for(let mutation of mutations) {
      // If the mutation was the addition of a new node
      if(mutation.addedNodes) {
        // Loop over each added node
        for(let node of mutation.addedNodes) {
          // If the added node is a <link> element
          if(node.nodeName.toLowerCase() === 'link') {
            // Call our function
            removeExistingCss(node);
          }
        }
      }
    }
  });

// Start observing the document with the configured parameters
  observer.observe(document, { childList: true, subtree: true });
}
