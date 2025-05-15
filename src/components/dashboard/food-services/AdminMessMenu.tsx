"use client";

import { useTheme } from "next-themes";
import { useState, useEffect, useRef } from "react";
import { ChevronDown, Upload, Trash2, AlertCircle } from "lucide-react";
import { getAllVendors } from "@/lib/api/food-services";
import type { VendorSummaryDto } from "@/lib/types/food-services.d";

// Dummy vendors data for when API call fails
const DUMMY_VENDORS = [
  { vendorName: "GSR Catering" },
  { vendorName: "RedBird Catering" },
  { vendorName: "UniWorld Foods" }
];

interface AdminMessMenuProps {
  onError?: (message: string) => void;
  onMenuUpdate?: (vendor: string, filePreview: string) => void;
  savedMenus?: Record<string, string>;
}

export function AdminMessMenu({ onError, onMenuUpdate, savedMenus = {} }: AdminMessMenuProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [vendors, setVendors] = useState<VendorSummaryDto[]>([]);
  const [loadingVendors, setLoadingVendors] = useState(true);
  const [selectedVendor, setSelectedVendor] = useState<string>("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  // Store menus for each vendor in local state
  // Structure: { vendorName: { file: File, preview: string } }
  const [vendorMenus, setVendorMenus] = useState<Record<string, { file: File, preview: string }>>({});
  
  useEffect(() => {
    fetchVendors();

    // Initialize menus from savedMenus
    const initialMenus: Record<string, { file: File, preview: string }> = {};
    Object.entries(savedMenus).forEach(([vendor, url]) => {
      // We can't create a File object from a URL, but we can use the URL as preview
      if (url) {
        initialMenus[vendor] = {
          file: new File([], "menu-image", { type: "image/png" }),
          preview: url
        };
      }
    });
    setVendorMenus(initialMenus);
  }, [savedMenus]);
  
  async function fetchVendors() {
    try {
      setLoadingVendors(true);
      const fetchedVendors = await getAllVendors();
      setVendors(fetchedVendors);
      // Initialize with the first vendor if available
      if (fetchedVendors.length > 0) {
        setSelectedVendor(fetchedVendors[0].vendorName);
      }
    } catch (error) {
      console.error("Failed to fetch vendors", error);
      setVendors(DUMMY_VENDORS);
      if (DUMMY_VENDORS.length > 0) {
        setSelectedVendor(DUMMY_VENDORS[0].vendorName);
      }
      if (onError) onError("Failed to load vendors. Using sample data instead.");
    } finally {
      setLoadingVendors(false);
    }
  }
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !selectedVendor) return;
    
    // Validate file type (only images)
    if (!file.type.startsWith('image/')) {
      if (onError) onError("Please select an image file");
      return;
    }
    
    // Create a URL for preview
    const preview = URL.createObjectURL(file);
    
    // Update the vendor menus state
    setVendorMenus({
      ...vendorMenus,
      [selectedVendor]: { file, preview }
    });

    // Notify parent component
    if (onMenuUpdate) {
      onMenuUpdate(selectedVendor, preview);
    }
  };
  
  const handleDeleteMenu = (vendorName: string) => {
    if (confirm(`Are you sure you want to delete ${vendorName}'s menu?`)) {
      // Create a new object without the selected vendor
      const { [vendorName]: _, ...restVendorMenus } = vendorMenus;
      
      // Release object URL to prevent memory leaks
      URL.revokeObjectURL(vendorMenus[vendorName]?.preview);
      
      setVendorMenus(restVendorMenus);

      // Notify parent component
      if (onMenuUpdate) {
        onMenuUpdate(vendorName, "");
      }
    }
  };
  
  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Determine if the selected vendor has a menu
  const hasMenu = selectedVendor && (vendorMenus[selectedVendor]?.preview || savedMenus[selectedVendor]);

  return (
    <div className={`p-6 rounded-3xl shadow-2xl ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Weekly Mess Menu</h2>
        
        {/* Vendor Selector Dropdown */}
        <div className="flex gap-2">
          {/* Upload Button - Only show when a vendor is selected */}
          {selectedVendor && (
            <>
              <button
                onClick={triggerFileInput}
                className={`px-4 py-2 rounded-lg text-sm font-medium inline-flex items-center gap-2 
                  ${isDark 
                    ? 'bg-blue-600 hover:bg-blue-500 text-white' 
                    : 'bg-blue-500 hover:bg-blue-400 text-white'
                  }`}
              >
                <Upload className="w-4 h-4" />
                {hasMenu ? 'Change Menu' : 'Upload Menu'}
              </button>
              
              {hasMenu && (
                <button
                  onClick={() => handleDeleteMenu(selectedVendor)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium inline-flex items-center gap-2 
                    ${isDark 
                      ? 'bg-red-600 hover:bg-red-500 text-white' 
                      : 'bg-red-500 hover:bg-red-400 text-white'
                    }`}
                >
                  <Trash2 className="w-4 h-4" />
                  Delete Menu
                </button>
              )}
            </>
          )}
          
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`px-4 py-2 rounded-lg text-sm font-medium inline-flex items-center gap-2 border 
                ${isDark 
                  ? 'bg-gray-700 border-gray-600 text-gray-200 hover:bg-gray-600' 
                  : 'bg-white border-gray-300 text-gray-800 hover:bg-gray-50'
                }`}
              disabled={loadingVendors}
            >
              {loadingVendors 
                ? "Loading vendors..." 
                : selectedVendor || "Select vendor"}
              <ChevronDown className="w-4 h-4" />
            </button>
            
            {isDropdownOpen && (
              <div 
                className={`absolute right-0 mt-1 w-56 rounded-md shadow-lg z-30
                  ${isDark ? 'bg-gray-700 border border-gray-600' : 'bg-white border border-gray-200'}`}
              >
                <div className="py-1">
                  {vendors.map((vendor) => (
                    <button
                      key={vendor.vendorName}
                      onClick={() => {
                        setSelectedVendor(vendor.vendorName);
                        setIsDropdownOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-2 text-sm
                        ${selectedVendor === vendor.vendorName 
                          ? (isDark ? 'bg-gray-600 text-white' : 'bg-blue-50 text-blue-700') 
                          : (isDark ? 'text-gray-200 hover:bg-gray-600' : 'text-gray-700 hover:bg-gray-50')
                        }`}
                    >
                      {vendor.vendorName}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="mt-4 overflow-auto">
        {hasMenu ? (
          <div className="relative">
            <img
              src={vendorMenus[selectedVendor]?.preview || savedMenus[selectedVendor]}
              alt={`${selectedVendor} Weekly Menu`}
              className="w-full rounded-md"
            />
          </div>
        ) : (
          <div 
            onClick={triggerFileInput}
            className={`w-full h-64 flex flex-col items-center justify-center rounded-md ${
              isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
            } cursor-pointer transition-colors`}
          >
            {selectedVendor ? (
              <>
                <Upload className={`w-12 h-12 mb-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                <span className={isDark ? 'text-gray-300' : 'text-gray-500'}>
                  Click to upload menu for {selectedVendor}
                </span>
                <span className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  Supports: JPG, PNG, GIF
                </span>
              </>
            ) : (
              <div className="flex items-center justify-center text-center">
                <AlertCircle className={`w-6 h-6 mr-2 ${isDark ? 'text-amber-400' : 'text-amber-500'}`} />
                <span className={isDark ? 'text-gray-300' : 'text-gray-500'}>
                  Please select a vendor first
                </span>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
    </div>
  );
} 