'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Save, User, Mail, Lock, Shield } from 'lucide-react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const userSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['EDITOR', 'ADMIN']),
});

type UserFormData = z.infer<typeof userSchema>;

export default function NewUserPage() {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const { user, isAuthenticated, hasRole } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      role: 'EDITOR',
    },
  });

  if (!isAuthenticated || !hasRole('ADMIN')) {
    router.push('/auth/login');
    return null;
  }

  const onSubmit = async (data: UserFormData) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success(t('createUser.userCreated'));
        router.push('/admin/users');
      } else {
        const error = await response.json();
        toast.error(error.error || t('createUser.failedToCreate'));
      }
    } catch (error) {
      toast.error(t('createUser.failedToCreate'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="section-padding pt-24">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <Link
              href="/admin/users"
              className="inline-flex items-center text-blue-600 hover:text-blue-500 mb-6 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t('createUser.backToUsers')}
            </Link>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              {t('createUser.title')}
            </h1>
            <p className="text-gray-600">
              {t('createUser.subtitle')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  {t('createUser.userDetails')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div>
                    <Label htmlFor="name">{t('createUser.fullName')} *</Label>
                    <div className="relative mt-1">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="name"
                        {...register('name')}
                        placeholder="Enter full name..."
                        className="pl-10"
                      />
                    </div>
                    {errors.name && (
                      <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="email">{t('createUser.emailAddress')} *</Label>
                    <div className="relative mt-1">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="email"
                        type="email"
                        {...register('email')}
                        placeholder="Enter email address..."
                        className="pl-10"
                      />
                    </div>
                    {errors.email && (
                      <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="password">{t('common.password')} *</Label>
                    <div className="relative mt-1">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="password"
                        type="password"
                        {...register('password')}
                        placeholder="Enter password..."
                        className="pl-10"
                      />
                    </div>
                    {errors.password && (
                      <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="role">{t('createUser.role')} *</Label>
                    <Select 
                      defaultValue="EDITOR"
                      onValueChange={(value) => setValue('role', value as 'EDITOR' | 'ADMIN')}
                    >
                      <SelectTrigger className="mt-1">
                        <div className="flex items-center">
                          <Shield className="h-4 w-4 mr-2 text-gray-400" />
                          <SelectValue />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="EDITOR">
                          <div className="flex items-center">
                            <Shield className="h-4 w-4 mr-2 text-blue-600" />
                            <div>
                              <div className="font-medium">{t('createUser.editorRole')}</div>
                              <div className="text-xs text-gray-500">{t('createUser.editorDescription')}</div>
                            </div>
                          </div>
                        </SelectItem>
                        <SelectItem value="ADMIN">
                          <div className="flex items-center">
                            <Shield className="h-4 w-4 mr-2 text-red-600" />
                            <div>
                              <div className="font-medium">{t('createUser.adminRole')}</div>
                              <div className="text-xs text-gray-500">{t('createUser.adminDescription')}</div>
                            </div>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button type="submit" disabled={loading} className="flex-1">
                      <Save className="h-4 w-4 mr-2" />
                      {loading ? t('createUser.creating') : t('createUser.createUser')}
                    </Button>
                    <Link href="/admin/users" className="flex-1">
                      <Button type="button" variant="outline" className="w-full">
                        {t('common.cancel')}
                      </Button>
                    </Link>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}