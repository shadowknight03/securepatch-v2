import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Check } from 'lucide-react';

interface ScheduledPatch {
  id: string;
  name: string;
  description: string;
  scheduledDate: string;
  scheduledTime: string;
  status: 'Scheduled' | 'In Progress' | 'Completed';
}

const mockScheduledPatches: ScheduledPatch[] = [
  {
    id: '1',
    name: 'Security Update KB4019472',
    description: 'Critical security patch for Windows servers',
    scheduledDate: '2023-06-15',
    scheduledTime: '02:00 AM',
    status: 'Scheduled',
  },
  {
    id: '2',
    name: 'Apache Struts Vulnerability Fix',
    description: 'Patch for CVE-2023-12345',
    scheduledDate: '2023-06-16',
    scheduledTime: '03:00 AM',
    status: 'Scheduled',
  },
  {
    id: '3',
    name: 'MySQL Security Update',
    description: 'Address multiple vulnerabilities in MySQL',
    scheduledDate: '2023-06-17',
    scheduledTime: '01:00 AM',
    status: 'Scheduled',
  },
];

const PatchScheduler: React.FC = () => {
  const [scheduledPatches, setScheduledPatches] =
    useState<ScheduledPatch[]>(mockScheduledPatches);
  const [newPatch, setNewPatch] = useState<Partial<ScheduledPatch>>({});

  const handleSchedulePatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      newPatch.name &&
      newPatch.description &&
      newPatch.scheduledDate &&
      newPatch.scheduledTime
    ) {
      setScheduledPatches([
        ...scheduledPatches,
        {
          ...newPatch,
          id: Date.now().toString(),
          status: 'Scheduled',
        } as ScheduledPatch,
      ]);
      setNewPatch({});
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Patch Scheduler</h1>
      <form
        onSubmit={handleSchedulePatch}
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Patch Name"
            value={newPatch.name || ''}
            onChange={(e) => setNewPatch({ ...newPatch, name: e.target.value })}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
          />
          <input
            type="text"
            placeholder="Description"
            value={newPatch.description || ''}
            onChange={(e) =>
              setNewPatch({ ...newPatch, description: e.target.value })
            }
            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
          />
          <input
            type="date"
            value={newPatch.scheduledDate || ''}
            onChange={(e) =>
              setNewPatch({ ...newPatch, scheduledDate: e.target.value })
            }
            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
          />
          <input
            type="time"
            value={newPatch.scheduledTime || ''}
            onChange={(e) =>
              setNewPatch({ ...newPatch, scheduledTime: e.target.value })
            }
            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
        <button
          type="submit"
          className="mt-4 bg-primary text-white px-4 py-2 rounded hover:bg-primary-hover transition-colors duration-200"
        >
          Schedule Patch
        </button>
      </form>
      <div className="space-y-4">
        {scheduledPatches.map((patch) => (
          <motion.div
            key={patch.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">{patch.name}</h3>
              <span
                className={`px-2 py-1 rounded-full text-sm ${
                  patch.status === 'Scheduled'
                    ? 'bg-yellow-200 text-yellow-800'
                    : patch.status === 'In Progress'
                    ? 'bg-blue-200 text-blue-800'
                    : 'bg-green-200 text-green-800'
                }`}
              >
                {patch.status}
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              {patch.description}
            </p>
            <div className="flex items-center mt-2 text-sm text-gray-500 dark:text-gray-400">
              <Calendar size={16} className="mr-2" />
              <span>{patch.scheduledDate}</span>
              <Clock size={16} className="ml-4 mr-2" />
              <span>{patch.scheduledTime}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PatchScheduler;
