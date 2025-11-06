import { MapPin, Clock } from "lucide-react";

const ServiceSection = () => {
  return (
    <section
      id="services"
      className="py-20 bg-gradient-to-br from-amber-50 to-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Service Times & Location
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-amber-600 mx-auto mb-8"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl shadow-xl p-8 border-2 border-amber-100">
            <Clock className="h-12 w-12 text-amber-600 mb-6" />
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Weekly Services
            </h3>

            <div className="space-y-6">
              <div className="flex items-start space-x-4 p-4 bg-amber-50 rounded-xl">
                <div className="bg-amber-600 text-white px-3 py-1 rounded-lg font-bold text-sm">
                  SUN
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">
                    Sunday Worship Service
                  </h4>
                  <p className="text-gray-600">09:30 AM - 12:30 PM</p>
                  <p className="text-amber-700 text-sm mt-1">
                    Spirit-filled worship, preaching, and prayer
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 bg-amber-50 rounded-xl">
                <div className="bg-amber-600 text-white px-3 py-1 rounded-lg font-bold text-sm">
                  WED
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">
                    Midweek Bible Study
                  </h4>
                  <p className="text-gray-600">6:30 PM - 8:00 PM</p>
                  <p className="text-amber-700 text-sm mt-1">
                    Deep dive into God's Word
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 bg-amber-50 rounded-xl">
                <div className="bg-amber-600 text-white px-3 py-1 rounded-lg font-bold text-sm">
                  THURS-FRI
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">
                    24 HR Praying Altar
                  </h4>
                  <p className="text-gray-600">6:00 PM - 6:00 PM</p>
                  <p className="text-amber-700 text-sm mt-1">
                    We pray and interceed for 24Hrs
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8 border-2 border-amber-100">
            <MapPin className="h-12 w-12 text-amber-600 mb-6" />
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Find Us</h3>

            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Address</h4>
                <p className="text-gray-700 leading-relaxed">
                  Atwima Boko
                  <br />
                  100plot, near Fountain Gate
                  <br />
                  Kumasi, Ghana
                </p>
              </div>

              <div className="bg-gray-100 rounded-xl overflow-hidden h-64">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3976.24233076136!2d-1.7161045291808468!3d6.67519801902184!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwNDAnMzAuNyJOIDHCsDQyJzU4LjAiVw!5e0!3m2!1sen!2sgh!4v1701700000000!5m2!1sen!2sgh&q=Glorious%20Vineyard%20Of%20Christ%20Chapel%2C%20Atwima%20Boko"
                  width="100%"
                  height="100%"
                  title="Glorious Vineyard of Christ Chapel location map"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>

              <button className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-4 rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all font-semibold text-lg shadow-lg hover:shadow-xl">
                Get Directions
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
