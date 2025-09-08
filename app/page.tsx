'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Globe, Users, BookOpen, Award, MapPin, Clock } from 'lucide-react';
import Link from 'next/link';
import Lenis from 'lenis'
import { format } from 'date-fns';
import { HeroCarousel } from '@/components/HeroCarousel';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { newsArticles } from '@/lib/news';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import WorldMapDemo from '@/components/EuropeMap';
import { PointerHighlight } from '@/components/ui/pointer-highlight';
import { AnnouncementBanner } from '@/components/AnnouncementBanner';

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
  const [showNavbar, setShowNavbar] = useState(true)

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


  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight * 0.8
      const scrollY = window.scrollY

      if (scrollY > heroHeight) {
        setShowNavbar(false)
      } else {
        setShowNavbar(true)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen">

      <Navbar showNavbar={showNavbar} />


      {/* Full Hero Carousel Section */}
      <HeroCarousel />

      {/* Announcements */}
      <AnnouncementBanner />

      {/* Features Section */}
      <section className="section-padding">
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

      {/* News Section */}
      <section className="section-padding bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 mx-auto max-w-lg font-bold tracking-tight text-center">
              Latest News from
              <PointerHighlight containerClassName="inline-block md:inline">
              <span className="text-blue-600 md:ml-2 block md:inline"> Our Students</span>
              </PointerHighlight>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Read the latest updates, experiences, and achievements shared by our
              GBZA students currently studying across Europe.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {newsArticles.slice(0, 3).map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              >
                <Card className="glass-card h-full overflow-hidden hover:shadow-xl transition-all duration-300 group">
                  <div className="relative h-48 overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center transform group-hover:scale-105 transition-transform duration-500"
                      style={{ backgroundImage: `url(${article.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                        {article.country}
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                      {article.title}
                    </h3>

                    <p className="text-gray-600 mb-4 line-clamp-3 flex-1">
                      {article.excerpt}
                    </p>

                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span>By {article.author}</span>
                      <span>{format(new Date(article.publishedAt), 'MMM dd, yyyy')}</span>
                    </div>

                    <Link href={`/news/${article.id}`}>
                      <Button className="w-full group">
                        Read More
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-12"
          >
            <Link href="/news">
              <Button size="lg" variant="outline">
                View All Student News
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Map Section */}
      <WorldMapDemo />


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
              Follow the remarkable journeys of our carefully selected GBZA students
              through their own stories and updates from European academic environments.
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
                  Read Student Stories
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>

      </section>

      
    </div>
  );
}