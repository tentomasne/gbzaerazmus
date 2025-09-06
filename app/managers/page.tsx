'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Globe, Users } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { managers } from '@/lib/managers';

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

export default function ManagersPage() {
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
              Meet Our{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Erasmus Team
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our dedicated coordinators work tirelessly to select exceptional GBZA students 
              and ensure they have transformative experiences across Europe.
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="initial"
            animate="animate"
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {managers.map((manager, index) => (
              <motion.div key={manager.id} variants={fadeInUp}>
                <Card className="glass-card h-full overflow-hidden hover:shadow-xl transition-all duration-300 group">
                  <CardHeader className="text-center pb-4">
                    <div className="relative w-32 h-32 mx-auto mb-4">
                      <div
                        className="w-full h-full rounded-full bg-cover bg-center shadow-lg transform group-hover:scale-105 transition-transform duration-300"
                        style={{ backgroundImage: `url(${manager.image})` }}
                      />
                      <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900">
                      {manager.name}
                    </CardTitle>
                    <p className="text-blue-600 font-medium">{manager.title}</p>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {manager.bio}
                    </p>

                    {/* Contact Information */}
                    <div className="space-y-3">
                      <div className="flex items-center text-sm text-gray-600">
                        <Mail className="h-4 w-4 mr-3 text-blue-600" />
                        <a 
                          href={`mailto:${manager.email}`}
                          className="hover:text-blue-600 transition-colors"
                        >
                          {manager.email}
                        </a>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Phone className="h-4 w-4 mr-3 text-blue-600" />
                        <a 
                          href={`tel:${manager.phone}`}
                          className="hover:text-blue-600 transition-colors"
                        >
                          {manager.phone}
                        </a>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mr-3 text-blue-600" />
                        <span>{manager.office}</span>
                      </div>
                    </div>

                    {/* Specializations */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                        <Users className="h-4 w-4 mr-2" />
                        Specializations
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {manager.specializations.map((spec) => (
                          <Badge key={spec} variant="outline" className="text-xs">
                            {spec}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Languages */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                        <Globe className="h-4 w-4 mr-2" />
                        Languages
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {manager.languages.map((language) => (
                          <Badge key={language} variant="secondary" className="text-xs">
                            {language}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button 
                      className="w-full group"
                      onClick={() => window.location.href = `mailto:${manager.email}`}
                    >
                      <Mail className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform" />
                      Contact {manager.name.split(' ')[0]}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-20"
          >
            <div className="glass-card rounded-3xl p-8 md:p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                General Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Office Hours</h3>
                  <p className="text-gray-600 text-sm">
                    Monday - Friday<br />
                    8:00 AM - 5:00 PM<br />
                    Appointments recommended
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Location</h3>
                  <p className="text-gray-600 text-sm">
                    Gymnasium Bäumlihof<br />
                    Zu den Drei Linden 80<br />
                    4058 Basel, Switzerland
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">General Contact</h3>
                  <p className="text-gray-600 text-sm">
                    Phone: +41 61 377 94 00<br />
                    Email: erasmus@gbza.ch<br />
                    Website: www.gbza.ch
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}