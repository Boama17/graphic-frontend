import React from 'react';
import Home from '../components/give/home';
import DonationMethods from '../components/give/DonationMethod';
import Footer from '../components/footer';

function Give() {
    return (
            <div className="bg-black font-instrument">
                <Home />
                <DonationMethods />
                <Footer />
            </div>
    );
}

export default Give;