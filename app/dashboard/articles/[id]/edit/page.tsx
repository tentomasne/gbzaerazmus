'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Eye } from 'lucide-react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { countries } from '@/lib/countries';
import HtmlTextEditor from '@/components/html-text-editor';

const articleSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title must be less than 200 characters'),
  excerpt: z.string().max(500, 'Excerpt must be less than 500 characters').optional(),
  content: z.string().min(1, 'Content is required'),
  country: z.string().optional(),
  status: z.enum(['DRAFT', 'PENDING', 'PUBLISHED']),
  tags: z.array(z.string()).default([]),
  coverImage: z.string().optional(),
});

type ArticleFormData = z.infer<typeof articleSchema>;

interface Article {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  status: string;
  country: string;
  tags: string[];
  coverImage: string;
  author: {
    id: string;
    name: string;
  };
}

export default function EditArticlePage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [article, setArticle] = useState<Article | null>(null);
  const [content, setContent] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [coverImage, setCoverImage] = useState('');
  const { user } = useAuth();
  const params = useParams();
  const router = useRouter();
  const articleId = params.id as string;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ArticleFormData>({
    resolver: zodResolver(articleSchema),
  });

  const watchedStatus = watch('status');

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
        const articleData = data.article;
        
        // Check if user can edit this article
        if (user?.role !== 'ADMIN' && articleData.author.id !== user?.id) {
          toast.error('You do not have permission to edit this article');
          router.push('/dashboard');
          return;
        }

        setArticle(articleData);
        setContent(articleData.content);
        setTags(articleData.tags || []);
        setCoverImage(articleData.coverImage || '');
        
        // Reset form with article data
        reset({
          title: articleData.title,
          excerpt: articleData.excerpt || '',
          content: articleData.content,
          country: articleData.country || '',
          status: articleData.status,
          tags: articleData.tags || [],
          coverImage: articleData.coverImage || '',
        });
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

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      const newTags = [...tags, tagInput.trim()];
      setTags(newTags);
      setValue('tags', newTags);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    const newTags = tags.filter(tag => tag !== tagToRemove);
    setTags(newTags);
    setValue('tags', newTags);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  const onSubmit = async (data: ArticleFormData) => {
    if (!content.trim()) {
      toast.error('Content is required');
      return;
    }

    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/articles/${articleId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...data,
          content,
          tags,
          coverImage,
        }),
      });

      if (response.ok) {
        toast.success('Article updated successfully!');
        router.push(`/dashboard/articles/${articleId}`);
      } else {
        const error = await response.json();
        toast.error(error.error || 'Failed to update article');
      }
    } catch (error) {
      toast.error('Failed to update article');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveAsDraft = () => {
    setValue('status', 'DRAFT');
    handleSubmit(onSubmit)();
  };

  const handlePublish = () => {
    setValue('status', 'PUBLISHED');
    handleSubmit(onSubmit)();
  };

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
    return null;
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
              href={`/dashboard/articles/${articleId}`}
              className="inline-flex items-center text-blue-600 hover:text-blue-500 mb-6 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Article
            </Link>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Edit Article
            </h1>
            <p className="text-gray-600">
              Update your article content and settings.
            </p>
          </motion.div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Article Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Article Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      {...register('title')}
                      placeholder="Enter article title..."
                      className="mt-1"
                    />
                    {errors.title && (
                      <p className="text-sm text-red-600 mt-1">{errors.title.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="excerpt">Excerpt</Label>
                    <Textarea
                      id="excerpt"
                      {...register('excerpt')}
                      placeholder="Brief summary of your article..."
                      rows={3}
                      className="mt-1"
                    />
                    {errors.excerpt && (
                      <p className="text-sm text-red-600 mt-1">{errors.excerpt.message}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="country">Country</Label>
                      <Select 
                        value={watch('country')} 
                        onValueChange={(value) => setValue('country', value)}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          {countries.map((country) => (
                            <SelectItem key={country.id} value={country.name}>
                              {country.flag} {country.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="status">Status</Label>
                      <Select 
                        value={watch('status')}
                        onValueChange={(value) => setValue('status', value as 'DRAFT' | 'PENDING' | 'PUBLISHED')}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="DRAFT">Draft</SelectItem>
                          <SelectItem value="PENDING">Pending Review</SelectItem>
                          {user?.role === 'ADMIN' && (
                            <SelectItem value="PUBLISHED">Published</SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="coverImage">Cover Image URL</Label>
                    <Input
                      id="coverImage"
                      value={coverImage}
                      onChange={(e) => {
                        setCoverImage(e.target.value);
                        setValue('coverImage', e.target.value);
                      }}
                      placeholder="https://example.com/image.jpg"
                      className="mt-1"
                    />
                    {coverImage && (
                      <div className="mt-2">
                        <img
                          src={coverImage}
                          alt="Cover preview"
                          className="w-full h-32 object-cover rounded-lg"
                          onError={() => setCoverImage('')}
                        />
                      </div>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="tags">Tags</Label>
                    <div className="mt-1 space-y-2">
                      <div className="flex gap-2">
                        <Input
                          value={tagInput}
                          onChange={(e) => setTagInput(e.target.value)}
                          onKeyPress={handleKeyPress}
                          placeholder="Add tags..."
                        />
                        <Button type="button" onClick={addTag} variant="outline">
                          Add
                        </Button>
                      </div>
                      {tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="cursor-pointer">
                              {tag}
                              <button
                                type="button"
                                onClick={() => removeTag(tag)}
                                className="ml-2 hover:text-red-600"
                              >
                                ×
                              </button>
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Content Editor */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Content *</CardTitle>
                </CardHeader>
                <CardContent>
                  <HtmlTextEditor
                    value={content}
                    onChange={setContent}
                    placeholder="Write your article content here..."
                  />
                  {!content.trim() && (
                    <p className="text-sm text-red-600 mt-2">Content is required</p>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="glass-card">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row gap-4 justify-between">
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleSaveAsDraft}
                        disabled={saving}
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Save as Draft
                      </Button>
                      
                      {user?.role === 'ADMIN' ? (
                        <Button
                          type="button"
                          onClick={handlePublish}
                          disabled={saving}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          Publish
                        </Button>
                      ) : (
                        <Button
                          type="button"
                          onClick={() => {
                            setValue('status', 'PENDING');
                            handleSubmit(onSubmit)();
                          }}
                          disabled={saving}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          Submit for Review
                        </Button>
                      )}
                    </div>

                    <div className="text-sm text-gray-500">
                      Author: {article.author.name}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </form>
        </div>
      </div>
    </div>
  );
}