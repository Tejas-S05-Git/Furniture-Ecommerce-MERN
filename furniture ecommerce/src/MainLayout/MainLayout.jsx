import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import AOS from "aos";
import ScrollProgressBar from '../components/ScrollProgressBar';

const MainLayout = () => {
     useEffect(() => {
    AOS.init({
      duration: 800,
      offset: 80,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  useEffect(() => {
    AOS.refresh();
  }, [location]);
  return (
     <>
     <ScrollProgressBar/>
      <Navbar />
      
      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  )
}

export default MainLayout