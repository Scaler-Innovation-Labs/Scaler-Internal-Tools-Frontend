"use client";

import { useTheme } from "next-themes";
import { Bell, Plus, Settings, Store, Calendar } from 'lucide-react';
import { MessMenu } from '@/components/dashboard/food-services/MessMenu';
import { AdminMessMenu } from '@/components/dashboard/food-services/AdminMessMenu';
import { QuickStats } from '@/components/dashboard/food-services/QuickStats';
import { MessFeedback } from '@/components/dashboard/food-services/MessFeedback';
import { MealPlanForm } from '@/components/dashboard/food-services/MealPlanForm';
import { AdminMealPlanForm } from '@/components/dashboard/food-services/AdminMealPlanForm';
import { AdminVendorForm } from '@/components/dashboard/food-services/AdminVendorForm';
import { AdminFormControl } from '@/components/dashboard/food-services/AdminFormControl';
  
import { useState, useEffect } from 'react';
import { 
  getUserVendorPlanSelectionByUserId, 
  getUserVendorPlanSelectionById,
  createUserVendorPlanSelection, 
  deleteUserVendorPlanSelection,
  getVendorPlanById
} from '@/lib/api/food-services';
import type { 
  VendorPlanSelectionSummaryDto, 
  UserPlanSelection,
  VendorPlanResponseDto 
} from '@/lib/types/food-services.d';

const USER_ID = 1;
// Set this to true for simulating admin user for testing
const IS_ADMIN = true;

// Map of vendor names to their default plan IDs for demo purposes
const VENDOR_TO_PLAN_MAP: Record<string, number> = {
  "GSR": 1,
  "RedBird": 3,
  "UniWorld": 5
};

// Dummy stats data for when API call fails
const DUMMY_STATS: UserPlanSelection = {
  id: 1, // Added ID for deletion
  vendorName: "RedBird Catering",
  planName: "Premium Monthly Plan",
  price: 5000,
  mealTypes: ["Breakfast", "Lunch", "Dinner"],
  paymentStatus: "Paid",
  paymentDate: "October 2024 - Paid"
};

