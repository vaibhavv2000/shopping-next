'use client'

import {useState} from 'react';
import {useServerInsertedHTML} from 'next/navigation';
import {ServerStyleSheet,StyleSheetManager} from 'styled-components';
import isPropValid from '@emotion/is-prop-valid';

interface props {
 children: React.ReactNode;
};

function StyledComponentsRegistry({children,}: props) {
 const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet())

 useServerInsertedHTML(() => {
  const styles = styledComponentsStyleSheet.getStyleElement();
  styledComponentsStyleSheet.instance.clearTag();
  return <>{styles}</>
 });

 if(typeof window !== 'undefined') return <>{children}</>

 return (
  <StyleSheetManager shouldForwardProp={isPropValid} sheet={styledComponentsStyleSheet.instance}>
   {children}
  </StyleSheetManager>
 );
};

export default StyledComponentsRegistry;