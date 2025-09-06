'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Globe, Users, BookOpen, Award, MapPin, Clock } from 'lucide-react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { HeroCarousel } from '@/components/HeroCarousel';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="section-padding pt-24">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Showcasing{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                GBZA Excellence
              </span>
              {' '}in Europe
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Every year, Gymnasium Bilingválne carefully selects exceptional students for 
              transformative Erasmus+ experiences across Europe. This showcase celebrates 
              their academic achievements and cultural discoveries in our partner countries.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <HeroCarousel />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-white/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-3xl md:text-5xl font-bold text-gray-900 mb-6"
            >
              Why Our Students Excel in Europe
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-lg text-gray-600 max-w-3xl mx-auto"
            >
              Our rigorous selection process ensures that only the most dedicated and capable 
              GBZA students represent our school in prestigious European institutions.
            </motion.p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              {
                icon: Award,
                title: 'Academic Excellence',
                description: 'Our selected students maintain outstanding academic performance at top European universities.'
              },
              {
                icon: Globe,
                title: 'Cultural Ambassadors',
                description: 'GBZA students represent Swiss values while embracing diverse European cultures.'
              },
              {
                icon: BookOpen,
                title: 'Prestigious Partnerships',
                description: 'Carefully curated partnerships with leading European institutions ensure quality education.'
              },
              {
                icon: Users,
                title: 'Lifelong Networks',
                description: 'Our students build valuable connections with peers and educators across Europe.'
              },
              {
                icon: MapPin,
                title: 'Five Destinations',
                description: 'Students experience excellence in Spain, Italy, France, Germany, and Portugal.'
              },
              {
                icon: Clock,
                title: 'Proven Success',
                description: 'Over a decade of successful student placements and outstanding outcomes.'
              }
            ].map((feature, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="glass-card h-full hover:shadow-xl transition-shadow duration-300">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-xl font-semibold text-gray-900">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-3xl p-8 md:p-12 text-center"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Celebrating Student Achievement
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
              Explore the remarkable journeys of our carefully selected GBZA students 
              as they excel in European academic environments and embrace new cultures.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/countries">
                <Button size="lg" className="group">
                  Explore Destinations
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/news">
                <Button size="lg" variant="outline">
                  Read Success Stories
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
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
                Gymnasium Bäumlihof<br />
                Zu den Drei Linden 80<br />
                4058 Basel, Switzerland<br />
                erasmus@gbza.ch
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
    </div>
  );
}