import { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Youtube,
} from "lucide-react";
import chLogo from "../../images/ch-logo.png";

const FooterSection = () => {
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    alert(
      "Thank you for subscribing! We'll keep you updated with our latest news and events."
    );
    setEmail("");
  };
  return (
    <footer id="contact" className="bg-gray-900 text-gray-300 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="rounded-full flex items-center justify-center">
                <img src={chLogo} alt="Logo" className="logo" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white whitespace-nowrap">
                  Glorious Vineyard of Christ
                </h3>
                <p className="text-amber-400 text-sm font-medium">
                  Lion of Judah Family
                </p>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6">
              A Spirit-filled community where love, power, and purpose come
              together. Join us as we worship, grow, and serve together in the
              name of Jesus Christ.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-amber-600 hover:bg-amber-700 text-white transition-all"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-amber-600 hover:bg-amber-700 text-white transition-all"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-amber-600 hover:bg-amber-700 text-white transition-all"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4 text-lg">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#about"
                  className="hover:text-amber-400 transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="hover:text-amber-400 transition-colors"
                >
                  Service Times
                </a>
              </li>
              <li>
                <a
                  href="#ministries"
                  className="hover:text-amber-400 transition-colors"
                >
                  Ministries
                </a>
              </li>
              <li>
                <a
                  href="#testimonies"
                  className="hover:text-amber-400 transition-colors"
                >
                  Testimonies
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-400 transition-colors">
                  Give Online
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4 text-lg">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-amber-500 mr-2 mt-1 flex-shrink-0" />
                <span>
                  123 Glory Lane
                  <br />
                  Faith City, FC 12345
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0" />
                <a
                  href="tel:+15551234567"
                  className="hover:text-amber-400 transition-colors"
                >
                  (555) 123-4567
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0" />
                <a
                  href="mailto:info@gvcc.church"
                  className="hover:text-amber-400 transition-colors"
                >
                  info@gvcc.church
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div>
              <h4 className="font-bold text-white mb-4">Stay Connected</h4>
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-amber-500 focus:outline-none"
                  required
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-6 py-2 rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all font-semibold"
                >
                  Subscribe
                </button>
              </form>
            </div>
            <p className="text-gray-400 text-center md:text-right">
              &copy; 2025 Glorious Vineyard of Christ. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
