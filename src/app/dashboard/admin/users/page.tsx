'use client';

import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useAuth } from '@/context/AuthContext';
import { fetchApi } from '@/lib/api';
import { toast } from 'sonner';
import { Users, Shield, UserCheck, Wrench } from 'lucide-react';

interface UserRecord {
  _id: string;
  name: string;
  email: string;
  image?: string;
  role: 'customer' | 'technician' | 'admin';
  phone?: string;
  area?: string;
  createdAt: string;
}

export default function AdminUsersPage() {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    setLoading(true);
    try {
      const res = await fetchApi('/admin/users');
      if (res.success && Array.isArray(res.data)) {
        setUsers(res.data);
      }
    } catch (err) {
      console.error('Error loading users', err);
    } finally {
      setLoading(false);
    }
  }

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      const res = await fetchApi(`/admin/users/${userId}/role`, {
        method: 'PATCH',
        body: JSON.stringify({ role: newRole }),
      });

      if (res.success) {
        toast.success(res.message || 'User role updated.');
        loadUsers();
      } else {
        toast.error(res.message || 'Failed to update user role.');
      }
    } catch (err: any) {
      toast.error('Error changing role.');
    }
  };

  return (
    <DashboardLayout allowedRoles={['admin']}>
      <div className="space-y-6">
        <div>
          <h1 className="font-serif text-3xl font-medium text-[#000000]">
            Manage User Roles
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Grant technician or admin privileges. You cannot alter your own administrative role.
          </p>
        </div>

        {loading ? (
          <div className="h-64 glossy-card rounded-2xl animate-pulse" />
        ) : (
          <div className="glossy-card rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100/70 border-b border-slate-200/80 text-[11px] uppercase text-slate-600 tracking-wider">
                  <tr>
                    <th className="p-4 font-semibold">User</th>
                    <th className="p-4 font-semibold">Contact</th>
                    <th className="p-4 font-semibold">Area</th>
                    <th className="p-4 font-semibold">Joined Date</th>
                    <th className="p-4 font-semibold">Current Role</th>
                    <th className="p-4 font-semibold text-right">Role Assignment</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {users.map((u) => {
                    const isSelf = u.email === currentUser?.email;

                    return (
                      <tr key={u._id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-9 h-9 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center font-semibold text-xs text-[#1e3a8a] overflow-hidden shrink-0">
                              {u.image ? (
                                <img src={u.image} alt={u.name} className="w-full h-full object-cover" />
                              ) : (
                                u.name.charAt(0).toUpperCase()
                              )}
                            </div>
                            <div>
                              <div className="font-medium text-[#000000] text-sm">
                                {u.name} {isSelf && <span className="text-[#1e3a8a] text-[11px] font-normal">(You)</span>}
                              </div>
                              <div className="text-[11px] text-slate-500 truncate max-w-[180px]">
                                {u.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-slate-600">{u.phone || 'N/A'}</td>
                        <td className="p-4 text-slate-600">{u.area || 'N/A'}</td>
                        <td className="p-4 text-slate-600">
                          {new Date(u.createdAt).toLocaleDateString()}
                        </td>
                        <td className="p-4">
                          <span
                            className={`inline-block px-2.5 py-0.5 rounded-md text-[11px] uppercase tracking-wider font-medium border ${
                              u.role === 'admin'
                                ? 'bg-purple-50 border-purple-200 text-purple-700'
                                : u.role === 'technician'
                                ? 'bg-blue-50 border-blue-200 text-[#1e3a8a]'
                                : 'bg-slate-100 border-slate-200 text-slate-600'
                            }`}
                          >
                            {u.role}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          {isSelf ? (
                            <span className="text-xs text-slate-400 italic">
                              Protected (Self)
                            </span>
                          ) : (
                            <select
                              value={u.role}
                              onChange={(e) => handleRoleChange(u._id, e.target.value)}
                              className="bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#1e3a8a]/20"
                            >
                              <option value="customer">Customer</option>
                              <option value="technician">Technician</option>
                              <option value="admin">Admin</option>
                            </select>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
