"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { createUserVendorPlanSelection, getAvailableMessPlans } from '@/lib/api/food-services';
import type { MessOptInFormData, MessVendorPlan } from '@/lib/types/food-services';

const USER_ID = 1; // For demo purposes, should come from auth context

// Utility function to format month name to yyyy-MM-dd date
function formatMonthToDate(monthName: string, year: number): string {
  const monthMap: { [key: string]: string } = {
    'January': '01', 'February': '02', 'March': '03', 'April': '04',
    'May': '05', 'June': '06', 'July': '07', 'August': '08',
    'September': '09', 'October': '10', 'November': '11', 'December': '12'
  };
  
  const monthNumber = monthMap[monthName] || '06'; // Default to June if not found
  const formattedDate = `${year}-${monthNumber}-01`;
  
  // Validate the format
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(formattedDate)) {
    throw new Error(`Invalid date format generated: ${formattedDate} from month: ${monthName}, year: ${year}`);
  }
  
  return formattedDate;
}

export function MessOptInForm() {
  const [formData, setFormData] = useState<MessOptInFormData>({
    isOptedIn: true,
    vendorId: 1,
    vendorPlanId: 1,
    dietPreference: 'Veg',
    totalAmount: 1000
  });
  
  const [availablePlans, setAvailablePlans] = useState<MessVendorPlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Make currentMonth more robust - use current month or June as fallback
  const currentDate = new Date();
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                     'July', 'August', 'September', 'October', 'November', 'December'];
  const currentMonth = "June"; // Hard-coded for demo, but could be: monthNames[currentDate.getMonth()]
  
  console.log('DEBUG: Component initialized with currentMonth:', currentMonth);
  
  // Test the date formatting function
  try {
    const testDate = formatMonthToDate(currentMonth, new Date().getFullYear());
    console.log('DEBUG: Test date formatting result:', testDate);
  } catch (error) {
    console.error('DEBUG: Date formatting test failed:', error);
  }
  
  useEffect(() => {
    async function fetchPlans() {
      try {
        const plans = await getAvailableMessPlans();
        setAvailablePlans(plans);
        if (plans.length > 0) {
          setFormData(prev => ({
            ...prev,
            vendorPlanId: plans[0].id,
            totalAmount: plans[0].price
          }));
        } else {
          // Reset form data if no plans are available
          setFormData(prev => ({
            ...prev,
            vendorPlanId: 0,
            totalAmount: 0
          }));
        }
      } catch (error) {
        console.error('Failed to fetch available plans', error);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchPlans();
  }, []);
  
  const handleOptInChange = (isOptedIn: boolean) => {
    setFormData(prev => ({
      ...prev,
      isOptedIn
    }));
  };
  
  const handlePlanSelection = (planId: number) => {
    const selectedPlan = availablePlans.find(plan => plan.id === planId);
    if (selectedPlan) {
      setFormData(prev => ({
        ...prev,
        vendorPlanId: planId,
        totalAmount: selectedPlan.price
      }));
    }
  };
  
  const handleDietPreferenceChange = (preference: 'Veg' | 'Non Veg' | 'Egg') => {
    setFormData(prev => ({
      ...prev,
      dietPreference: preference
    }));
  };
  
  const handleSubmit = async () => {
    if (!formData.isOptedIn) {
      alert('You have opted out of the mess service.');
      return;
    }
    
    setIsSubmitting(true);
    try {
      // Format selectedMonth as yyyy-MM-dd for backend LocalDate parsing
      // For June 2025, we'll use the first day of the month: 2025-06-01
      const year = new Date().getFullYear();
      const formattedDate = formatMonthToDate(currentMonth, year);
      
      console.log('DEBUG: currentMonth =', currentMonth);
      console.log('DEBUG: formattedDate =', formattedDate);
      
      // Map form data to API format
      const selection = {
        vendorPlanId: formData.vendorPlanId,
        userId: USER_ID,
        selectedMonth: formattedDate
      };
      
      console.log('DEBUG: selection object =', JSON.stringify(selection, null, 2));
      
      await createUserVendorPlanSelection(selection);
      alert('Your mess plan has been updated successfully!');
    } catch (error) {
      console.error('Failed to submit mess plan selection', error);
      alert('Failed to update your mess plan. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (isLoading) {
    return (
      <Card className="w-full shadow-lg overflow-hidden">
        <div className="bg-blue-600 text-white p-4">
          <h2 className="text-xl font-semibold">{currentMonth} Mess Opt-In-Form</h2>
        </div>
        <CardContent className="p-6 text-center py-12">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto"></div>
          </div>
          <p className="mt-4 text-gray-600">Loading meal plans...</p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="w-full shadow-lg overflow-hidden">
      <div className="bg-blue-600 text-white p-4">
        <h2 className="text-xl font-semibold">{currentMonth} Mess Opt-In-Form</h2>
      </div>
      
      <CardContent className="p-6">
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-700 mb-3">Choose your preference</h3>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              className={`flex flex-col items-center justify-center p-6 rounded-lg border ${
                formData.isOptedIn 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-300 bg-white hover:bg-gray-50'
              }`}
              onClick={() => handleOptInChange(true)}
            >
              <div className={`w-12 h-12 flex items-center justify-center rounded-full mb-2 ${
                formData.isOptedIn ? 'bg-blue-200' : 'bg-gray-200'
              }`}>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className={`h-6 w-6 ${formData.isOptedIn ? 'text-blue-600' : 'text-gray-600'}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="font-medium text-gray-900">Opt In</span>
            </button>
            
            <button
              type="button"
              className={`flex flex-col items-center justify-center p-6 rounded-lg border ${
                !formData.isOptedIn 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-300 bg-white hover:bg-gray-50'
              }`}
              onClick={() => handleOptInChange(false)}
            >
              <div className={`w-12 h-12 flex items-center justify-center rounded-full mb-2 ${
                !formData.isOptedIn ? 'bg-blue-200' : 'bg-gray-200'
              }`}>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className={`h-6 w-6 ${!formData.isOptedIn ? 'text-blue-600' : 'text-gray-600'}`}
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <span className="font-medium text-gray-900">Opt Out</span>
            </button>
          </div>
        </div>
        
        {formData.isOptedIn && (
          <>
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-700 mb-3">Select your meal plan</h3>
              {availablePlans.length === 0 ? (
                <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                  <p className="text-gray-500 mb-2">No meal plans available</p>
                  <p className="text-sm text-gray-400">Contact your administrator to create meal plans</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {availablePlans.map((plan) => (
                  <button
                    key={plan.id}
                    type="button"
                    className={`flex justify-between items-center p-4 rounded-lg border ${
                      formData.vendorPlanId === plan.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-300 bg-white hover:bg-gray-50'
                    }`}
                    onClick={() => handlePlanSelection(plan.id)}
                  >
                    <div className="flex items-center">
                      <div className={`w-6 h-6 flex items-center justify-center rounded-full ${
                        formData.vendorPlanId === plan.id ? 'bg-blue-500' : 'border border-gray-300'
                      }`}>
                        {formData.vendorPlanId === plan.id && (
                          <div className="w-3 h-3 bg-white rounded-full"></div>
                        )}
                      </div>
                      <div className="ml-3 text-left">
                        <div className="text-base font-medium text-gray-900">{plan.vendorName}</div>
                        <div className="text-sm text-gray-500">{plan.mealDescription}</div>
                      </div>
                    </div>
                    <div className="font-medium text-blue-600">₹ {plan.price.toLocaleString()}</div>
                  </button>
                ))}
                </div>
              )}
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-700 mb-3">Diet preference</h3>
              <div className="flex flex-wrap gap-4">
                <button
                  type="button"
                  className={`px-10 py-3 rounded-lg ${
                    formData.dietPreference === 'Veg'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => handleDietPreferenceChange('Veg')}
                >
                  Veg
                </button>
                <button
                  type="button"
                  className={`px-10 py-3 rounded-lg ${
                    formData.dietPreference === 'Non Veg'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => handleDietPreferenceChange('Non Veg')}
                >
                  Non Veg
                </button>
                <button
                  type="button"
                  className={`px-10 py-3 rounded-lg ${
                    formData.dietPreference === 'Egg'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => handleDietPreferenceChange('Egg')}
                >
                  Egg
                </button>
              </div>
            </div>
            
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-blue-700">
                    <span className="font-bold">Note:</span> Meal plan changes will be effective from the 1st of the next month. You can make changes to your plan until the 25th of the current month.
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
        
        <div className="flex items-center justify-between mt-8 border-t pt-6">
          {formData.isOptedIn && (
            <div className="text-lg font-bold">
              Total Amount
              <span className="ml-2 text-blue-600">₹ {formData.totalAmount.toLocaleString()}</span>
            </div>
          )}
          <div className="flex gap-4">
            <button
              type="button"
              className="px-6 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50"
              onClick={() => {/* TODO: Handle cancel */}}
            >
              Cancel
            </button>
            <button
              type="button"
              className="px-6 py-2 bg-blue-600 rounded-lg font-medium text-white hover:bg-blue-700 disabled:opacity-50"
              onClick={handleSubmit}
              disabled={isSubmitting || (formData.isOptedIn && availablePlans.length === 0)}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 