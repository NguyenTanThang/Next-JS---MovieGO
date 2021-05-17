import 'antd/dist/antd.css';
import '../styles/globals.css'
import '../styles/App.css'
import '../styles/index.css'

import Head from "next/head";

import Navbar from "../components/partials/Navbar";
import Footer from "../components/partials/Footer";

import GenreStore from "../reducers/hookReducers/GenreStore";
import ImageStore from "../reducers/hookReducers/ImageStore";
import ReviewStore from "../reducers/hookReducers/ReviewStore";

/*
function MyApp({ Component, pageProps }) {
  return <>
        <GenreStore>
        <ImageStore>
        <ReviewStore>
          <Navbar/>
          <Component {...pageProps} />  
          <Footer/>
        </ReviewStore>
        </ImageStore>
        </GenreStore>
  </>
}
*/
function MyApp({ Component, pageProps }) {
  return (
    <GenreStore>
    <ImageStore>
    <ReviewStore>
      <Head>
              <script async defer src="https://kit.fontawesome.com/c32adfdcda.js" crossOrigin="anonymous"></script>

              <link rel="preconnect" href="https://fonts.gstatic.com"/>

              <link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500;700&display=swap" rel="stylesheet"/>

              <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
                rel="stylesheet"/>
            </Head>
          {/*
          <Navbar/>
         */}
         <Navbar/>
          <main>
            <Component {...pageProps} />  
          </main>
         <Footer/>
    </ReviewStore>
    </ImageStore>
    </GenreStore>
  )
}

export default MyApp
