"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Send,
  Home,
  MapPinned,
  Clock,
} from "lucide-react";
import { motion } from "framer-motion";
import "leaflet/dist/leaflet.css";
import LocationMap from "../locationMap";
import emailjs from "emailjs-com";

type ContactFormData = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

type PartnershipFormData = {
  firstName: string;
  telephone: string;
  city: string;
  category: string;
};

type FormErrors = Partial<Record<keyof ContactFormData | keyof PartnershipFormData, string>>;

type IsSubmitting = {
  contact: boolean;
  partnership: boolean;
};

type SubmitSuccess = {
  contact: boolean;
  partnership: boolean;
};

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [partnershipData, setPartnershipData] = useState<PartnershipFormData>({
    firstName: "",
    telephone: "",
    city: "",
    category: "",
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<IsSubmitting>({
    contact: false,
    partnership: false,
  });
  const [submitSuccess, setSubmitSuccess] = useState<SubmitSuccess>({
    contact: false,
    partnership: false,
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    formType: "contact" | "partnership"
  ) => {
    const { name, value } = e.target;
    if (formType === "contact") {
      setFormData((prev) => ({ ...prev, [name]: value }));
    } else {
      setPartnershipData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = (
    data: ContactFormData | PartnershipFormData,
    type: "contact" | "partnership"
  ): FormErrors => {
    const errors: FormErrors = {};
    if (type === "contact") {
      const d = data as ContactFormData;
      if (!d.name) errors.name = "Name is required";
      if (!d.message) errors.message = "Message is required";
      if (d.email && !/\S+@\S+\.\S+/.test(d.email))
        errors.email = "Email is invalid";
    } else {
      const d = data as PartnershipFormData;
      if (!d.firstName) errors.firstName = "First name is required";
      if (!d.telephone) errors.telephone = "Telephone is required";
    }
    return errors;
  };

  const handleSubmit = (
    e: FormEvent<HTMLFormElement>,
    type: "contact" | "partnership"
  ) => {
    e.preventDefault();
    const data = type === "contact" ? formData : partnershipData;
    const errors = validateForm(data, type);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      setIsSubmitting((prev) => ({ ...prev, [type]: true }));

      const templateParams =
        type === "contact"
          ? {
              name: formData.name,
              email: formData.email,
              phone: formData.phone,
              message: formData.message,
            }
          : {
              fullName: partnershipData.firstName,
              telephone: partnershipData.telephone,
              country: partnershipData.city,
              category: partnershipData.category,
            };

      emailjs
        .send(
          "service_cte8xrg",
          type === "contact" ? "template_vruhehp" : "template_li13gbn",
          templateParams,
          "fN2qkg7bDDx_2te0R"
        )
        .then(
          () => {
            if (type === "contact") {
              setFormData({ name: "", email: "", phone: "", message: "" });
              setSubmitSuccess((prev) => ({ ...prev, contact: true }));
            } else {
              setPartnershipData({
                firstName: "",
                telephone: "",
                city: "",
                category: "",
              });
              setSubmitSuccess((prev) => ({ ...prev, partnership: true }));
            }
            setIsSubmitting((prev) => ({ ...prev, [type]: false }));

            setTimeout(() => {
              setSubmitSuccess((prev) => ({ ...prev, [type]: false }));
            }, 3000);
          },
          (error) => {
            console.error("Error sending email:", error);
            alert("An error occurred. Please try again.");
            setIsSubmitting((prev) => ({ ...prev, [type]: false }));
          }
        );
    }
  };
  return (
    <div className="bg-black text-white min-h-screen">
      {/* Contact Info Section */}
      <section className="relative z-20 py-16">
        <div className="container max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-b from-white via-white/80 to-white/50 bg-clip-text text-transparent mb-4">
              Get In Touch
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-teal-500 mx-auto rounded-full mb-6"></div>
            <p className="text-gray-300 max-w-2xl mx-auto">
              We'd love to hear from you. Reach out to us through any of these
              channels
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: Phone,
                color: "text-green-500",
                bgColor: "bg-green-500/10",
                title: "Phone",
                details: ["+233 24 237 1411"],
              },
              {
                icon: Mail,
                color: "text-blue-500",
                bgColor: "bg-blue-500/10",
                title: "Email",
                details: [
                  "info@lovereignbiblechurch.org",
                  "lbcwebsite2@gmail.com",
                ],
              },
              {
                icon: MapPin,
                color: "text-red-500",
                bgColor: "bg-red-500/10",
                title: "Location",
                details: [
                  "Christian Village, PUMA Filling Station",
                  "Accra, Ghana",
                ],
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-gray-700 transition-all duration-300 hover:shadow-lg hover:shadow-purple-900/10 group"
              >
                <div
                  className={`w-16 h-16 ${item.bgColor} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <item.icon className={`${item.color}`} size={28} />
                </div>
                <h3 className="text-xl font-semibold text-center mb-3">
                  {item.title}
                </h3>
                <div className="space-y-1 text-center">
                  {item.details.map((detail, i) => (
                    <p key={i} className="text-gray-400">
                      {detail}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Map and Location Section */}
      <section className="py-16 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Our Location</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Visit us at our headquarters in Accra, Ghana
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Location Details */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl border border-gray-800 shadow-xl"
            >
              <h3 className="text-2xl font-semibold mb-6 flex items-center">
                <MapPinned className="text-purple-500 mr-2" size={24} />
                Headquarters
              </h3>

              <div className="space-y-6">
                <div className="flex items-start space-x-3">
                  <Home
                    className="text-purple-400 mt-1 flex-shrink-0"
                    size={18}
                  />
                  <div>
                    <p className="font-medium text-white">Address</p>
                    <p className="text-gray-300">Dome Pillar Two Road</p>
                    <p className="text-gray-300">Near PUMA Filling Station</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock
                    className="text-purple-400 mt-1 flex-shrink-0"
                    size={18}
                  />
                  <div>
                    <p className="font-medium text-white">Available Hours</p>
                    <p className="text-gray-300">Mon-Fri: 9:00 AM - 5:00 PM</p>
                    <p className="text-gray-300">Sat: 10:00 AM - 2:00 PM</p>
                    <p className="text-gray-300">Sun: 00:00 AM - 11:59 PM</p>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-700">
                  <p className="text-gray-300 italic">
                    "Come worship with us and experience the love of Christ in a
                    welcoming community."
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="rounded-2xl overflow-hidden shadow-xl border border-gray-800 h-[400px]"
            >
              <div className="w-full h-full">
                <LocationMap latitude={5.639626} longitude={-0.219699} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Message Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-semibold mb-6 flex items-center">
                <MessageCircle className="text-purple-500 mr-2" size={24} />
                Send Us a Message
              </h2>

              <form
                onSubmit={(e) => handleSubmit(e, "contact")}
                className="space-y-4"
              >
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    name="name"
                    value={formData.name}
                    onChange={(e) => handleChange(e, "contact")}
                    className={`w-full px-4 py-3 text-sm border ${formErrors.name ? "border-red-500" : "border-gray-700"} bg-gray-900/50 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all`}
                  />
                  {formErrors.name && (
                    <p className="text-red-500 text-xs mt-1">
                      {formErrors.name}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="email"
                      placeholder="Your Email"
                      name="email"
                      value={formData.email}
                      onChange={(e) => handleChange(e, "contact")}
                      className={`w-full px-4 py-3 text-sm border ${formErrors.email ? "border-red-500" : "border-gray-700"} bg-gray-900/50 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all`}
                    />
                    {formErrors.email && (
                      <p className="text-red-500 text-xs mt-1">
                        {formErrors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <input
                      type="tel"
                      placeholder="Your Phone (optional)"
                      name="phone"
                      value={formData.phone}
                      onChange={(e) => handleChange(e, "contact")}
                      className="w-full px-4 py-3 text-sm border border-gray-700 bg-gray-900/50 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <textarea
                    placeholder="Your Message"
                    name="message"
                    value={formData.message}
                    onChange={(e) => handleChange(e, "contact")}
                    rows={5}
                    className={`w-full px-4 py-3 text-sm border ${formErrors.message ? "border-red-500" : "border-gray-700"} bg-gray-900/50 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all`}
                  ></textarea>
                  {formErrors.message && (
                    <p className="text-red-500 text-xs mt-1">
                      {formErrors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting.contact}
                  className="w-full py-3 px-6 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-purple-500 rounded-lg hover:from-purple-500 hover:to-purple-600 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-purple-900/30"
                >
                  {isSubmitting.contact ? (
                    <>
                      <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      <span>Send Message</span>
                    </>
                  )}
                </button>

                {submitSuccess.contact && (
                  <div className="bg-green-900/30 border border-green-800 text-green-300 px-4 py-2 rounded-lg text-sm">
                    Your message has been sent successfully!
                  </div>
                )}
              </form>
            </motion.div>

            {/* Partnership Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-purple-900/20 to-gray-900/30 p-8 rounded-2xl border border-purple-900/20"
            >
              <h2 className="text-3xl font-semibold mb-6">
                Join Our Partnership
              </h2>

              <p className="text-gray-300 mb-6">
                Join Lovereign Covenant Partnership today and become part of a
                family touching lives around the globe.
              </p>

              <form
                onSubmit={(e) => handleSubmit(e, "partnership")}
                className="space-y-4"
              >
                <div>
                  <input
                    type="text"
                    placeholder="First Name"
                    name="firstName"
                    value={partnershipData.firstName}
                    onChange={(e) => handleChange(e, "partnership")}
                    className={`w-full px-4 py-3 text-sm border ${formErrors.firstName ? "border-red-500" : "border-purple-900/30"} bg-black/40 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all`}
                  />
                  {formErrors.firstName && (
                    <p className="text-red-500 text-xs mt-1">
                      {formErrors.firstName}
                    </p>
                  )}
                </div>

                <div>
                  <input
                    type="tel"
                    placeholder="Telephone"
                    name="telephone"
                    value={partnershipData.telephone}
                    onChange={(e) => handleChange(e, "partnership")}
                    className={`w-full px-4 py-3 text-sm border ${formErrors.telephone ? "border-red-500" : "border-purple-900/30"} bg-black/40 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all`}
                  />
                  {formErrors.telephone && (
                    <p className="text-red-500 text-xs mt-1">
                      {formErrors.telephone}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      placeholder="City"
                      name="city"
                      value={partnershipData.city}
                      onChange={(e) => handleChange(e, "partnership")}
                      className="w-full px-4 py-3 text-sm border border-purple-900/30 bg-black/40 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                    />
                  </div>

                  <div>
                    <select
                      name="category"
                      value={partnershipData.category || ""}
                      onChange={(e) => handleChange(e, "partnership")}
                      className="w-full px-4 py-3 text-sm border border-purple-900/30 bg-black/40 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all appearance-none"
                      style={{
                        backgroundImage:
                          'url(\'data:image/svg+xml;charset=US-ASCII,<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg"><path d="M5 8l5 5 5-5" stroke="%23A78BFA" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>\')',
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 10px center",
                      }}
                    >
                      <option value="" disabled>
                        Select Partnership Category
                      </option>
                      <option value="book-ministry">
                        Book Ministry Partner
                      </option>
                      <option value="church-building">
                        Church Building Partner
                      </option>
                      <option value="welfare">Welfare Partner</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting.partnership}
                  className="w-full py-3 px-6 text-sm font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 shadow-lg shadow-purple-900/30 mt-4"
                >
                  {isSubmitting.partnership ? "SUBMITTING..." : "SUBMIT"}
                </button>

                {submitSuccess.partnership && (
                  <div className="bg-green-900/30 border border-green-800 text-green-300 px-4 py-2 rounded-lg text-sm">
                    Your partnership request has been submitted!
                  </div>
                )}
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
