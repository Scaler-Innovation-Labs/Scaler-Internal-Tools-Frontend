import { useState, useEffect } from 'react';
import { createVendor, getAllVendors, deleteVendor } from '@/lib/api/food-services';
import type { VendorCreateDto, VendorSummaryDto } from '@/lib/types/food-services.d';
import { X, Check, Plus, Trash2 } from 'lucide-react';

interface AdminVendorFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

// Map vendor names to IDs for demo purposes (in production, this would come from API)
const VENDOR_ID_MAP: Record<string, number> = {
  "GSR": 1,
  "RedBird": 2,
  "UniWorld": 3
};

export function AdminVendorForm({ isOpen, onClose, onSuccess }: AdminVendorFormProps) {
  const [vendorName, setVendorName] = useState('');
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [vendors, setVendors] = useState<VendorSummaryDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [deletingVendor, setDeletingVendor] = useState<string | null>(null);

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
      } else {
        // Fallback to dummy data if API returns empty
        setVendors([
          { vendorName: "GSR" },
          { vendorName: "RedBird" },
          { vendorName: "UniWorld" }
        ]);
      }
    } catch (error) {
      console.error('Failed to fetch vendors:', error);
      // Fallback to dummy data
      setVendors([
        { vendorName: "GSR" },
        { vendorName: "RedBird" },
        { vendorName: "UniWorld" }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setVendorName('');
    setError(null);
    setShowAddForm(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!vendorName.trim()) {
      setError('Please enter a vendor name');
      return;
    }
    
    try {
      setCreating(true);
      setError(null);
      
      // Call the API to create a new vendor
      const vendorData: VendorCreateDto = {
        vendorName: vendorName.trim()
      };
      
      const response = await createVendor(vendorData);
      console.log('New vendor created:', response);
      
      // Add the new vendor to the list
      setVendors([...vendors, { vendorName: response.vendorName }]);
      
      // Reset form
      setVendorName('');
      setShowAddForm(false);
      
      if (onSuccess) onSuccess();
      
    } catch (error) {
      console.error('Failed to create vendor:', error);
      setError('Failed to create vendor. Please try again.');
    } finally {
      setCreating(false);
    }
  };

  const handleDeleteVendor = async (vendorName: string) => {
    if (confirm(`Are you sure you want to delete ${vendorName}?`)) {
      try {
        setDeletingVendor(vendorName);
        
        // Get vendor ID from map (in real app this would come from the API)
        const vendorId = VENDOR_ID_MAP[vendorName] || 1;
        
        // Call the API to delete the vendor
        await deleteVendor(vendorId);
        console.log(`Vendor ${vendorName} deleted successfully`);
        
        // Remove from local state
        const updatedVendors = vendors.filter(v => v.vendorName !== vendorName);
        setVendors(updatedVendors);
        
        if (onSuccess) onSuccess();
        
      } catch (error) {
        console.error('Failed to delete vendor:', error);
        setError(`Failed to delete vendor ${vendorName}. Please try again.`);
      } finally {
        setDeletingVendor(null);
      }
    }
  };

  if (!isOpen) return null;

  // Function to get the first letter of vendor name for the circle
  const getVendorInitial = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white text-gray-800 rounded-3xl p-8 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Manage Vendors</h2>
          <button 
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
          >
            <X size={24} />
          </button>
        </div>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {/* Vendor List */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-medium">Current Vendors</h3>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none text-sm flex items-center gap-1"
            >
              <Plus size={16} />
              {showAddForm ? 'Cancel' : 'Add New'}
            </button>
          </div>
          
          {loading ? (
            <div className="text-center py-4 text-gray-500">Loading vendors...</div>
          ) : vendors.length === 0 ? (
            <div className="text-center py-4 text-gray-500">No vendors found</div>
          ) : (
            <div className="space-y-0 max-h-60 overflow-y-auto border border-gray-200 rounded-lg">
              {vendors.map((vendor, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between py-3 px-4 border-b border-gray-200 last:border-b-0"
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                      {getVendorInitial(vendor.vendorName)}
                    </div>
                    <span className="ml-3 text-base">
                      {vendor.vendorName}
                    </span>
                  </div>
                  <button
                    onClick={() => handleDeleteVendor(vendor.vendorName)}
                    disabled={deletingVendor === vendor.vendorName}
                    className="p-2 text-red-500 hover:text-red-700 focus:outline-none disabled:opacity-50"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Add Vendor Form */}
        {showAddForm && (
          <form onSubmit={handleSubmit} className="space-y-6 border-t border-gray-200 pt-6">
            <h3 className="text-xl font-medium">Add New Vendor</h3>
            
            {/* Vendor Name */}
            <div className="space-y-2">
              <label htmlFor="vendorName" className="block text-base font-medium text-gray-700">
                Vendor Name
              </label>
              <input
                id="vendorName"
                type="text"
                value={vendorName}
                onChange={(e) => setVendorName(e.target.value)}
                placeholder="e.g. RedBird Catering"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            {/* Icon Preview */}
            <div className="space-y-2">
              <label className="block text-base font-medium text-gray-700">
                Vendor Icon Preview
              </label>
              <div className="flex items-center p-3 border border-gray-200 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                  {vendorName ? getVendorInitial(vendorName) : <Plus size={20} />}
                </div>
                <span className="ml-3 text-base">
                  {vendorName || 'Vendor Name'}
                </span>
              </div>
            </div>
            
            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={creating || !vendorName.trim()}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none disabled:opacity-50"
              >
                {creating ? 'Creating...' : 'Create Vendor'}
              </button>
            </div>
          </form>
        )}
        
        {/* Close Button */}
        {!showAddForm && (
          <div className="flex justify-end mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 focus:outline-none"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 