'use client';

import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Calendar, Award, Users, Globe } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getFeaturedEvents } from '@/lib/timeline';

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

export function TimelinePreview() {
  const { t } = useTranslation();
  const featuredEvents = getFeaturedEvents();

  return (
    <section className="section-padding bg-gradient-to-br from-slate-50 to-blue-50">
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
            Our Journey Through{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Time
            </span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-lg text-gray-600 max-w-3xl mx-auto"
          >
            Discover the milestones that shaped our Erasmus program into the prestigious international education experience it is today.
          </motion.p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
        >
          {featuredEvents.map((event, index) => (
            <motion.div key={event.id} variants={fadeInUp}>
              <Card className="glass-card h-full overflow-hidden hover:shadow-xl transition-all duration-300 group">
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
                  <div className="absolute bottom-4 left-4">
                    <div className="text-white text-3xl font-bold">{event.year}</div>
                  </div>
                </div>

                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 line-clamp-3">
                    {event.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <Link href="/timeline">
            <Button size="lg" className="group">
              Explore Full Timeline
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}