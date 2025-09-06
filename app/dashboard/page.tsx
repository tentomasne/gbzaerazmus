'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Eye, Clock, CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';
import { Navbar } from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface Article {
  id: string;
  title: string;
  excerpt: string;
  status: string;
  country: string;
  createdAt: string;
  updatedAt: string;
  author: {
    name: string;
  };
}

export default function DashboardPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      window.location.href = '/auth/login';
      return;
    }
    fetchArticles();
  }, [isAuthenticated]);

  const fetchArticles = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/articles', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setArticles(data.articles || []);
    } catch (error) {
      toast.error('Failed to fetch articles');
    } finally {
      setLoading(false);
    }
  };

  const deleteArticle = async (id: string) => {
    if (!confirm('Are you sure you want to delete this article?')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/articles/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        toast.success('Article deleted successfully');
        fetchArticles();
      } else {
        toast.error('Failed to delete article');
      }
    } catch (error) {
      toast.error('Failed to delete article');
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'PUBLISHED':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'PENDING':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'REJECTED':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Edit className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PUBLISHED':
        return 'bg-green-100 text-green-800';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'REJECTED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="section-padding pt-24">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  Welcome back, {user?.name}
                </h1>
                <p className="text-gray-600">
                  Manage your articles and content from your dashboard.
                </p>
              </div>
              <Link href="/dashboard/articles/new">
                <Button className="group">
                  <Plus className="h-4 w-4 mr-2 group-hover:rotate-90 transition-transform" />
                  New Article
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
          >
            {[
              { label: 'Total Articles', value: articles.length, color: 'text-blue-600' },
              { label: 'Published', value: articles.filter(a => a.status === 'PUBLISHED').length, color: 'text-green-600' },
              { label: 'Pending', value: articles.filter(a => a.status === 'PENDING').length, color: 'text-yellow-600' },
              { label: 'Drafts', value: articles.filter(a => a.status === 'DRAFT').length, color: 'text-gray-600' },
            ].map((stat, index) => (
              <Card key={stat.label} className="glass-card">
                <CardContent className="p-6">
                  <div className={`text-2xl font-bold ${stat.color} mb-1`}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </motion.div>

          {/* Articles List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Your Articles</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="text-gray-600 mt-2">Loading articles...</p>
                  </div>
                ) : articles.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-600 mb-4">No articles yet. Create your first article!</p>
                    <Link href="/dashboard/articles/new">
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Create Article
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {articles.map((article) => (
                      <div
                        key={article.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            {getStatusIcon(article.status)}
                            <h3 className="font-semibold text-gray-900">{article.title}</h3>
                            <Badge className={getStatusColor(article.status)}>
                              {article.status}
                            </Badge>
                            {article.country && (
                              <Badge variant="outline">{article.country}</Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                            {article.excerpt}
                          </p>
                          <div className="text-xs text-gray-500">
                            Created {format(new Date(article.createdAt), 'MMM dd, yyyy')} • 
                            Updated {format(new Date(article.updatedAt), 'MMM dd, yyyy')}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          <Link href={`/dashboard/articles/${article.id}`}>
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Link href={`/dashboard/articles/${article.id}/edit`}>
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => deleteArticle(article.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}