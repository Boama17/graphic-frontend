import React, { useState, ChangeEvent, FormEvent } from "react";
import { Phone, Mail, MapPin } from "lucide-react";

type ContactForm = {
  name: string;
  message: string;
};

const ContactMethods: React.FC = () => {
  const [formData, setFormData] = useState<ContactForm>({
    name: "",
    message: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setFormData({
      name: "",
      message: "",
    });
  };

  return (
    <div className=" text-white py-12 flex flex-col items-center relative z-20 mt-16">
      <div className="container max-w-2xl mx-auto px-4">
        <h1 className="text-[10vw] sm:text-[8vw] lg:text-[6vw] font-extrabold text-center pt-8 bg-gradient-to-b from-white via-white/50 to-transparent bg-clip-text text-transparent">
          Get In Touch
        </h1>
        <div className="flex flex-col md:flex-row md:justify-between md:space-x-6 text-center space-y-6 md:space-y-0">
          <div className="flex flex-col items-center">
            <Phone className="text-green-500 mb-2" size={30} />
            <h3 className="text-lg font-medium">Phone</h3>
            <p className="text-sm text-gray-400">+233 24 237 1411</p>
          </div>

          <div className="flex flex-col items-center">
            <Mail className="text-blue-500 mb-2" size={30} />
            <h3 className="text-lg font-medium">Email</h3>
            <p className="text-sm text-gray-400">
              info@lovereignbiblechurch.org
            </p>
            <p className="text-sm text-gray-400">lbcwebsite2@gmail.com</p>
          </div>

          <div className="flex flex-col items-center">
            <MapPin className="text-red-500 mb-2" size={30} />
            <h3 className="text-lg font-medium">Location</h3>
            <p className="text-sm text-gray-400">
              Christian Village, PUMA Filling Station
            </p>
            <p className="text-sm text-gray-400">Accra, Ghana</p>
          </div>
        </div>

        <h2 className="text-3xl font-semibold text-center mt-10 mb-6">
          Send Us a Message
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 w-full max-w-md mx-auto"
        >
          <input
            type="text"
            placeholder="Your Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 text-sm border border-gray-600 bg-black text-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <textarea
            placeholder="Your Message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-4 py-2 text-sm border border-gray-600 bg-black text-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          ></textarea>

          <button
            type="submit"
            className="w-full py-2 text-sm font-medium text-white bg-purple-500 rounded hover:bg-purple-600 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactMethods;
