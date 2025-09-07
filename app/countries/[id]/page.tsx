'use client';

import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import { ArrowLeft, MapPin, Clock, Users, Globe, BookOpen, Home, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { countries } from '@/lib/countries';
import Lenis from 'lenis'
import { useEffect } from 'react';

export default function CountryPage() {
  const params = useParams();
  const countryId = params.id as string;
  const country = countries.find(c => c.id === countryId);

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  if (!country) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Country not found</h1>
          <Link href="/countries">
            <Button>Back to Countries</Button>
          </Link>
        </div>
      </div>
    );
  }

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="relative">
        {/* Hero Section */}
        <div className="relative h-[60vh] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${country.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

          <div className="relative h-full flex items-end">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 w-full">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-white"
              >
                <Link href="/countries" className="inline-flex items-center text-white/80 hover:text-white mb-4 transition-colors">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Countries
                </Link>
                <div className="text-6xl mb-4">{country.flag}</div>
                <h1 className="text-5xl md:text-7xl font-bold mb-4">{country.name}</h1>
                <p className="text-xl md:text-2xl text-gray-200 max-w-3xl">
                  {country.description}
                </p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="section-padding">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Country Details */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Globe className="h-5 w-5 mr-2" />
                        Country Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <div className="text-sm font-medium text-gray-500 mb-1">Capital</div>
                            <div className="font-semibold">{country.details.capital}</div>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-500 mb-1">Language</div>
                            <div className="font-semibold">{country.details.language}</div>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-500 mb-1">Currency</div>
                            <div className="font-semibold">{country.details.currency}</div>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <div className="text-sm font-medium text-gray-500 mb-1">Population</div>
                            <div className="font-semibold">{country.details.population}</div>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-500 mb-1">Time Zone</div>
                            <div className="font-semibold">{country.details.timeZone}</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Program Highlights */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle>Program Highlights</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {country.highlights.map((highlight, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                            className="flex items-start"
                          >
                            <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{highlight}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Academic Subjects */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <BookOpen className="h-5 w-5 mr-2" />
                        Available Subjects
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {country.programInfo.subjects.map((subject, index) => (
                          <motion.div
                            key={subject}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                          >
                            <Badge variant="secondary" className="px-3 py-1">
                              {subject}
                            </Badge>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Quick Info */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle className="text-lg">Program Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 text-gray-500 mr-3" />
                        <div>
                          <div className="font-medium">Duration</div>
                          <div className="text-sm text-gray-600">{country.programInfo.duration}</div>
                        </div>
                      </div>
                      <Separator />
                      <div className="flex items-center">
                        <Home className="h-4 w-4 text-gray-500 mr-3" />
                        <div>
                          <div className="font-medium">Accommodation</div>
                          <div className="text-sm text-gray-600">{country.programInfo.accommodation}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Requirements */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle className="text-lg">Requirements</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {country.programInfo.requirements.map((requirement, index) => (
                          <li key={index} className="flex items-start text-sm">
                            <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-600">{requirement}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* CTA */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <Card className="glass-card bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
                    <CardContent className="p-6 text-center">
                      <h3 className="font-bold mb-2">Ready to Apply?</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Contact our Erasmus coordinators to start your application process.
                      </p>
                      <Link href="/managers">
                        <Button className="w-full">
                          Contact Coordinators
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}