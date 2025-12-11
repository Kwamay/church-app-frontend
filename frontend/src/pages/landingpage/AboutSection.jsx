import Logo from "../../images/ch-logo.png";

const AboutSection = () => {
    return (
        <section id="about" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                About Us
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-amber-600 mx-auto mb-8"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h3 className="text-3xl font-bold text-gray-900">
                  Our Mission & Values
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  At Glorious Vineyard of Christ, we are a Spirit-filled
                  community dedicated to worship, discipleship, and spreading
                  the Gospel of Jesus Christ. Known affectionately as the Lion
                  of Judah Family, we believe in the power of prophetic
                  ministry, authentic worship, and transformative teaching.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Our church is built on the foundation of God's love and grace,
                  where everyone is welcomed as family. We are committed to
                  raising up believers who walk in their divine purpose,
                  demonstrate Christ's love through community outreach, and
                  experience the fullness of God's presence in their lives.
                </p>
                <div className="grid grid-cols-2 gap-4 pt-6">
                  <div className="bg-amber-50 p-6 rounded-xl">
                    <h4 className="font-bold text-amber-700 mb-2">
                      Prophetic Ministry
                    </h4>
                    <p className="text-gray-700 text-sm">
                      Moving in the gifts of the Spirit
                    </p>
                  </div>
                  <div className="bg-amber-50 p-6 rounded-xl">
                    <h4 className="font-bold text-amber-700 mb-2">
                      Vibrant Worship
                    </h4>
                    <p className="text-gray-700 text-sm">
                      Authentic praise & worship
                    </p>
                  </div>
                  <div className="bg-amber-50 p-6 rounded-xl">
                    <h4 className="font-bold text-amber-700 mb-2">
                      Biblical Teaching
                    </h4>
                    <p className="text-gray-700 text-sm">
                      Sound doctrine & application
                    </p>
                  </div>
                  <div className="bg-amber-50 p-6 rounded-xl">
                    <h4 className="font-bold text-amber-700 mb-2">
                      Community Outreach
                    </h4>
                    <p className="text-gray-700 text-sm">
                      Serving our neighborhoods
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="bg-gradient-to-br from-amber-100 to-amber-50 rounded-3xl p-8 shadow-2xl">
                  <img
                  src={Logo}
                    alt="Worship"
                    className="rounded-2xl shadow-xl w-full h-96 object-cover"
                  />
                  <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-2xl max-w-xs">
                    <p className="text-amber-600 font-bold text-lg mb-2">
                      "Where the Spirit of the Lord is, there is freedom"
                    </p>
                    <p className="text-gray-600 text-sm">2 Corinthians 3:17</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

    );
};

export default AboutSection