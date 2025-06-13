import React from 'react';

import Home from '../components/founder/home';
import AboutFouder from '../components/founder/about_fouder';
import Gallery from '../components/founder/gallery';
import Books from '../components/founder/books';

import Footer from '../components/footer';

function Founder() {
    return (
            <div className="bg-black font-instrument">
                <Home />
                <AboutFouder />
                <Gallery />
                <Books />
                <Footer />
            </div>
    );
}

export default Founder;
