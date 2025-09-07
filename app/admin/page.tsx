'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, FileText, Image, TrendingUp, Plus, Edit, Trash2, CheckCircle, Clock, Eye, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface Stats {
  totalUsers: number;
  totalArticles: number;
  publishedArticles: number;
  pendingArticles: number;
  totalImages: number;
  recentArticles: any[];
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  _count: { articles: number };
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'PUBLISHED':
      return <CheckCircle className="h-4 w-4 text-green-600" />;
    case 'PENDING':
      return <Clock className="h-4 w-4 text-yellow-600" />;
    default:
      return <AlertCircle className="h-4 w-4 text-gray-600" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'PUBLISHED':
      return 'bg-green-100 text-green-800';
    case 'PENDING':
      return 'bg-yellow-100 text-yellow-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default function AdminPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, isAuthenticated, hasRole } = useAuth();

  useEffect(() => {
    if (!isAuthenticated || !hasRole('ADMIN')) {
      window.location.href = '/auth/login';
      return;
    }
    fetchData();
  }, [isAuthenticated, hasRole]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const [statsRes, usersRes] = await Promise.all([
        fetch('/api/stats', { headers: { Authorization: `Bearer ${token}` } }),
        fetch('/api/users', { headers: { Authorization: `Bearer ${token}` } })
      ]);

      const statsData = await statsRes.json();
      const usersData = await usersRes.json();

      setStats(statsData.stats);
      setUsers(usersData.users || []);
    } catch (error) {
      toast.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/users/${userId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        toast.success('User deleted successfully');
        fetchData();
      } else {
        toast.error('Failed to delete user');
      }
    } catch (error) {
      toast.error('Failed to delete user');
    }
  };

  if (!isAuthenticated || !hasRole('ADMIN')) {
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
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Admin Dashboard
            </h1>
            <p className="text-gray-600">
              Manage users, content, and system settings.
            </p>
          </motion.div>

          {/* Stats Overview */}
          {stats && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8"
            >
              <Card className="glass-card">
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Users className="h-8 w-8 text-blue-600" />
                    <div className="ml-4">
                      <div className="text-2xl font-bold text-gray-900">{stats.totalUsers}</div>
                      <div className="text-sm text-gray-600">Total Users</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <FileText className="h-8 w-8 text-green-600" />
                    <div className="ml-4">
                      <div className="text-2xl font-bold text-gray-900">{stats.totalArticles}</div>
                      <div className="text-sm text-gray-600">Total Articles</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <CheckCircle className="h-8 w-8 text-emerald-600" />
                    <div className="ml-4">
                      <div className="text-2xl font-bold text-gray-900">{stats.publishedArticles}</div>
                      <div className="text-sm text-gray-600">Published</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Clock className="h-8 w-8 text-yellow-600" />
                    <div className="ml-4">
                      <div className="text-2xl font-bold text-gray-900">{stats.pendingArticles}</div>
                      <div className="text-sm text-gray-600">Pending</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Image className="h-8 w-8 text-purple-600" />
                    <div className="ml-4">
                      <div className="text-2xl font-bold text-gray-900">{stats.totalImages}</div>
                      <div className="text-sm text-gray-600">Images</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* User Management */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="glass-card">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>User Management</CardTitle>
                    <Link href="/admin/users/new">
                      <Button size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Add User
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="text-center py-4">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {users.slice(0, 5).map((user) => (
                        <div key={user.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <div className="font-medium text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-600">{user.email}</div>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant={user.role === 'ADMIN' ? 'default' : 'secondary'}>
                                {user.role}
                              </Badge>
                              <span className="text-xs text-gray-500">
                                {user._count.articles} articles
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-1">
                            <Link href={`/admin/users/${user.id}/edit`}>
                              <Button size="sm" variant="outline">
                                <Edit className="h-3 w-3" />
                              </Button>
                            </Link>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => deleteUser(user.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                      {users.length > 5 && (
                        <Link href="/admin/users">
                          <Button variant="outline" className="w-full">
                            View All Users ({users.length})
                          </Button>
                        </Link>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Recent Articles */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Recent Articles</CardTitle>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="text-center py-4">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
                    </div>
                  ) : stats?.recentArticles.length === 0 ? (
                    <div className="text-center py-4">
                      <p className="text-gray-600">No articles yet.</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {stats?.recentArticles.map((article) => (
                        <div key={article.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <div className="font-medium text-gray-900 line-clamp-1">{article.title}</div>
                            <div className="text-sm text-gray-600">by {article.author.name}</div>
                            <div className="flex items-center gap-2 mt-1">
                              {getStatusIcon(article.status)}
                              <Badge className={getStatusColor(article.status)}>
                                {article.status}
                              </Badge>
                            </div>
                          </div>
                          <Link href={`/dashboard/articles/${article.id}`}>
                            <Button size="sm" variant="outline">
                              <Eye className="h-3 w-3" />
                            </Button>
                          </Link>
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
    </div>
  );
}