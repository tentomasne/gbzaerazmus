'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Edit, Trash2, Eye, Calendar, User, Tag, Globe } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface Article {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  status: string;
  country: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  author: {
    id: string;
    name: string;
    email: string;
  };
}

export default function ArticleViewPage() {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const { user } = useAuth();
  const params = useParams();
  const router = useRouter();
  const articleId = params.id as string;

  useEffect(() => {
    fetchArticle();
  }, [articleId]);

  const fetchArticle = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/articles/${articleId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        setArticle(data.article);
      } else {
        toast.error('Article not found');
        router.push('/dashboard');
      }
    } catch (error) {
      toast.error('Failed to fetch article');
      router.push('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this article?')) return;

    setDeleting(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/articles/${articleId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        toast.success('Article deleted successfully');
        router.push('/dashboard');
      } else {
        toast.error('Failed to delete article');
      }
    } catch (error) {
      toast.error('Failed to delete article');
    } finally {
      setDeleting(false);
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

  const canEdit = user?.role === 'ADMIN' || article?.author.id === user?.id;

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="section-padding pt-24">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-gray-200 rounded w-1/4"></div>
              <div className="h-12 bg-gray-200 rounded w-3/4"></div>
              <div className="h-96 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="section-padding pt-24">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-2xl font-bold mb-4">Article not found</h1>
            <Link href="/dashboard">
              <Button>Back to Dashboard</Button>
            </Link>
          </div>
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
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <Link
              href="/dashboard"
              className="inline-flex items-center text-blue-600 hover:text-blue-500 mb-6 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Link>

            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {article.title}
                </h1>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    {article.author.name}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {format(new Date(article.createdAt), 'MMM dd, yyyy')}
                  </div>
                  {article.country && (
                    <div className="flex items-center">
                      <Globe className="h-4 w-4 mr-1" />
                      {article.country}
                    </div>
                  )}
                </div>
              </div>

              {canEdit && (
                <div className="flex gap-2">
                  <Link href={`/dashboard/articles/${article.id}/edit`}>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleDelete}
                    disabled={deleting}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
              )}
            </div>

            <div className="flex items-center gap-4 mb-6">
              <Badge className={getStatusColor(article.status)}>
                {article.status}
              </Badge>
              {article.tags.length > 0 && (
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4 text-gray-400" />
                  <div className="flex gap-2">
                    {article.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {article.excerpt && (
              <Card className="glass-card mb-6">
                <CardContent className="p-6">
                  <p className="text-lg text-gray-700 italic">{article.excerpt}</p>
                </CardContent>
              </Card>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="glass-card">
              <CardContent className="p-8">
                <div 
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8"
          >
            <Card className="glass-card">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Article Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Created:</span>{' '}
                    {format(new Date(article.createdAt), 'PPP')}
                  </div>
                  <div>
                    <span className="font-medium">Last Updated:</span>{' '}
                    {format(new Date(article.updatedAt), 'PPP')}
                  </div>
                  {article.publishedAt && (
                    <div>
                      <span className="font-medium">Published:</span>{' '}
                      {format(new Date(article.publishedAt), 'PPP')}
                    </div>
                  )}
                  <div>
                    <span className="font-medium">Author:</span>{' '}
                    {article.author.name} ({article.author.email})
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}