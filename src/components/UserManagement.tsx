import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, UserPlus, Edit, Trash2 } from 'lucide-react';

interface UserRole {
  id: string;
  name: string;
}

interface UserData {
  id: string;
  username: string;
  email: string;
  role: UserRole;
}

const mockRoles: UserRole[] = [
  { id: '1', name: 'Admin' },
  { id: '2', name: 'Security Analyst' },
  { id: '3', name: 'System Operator' },
];

const mockUsers: UserData[] = [
  {
    id: '1',
    username: 'john.doe',
    email: 'john.doe@example.com',
    role: mockRoles[0],
  },
  {
    id: '2',
    username: 'jane.smith',
    email: 'jane.smith@example.com',
    role: mockRoles[1],
  },
  {
    id: '3',
    username: 'bob.johnson',
    email: 'bob.johnson@example.com',
    role: mockRoles[2],
  },
];

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<UserData[]>(mockUsers);
  const [roles] = useState<UserRole[]>(mockRoles);
  const [editingUser, setEditingUser] = useState<UserData | null>(null);

  // In a real application, you would integrate with Keycloak here
  useEffect(() => {
    // Simulating Keycloak integration
    console.log('Initializing Keycloak...');
    // You would typically initialize Keycloak here and fetch user data
  }, []);

  const handleEditUser = (user: UserData) => {
    setEditingUser(user);
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter((user) => user.id !== userId));
  };

  const handleSaveUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingUser) {
      setUsers(
        users.map((user) => (user.id === editingUser.id ? editingUser : user))
      );
      setEditingUser(null);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">User Management</h1>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Users</h2>
        <div className="space-y-4">
          {users.map((user) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-700 rounded-lg"
            >
              <div className="flex items-center">
                <User className="mr-3 text-primary" />
                <div>
                  <p className="font-semibold">{user.username}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {user.email}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {user.role.name}
                  </p>
                </div>
              </div>
              <div>
                <button
                  onClick={() => handleEditUser(user)}
                  className="text-blue-500 hover:text-blue-700 mr-2"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      {editingUser && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        >
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">Edit User</h3>
            <form onSubmit={handleSaveUser}>
              <div className="space-y-4">
                <input
                  type="text"
                  value={editingUser.username}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, username: e.target.value })
                  }
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  placeholder="Username"
                />
                <input
                  type="email"
                  value={editingUser.email}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, email: e.target.value })
                  }
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  placeholder="Email"
                />
                <select
                  value={editingUser.role.id}
                  onChange={(e) =>
                    setEditingUser({
                      ...editingUser,
                      role:
                        roles.find((role) => role.id === e.target.value) ||
                        editingUser.role,
                    })
                  }
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                >
                  {roles.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-hover"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default UserManagement;
