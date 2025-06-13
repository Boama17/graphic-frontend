"use client";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from '../pages/home_page';
import FounderPage from '../pages/founder_page';
import Ourstory from '../pages/our_story_page';
import Give from '../pages/give_page';
import Layout from '../components/layout'; 
import Media from '../pages/media_page';
import Contact from '../pages/contact_us_page';
import BooksByFounder from '../pages/books';
import ChurchBranches from "../pages/church_branches";
import ScrollToTop from '@/hooks/scrollToTop';

export default function Page() {
  return (
    <Router>
      <Layout>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Home" element={<HomePage />} />
          <Route path="/founder" element={<FounderPage />} />
          <Route path="/books" element={<BooksByFounder />} />
          <Route path="/our-story" element={<Ourstory />} />
          <Route path="/media" element={<Media />} />
          <Route path="/give" element={<Give />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/church-branches" element={<ChurchBranches />} />
        </Routes>
      </Layout>
    </Router>
  );
}


