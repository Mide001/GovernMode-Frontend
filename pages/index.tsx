import type { NextPage } from 'next';
import Head from 'next/head';
import Navbar from "../components/Navbar";
import MainContent from "../components/MainContent";
import Footer from "../components/Footer";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>GovernMode</title>
        <meta
          content="GovernMode - A Governance Application Deployed On Mode Blockchain"
          name="description"
        />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <main>
        <Navbar />
        <MainContent />
        <Footer />
      </main>
    </>
  );
};

export default Home;
