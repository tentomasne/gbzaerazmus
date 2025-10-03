"use client"

import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function Footer() {
    const { t } = useTranslation();

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
                {t('footer.description')}
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">{t('footer.explore')}</h3>
              <div className="space-y-2">
                <Link href="/countries" className="text-gray-400 hover:text-white block">{t('footer.destinations')}</Link>
                <Link href="/timeline" className="text-gray-400 hover:text-white block">Timeline</Link>
                <Link href="/news" className="text-gray-400 hover:text-white block">{t('footer.studentStories')}</Link>
                <Link href="/managers" className="text-gray-400 hover:text-white block">{t('footer.ourTeam')}</Link>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">{t('footer.contact')}</h3>
              <p className="text-gray-400">
                <a href="mailto:petra.fabikova@gbza.eu" className="text-gray-400 hover:text-white">
                  petra.fabikova@gbza.eu
                </a>
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              {t('footer.copyright')}
            </p>
            <p className="text-gray-400 mt-2">
              Website made with ❤️ by <a href="https://tomasdavidik.sk" className="text-blue-500 hover:underline">Tomáš</a>
            </p>
          </div>
        </div>
      </footer>
    );
    }
