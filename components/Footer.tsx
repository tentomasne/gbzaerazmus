import Link from "next/link";

export default function Footer() {
    return (

        <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">E</span>
                </div>
                <span className="font-bold text-xl">Erasmus GBZA</span>
              </div>
              <p className="text-gray-400">
                Showcasing the excellence of selected GBZA students across Europe.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Explore</h3>
              <div className="space-y-2">
                <Link href="/countries" className="text-gray-400 hover:text-white block">Destinations</Link>
                <Link href="/news" className="text-gray-400 hover:text-white block">Student Stories</Link>
                <Link href="/managers" className="text-gray-400 hover:text-white block">Our Team</Link>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <p className="text-gray-400">
                gbza-erasmus@davidik.fr
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 Erasmus GBZA. Celebrating student excellence across Europe.
            </p>
          </div>
        </div>
      </footer>
    );
    }
