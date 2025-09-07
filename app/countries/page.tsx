'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, MapPin, Clock, Users, BookOpen } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { countries } from '@/lib/countries';

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function CountriesPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="section-padding pt-24">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Discover Your Next{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Destination
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from our partner countries across Europe. Each destination offers 
              unique cultural experiences and world-class educational opportunities.
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="initial"
            animate="animate"
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {countries.map((country, index) => (
              <motion.div key={country.id} variants={fadeInUp}>
                <Card className="glass-card h-full overflow-hidden hover:shadow-xl transition-all duration-300 group">
                  <div className="relative h-64 overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center transform group-hover:scale-105 transition-transform duration-500"
                      style={{ backgroundImage: `url(${country.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <div className="text-4xl mb-2">{country.flag}</div>
                      <h3 className="text-2xl font-bold">{country.name}</h3>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                        <MapPin className="h-3 w-3 mr-1" />
                        {country.details.capital}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {country.description}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-2" />
                        {country.programInfo.duration}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <BookOpen className="h-4 w-4 mr-2" />
                        {country.programInfo.subjects.length} subjects
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {country.programInfo.subjects.slice(0, 3).map((subject) => (
                        <Badge key={subject} variant="outline" className="text-xs">
                          {subject}
                        </Badge>
                      ))}
                      {country.programInfo.subjects.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{country.programInfo.subjects.length - 3} more
                        </Badge>
                      )}
                    </div>

                    <Link href={`/countries/${country.id}`}>
                      <Button className="w-full group">
                        Learn More
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-20 text-center"
          >
            <div className="glass-card rounded-3xl p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Can't Decide? We're Here to Help!
              </h2>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Our Erasmus coordinators can help you choose the perfect destination 
                based on your academic goals and personal interests.
              </p>
              <Link href="/managers">
                <Button size="lg">
                  Contact Our Team
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}