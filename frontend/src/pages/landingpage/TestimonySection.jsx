import sloganPic from "../../images/Banner-for-other-side3.jpg";

const TestimonySection = () => {
  return (
    <div>
      <section id="testimonies" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Testimonies
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-amber-600 mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Lives transformed by the power of God
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-amber-50 to-white rounded-2xl shadow-xl p-8 border-2 border-amber-100">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center text-white font-bold text-2xl mr-4">
                  S
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">Sarah M.</h4>
                  <p className="text-gray-600 text-sm">Member since 2020</p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                "I came to GVCC broken and lost, but found a family that loved
                me unconditionally. Through the powerful worship and prophetic
                ministry, God healed my heart and restored my faith. This is
                truly where the Lion of Judah roars!"
              </p>
              <div className="flex text-amber-500">★★★★★</div>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-white rounded-2xl shadow-xl p-8 border-2 border-amber-100">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center text-white font-bold text-2xl mr-4">
                  J
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">James T.</h4>
                  <p className="text-gray-600 text-sm">Member since 2018</p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                "The teaching here is solid, biblical, and life-changing.
                Pastor's prophetic insight has guided me through major
                decisions, and the men's ministry has helped me become a better
                husband and father. Grateful for this church!"
              </p>
              <div className="flex text-amber-500">★★★★★</div>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-white rounded-2xl shadow-xl p-8 border-2 border-amber-100">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center text-white font-bold text-2xl mr-4">
                  M
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">Maria R.</h4>
                  <p className="text-gray-600 text-sm">Member since 2021</p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                "The worship at GVCC takes you straight into God's presence!
                I've experienced genuine miracles here - healing, breakthrough,
                and transformation. This church family prays with power and
                loves with authenticity."
              </p>
              <div className="flex text-amber-500">★★★★★</div>
            </div>
          </div>

          <div className="mt-16 bg-gradient-to-r from-amber-500 to-amber-600 rounded-3xl p-12 text-center text-white shadow-2xl">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              "God is Spirit and those who worship Him must worship in Spirit
              and in Truth."
            </h3>
            <p className="text-xl text-amber-100">John 4:24</p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-amber-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-amber-100">
            <div className="w-full h-[460px] md:h-[550px] bg-gradient-to-br from-amber-100 to-amber-50 flex items-center justify-center">
              <img
                src={sloganPic}
                alt="Fellowship"
                className="w-[90%] h-full object-cover rounded-3xl"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TestimonySection;
