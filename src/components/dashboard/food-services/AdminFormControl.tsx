import { useState, useEffect } from 'react';
import { Calendar, X, Check, AlertCircle } from 'lucide-react';

interface AdminFormControlProps {
  isOpen: boolean;
  onClose: () => void;
  onToggle: (isEnabled: boolean) => void;
  isFormEnabled: boolean;
}

export function AdminFormControl({ isOpen, onClose, onToggle, isFormEnabled }: AdminFormControlProps) {
  const [enabled, setEnabled] = useState(isFormEnabled);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      setEnabled(isFormEnabled);
      
      // Set default dates to current month's first week
      const now = new Date();
      const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
      const lastDay = new Date(now.getFullYear(), now.getMonth(), 7);
      
      setStartDate(formatDate(firstDay));
      setEndDate(formatDate(lastDay));
    }
  }, [isOpen, isFormEnabled]);

  const formatDate = (date: Date): string => {
    return date.toISOString().split('T')[0]; // YYYY-MM-DD format
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onToggle(enabled);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white text-gray-800 rounded-3xl p-8 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Meal Plan Form Control</h2>
          <button 
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
          >
            <X size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Form Availability Toggle */}
          <div className="space-y-2">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-lg font-medium text-gray-700">Enable Opt-in Form</span>
              <div 
                className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${enabled ? 'bg-green-500' : 'bg-gray-200'}`}
                onClick={() => setEnabled(!enabled)}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white transition ${enabled ? 'translate-x-6' : 'translate-x-1'}`}
                />
              </div>
            </label>
            <p className="text-sm text-gray-500">
              {enabled 
                ? "Users will be able to access the meal plan opt-in form" 
                : "Users will not be able to access the meal plan opt-in form"}
            </p>
          </div>
          
          {/* Date Range */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-700">Availability Period</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                  Start Date
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar size={16} className="text-gray-400" />
                  </div>
                  <input
                    id="startDate"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                  End Date
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar size={16} className="text-gray-400" />
                  </div>
                  <input
                    id="endDate"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-500">
              Set the date range when users can access the opt-in form. Typically the first week of every month.
            </p>
          </div>
          
          {/* Status Message */}
          <div className={`p-4 rounded-lg ${enabled ? 'bg-green-50 text-green-800' : 'bg-yellow-50 text-yellow-800'}`}>
            <div className="flex">
              <div className="flex-shrink-0">
                {enabled ? (
                  <Check className="h-5 w-5 text-green-400" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-yellow-400" />
                )}
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium">
                  {enabled ? 'Form is currently enabled' : 'Form is currently disabled'}
                </h3>
                <div className="mt-2 text-sm">
                  <p>
                    {enabled 
                      ? `Users will be able to access the form from ${startDate} to ${endDate}` 
                      : "Users will see a message that the form is currently unavailable"}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Submit Button */}
          <div className="flex justify-end space-x-4 mt-8">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 focus:outline-none"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 