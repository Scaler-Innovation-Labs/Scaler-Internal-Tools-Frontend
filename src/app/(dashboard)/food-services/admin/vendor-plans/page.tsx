"use client";

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import {
  getAllVendors,
  getAllVendorPlans,
  createVendorPlan,
  updateVendorPlan,
  deleteVendorPlan
} from '@/lib/api/food-services';
import type {
  VendorSummaryDto,
  VendorPlanSummaryDto,
  VendorPlanCreateDto,
  VendorPlanUpdateDto
} from '@/lib/types/food-services';
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  Filter,
  Download,
  Package,
  AlertCircle,
  DollarSign,
  Users,
  Calendar,
  ChevronDown,
  X
} from 'lucide-react';

const MEAL_TYPES = ['BREAKFAST', 'LUNCH', 'DINNER'] as const;

export default function VendorPlanAdminPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [vendors, setVendors] = useState<VendorSummaryDto[]>([]);
  const [plans, setPlans] = useState<VendorPlanSummaryDto[]>([]);
  const [filteredPlans, setFilteredPlans] = useState<VendorPlanSummaryDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterVendor, setFilterVendor] = useState<string>('');
  const [filterMealType, setFilterMealType] = useState<string>('');

  // Modal states
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<VendorPlanSummaryDto | null>(null);

  // Form states
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Create form
  const [createForm, setCreateForm] = useState({
    vendorId: '' as number | '',
    planName: '',
    fee: '',
    mealTypes: [] as string[]
  });

  // Edit form
  const [editForm, setEditForm] = useState({
    planName: '',
    fee: '',
    mealTypes: [] as string[]
  });

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    filterPlans();
  }, [plans, searchTerm, filterVendor, filterMealType]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [vData, pData] = await Promise.all([getAllVendors(), getAllVendorPlans()]);
      setVendors(vData);
      setPlans(pData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filterPlans = () => {
    let filtered = plans.filter(plan => {
      const matchesSearch = 
        plan.planName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plan.vendorName.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesVendor = filterVendor === '' || plan.vendorName === filterVendor;
      
      const matchesMealType = filterMealType === '' || plan.mealTypes.includes(filterMealType);
      
      return matchesSearch && matchesVendor && matchesMealType;
    });

    setFilteredPlans(filtered);
  };

  const resetCreateForm = () => {
    setCreateForm({
      vendorId: '',
      planName: '',
      fee: '',
      mealTypes: []
    });
  };

  const handleCreate = async () => {
    if (!createForm.planName.trim() || !createForm.vendorId || !createForm.fee) return;
    
    setIsSubmitting(true);
    try {
      const dto: VendorPlanCreateDto = {
        vendorId: Number(createForm.vendorId),
        planName: createForm.planName.trim(),
        fee: parseFloat(createForm.fee),
        mealTypes: createForm.mealTypes
      };
      await createVendorPlan(dto);
      await loadData();
      resetCreateForm();
      setShowCreateModal(false);
    } catch (err) {
      console.error(err);
      alert('Failed to create plan');
    } finally {
      setIsSubmitting(false);
    }
  };

  const openEditModal = (plan: VendorPlanSummaryDto) => {
    setSelectedPlan(plan);
    setEditForm({
      planName: plan.planName,
      fee: plan.fee.toString(),
      mealTypes: [...plan.mealTypes]
    });
    setShowEditModal(true);
  };

  const handleUpdate = async () => {
    if (!selectedPlan || !editForm.planName.trim()) return;
    
    const id = selectedPlan.vendorPlanId ?? (selectedPlan as any).id;
    if (!id) return;
    
    setIsSubmitting(true);
    try {
      const dto: VendorPlanUpdateDto = {
        planName: editForm.planName.trim(),
        fee: parseFloat(editForm.fee)
      };
      await updateVendorPlan(id, dto);
      await loadData();
      setShowEditModal(false);
      setSelectedPlan(null);
    } catch (err) {
      console.error(err);
      alert('Failed to update plan');
    } finally {
      setIsSubmitting(false);
    }
  };

  const openDeleteModal = (plan: VendorPlanSummaryDto) => {
    setSelectedPlan(plan);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!selectedPlan) return;
    
    const id = selectedPlan.vendorPlanId ?? (selectedPlan as any).id;
    if (!id) return;
    
    setIsSubmitting(true);
    try {
      await deleteVendorPlan(id);
      await loadData();
      setShowDeleteModal(false);
      setSelectedPlan(null);
    } catch (err) {
      console.error(err);
      alert('Failed to delete plan');
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleCreateMealType = (type: string) => {
    setCreateForm(prev => ({
      ...prev,
      mealTypes: prev.mealTypes.includes(type) 
        ? prev.mealTypes.filter(t => t !== type)
        : [...prev.mealTypes, type]
    }));
  };

  const toggleEditMealType = (type: string) => {
    setEditForm(prev => ({
      ...prev,
      mealTypes: prev.mealTypes.includes(type) 
        ? prev.mealTypes.filter(t => t !== type)
        : [...prev.mealTypes, type]
    }));
  };

  const getMealTypeColor = (type: string) => {
    const colors = {
      BREAKFAST: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
      LUNCH: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      DINNER: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
  };

  const clearFilters = () => {
    setSearchTerm('');
    setFilterVendor('');
    setFilterMealType('');
  };

  const stats = {
    totalPlans: plans.length,
    avgFee: plans.length ? Math.round(plans.reduce((sum, p) => sum + p.fee, 0) / plans.length) : 0,
    uniqueVendors: new Set(plans.map(p => p.vendorName)).size,
    searchResults: filteredPlans.length
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <header className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b`}>
        <div className="px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Vendor Plan Management
              </h1>
              <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'} mt-1`}>
                Create and manage meal plans for food service vendors
              </p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Plan
            </button>
          </div>
        </div>
      </header>

      <main className="px-6 py-8">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className={`p-6 rounded-xl border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className="flex items-center">
                <Package className="w-8 h-8 text-blue-600" />
                <div className="ml-4">
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Total Plans</p>
                  <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {stats.totalPlans}
                  </p>
                </div>
              </div>
            </div>
            <div className={`p-6 rounded-xl border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className="flex items-center">
                <DollarSign className="w-8 h-8 text-green-600" />
                <div className="ml-4">
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Avg Fee</p>
                  <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    ₹{stats.avgFee}
                  </p>
                </div>
              </div>
            </div>
            <div className={`p-6 rounded-xl border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className="flex items-center">
                <Users className="w-8 h-8 text-purple-600" />
                <div className="ml-4">
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Active Vendors</p>
                  <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {stats.uniqueVendors}
                  </p>
                </div>
              </div>
            </div>
            <div className={`p-6 rounded-xl border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className="flex items-center">
                <Search className="w-8 h-8 text-orange-600" />
                <div className="ml-4">
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Filtered Results</p>
                  <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {stats.searchResults}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className={`p-6 rounded-xl border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                <input
                  type="text"
                  placeholder="Search plans or vendors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                />
              </div>
              <div className="flex gap-3">
                <select
                  value={filterVendor}
                  onChange={(e) => setFilterVendor(e.target.value)}
                  className={`px-3 py-2 border rounded-lg ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                >
                  <option value="">All Vendors</option>
                  {vendors.map(vendor => (
                    <option key={vendor.vendorName} value={vendor.vendorName}>
                      {vendor.vendorName}
                    </option>
                  ))}
                </select>
                <select
                  value={filterMealType}
                  onChange={(e) => setFilterMealType(e.target.value)}
                  className={`px-3 py-2 border rounded-lg ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                >
                  <option value="">All Meal Types</option>
                  {MEAL_TYPES.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                {(searchTerm || filterVendor || filterMealType) && (
                  <button
                    onClick={clearFilters}
                    className={`px-3 py-2 border rounded-lg transition-colors ${
                      isDark 
                        ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                <button className={`inline-flex items-center px-4 py-2 border rounded-lg transition-colors ${
                  isDark 
                    ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}>
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </button>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className={`rounded-xl border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            {loading ? (
              <div className="p-12 text-center">
                <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
                <p className={`mt-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Loading plans...</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className={`${isDark ? 'bg-gray-750' : 'bg-gray-50'}`}>
                    <tr>
                      <th className={`px-6 py-3 text-left text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                        Plan Details
                      </th>
                      <th className={`px-6 py-3 text-left text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                        Vendor
                      </th>
                      <th className={`px-6 py-3 text-left text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                        Fee
                      </th>
                      <th className={`px-6 py-3 text-left text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                        Meal Types
                      </th>
                      <th className={`px-6 py-3 text-right text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y ${isDark ? 'divide-gray-700' : 'divide-gray-200'}`}>
                    {filteredPlans.map((plan) => {
                      const id = plan.vendorPlanId ?? (plan as any).id;
                      return (
                        <tr 
                          key={id ?? plan.planName}
                          className={`${isDark ? 'hover:bg-gray-750' : 'hover:bg-gray-50'} transition-colors`}
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <Package className={`w-8 h-8 ${isDark ? 'text-gray-400' : 'text-gray-500'} mr-3`} />
                              <div>
                                <div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                  {plan.planName}
                                </div>
                                <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                  ID: #{id || 'N/A'}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                              {plan.vendorName}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className={`text-sm font-bold ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                              ₹{plan.fee.toLocaleString()}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-wrap gap-1">
                              {plan.mealTypes.map(type => (
                                <span
                                  key={type}
                                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getMealTypeColor(type)}`}
                                >
                                  {type}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end space-x-2">
                              <button
                                onClick={() => openEditModal(plan)}
                                className={`p-2 rounded-lg transition-colors ${
                                  isDark 
                                    ? 'text-gray-400 hover:text-blue-400 hover:bg-gray-700' 
                                    : 'text-gray-500 hover:text-blue-600 hover:bg-gray-100'
                                }`}
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => openDeleteModal(plan)}
                                disabled={!id}
                                className={`p-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                                  isDark 
                                    ? 'text-gray-400 hover:text-red-400 hover:bg-gray-700' 
                                    : 'text-gray-500 hover:text-red-600 hover:bg-gray-100'
                                }`}
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                
                {filteredPlans.length === 0 && !loading && (
                  <div className="p-12 text-center">
                    <Package className={`w-12 h-12 mx-auto ${isDark ? 'text-gray-600' : 'text-gray-400'}`} />
                    <p className={`mt-4 text-lg font-medium ${isDark ? 'text-gray-300' : 'text-gray-900'}`}>
                      No plans found
                    </p>
                    <p className={`mt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {searchTerm || filterVendor || filterMealType 
                        ? 'Try adjusting your search and filters' 
                        : 'Get started by creating your first vendor plan'
                      }
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className={`w-full max-w-lg rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} p-6`}>
            <h3 className={`text-lg font-semibold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Create New Plan
            </h3>
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Vendor
                </label>
                <select
                  value={createForm.vendorId}
                  onChange={(e) => setCreateForm(prev => ({ ...prev, vendorId: e.target.value === '' ? '' : Number(e.target.value) }))}
                  className={`w-full px-3 py-2 border rounded-lg ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                >
                  <option value="">Select Vendor</option>
                  {vendors.map(vendor => (
                    <option key={vendor.vendorId} value={vendor.vendorId}>
                      {vendor.vendorName}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Plan Name
                </label>
                <input
                  type="text"
                  value={createForm.planName}
                  onChange={(e) => setCreateForm(prev => ({ ...prev, planName: e.target.value }))}
                  placeholder="Enter plan name"
                  className={`w-full px-3 py-2 border rounded-lg ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Fee (₹)
                </label>
                <input
                  type="number"
                  value={createForm.fee}
                  onChange={(e) => setCreateForm(prev => ({ ...prev, fee: e.target.value }))}
                  placeholder="Enter fee amount"
                  className={`w-full px-3 py-2 border rounded-lg ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Meal Types
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {MEAL_TYPES.map(type => (
                    <label key={type} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={createForm.mealTypes.includes(type)}
                        onChange={() => toggleCreateMealType(type)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className={`ml-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        {type}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => {
                    setShowCreateModal(false);
                    resetCreateForm();
                  }}
                  className={`flex-1 px-4 py-2 border rounded-lg transition-colors ${
                    isDark 
                      ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreate}
                  disabled={!createForm.planName.trim() || !createForm.vendorId || !createForm.fee || isSubmitting}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? 'Creating...' : 'Create Plan'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && selectedPlan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className={`w-full max-w-lg rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} p-6`}>
            <h3 className={`text-lg font-semibold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Edit Plan: {selectedPlan.planName}
            </h3>
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Plan Name
                </label>
                <input
                  type="text"
                  value={editForm.planName}
                  onChange={(e) => setEditForm(prev => ({ ...prev, planName: e.target.value }))}
                  placeholder="Enter plan name"
                  className={`w-full px-3 py-2 border rounded-lg ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Fee (₹)
                </label>
                <input
                  type="number"
                  value={editForm.fee}
                  onChange={(e) => setEditForm(prev => ({ ...prev, fee: e.target.value }))}
                  placeholder="Enter fee amount"
                  className={`w-full px-3 py-2 border rounded-lg ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Meal Types (Read-only)
                </label>
                <div className="flex flex-wrap gap-2">
                  {selectedPlan.mealTypes.map(type => (
                    <span
                      key={type}
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getMealTypeColor(type)}`}
                    >
                      {type}
                    </span>
                  ))}
                </div>
                <p className={`text-xs mt-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  Meal types cannot be modified after creation
                </p>
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => {
                    setShowEditModal(false);
                    setSelectedPlan(null);
                  }}
                  className={`flex-1 px-4 py-2 border rounded-lg transition-colors ${
                    isDark 
                      ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdate}
                  disabled={!editForm.planName.trim() || isSubmitting}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && selectedPlan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className={`w-full max-w-md rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} p-6`}>
            <div className="flex items-center mb-4">
              <AlertCircle className="w-8 h-8 text-red-600 mr-3" />
              <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Delete Plan
              </h3>
            </div>
            <p className={`mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Are you sure you want to delete the plan <strong>"{selectedPlan.planName}"</strong> by {selectedPlan.vendorName}? 
              This action cannot be undone.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedPlan(null);
                }}
                className={`flex-1 px-4 py-2 border rounded-lg transition-colors ${
                  isDark 
                    ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isSubmitting}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 