export default function FoodServicesPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [stats, setStats] = useState<UserPlanSelection | null>(null);
  const [loadingStats, setLoadingStats] = useState(true);
  const [deletingPlan, setDeletingPlan] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isAdminFormOpen, setIsAdminFormOpen] = useState(false);
  const [isAdminVendorFormOpen, setIsAdminVendorFormOpen] = useState(false);
  const [isAdminFormControlOpen, setIsAdminFormControlOpen] = useState(false);
  const [isFormEnabled, setIsFormEnabled] = useState(true); // Default to enabled
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedVendorForMenu, setSelectedVendorForMenu] = useState<string>("");
  const [vendorMenus, setVendorMenus] = useState<Record<string, string>>({
    "GSR Catering": "/images/Sep 4th to 10th 2024 - menu (pg 1).png",
    "RedBird Catering": "/images/Sep 4th to 10th 2024 - menu (pg 2).png",
    "UniWorld Foods": "/images/Sep 4th to 10th 2024 - menu (pg 3).png",
  });

  useEffect(() => {
    fetchStats();
    
    // Set initial vendor for menu display if we have stats
    if (stats?.vendorName) {
      setSelectedVendorForMenu(stats.vendorName);
    } else {
      // Default to first vendor in our list
      const firstVendor = Object.keys(vendorMenus)[0];
      if (firstVendor) {
        setSelectedVendorForMenu(firstVendor);
      }
    }
    
    // Check if we're in the first week of the month
    // This is just a default behavior, admin can override with the form control
    const now = new Date();
    const dayOfMonth = now.getDate();
    if (dayOfMonth > 7) {
      setIsFormEnabled(false);
    }
  }, []);

  // Add useEffect to update selected vendor when stats change
  useEffect(() => {
    if (stats?.vendorName) {
      setSelectedVendorForMenu(stats.vendorName);
    }
  }, [stats]);

  // Hide success message after 3 seconds
  useEffect(() => {
    if (showSuccessMessage) {
      const timer = setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessMessage]);

  async function fetchStats() {
    try {
      setLoadingStats(true);
      
      // First, get the user's vendor plan selection summary
      const summary = await getUserVendorPlanSelectionByUserId(USER_ID);
      
      if (summary && summary.vendorPlanSelectionId) {
        // If we have a selection ID, fetch the detailed selection to get complete meal types
        const detailedSelection = await getUserVendorPlanSelectionById(summary.vendorPlanSelectionId);
        
        // Then fetch the vendor plan details to get the meal types
        const vendorPlan = await getVendorPlanById(detailedSelection.vendorPlanId);
        
        setStats({
          id: summary.vendorPlanSelectionId,
          vendorName: summary.vendorName,
          planName: summary.vendorPlanName,
          price: vendorPlan.fee, // Use the fee from the vendor plan as price
          mealTypes: vendorPlan.mealTypes, // Use the meal types from the vendor plan
          paymentStatus: 'Paid',
          paymentDate: `${summary.selectedMonth} - Paid`,
        });
      }
    } catch (err) {
      console.error('Failed to fetch plan selection', err);
      // Use dummy data when API call fails
      setStats(DUMMY_STATS);
    } finally {
      setLoadingStats(false);
    }
  }

  const handleFormSubmit = async (data: {
    vendorName: string;
    mealTypes: string[];
    vendorPlanId?: number;
  }) => {
    try {
      if (!data.vendorPlanId) {
        throw new Error("Vendor plan ID is required");
      }
      
      // Get current month in YYYY-MM-DD format
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const currentMonth = `${year}-${month}-01`;
      
      // Create a vendor plan selection using the API endpoint
      const response = await createUserVendorPlanSelection({
        vendorPlanId: data.vendorPlanId,
        userId: USER_ID,
        selectedMonth: currentMonth,
      });
      
      console.log('Meal plan created successfully:', response);
      
      // After creating the plan selection, fetch the vendor plan to get meal types
      const vendorPlan = await getVendorPlanById(data.vendorPlanId);
      
      // Close the form
      setIsFormOpen(false);
      
      // Show success message
      setSuccessMessage("Meal plan selection saved successfully!");
      setShowSuccessMessage(true);
      
      // Update stats with new selection and meal types from the vendor plan
      setStats({
        id: response.vendorPlanSelectionId,
        vendorName: data.vendorName,
        planName: vendorPlan.planName,
        price: vendorPlan.fee, // Use the fee from the vendor plan as price
        mealTypes: vendorPlan.mealTypes, // Use the meal types from the vendor plan
        paymentStatus: 'Paid',
        paymentDate: `${new Date().toLocaleString('default', { month: 'long' })} ${year} - Paid`,
      });
      
      // Refresh stats to ensure we have the latest data
      fetchStats();
    } catch (error) {
      console.error('Failed to create meal plan selection', error);
      alert('Failed to save meal plan selection. Please try again.');
    }
  };

  const handleDeletePlan = async () => {
    if (!stats || !stats.id) {
      setSuccessMessage("No meal plan to delete");
      setShowSuccessMessage(true);
      return;
    }

    // Prevent users from deleting when form is disabled
    if (!isFormEnabled) {
      setSuccessMessage("Meal plan changes are currently not available. Please try again during the first week of the month.");
      setShowSuccessMessage(true);
      return;
    }

    try {
      setDeletingPlan(true);
      
      // Delete the vendor plan selection using the API endpoint
      await deleteUserVendorPlanSelection(stats.id);
      
      // Show success message
      setSuccessMessage("Meal plan cancelled successfully!");
      setShowSuccessMessage(true);
      
      // Clear stats
      setStats(null);
    } catch (error) {
      console.error('Failed to delete meal plan selection', error);
      setSuccessMessage("Failed to cancel meal plan. Please try again.");
      setShowSuccessMessage(true);
    } finally {
      setDeletingPlan(false);
    }
  };

  const handleFormToggle = (enabled: boolean) => {
    setIsFormEnabled(enabled);
    setSuccessMessage(`Meal plan form has been ${enabled ? 'enabled' : 'disabled'}`);
    setShowSuccessMessage(true);
  };

  const handleAdminFormSuccess = () => {
    setSuccessMessage("Meal plan created successfully!");
    setShowSuccessMessage(true);
  };

  const handleAdminVendorSuccess = () => {
    setSuccessMessage("Vendor added successfully!");
    setShowSuccessMessage(true);
  };

  const handleOpenForm = () => {
    if (!isFormEnabled) {
      setSuccessMessage("Meal plan selection is currently not available. Please try again during the first week of the month.");
      setShowSuccessMessage(true);
      return;
    }
    
    setIsFormOpen(true);
  };

  // Handle admin menu updates
  const handleAdminMenuUpdate = (vendor: string, filePreview: string) => {
    setVendorMenus({
      ...vendorMenus,
      [vendor]: filePreview
    });
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Success message */}
      {showSuccessMessage && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in">
          {successMessage}
        </div>
      )}
      
      <header className={`px-6 py-4 sticky top-0 z-10 text-white bg-gradient-to-r from-[#2E4DEE] to-[#040F75]`}>
        <div className="container mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Food Services</h1>
            <p className="text-sm opacity-90">Track your meal plan and preferences</p>
          </div>
          <div className="flex gap-2">
            {IS_ADMIN && (
              <>
                <button
                  onClick={() => setIsAdminFormControlOpen(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white font-medium rounded-lg text-sm"
                >
                  <Calendar className="w-5 h-5" />
                  Form Control
                </button>
                <button
                  onClick={() => setIsAdminVendorFormOpen(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white font-medium rounded-lg text-sm"
                >
                  <Store className="w-5 h-5" />
                  Vendors
                </button>
                <button
                  onClick={() => setIsAdminFormOpen(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white font-medium rounded-lg text-sm"
                >
                  <Settings className="w-5 h-5" />
                  Create Meal Plan
                </button>
              </>
            )}
            <button
              onClick={handleOpenForm}
              disabled={deletingPlan || !isFormEnabled}
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-500 text-white font-medium rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              title={!isFormEnabled ? "Meal plan selection is currently not available" : ""}
            >
              <Plus className="w-5 h-5" />
              {stats ? 'Change Meal Plan' : 'Select Meal Plan'}
            </button>
            <button
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-400 hover:bg-blue-300 text-white font-medium rounded-lg text-sm"
            >
              <Bell className="w-5 h-5" />
              Notifications Setting
            </button>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            {IS_ADMIN ? (
              <AdminMessMenu 
                onError={(message) => {
                  setSuccessMessage(message);
                  setShowSuccessMessage(true);
                }}
                onMenuUpdate={handleAdminMenuUpdate}
                savedMenus={vendorMenus}
              />
            ) : (
              <div>
                {/* Vendor selector for non-admin users */}
                <div className="mb-4 flex justify-end">
                  <select
                    value={selectedVendorForMenu}
                    onChange={(e) => setSelectedVendorForMenu(e.target.value)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium border 
                      ${isDark 
                        ? 'bg-gray-700 border-gray-600 text-gray-200' 
                        : 'bg-white border-gray-300 text-gray-800'
                      }`}
                  >
                    {Object.keys(vendorMenus).map((vendor) => (
                      <option key={vendor} value={vendor}>
                        {vendor}
                      </option>
                    ))}
                  </select>
                </div>
                
                <MessMenu 
                  imageUrl={selectedVendorForMenu ? vendorMenus[selectedVendorForMenu] : undefined} 
                  vendorName={selectedVendorForMenu}
                />
              </div>
            )}
          </div>
          <div className="space-y-6">
            {loadingStats
              ? <div className={`text-center ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Loading stats…</div>
              : stats 
                ? <QuickStats 
                    data={stats} 
                    onDelete={handleDeletePlan} 
                    canDelete={!deletingPlan}
                    formEnabled={isFormEnabled}
                    isAdmin={IS_ADMIN}
                  />
                : <div className={`p-4 rounded-3xl shadow-2xl text-center ${isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
                    <p className="mb-4">No meal plan selected</p>
                    {isFormEnabled ? (
                      <button
                        onClick={handleOpenForm}
                        className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white font-medium rounded-lg text-sm"
                      >
                        Select a Meal Plan
                      </button>
                    ) : (
                      <p className="text-sm text-yellow-500">
                        Meal plan selection is currently not available.
                        <br />Please try again during the first week of the month.
                      </p>
                    )}
                  </div>
            }
            <MessFeedback />
          </div>
        </div>
      </main>
      
      {/* Meal Plan Form Modal */}
      <MealPlanForm 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
        onSubmit={handleFormSubmit} 
      />

      {/* Admin Components */}
      {IS_ADMIN && (
        <>
          <AdminMealPlanForm
            isOpen={isAdminFormOpen}
            onClose={() => setIsAdminFormOpen(false)}
            onSuccess={handleAdminFormSuccess}
          />
          <AdminVendorForm
            isOpen={isAdminVendorFormOpen}
            onClose={() => setIsAdminVendorFormOpen(false)}
            onSuccess={handleAdminVendorSuccess}
          />
          <AdminFormControl
            isOpen={isAdminFormControlOpen}
            onClose={() => setIsAdminFormControlOpen(false)}
            onToggle={handleFormToggle}
            isFormEnabled={isFormEnabled}
          />
        </>
      )}
    </div>
  );
}
 