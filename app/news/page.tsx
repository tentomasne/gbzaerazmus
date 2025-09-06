'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calendar, User, Tag, Search, Filter } from 'lucide-react';
import { format } from 'date-fns';
import { Navbar } from '@/components/Navbar';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { newsArticles } from '@/lib/news';
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

export default function NewsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [filteredArticles, setFilteredArticles] = useState(newsArticles);

  // Filter articles based on search term and selected country
  useEffect(() => {
    let filtered = newsArticles;

    if (searchTerm) {
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedCountry !== 'all') {
      filtered = filtered.filter(article => article.country === selectedCountry);
    }

    setFilteredArticles(filtered);
  }, [searchTerm, selectedCountry]);

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
              Latest{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                News & Updates
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stay informed about our Erasmus program developments, student experiences, 
              and exciting opportunities across Europe.
            </p>
          </motion.div>

          {/* Search and Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <Card className="glass-card">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search articles, tags, or topics..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                    <SelectTrigger className="md:w-48">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Filter by country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Countries</SelectItem>
                      {countries.map(country => (
                        <SelectItem key={country.id} value={country.name}>
                          {country.flag} {country.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Articles Grid */}
          <motion.div
            variants={stagger}
            initial="initial"
            animate="animate"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredArticles.map((article, index) => (
              <motion.div key={article.id} variants={fadeInUp}>
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
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <Calendar className="h-4 w-4 mr-2" />
                      {format(new Date(article.publishedAt), 'MMMM dd, yyyy')}
                      <User className="h-4 w-4 ml-4 mr-2" />
                      {article.author}
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                      {article.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 line-clamp-3 flex-1">
                      {article.excerpt}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {article.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          <Tag className="h-3 w-3 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                      {article.tags.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{article.tags.length - 2} more
                        </Badge>
                      )}
                    </div>

                    <Link href={`/news/${article.id}`}>
                      <Button className="w-full group">
                        Read More
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {filteredArticles.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-12"
            >
              <div className="glass-card rounded-3xl p-8 md:p-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">No articles found</h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search terms or filters to find more articles.
                </p>
                <Button onClick={() => { setSearchTerm(''); setSelectedCountry('all'); }}>
                  Clear Filters
                </Button>
              </div>
            </motion.div>
          )}

          {/* Newsletter Signup */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-20"
          >
            <div className="glass-card rounded-3xl p-8 md:p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Stay Updated
              </h2>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Subscribe to our newsletter to receive the latest news about our Erasmus programs, 
                student success stories, and upcoming opportunities.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <Input placeholder="Enter your email" className="flex-1" />
                <Button>Subscribe</Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}