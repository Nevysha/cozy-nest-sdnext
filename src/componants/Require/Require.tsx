import React, {memo, useEffect, useRef, useState} from "react";
import {useDOMSelector} from "@/componants/Require/useDOMSelector";
import {findClassStartingWith} from "@/tools/tools";

export const Require = memo(({selector, cnFor, sdNext, cnCss}) => {

  selector = sdNext || selector;

  const gr_element = useDOMSelector(selector, cnCss ? `${cnCss}-children` : undefined);
  const ref = useRef();

  useEffect(() => {
    if (gr_element && ref.current) {
      ref.current?.append(gr_element);
    }
  }, [gr_element, ref, selector]);

  const divProps = {};
  if (cnCss !== undefined) {
    divProps['cn-css'] = cnCss;
  }

  return (
    <div {...divProps} cn-for={cnFor || selector} ref={ref}/>
  );
});

export const Trash = memo(({selector}) => {

  return (
      <div style={{display:'none'}}>
        <RequireAll a1111={selector} cnCss="trash"/>
      </div>
  )
});

export const RequireAll = memo(({ selector, cnCss }) => {
  const [uniqueSelectors, setUniqueSelectors] = useState([]);

  useEffect(() => {

    if (uniqueSelectors.length > 0) return;

    const selectedElements = Array.from(document.querySelectorAll(selector));
    const selectors = selectedElements.map((el, index) => {
      let cnSelector = findClassStartingWith(el, 'cn-selector-');
      if (!cnSelector) {
        cnSelector = `cn-selector-${Math.random().toString(36).substring(2, 9)}-${index}`;
        el.classList.add(cnSelector);
      }
      return `.${cnSelector}`;
    });

    setUniqueSelectors(selectors);
  }, [selector]);

  return (
    <>
      {uniqueSelectors.map((selector, index) => (
        <Require key={index} cnFor={`${selector}[${index}]`} a1111={selector} cnCss={cnCss} />
      ))}
    </>
  );
});
