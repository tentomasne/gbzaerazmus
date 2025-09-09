'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Save, Megaphone, Palette, Eye, EyeOff } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const announcementSchema = z.object({
  text: z.string().min(1, 'Text is required').max(500, 'Text must be less than 500 characters'),
  color: z.string().regex(/^#[0-9A-F]{6}$/i, 'Invalid color format'),
  isActive: z.boolean(),
});

type AnnouncementFormData = z.infer<typeof announcementSchema>;

interface Announcement {
  id: string;
  text: string;
  color: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

const colorPresets = [
  { name: 'Blue', value: '#3b82f6' },
  { name: 'Green', value: '#10b981' },
  { name: 'Purple', value: '#8b5cf6' },
  { name: 'Red', value: '#ef4444' },
  { name: 'Orange', value: '#f97316' },
  { name: 'Pink', value: '#ec4899' },
  { name: 'Indigo', value: '#6366f1' },
  { name: 'Teal', value: '#14b8a6' },
];

export default function AnnouncementsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [announcement, setAnnouncement] = useState<Announcement | null>(null);
  const { t } = useTranslation();
  const { user, isAuthenticated, hasRole } = useAuth();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<AnnouncementFormData>({
    resolver: zodResolver(announcementSchema),
    defaultValues: {
      text: '',
      color: '#3b82f6',
      isActive: true,
    },
  });

  const watchedColor = watch('color');
  const watchedText = watch('text');
  const watchedIsActive = watch('isActive');

  useEffect(() => {
    if (!isAuthenticated || !hasRole('ADMIN')) {
      window.location.href = '/auth/login';
      return;
    }
    fetchAnnouncement();
  }, [isAuthenticated, hasRole]);

  const fetchAnnouncement = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/announcements', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.announcement) {
          setAnnouncement(data.announcement);
          reset({
            text: data.announcement.text,
            color: data.announcement.color,
            isActive: data.announcement.isActive,
          });
        }
      }
    } catch (error) {
      console.error('Failed to fetch announcement:', error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: AnnouncementFormData) => {
    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      const method = announcement ? 'PUT' : 'POST';
      const body = announcement ? { id: announcement.id, ...data } : data;

      const response = await fetch('/api/announcements', {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        const result = await response.json();
        setAnnouncement(result.announcement);
        toast.success(t('announcements.announcementUpdated'));
      } else {
        const error = await response.json();
        toast.error(error.error || t('announcements.failedToUpdate'));
      }
    } catch (error) {
      toast.error(t('announcements.failedToUpdate'));
    } finally {
      setSaving(false);
    }
  };

  if (!isAuthenticated || !hasRole('ADMIN')) {
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
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              {t('announcements.title')}
            </h1>
            <p className="text-gray-600">
              {t('announcements.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Megaphone className="h-5 w-5 mr-2" />
                    {t('announcements.announcementSettings')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                      <Label htmlFor="text">{t('announcements.announcementText')} *</Label>
                      <Textarea
                        id="text"
                        {...register('text')}
                        placeholder={t('announcements.announcementPlaceholder')}
                        rows={3}
                        className="mt-1"
                      />
                      {errors.text && (
                        <p className="text-sm text-red-600 mt-1">{errors.text.message}</p>
                      )}
                      <p className="text-xs text-gray-500 mt-1">
                        {watchedText?.length || 0}/500 {t('announcements.characters')}
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="color">{t('announcements.backgroundColor')} *</Label>
                      <div className="mt-2 space-y-3">
                        <div className="flex items-center gap-2">
                          <Input
                            id="color"
                            type="color"
                            {...register('color')}
                            className="w-16 h-10 p-1 border rounded"
                          />
                          <Input
                            {...register('color')}
                            placeholder="#3b82f6"
                            className="flex-1"
                          />
                        </div>
                        
                        <div className="grid grid-cols-4 gap-2">
                          {colorPresets.map((preset) => (
                            <button
                              key={preset.value}
                              type="button"
                              className="flex items-center gap-2 p-2 rounded-lg border hover:bg-gray-50 transition-colors"
                              onClick={() => setValue('color', preset.value)}
                            >
                              <div
                                className="w-4 h-4 rounded-full border"
                                style={{ backgroundColor: preset.value }}
                              />
                              <span className="text-xs">{preset.name}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                      {errors.color && (
                        <p className="text-sm text-red-600 mt-1">{errors.color.message}</p>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="isActive">{t('announcements.activeStatus')}</Label>
                        <p className="text-sm text-gray-500">
                          {t('announcements.activeDescription')}
                        </p>
                      </div>
                      <Switch
                        id="isActive"
                        checked={watchedIsActive}
                        onCheckedChange={(checked) => setValue('isActive', checked)}
                      />
                    </div>

                    <Button type="submit" disabled={saving || loading} className="w-full">
                      <Save className="h-4 w-4 mr-2" />
                      {saving ? t('announcements.saving') : announcement ? t('announcements.updateAnnouncement') : t('announcements.createAnnouncement')}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Preview */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Eye className="h-5 w-5 mr-2" />
                    {t('announcements.livePreview')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-sm text-gray-600 mb-4">
                      {t('announcements.previewDescription')}
                    </div>
                    
                    {watchedIsActive ? (
                      <div 
                        className="relative h-12 flex items-center justify-center rounded-lg px-4"
                        style={{ backgroundColor: watchedColor }}
                      >
                        <p className="text-white drop-shadow-md text-center text-sm">
                          {watchedText || t('announcements.announcementPlaceholder_preview')}
                        </p>
                        <button className="absolute top-1/2 right-4 -translate-y-1/2 p-1 hover:bg-white/20 rounded-full transition-colors">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-white"
                          >
                            <path d="M18 6l-12 12" />
                            <path d="M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-12 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300">
                        <div className="flex items-center text-gray-500">
                          <EyeOff className="h-4 w-4 mr-2" />
                          <span className="text-sm">{t('announcements.announcementDisabled')}</span>
                        </div>
                      </div>
                    )}

                    {announcement && (
                      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2">{t('announcements.currentAnnouncement')}</h4>
                        <div className="text-sm text-gray-600 space-y-1">
                          <p><span className="font-medium">{t('announcements.text')}:</span> {announcement.text}</p>
                          <p><span className="font-medium">{t('announcements.color')}:</span> {announcement.color}</p>
                          <p><span className="font-medium">{t('announcements.status')}:</span> {announcement.isActive ? t('announcements.active') : t('announcements.inactive')}</p>
                          <p><span className="font-medium">{t('announcements.lastUpdated')}:</span> {new Date(announcement.updatedAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}