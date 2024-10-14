import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Server, Shield, AlertTriangle } from 'lucide-react';

interface Device {
  id: string;
  name: string;
  type: string;
  os: string;
  lastPatched: string;
  status: 'Up to date' | 'Pending patches' | 'Vulnerable';
}

const mockDevices: Device[] = [
  { id: '1', name: 'Server-001', type: 'Server', os: 'Ubuntu 20.04', lastPatched: '2023-05-15', status: 'Up to date' },
  { id: '2', name: 'Workstation-105', type: 'Workstation', os: 'Windows 10', lastPatched: '2023-05-10', status: 'Pending patches' },
  { id: '3', name: 'Firewall-002', type: 'Network Device', os: 'Cisco IOS', lastPatched: '2023-04-30', status: 'Vulnerable' },
  // Add more mock devices as needed
];

const SystemInventory: React.FC = () => {
  const [devices] = useState<Device[]>(mockDevices);
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);

  const getStatusIcon = (status: Device['status']) => {
    switch (status) {
      case 'Up to date':
        return <Shield className="text-green-500" />;
      case 'Pending patches':
        return <AlertTriangle className="text-yellow-500" />;
      case 'Vulnerable':
        return <AlertTriangle className="text-red-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">System Inventory</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {devices.map((device) => (
          <motion.div
            key={device.id}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedDevice(device)}
          >
            <div className="flex items-center justify-between mb-4">
              <Server className="text-primary" size={24} />
              {getStatusIcon(device.status)}
            </div>
            <h2 className="text-xl font-semibold mb-2">{device.name}</h2>
            <p className="text-gray-600 dark:text-gray-300">{device.type}</p>
            <p className="text-gray-600 dark:text-gray-300">{device.os}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Last patched: {device.lastPatched}
            </p>
          </motion.div>
        ))}
      </div>
      {selectedDevice && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
          onClick={() => setSelectedDevice(null)}
        >
          <div
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-4">{selectedDevice.name}</h2>
            <p><strong>Type:</strong> {selectedDevice.type}</p>
            <p><strong>OS:</strong> {selectedDevice.os}</p>
            <p><strong>Last Patched:</strong> {selectedDevice.lastPatched}</p>
            <p><strong>Status:</strong> {selectedDevice.status}</p>
            <button
              className="mt-4 bg-primary text-white px-4 py-2 rounded hover:bg-primary-hover transition-colors duration-200"
              onClick={() => setSelectedDevice(null)}
            >
              Close
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default SystemInventory;