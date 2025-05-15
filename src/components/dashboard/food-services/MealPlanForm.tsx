import { useState, useEffect } from 'react';
import { getAllVendors, getAllVendorPlans } from '@/lib/api/food-services';
import type { VendorSummaryDto, VendorPlanSummaryDto } from '@/lib/types/food-services.d';
import { X, Check, DollarSign } from 'lucide-react';

interface MealPlanFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    vendorName: string;
    mealTypes: string[];
    vendorPlanId?: number;
  }) => void;
}

// Dummy data for vendors and plans
const DUMMY_VENDORS = [
  { vendorName: "GSR" },
  { vendorName: "RedBird" },
  { vendorName: "UniWorld" }
];

const DUMMY_PLANS = [
  { planName: "Basic Plan", vendorName: "GSR", fee: 3000, mealTypes: ["Breakfast", "Lunch"] },
  { planName: "Premium Plan", vendorName: "GSR", fee: 5000, mealTypes: ["Breakfast", "Lunch", "Dinner"] },
  { planName: "Standard Plan", vendorName: "RedBird", fee: 4000, mealTypes: ["Lunch", "Dinner"] },
  { planName: "Deluxe Plan", vendorName: "UniWorld", fee: 6000, mealTypes: ["Breakfast", "Lunch", "Dinner"] }
];

// Map plan names to IDs for demo purposes
const PLAN_ID_MAP: Record<string, number> = {
  "Basic Plan": 1,
  "Premium Plan": 2,
  "Standard Plan": 3,
  "Deluxe Plan": 4
};

export function MealPlanForm({ isOpen, onClose, onSubmit }: MealPlanFormProps) {
  const [vendors, setVendors] = useState<VendorSummaryDto[]>(DUMMY_VENDORS);
  const [vendorPlans, setVendorPlans] = useState<VendorPlanSummaryDto[]>(DUMMY_PLANS);
  const [loading, setLoading] = useState(false);
  const [loadingPlans, setLoadingPlans] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState<string>('');
  const [selectedPlan, setSelectedPlan] = useState<string>('');
  const [selectedMeals, setSelectedMeals] = useState<string[]>([]);
  const [filteredPlans, setFilteredPlans] = useState<VendorPlanSummaryDto[]>([]);

  useEffect(() => {
    if (isOpen) {
      fetchVendors();
      fetchVendorPlans();
      resetForm();
    }
  }, [isOpen]);

  useEffect(() => {
    if (selectedVendor) {
      // Filter plans by selected vendor
      const plans = vendorPlans.filter(plan => plan.vendorName === selectedVendor);
      setFilteredPlans(plans);
      
      // If there are plans for this vendor, auto-select the first one
      if (plans.length > 0 && !selectedPlan) {
        setSelectedPlan(plans[0].planName);
        setSelectedMeals(plans[0].mealTypes);
      } else {
        setSelectedPlan('');
        setSelectedMeals([]);
      }
    } else {
      setFilteredPlans([]);
      setSelectedPlan('');
    }
  }, [selectedVendor, vendorPlans]);

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

  const fetchVendorPlans = async () => {
    try {
      setLoadingPlans(true);
      const plansData = await getAllVendorPlans();
      if (plansData && plansData.length > 0) {
        setVendorPlans(plansData);
      }
    } catch (error) {
      console.error('Failed to fetch vendor plans:', error);
      // Fallback to dummy data
    } finally {
      setLoadingPlans(false);
    }
  };

  const resetForm = () => {
    setSelectedVendor('');
    setSelectedPlan('');
    setSelectedMeals([]);
  };

  const handlePlanSelect = (planName: string) => {
    setSelectedPlan(planName);
    
    // Find the selected plan and update meal types
    const plan = filteredPlans.find(p => p.planName === planName);
    if (plan) {
      setSelectedMeals(plan.mealTypes);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedVendor || !selectedPlan) {
      alert('Please select a vendor and a meal plan');
      return;
    }
    
    // Find the selected plan to get its ID
    const selectedPlanObj = filteredPlans.find(p => p.planName === selectedPlan);
    
    // Get plan ID from the selected plan object or use the map as fallback
    const vendorPlanId = selectedPlanObj ? 
      // In a real application, the plan object would have an ID field
      // For now, we use the mapping or fallback to 1
      (PLAN_ID_MAP[selectedPlan] || 1) : 
      PLAN_ID_MAP[selectedPlan] || 1;
    
    onSubmit({
      vendorName: selectedVendor,
      mealTypes: selectedMeals,
      vendorPlanId: vendorPlanId
    });
    
    // Reset form
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  // Function to get the first letter of vendor name for the circle
  const getVendorInitial = (name: string) => {
    return name.charAt(0);
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white text-gray-800 rounded-3xl p-8 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Mess opt-in Form</h2>
          <button 
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
          >
            <X size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Vendor Selection */}
          <div className="space-y-3">
            <h3 className="text-xl font-medium">Select Vendor</h3>
            
            {loading ? (
              <div className="py-4 text-center text-gray-500">Loading vendors...</div>
            ) : (
              <div className="max-h-48 overflow-y-auto border border-gray-200 rounded-lg">
                {vendors.map((vendor, index) => (
                  <div 
                    key={index}
                    onClick={() => setSelectedVendor(vendor.vendorName)}
                    className="flex items-center justify-between py-4 px-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 last:border-b-0"
                  >
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                        {getVendorInitial(vendor.vendorName)}
                      </div>
                      <span className="ml-4 text-lg">
                        {vendor.vendorName}
                      </span>
                    </div>
                    {selectedVendor === vendor.vendorName && (
                      <div className="w-6 h-6 bg-indigo-900 flex items-center justify-center rounded-sm">
                        <Check className="text-white" size={16} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Plan Selection */}
          {selectedVendor && (
            <div className="space-y-3">
              <h3 className="text-xl font-medium">Select Meal Plan</h3>
              
              {loadingPlans ? (
                <div className="py-4 text-center text-gray-500">Loading plans...</div>
              ) : filteredPlans.length === 0 ? (
                <div className="py-4 text-center text-gray-500">No plans available for this vendor</div>
              ) : (
                <div className="space-y-0 max-h-48 overflow-y-auto border border-gray-200 rounded-lg">
                  {filteredPlans.map((plan, index) => (
                    <div 
                      key={index}
                      onClick={() => handlePlanSelect(plan.planName)}
                      className="flex items-center justify-between py-4 px-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 last:border-b-0"
                    >
                      <div className="flex-1">
                        <div className="flex items-center">
                          <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold">
                            <DollarSign size={20} />
                          </div>
                          <div className="ml-4">
                            <span className="text-lg font-medium block">{plan.planName}</span>
                            <span className="text-sm text-gray-500 block">
                              {formatCurrency(plan.fee)} • {plan.mealTypes.join(', ')}
                            </span>
                          </div>
                        </div>
                      </div>
                      {selectedPlan === plan.planName && (
                        <div className="w-6 h-6 bg-indigo-900 flex items-center justify-center rounded-sm">
                          <Check className="text-white" size={16} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          
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
              disabled={!selectedVendor || !selectedPlan}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none disabled:opacity-50"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 