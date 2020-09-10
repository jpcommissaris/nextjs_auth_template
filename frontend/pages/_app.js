// this file allows us to use a global css files and css modules
import '../styles.css'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'nprogress/nprogress.css';

import NProgress from 'nprogress';
import Router from 'next/router';

Router.events.on('routeChangeStart', () => NProgress.start()); 
Router.events.on('routeChangeComplete', () => NProgress.done()); 
Router.events.on('routeChangeError', () => NProgress.done());

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}