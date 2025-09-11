'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
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
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { countries } from '@/lib/countries';
import HtmlTextEditor from '@/components/html-text-editor';
import { ImageUpload } from '@/components/ImageUpload';

const articleSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title must be less than 200 characters'),
  excerpt: z.string().max(500, 'Excerpt must be less than 500 characters').optional(),
  content: z.string().min(1, 'Content is required'),
  country: z.string().optional(),
  status: z.enum(['DRAFT', 'PENDING', 'PUBLISHED']),
  tags: z.array(z.string()).default([]),
  coverImage: z.string().optional(),
  publishDate: z.string().optional(),
});

type ArticleFormData = z.infer<typeof articleSchema>;

export default function NewArticlePage() {
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [coverImage, setCoverImage] = useState('');
  const [publishDate, setPublishDate] = useState('');
  const { t } = useTranslation();
  const { user } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ArticleFormData>({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      status: 'DRAFT',
      tags: [],
      publishDate: new Date().toISOString().slice(0, 16), // Current date and time
    },
  });

  const watchedStatus = watch('status');

  // Initialize publish date
  useEffect(() => {
    const now = new Date().toISOString().slice(0, 16);
    setPublishDate(now);
    setValue('publishDate', now);
  }, [setValue]);

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
      toast.error(t('createArticle.contentRequired'));
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...data,
          content,
          tags,
          coverImage,
          publishDate,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        toast.success(t('createArticle.articleCreated'));
        router.push(`/dashboard/articles/${result.article.id}`);
      } else {
        const error = await response.json();
        toast.error(error.error || t('createArticle.failedToCreate'));
      }
    } catch (error) {
      toast.error(t('createArticle.failedToCreate'));
    } finally {
      setLoading(false);
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
              {t('createArticle.backToDashboard')}
            </Link>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              {t('createArticle.title')}
            </h1>
            <p className="text-gray-600">
              {t('createArticle.subtitle')}
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
                  <CardTitle>{t('createArticle.articleDetails')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="title">{t('createArticle.title_field')} *</Label>
                    <Input
                      id="title"
                      {...register('title')}
                      placeholder={t('createArticle.title_field')}
                      className="mt-1"
                    />
                    {errors.title && (
                      <p className="text-sm text-red-600 mt-1">{errors.title.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="excerpt">{t('createArticle.excerpt')}</Label>
                    <Textarea
                      id="excerpt"
                      {...register('excerpt')}
                      placeholder={t('createArticle.excerptPlaceholder')}
                      rows={3}
                      className="mt-1"
                    />
                    {errors.excerpt && (
                      <p className="text-sm text-red-600 mt-1">{errors.excerpt.message}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="country">{t('createArticle.country')}</Label>
                      <Select onValueChange={(value) => setValue('country', value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder={t('createArticle.selectCountry')} />
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
                      <Label htmlFor="status">{t('createArticle.status')}</Label>
                      <Select 
                        defaultValue="DRAFT"
                        onValueChange={(value) => setValue('status', value as 'DRAFT' | 'PENDING' | 'PUBLISHED')}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="DRAFT">{t('dashboard.draft')}</SelectItem>
                          <SelectItem value="PENDING">{t('dashboard.pending')}</SelectItem>
                          {user?.role === 'ADMIN' && (
                            <SelectItem value="PUBLISHED">{t('dashboard.published')}</SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {user?.role === 'ADMIN' && (
                    <div>
                      <Label htmlFor="publishDate">Publish Date & Time</Label>
                      <Input
                        id="publishDate"
                        type="datetime-local"
                        value={publishDate}
                        onChange={(e) => {
                          setPublishDate(e.target.value);
                          setValue('publishDate', e.target.value);
                        }}
                        className="mt-1"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        This will set the creation, update, and publish dates for the article
                      </p>
                    </div>
                  )}

                  <ImageUpload
                    value={coverImage}
                    onChange={(base64) => {
                      setCoverImage(base64);
                      setValue('coverImage', base64);
                    }}
                    label={t('createArticle.coverImageUrl')}
                  />

                  <div>
                    <Label htmlFor="tags">{t('createArticle.tags')}</Label>
                    <div className="mt-1 space-y-2">
                      <div className="flex gap-2">
                        <Input
                          value={tagInput}
                          onChange={(e) => setTagInput(e.target.value)}
                          onKeyPress={handleKeyPress}
                          placeholder={t('createArticle.addTags')}
                        />
                        <Button type="button" onClick={addTag} variant="outline">
                          {t('createArticle.add')}
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
                  <CardTitle>{t('createArticle.content')} *</CardTitle>
                </CardHeader>
                <CardContent>
                  <HtmlTextEditor
                    value={content}
                    onChange={setContent}
                    placeholder={t('createArticle.contentPlaceholder')}
                  />
                  {!content.trim() && (
                    <p className="text-sm text-red-600 mt-2">{t('createArticle.contentRequired')}</p>
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
                        disabled={loading}
                      >
                        <Save className="h-4 w-4 mr-2" />
                        {t('createArticle.saveAsDraft')}
                      </Button>
                      
                      {user?.role === 'ADMIN' ? (
                        <Button
                          type="button"
                          onClick={handlePublish}
                          disabled={loading}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          {t('createArticle.publish')}
                        </Button>
                      ) : (
                        <Button
                          type="button"
                          onClick={() => {
                            setValue('status', 'PENDING');
                            handleSubmit(onSubmit)();
                          }}
                          disabled={loading}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          {t('createArticle.submitForReview')}
                        </Button>
                      )}
                    </div>

                    <div className="text-sm text-gray-500">
                      {t('createArticle.author')}: {user?.name}
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