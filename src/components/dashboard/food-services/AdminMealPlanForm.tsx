import { useState, useEffect } from 'react';
import { getAllVendors, createVendorPlan } from '@/lib/api/food-services';
import type { VendorSummaryDto, VendorPlanCreateDto } from '@/lib/types/food-services.d';
import { X, Check, Plus, DollarSign } from 'lucide-react';

interface AdminMealPlanFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

// Dummy data for vendors
const DUMMY_VENDORS = [
  { vendorName: "GSR" },
  { vendorName: "RedBird" },
  { vendorName: "UniWorld" }
];

// Map vendor names to IDs for demo purposes
const VENDOR_ID_MAP: Record<string, number> = {
  "GSR": 1,
  "RedBird": 2,
  "UniWorld": 3
};

export function AdminMealPlanForm({ isOpen, onClose, onSuccess }: AdminMealPlanFormProps) {
  const [vendors, setVendors] = useState<VendorSummaryDto[]>(DUMMY_VENDORS);
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState<string>('');
  const [selectedMeals, setSelectedMeals] = useState<string[]>([]);
  const [planName, setPlanName] = useState('');
  const [price, setPrice] = useState<number | ''>('');
  
  const mealOptions = ['Breakfast', 'Lunch', 'Dinner'];

  useEffect(() => {
    if (isOpen) {
      fetchVendors();
      resetForm();
    }
  }, [isOpen]);

  const fetchVendors = async () => {
    try {
      setLoading(true);
      const vendorsData = await getAllVendors();
      if (vendorsData && vendorsData.length > 0) {
        setVendors(vendorsData);
      }
    } catch (error) {
      console.error('Failed to fetch vendors:', error);
      // Fallback to dummy data
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setSelectedVendor('');
    setSelectedMeals([]);
    setPlanName('');
    setPrice('');
  };

  const handleMealToggle = (meal: string) => {
    if (selectedMeals.includes(meal)) {
      setSelectedMeals(selectedMeals.filter(m => m !== meal));
    } else {
      setSelectedMeals([...selectedMeals, meal]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedVendor || !planName || price === '' || selectedMeals.length === 0) {
      alert('Please fill all required fields: Vendor, Plan Name, Price, and at least one Meal Type');
      return;
    }
    
    try {
      setCreating(true);
      
      // Get vendor ID from the selected vendor name
      const vendorId = VENDOR_ID_MAP[selectedVendor] || 1; // fallback to ID 1 if not found
      
      const planData: VendorPlanCreateDto = {
        planName: planName,
        vendorId: vendorId,
        fee: typeof price === 'string' ? parseFloat(price) : price,
        mealTypes: selectedMeals
      };
      
      const response = await createVendorPlan(planData);
      console.log('Meal plan created successfully:', response);
      
      // Reset form and close
      resetForm();
      onClose();
      if (onSuccess) onSuccess();
      
    } catch (error) {
      console.error('Failed to create meal plan:', error);
      alert('Failed to create meal plan. Please try again.');
    } finally {
      setCreating(false);
    }
  };

  if (!isOpen) return null;

  // Function to get the first letter of vendor name for the circle
  const getVendorInitial = (name: string) => {
    return name.charAt(0);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white text-gray-800 rounded-3xl p-8 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Create Meal Plan</h2>
          <button 
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
          >
            <X size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Plan Name */}
          <div className="space-y-2">
            <label htmlFor="planName" className="block text-lg font-medium text-gray-700">
              Plan Name
            </label>
            <input
              id="planName"
              type="text"
              value={planName}
              onChange={(e) => setPlanName(e.target.value)}
              placeholder="e.g. Premium Monthly Plan"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          {/* Price */}
          <div className="space-y-2">
            <label htmlFor="price" className="block text-lg font-medium text-gray-700">
              Price (₹)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign size={16} className="text-gray-400" />
              </div>
              <input
                id="price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value ? parseFloat(e.target.value) : '')}
                placeholder="0.00"
                min="0"
                step="0.01"
                className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
          
          {/* Vendor Selection */}
          <div className="space-y-3">
            <h3 className="text-lg font-medium text-gray-700">Select Vendor</h3>
            
            <div className="max-h-48 overflow-y-auto border border-gray-200 rounded-lg">
              {loading ? (
                <div className="p-4 text-center text-gray-500">Loading vendors...</div>
              ) : (
                vendors.map((vendor, index) => (
                  <div 
                    key={index}
                    onClick={() => setSelectedVendor(vendor.vendorName)}
                    className="flex items-center justify-between py-3 px-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 last:border-b-0"
                  >
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                        {getVendorInitial(vendor.vendorName)}
                      </div>
                      <span className="ml-3 text-base">
                        {vendor.vendorName}
                      </span>
                    </div>
                    {selectedVendor === vendor.vendorName && (
                      <div className="w-6 h-6 bg-indigo-900 flex items-center justify-center rounded-sm">
                        <Check className="text-white" size={16} />
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
          
          {/* Meal Types Selection */}
          <div className="space-y-3">
            <h3 className="text-lg font-medium text-gray-700">Select Meal Types</h3>
            <div className="space-y-0 border border-gray-200 rounded-lg">
              {mealOptions.map((meal) => (
                <div 
                  key={meal}
                  onClick={() => handleMealToggle(meal)}
                  className="flex items-center justify-between py-3 px-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 last:border-b-0"
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                      {meal.charAt(0)}
                    </div>
                    <span className="ml-3 text-base">
                      {meal}
                    </span>
                  </div>
                  <div>
                    {selectedMeals.includes(meal) ? (
                      <div className="w-6 h-6 bg-indigo-900 flex items-center justify-center rounded-sm">
                        <Check className="text-white" size={16} />
                      </div>
                    ) : (
                      <div className="w-6 h-6 border-2 border-gray-300 rounded-sm"></div>
                    )}
                  </div>
                </div>
              ))}
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
              disabled={creating}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none disabled:opacity-50"
            >
              {creating ? 'Creating...' : 'Create Plan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 