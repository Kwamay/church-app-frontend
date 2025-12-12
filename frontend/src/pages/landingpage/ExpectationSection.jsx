import {
  Heart,
  Users,
  BookOpen,
  Music,
} from "lucide-react";

const ExpectationSection = () => {
    return(
        <div>
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                What to Expect
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-amber-600 mx-auto mb-8"></div>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Whether it's your first time or you've been with us for years,
                you'll always find a warm welcome
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-gradient-to-br from-amber-400 to-amber-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                  <Heart className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Friendly Welcome
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Our greeters and ushers will warmly receive you and help you
                  feel right at home
                </p>
              </div>

              <div className="text-center">
                <div className="bg-gradient-to-br from-amber-400 to-amber-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                  <Music className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Vibrant Worship
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Experience powerful praise and worship that ushers in God's
                  presence
                </p>
              </div>

              <div className="text-center">
                <div className="bg-gradient-to-br from-amber-400 to-amber-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                  <BookOpen className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Spirit-Filled Preaching
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Receive anointed teaching from God's Word that transforms
                  lives
                </p>
              </div>

              <div className="text-center">
                <div className="bg-gradient-to-br from-amber-400 to-amber-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                  <Users className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Family Environment
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Connect with believers who will support and encourage your
                  faith journey
                </p>
              </div>
            </div>
          </div>
        </section>
         <section
          id="ministries"
          className="py-20 bg-gradient-to-br from-amber-50 to-white"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Our Ministries
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-amber-600 mx-auto mb-8"></div>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Find your place in the family through our various ministries
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all hover:-translate-y-2 border-2 border-amber-100">
                <div className="bg-gradient-to-br from-amber-100 to-amber-50 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                  <Users className="h-8 w-8 text-amber-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Youth Ministry
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Empowering the next generation through dynamic worship,
                  relevant teaching, and fun fellowship. Ages 13-18.
                </p>
                <p className="text-amber-600 font-semibold">Fridays 7:00 PM</p>
              </div>

              <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all hover:-translate-y-2 border-2 border-amber-100">
                <div className="bg-gradient-to-br from-amber-100 to-amber-50 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                  <Heart className="h-8 w-8 text-amber-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Women's Ministry
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Building strong, godly women through prayer, fellowship, and
                  biblical mentorship.
                </p>
                <p className="text-amber-600 font-semibold">
                  2nd Saturday Monthly
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all hover:-translate-y-2 border-2 border-amber-100">
                <div className="bg-gradient-to-br from-amber-100 to-amber-50 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                  <Users className="h-8 w-8 text-amber-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Men's Ministry
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Equipping men to be spiritual leaders in their homes,
                  workplaces, and communities.
                </p>
                <p className="text-amber-600 font-semibold">
                  1st Saturday Monthly
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all hover:-translate-y-2 border-2 border-amber-100">
                <div className="bg-gradient-to-br from-amber-100 to-amber-50 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                  <Heart className="h-8 w-8 text-amber-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Children's Church
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Age-appropriate teaching and activities that make learning
                  about Jesus fun and engaging. Ages 4-12.
                </p>
                <p className="text-amber-600 font-semibold">
                  Sundays during service
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all hover:-translate-y-2 border-2 border-amber-100">
                <div className="bg-gradient-to-br from-amber-100 to-amber-50 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                  <Music className="h-8 w-8 text-amber-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Worship Team
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Join our talented musicians and singers in leading the
                  congregation into God's presence through worship.
                </p>
                <p className="text-amber-600 font-semibold">
                  Practice: Saturdays 5:00 PM
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all hover:-translate-y-2 border-2 border-amber-100">
                <div className="bg-gradient-to-br from-amber-100 to-amber-50 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                  <Heart className="h-8 w-8 text-amber-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Outreach Ministry
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Serving our community through food banks, visitation, and
                  sharing the love of Christ with those in need.
                </p>
                <p className="text-amber-600 font-semibold">
                  Various times - Join us!
                </p>
              </div>
            </div>
          </div>
        </section>
        </div>        
    );
};

export default ExpectationSection;