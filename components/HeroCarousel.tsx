'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface Country {
  name: string;
  flag: string;
  description: string;
  image: string;
  id: string;
}

const countries: Country[] = [
  {
    id: 'spain',
    name: 'Spain',
    flag: '🇪🇸',
    description: 'Our selected students discover rich culture and vibrant traditions',
    image: 'https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop'
  },
  {
    id: 'italy',
    name: 'Italy',
    flag: '🇮🇹',
    description: 'GBZA students experience art, history, and Renaissance culture',
    image: 'https://images.pexels.com/photos/2225617/pexels-photo-2225617.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop'
  },
  {
    id: 'france',
    name: 'France',
    flag: '🇫🇷',
    description: 'Selected students immerse in French culture and language',
    image: 'https://images.pexels.com/photos/161853/eiffel-tower-paris-france-tower-161853.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop'
  },
  {
    id: 'germany',
    name: 'Germany',
    flag: '🇩🇪',
    description: 'Our students explore innovation and tradition in Germany',
    image: 'https://images.pexels.com/photos/109629/pexels-photo-109629.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop'
  },
  {
    id: 'portugal',
    name: 'Portugal',
    flag: '🇵🇹',
    description: 'GBZA students discover coastal beauty and warm hospitality',
    image: 'https://images.pexels.com/photos/2049422/pexels-photo-2049422.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop'
  }
];

export function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % countries.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? countries.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % countries.length);
  };

  return (
    <div className="relative h-[80vh] overflow-hidden rounded-2xl shadow-2xl">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${countries[currentIndex].image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/50" />
          
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-center text-white px-4 max-w-5xl"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
                className="text-8xl md:text-9xl mb-6"
              >
                {countries[currentIndex].flag}
              </motion.div>
              <h1 className="text-4xl md:text-7xl font-bold mb-6 leading-tight">
                {countries[currentIndex].name}
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-gray-200 leading-relaxed">
                {countries[currentIndex].description}
              </p>
              <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 text-lg px-8 py-3" asChild>
                <Link href={`/countries/${countries[currentIndex].id}`}>
                  Explore Their Journey
                </Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation buttons */}
      <Button
        variant="ghost"
        size="sm"
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 rounded-full p-3"
        onClick={goToPrevious}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      
      <Button
        variant="ghost"
        size="sm"
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 rounded-full p-3"
        onClick={goToNext}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Dots indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3">
        {countries.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}