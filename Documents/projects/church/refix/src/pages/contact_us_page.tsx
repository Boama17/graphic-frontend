import React from 'react';
import Home from '../components/contactus/home';
import Footer from '../components/footer';
import ContactPage from '../components/contactus/talktous';

function Contact() {
    return (
            <div className="bg-black font-instrument">
                <Home />
                <ContactPage />
                <Footer />
            </div>
    );
}

export default Contact;