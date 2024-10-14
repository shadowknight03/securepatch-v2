import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FileText, Download } from 'lucide-react';

const mockReportData = [
  { name: 'Jan', patches: 45, vulnerabilities: 20, compliance: 85 },
  { name: 'Feb', patches: 50, vulnerabilities: 18, compliance: 87 },
  { name: 'Mar', patches: 55, vulnerabilities: 15, compliance: 90 },
  { name: 'Apr', patches: 48, vulnerabilities: 22, compliance: 88 },
  { name: 'May', patches: 52, vulnerabilities: 19, compliance: 89 },
  { name: 'Jun', patches: 58, vulnerabilities: 12, compliance: 92 },
];

const ReportingModule: React.FC = () => {
  const [selectedReport, setSelectedReport] = useState<string>('security');

  const generateReport = () => {
    // In a real application, this would generate and download a PDF report
    console.log(`Generating ${selectedReport} report...`);
    alert(`${selectedReport.charAt(0).toUpperCase() + selectedReport.slice(1)} report generated and downloaded.`);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Reporting Module</h1>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Security Overview</h2>
          <div className="flex items-center space-x-4">
            <select
              value={selectedReport}
              onChange={(e) => setSelectedReport(e.target.value)}
              className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
            >
              <option value="security">Security Report</option>
              <option value="compliance">Compliance Report</option>
              <option value="patch">Patch Management Report</option>
            </select>
            <button
              onClick={generateReport}
              className="flex items-center bg-primary text-white px-4 py-2 rounded hover:bg-primary-hover transition-colors duration-200"
            >
              <FileText size={18} className="mr-2" />
              Generate Report
            </button>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={mockReportData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
            <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
            <Tooltip />
            <Legend />
            <Bar yAxisId="left" dataKey="patches" fill="#8884d8" name="Patches Applied" />
            <Bar yAxisId="left" dataKey="vulnerabilities" fill="#82ca9d" name="Vulnerabilities Detected" />
            <Bar yAxisId="right" dataKey="compliance" fill="#ffc658" name="Compliance Score (%)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-semibold mb-4">Recent Reports</h2>
        <ul className="space-y-2">
          {['June Security Report', 'Q2 Compliance Summary', 'Patch Management Overview'].map((report, index) => (
            <li key={index} className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-700 rounded">
              <span>{report}</span>
              <button className="text-primary hover:text-primary-hover">
                <Download size={18} />
              </button>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
};

export default ReportingModule;