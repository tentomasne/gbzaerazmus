'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Calendar, Award, Users, Globe, Filter, Clock } from 'lucide-react';
import { format } from 'date-fns';
import Lenis from 'lenis';
import Navbar from '@/components/Navbar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { timelineEvents, getAvailableYears, getAvailableCategories, type TimelineEvent } from '@/lib/timeline';

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const slideInLeft = {
  initial: { opacity: 0, x: -60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6 }
};

const slideInRight = {
  initial: { opacity: 0, x: 60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6 }
};

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'achievement':
      return <Award className="h-4 w-4" />;
    case 'partnership':
      return <Users className="h-4 w-4" />;
    case 'program':
      return <Globe className="h-4 w-4" />;
    default:
      return <Calendar className="h-4 w-4" />;
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'achievement':
      return 'bg-green-100 text-green-800';
    case 'partnership':
      return 'bg-blue-100 text-blue-800';
    case 'program':
      return 'bg-purple-100 text-purple-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default function TimelinePage() {
  const [filteredEvents, setFilteredEvents] = useState<TimelineEvent[]>(timelineEvents);
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { t } = useTranslation();

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

  // Filter events based on selected filters
  useEffect(() => {
    let filtered = timelineEvents;

    if (selectedYear !== 'all') {
      filtered = filtered.filter(event => event.year === parseInt(selectedYear));
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(event => event.category === selectedCategory);
    }

    setFilteredEvents(filtered.sort((a, b) => b.year - a.year));
  }, [selectedYear, selectedCategory]);

  const availableYears = getAvailableYears();
  const availableCategories = getAvailableCategories();

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
              Our{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Timeline
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore the remarkable journey of GBZA's Erasmus program from its inception to today, 
              showcasing the milestones that have shaped our international education excellence.
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <Card className="glass-card">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <Select value={selectedYear} onValueChange={setSelectedYear}>
                    <SelectTrigger className="md:w-48">
                      <Calendar className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Filter by year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Years</SelectItem>
                      {availableYears.map(year => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="md:w-48">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {availableCategories.map(category => (
                        <SelectItem key={category} value={category}>
                          <div className="flex items-center">
                            {getCategoryIcon(category)}
                            <span className="ml-2 capitalize">{category}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {(selectedYear !== 'all' || selectedCategory !== 'all') && (
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setSelectedYear('all');
                        setSelectedCategory('all');
                      }}
                    >
                      Clear Filters
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 to-purple-600 transform md:-translate-x-1/2"></div>

            <div className="space-y-12">
              {filteredEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  } flex-col md:gap-8`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-white border-4 border-blue-600 rounded-full transform md:-translate-x-1/2 z-10">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                      className="w-full h-full bg-blue-600 rounded-full"
                    />
                  </div>

                  {/* Year Badge */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 + 0.1 }}
                    className="absolute left-16 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-8 z-20"
                  >
                    <Badge className="bg-blue-600 text-white px-3 py-1 text-sm font-bold">
                      {event.year}
                    </Badge>
                  </motion.div>

                  {/* Content Card */}
                  <motion.div
                    variants={index % 2 === 0 ? slideInLeft : slideInRight}
                    className="w-full md:w-5/12 ml-20 md:ml-0"
                  >
                    <Card className="glass-card overflow-hidden hover:shadow-xl transition-all duration-300 group">
                      {event.image && (
                        <div className="relative h-48 overflow-hidden">
                          <div
                            className="absolute inset-0 bg-cover bg-center transform group-hover:scale-105 transition-transform duration-500"
                            style={{ backgroundImage: `url(${event.image})` }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          <div className="absolute top-4 left-4">
                            <Badge className={getCategoryColor(event.category)}>
                              {getCategoryIcon(event.category)}
                              <span className="ml-1 capitalize">{event.category}</span>
                            </Badge>
                          </div>
                          {event.country && (
                            <div className="absolute top-4 right-4">
                              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                                {event.country}
                              </Badge>
                            </div>
                          )}
                        </div>
                      )}

                      <CardContent className="p-6">
                        <div className="flex items-center text-sm text-gray-500 mb-3">
                          <Clock className="h-4 w-4 mr-2" />
                          {format(new Date(event.date), 'MMMM dd, yyyy')}
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 mb-3">
                          {event.title}
                        </h3>

                        <p className="text-gray-600 leading-relaxed">
                          {event.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block w-5/12"></div>
                </motion.div>
              ))}
            </div>

            {filteredEvents.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center py-12"
              >
                <div className="glass-card rounded-3xl p-8 md:p-12 mx-auto max-w-md">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">No events found</h3>
                  <p className="text-gray-600 mb-6">
                    Try adjusting your filters to see more timeline events.
                  </p>
                  <Button onClick={() => { setSelectedYear('all'); setSelectedCategory('all'); }}>
                    Clear Filters
                  </Button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Statistics */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-20"
          >
            <div className="glass-card rounded-3xl p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
                Our Impact in Numbers
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {[
                  { label: 'Years of Excellence', value: '15+', icon: Calendar },
                  { label: 'Partner Universities', value: '20+', icon: Users },
                  { label: 'Student Exchanges', value: '500+', icon: Globe },
                  { label: 'Success Rate', value: '98%', icon: Award },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <stat.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                    <div className="text-gray-600">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}