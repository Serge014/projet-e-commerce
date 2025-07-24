import type { Metadata } from 'next';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './globals.css';
import 'boundless-commerce-components/dist/styles.css';
import 'boundless-checkout-react/dist/index.css';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import WrapperForCartContext from '@/components/wrapperForCartContext';
import {ReactNode} from 'react';
import Header from '@/components/header';
import CategoriesMenu from '@/components/categoriesMenu';
import Footer from '@/components/footer';
import CartFAB from '@/components/cart/fab';
import ChatWidget from '@/components/messaging/ChatWidget';

export const metadata: Metadata = {
  title: 'TechStore - Boutique en ligne moderne',
  description: 'Découvrez notre sélection de produits technologiques de qualité aux meilleurs prix',
};

export default function RootLayout({children}: {children: ReactNode}) {
  return (
    <html lang="fr">
      <body>
        <WrapperForCartContext>
          <>
            <Header />
            <CategoriesMenu />
            {children}
            <Footer />
            <CartFAB />
            <ChatWidget />
          </>
        </WrapperForCartContext>
        
        {/* Bootstrap JavaScript */}
        <script 
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" 
          integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" 
          crossOrigin="anonymous"
        />
      </body>
    </html>
  );
}
