import * as React from 'react';
import AppAppBar from './AppAppBar';
import AppFooter from './AppFooter';
import ProductCategories from './ProductCategories';
import Title from './Title';
import ProductValues from './ProductValues';

export default function Home() {
  return (
    <React.Fragment>
      <AppAppBar />
      <Title />
      <ProductValues />
      <ProductCategories />
      <AppFooter />
    </React.Fragment>
  );
}
