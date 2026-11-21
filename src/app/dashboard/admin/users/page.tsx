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
      <div className="space-y-6 font-mono text-xs">
        <div>
          <h1 className="text-2xl font-display font-semibold text-[#fefdfe]">
            Manage User Roles
          </h1>
          <p className="text-xs text-[#dbdbda] mt-1">
            Grant technician or admin privileges. You cannot alter your own administrative role.
          </p>
        </div>

        {loading ? (
          <div className="h-64 bg-[#213039] border border-[#32414a] animate-pulse" />
        ) : (
          <div className="border border-[#32414a] bg-[#213039] overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-[#1b2932] border-b border-[#32414a] text-[10px] uppercase text-[#dbdbda] tracking-wider">
                <tr>
                  <th className="p-4">User</th>
                  <th className="p-4">Contact</th>
                  <th className="p-4">Area</th>
                  <th className="p-4">Joined Date</th>
                  <th className="p-4">Current Role</th>
                  <th className="p-4 text-right">Role Assignment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#32414a] text-[#eaeae9]">
                {users.map((u) => {
                  const isSelf = u.email === currentUser?.email;

                  return (
                    <tr key={u._id} className="hover:bg-[#1b2932]/50 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-9 h-9 bg-[#02444b] border border-[#32414a] flex items-center justify-center font-display font-semibold text-xs text-[#67e8f9] overflow-hidden shrink-0">
                            {u.image ? (
                              <img src={u.image} alt={u.name} className="w-full h-full object-cover" />
                            ) : (
                              u.name.charAt(0).toUpperCase()
                            )}
                          </div>
                          <div>
                            <div className="font-display font-semibold text-[#fefdfe]">
                              {u.name} {isSelf && <span className="text-[#67e8f9] text-[10px]">(You)</span>}
                            </div>
                            <div className="text-[10px] text-[#dbdbda] truncate max-w-[180px]">
                              {u.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-[#dbdbda]">{u.phone || 'N/A'}</td>
                      <td className="p-4 text-[#dbdbda]">{u.area || 'N/A'}</td>
                      <td className="p-4 text-[#dbdbda]">
                        {new Date(u.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-4">
                        <span
                          className={`inline-block px-2 py-0.5 text-[10px] uppercase tracking-wider border ${
                            u.role === 'admin'
                              ? 'bg-purple-950/60 border-purple-700 text-purple-300'
                              : u.role === 'technician'
                              ? 'bg-indigo-950/60 border-indigo-700 text-indigo-300'
                              : 'bg-[#1b2932] border-[#32414a] text-[#dbdbda]'
                          }`}
                        >
                          {u.role}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        {isSelf ? (
                          <span className="text-[10px] text-[#dbdbda]/60 italic">
                            Protected (Self)
                          </span>
                        ) : (
                          <select
                            value={u.role}
                            onChange={(e) => handleRoleChange(u._id, e.target.value)}
                            className="bg-[#1b2932] border border-[#32414a] px-2.5 py-1 text-xs text-[#fefdfe] focus:border-[#67e8f9]"
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
        )}
      </div>
    </DashboardLayout>
  );
}
