'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Home, ArrowLeft, Search, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-2xl mx-auto"
      >
        <Card className="glass-card border-0 shadow-2xl">
          <CardContent className="p-12">
            {/* 404 Animation */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8"
            >
              <div className="relative">
                <h1 className="text-9xl md:text-[12rem] font-bold text-gray-200 leading-none">
                  404
                </h1>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                >
                  <Globe className="h-16 w-16 text-blue-600 opacity-60" />
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-8"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Oops! Page Not Found
              </h2>
              <p className="text-lg text-gray-600 mb-2">
                The page you're looking for seems to have wandered off on its own European adventure.
              </p>
              <p className="text-gray-500">
                Don't worry, we'll help you find your way back to exploring our students' journeys!
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/">
                <Button size="lg" className="group">
                  <Home className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                  Back to Home
                </Button>
              </Link>
              <Link href="/countries">
                <Button size="lg" variant="outline" className="group">
                  <Search className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                  Explore Destinations
                </Button>
              </Link>
            </motion.div>

            {/* Decorative Elements */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="mt-12 flex justify-center space-x-4 text-4xl"
            >
              <motion.span
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0 }}
              >
                🇪🇸
              </motion.span>
              <motion.span
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
              >
                🇮🇹
              </motion.span>
              <motion.span
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
              >
                🇫🇷
              </motion.span>
              <motion.span
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
              >
                🇩🇪
              </motion.span>
              <motion.span
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.8 }}
              >
                🇵🇹
              </motion.span>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}