import { useState } from "react";
import {
  Menu,
  X,
  Heart,
  ChevronRight,
} from "lucide-react";
import chLogo from "../../images/ch-logo.png";
import theme from "../../images/theme.jpg";
import { Link } from "react-router-dom";
import AboutSection from "./AboutSection";
import ServiceSection from "./ServiceSection";
import ExpectationSection from "./ExpectationSection.jsx";
import TestimonySection from "./TestimonySection.jsx";
import FooterSection from "./FooterSection.jsx";

function Landingpage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
 
  return (
    <div className="min-h-screen bg-white">
      <nav className="fixed w-full bg-white/95 backdrop-blur-sm z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <img src={chLogo} alt="Logo" className="logo" />
              <div>
                <h1 className="text-xl font-bold text-gray-900 whitespace-nowrap">
                  Glorious Vineyard of Christ
                </h1>
                <p className="text-xs text-amber-600 font-medium">
                  Lion of Judah Family
                </p>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#about"
                className="text-gray-700 hover:text-amber-600 transition-colors font-medium"
              >
                About
              </a>
              <a
                href="#services"
                className="text-gray-700 hover:text-amber-600 transition-colors font-medium"
              >
                Services
              </a>
              <a
                href="#ministries"
                className="text-gray-700 hover:text-amber-600 transition-colors font-medium"
              >
                Ministries
              </a>
              <a
                href="#testimonies"
                className="text-gray-700 hover:text-amber-600 transition-colors font-medium"
              >
                Testimonies
              </a>
              <a
                href="#contact"
                className="text-gray-700 hover:text-amber-600 transition-colors font-medium"
              >
                Contact
              </a>
              <Link to='/signin' className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-6 py-2.5 rounded-full hover:from-amber-600 hover:to-amber-700 transition-all hover:shadow-xl font-semibold">
                Admin Panel
              </Link>
            </div>

            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
            <div className="px-4 py-4 space-y-3">
              <a
                href="#about"
                className="block text-gray-700 hover:text-amber-600 transition-colors font-medium py-2"
              >
                About
              </a>
              <a
                href="#services"
                className="block text-gray-700 hover:text-amber-600 transition-colors font-medium py-2"
              >
                Services
              </a>
              <a
                href="#ministries"
                className="block text-gray-700 hover:text-amber-600 transition-colors font-medium py-2"
              >
                Ministries
              </a>
              <a
                href="#testimonies"
                className="block text-gray-700 hover:text-amber-600 transition-colors font-medium py-2"
              >
                Testimonies
              </a>
              <a
                href="#contact"
                className="block text-gray-700 hover:text-amber-600 transition-colors font-medium py-2"
              >
                Contact
              </a>
              <button className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white px-6 py-3 rounded-full hover:from-amber-600 hover:to-amber-700 transition-colors font-semibold">
                Plan Your Visit
              </button>
            </div>
          </div>
        )}
      </nav>

      <main className="pt-20">
        <section className="relative h-[160vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-white to-amber-50 z-0"></div>
          <div
            className="absolute inset-0 bg-cover bg-center opacity-40 z-10"
            style={{ backgroundImage: `url(${theme})` }}>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg mb-8">
              <Heart className="h-5 w-5 text-amber-600 mr-2" />
              <span className="text-amber-700 font-semibold">
                Where Love, Power & Purpose Meet
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
              <span className="text-gray-900">Welcome to</span>
              <br />
              <span className="bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 bg-clip-text text-transparent">
                Glorious Vineyard of Christ Chapel
              </span>
            </h1>

            <p className="text-xl md:text-3xl text-gray-700 mb-4 font-light">
              Also known as the{" "}
              <span className="font-semibold text-amber-600">
                Lion of Judah Family
              </span>
            </p>

            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
              A place where faith comes alive, families grow together, and the
              spirit of God moves powerfully
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="#services"
                className="group bg-gradient-to-r from-amber-500 to-amber-600 text-white px-10 py-5 rounded-full hover:from-amber-600 hover:to-amber-700 transition-all hover:shadow-2xl hover:scale-105 font-bold text-lg flex items-center"
              >
                Join Us This Sunday
                <ChevronRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#about"
                className="bg-white text-gray-700 px-10 py-5 rounded-full hover:bg-gray-50 transition-all hover:shadow-xl border-2 border-gray-300 font-bold text-lg"
              >
                Learn More
              </a>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
        </section>

        <AboutSection />
        <ServiceSection /> 
        <ExpectationSection />
        <TestimonySection />
        <FooterSection />
       
      </main>
    </div>
  );
}

export default Landingpage;
