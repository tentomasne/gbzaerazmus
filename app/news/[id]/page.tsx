'use client';

import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import { ArrowLeft, Calendar, User, Tag, Share2 } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { newsArticles } from '@/lib/news';

export default function NewsArticlePage() {
  const params = useParams();
  const articleId = params.id as string;
  const article = newsArticles.find(a => a.id === articleId);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Article not found</h1>
          <Link href="/news">
            <Button>Back to News</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="section-padding pt-24">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link 
              href="/news" 
              className="inline-flex items-center text-blue-600 hover:text-blue-500 mb-8 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to News
            </Link>

            {/* Article Header */}
            <div className="mb-8">
              <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-8">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${article.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30 mb-4">
                    {article.country}
                  </Badge>
                </div>
              </div>

              <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                {article.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-gray-500 mb-6">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  {format(new Date(article.publishedAt), 'MMMM dd, yyyy')}
                </div>
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  {article.author}
                </div>
                <Button variant="ghost" size="sm" className="p-0 h-auto">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>

              <div className="flex flex-wrap gap-2 mb-8">
                {article.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Article Content */}
            <Card className="glass-card">
              <CardContent className="p-8">
                <div className="prose prose-lg max-w-none">
                  {article.content.split('\n\n').map((paragraph, index) => (
                    <motion.p
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="text-gray-700 leading-relaxed mb-6"
                    >
                      {paragraph.trim()}
                    </motion.p>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Related Articles */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-16"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Related Stories</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {newsArticles
                  .filter(a => a.id !== article.id && (a.country === article.country || a.tags.some(tag => article.tags.includes(tag))))
                  .slice(0, 2)
                  .map((relatedArticle) => (
                    <Card key={relatedArticle.id} className="glass-card hover:shadow-lg transition-shadow duration-300">
                      <div className="relative h-32 overflow-hidden">
                        <div
                          className="absolute inset-0 bg-cover bg-center"
                          style={{ backgroundImage: `url(${relatedArticle.image})` }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      </div>
                      <CardContent className="p-4">
                        <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                          {relatedArticle.title}
                        </h4>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                          {relatedArticle.excerpt}
                        </p>
                        <Link href={`/news/${relatedArticle.id}`}>
                          <Button size="sm" variant="outline" className="w-full">
                            Read More
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}