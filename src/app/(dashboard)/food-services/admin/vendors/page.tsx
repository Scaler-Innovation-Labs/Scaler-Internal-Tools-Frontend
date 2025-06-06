"use client";

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import {
  getAllVendors,
  createVendor,
  updateVendor,
  deleteVendor
} from '@/lib/api/food-services';
import type {
  VendorCreateDto,
  VendorUpdateDto,
  VendorResponseDto,
  VendorSummaryDto
} from '@/lib/types/food-services';
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  MoreVertical,
  ArrowUpDown,
  Filter,
  Download,
  Building2,
  AlertCircle,
  Check,
  X
} from 'lucide-react';

export default function VendorAdminPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [vendors, setVendors] = useState<VendorSummaryDto[]>([]);
  const [filteredVendors, setFilteredVendors] = useState<VendorSummaryDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<'vendorId' | 'vendorName'>('vendorName');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Modal states
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState<VendorSummaryDto | null>(null);
  const [selectedVendors, setSelectedVendors] = useState<number[]>([]);

  // Form states
  const [newName, setNewName] = useState('');
  const [editingName, setEditingName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadVendors();
  }, []);

  useEffect(() => {
    filterAndSortVendors();
  }, [vendors, searchTerm, sortField, sortDirection]);

  const loadVendors = async () => {
    try {
      setLoading(true);
      const data = await getAllVendors();
      setVendors(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortVendors = () => {
    let filtered = vendors.filter(vendor =>
      vendor.vendorName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    filtered.sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      // Handle numeric fields (vendorId)
      const aNum = Number(aValue) || 0;
      const bNum = Number(bValue) || 0;
      return sortDirection === 'asc' 
        ? aNum - bNum
        : bNum - aNum;
    });

    setFilteredVendors(filtered);
  };

  const handleSort = (field: 'vendorId' | 'vendorName') => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleCreate = async () => {
    if (!newName.trim()) return;
    
    setIsSubmitting(true);
    try {
      const dto: VendorCreateDto = { vendorName: newName.trim() };
      const created: VendorResponseDto = await createVendor(dto);
      setVendors(prev => [...prev, { vendorId: created.vendorId, vendorName: created.vendorName }]);
      setNewName('');
      setShowCreateModal(false);
    } catch (err) {
      console.error(err);
      alert('Failed to create vendor');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdate = async () => {
    if (!selectedVendor || !editingName.trim()) return;
    
    setIsSubmitting(true);
    try {
      const dto: VendorUpdateDto = { vendorName: editingName.trim() };
      const updated: VendorResponseDto = await updateVendor(selectedVendor.vendorId!, dto);
      setVendors(prev => prev.map(v => 
        v.vendorId === selectedVendor.vendorId 
          ? { vendorId: updated.vendorId, vendorName: updated.vendorName } 
          : v
      ));
      setShowEditModal(false);
      setSelectedVendor(null);
      setEditingName('');
    } catch (err) {
      console.error(err);
      alert('Failed to update vendor');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedVendor) return;
    
    setIsSubmitting(true);
    try {
      await deleteVendor(selectedVendor.vendorId!);
      setVendors(prev => prev.filter(v => v.vendorId !== selectedVendor.vendorId));
      setShowDeleteModal(false);
      setSelectedVendor(null);
    } catch (err) {
      console.error(err);
      alert('Failed to delete vendor');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedVendors.length === 0 || !confirm(`Delete ${selectedVendors.length} vendors?`)) return;
    
    setIsSubmitting(true);
    try {
      await Promise.all(selectedVendors.map(id => deleteVendor(id)));
      setVendors(prev => prev.filter(v => !selectedVendors.includes(v.vendorId!)));
      setSelectedVendors([]);
    } catch (err) {
      console.error(err);
      alert('Failed to delete some vendors');
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleVendorSelection = (vendorId: number) => {
    setSelectedVendors(prev => 
      prev.includes(vendorId) 
        ? prev.filter(id => id !== vendorId)
        : [...prev, vendorId]
    );
  };

  const toggleSelectAll = () => {
    setSelectedVendors(
      selectedVendors.length === filteredVendors.length 
        ? [] 
        : filteredVendors.map(v => v.vendorId!).filter(Boolean)
    );
  };

  const openEditModal = (vendor: VendorSummaryDto) => {
    setSelectedVendor(vendor);
    setEditingName(vendor.vendorName);
    setShowEditModal(true);
  };

  const openDeleteModal = (vendor: VendorSummaryDto) => {
    setSelectedVendor(vendor);
    setShowDeleteModal(true);
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <header className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b`}>
        <div className="px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Vendor Management
              </h1>
              <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'} mt-1`}>
                Manage food service vendors and their information
              </p>
            </div>
            <div className="flex space-x-3">
              {selectedVendors.length > 0 && (
                <button
                  onClick={handleBulkDelete}
                  disabled={isSubmitting}
                  className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete ({selectedVendors.length})
                </button>
              )}
              <button
                onClick={() => setShowCreateModal(true)}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Vendor
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="px-6 py-8">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Filters and Search */}
          <div className={`p-6 rounded-xl border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                <input
                  type="text"
                  placeholder="Search vendors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                />
              </div>
              <div className="flex space-x-2">
                <button className={`inline-flex items-center px-4 py-2 border rounded-lg transition-colors ${
                  isDark 
                    ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}>
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </button>
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

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={`p-6 rounded-xl border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className="flex items-center">
                <Building2 className="w-8 h-8 text-blue-600" />
                <div className="ml-4">
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Total Vendors</p>
                  <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {vendors.length}
                  </p>
                </div>
              </div>
            </div>
            <div className={`p-6 rounded-xl border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className="flex items-center">
                <Check className="w-8 h-8 text-green-600" />
                <div className="ml-4">
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Active Vendors</p>
                  <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {vendors.length}
                  </p>
                </div>
              </div>
            </div>
            <div className={`p-6 rounded-xl border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className="flex items-center">
                <Search className="w-8 h-8 text-purple-600" />
                <div className="ml-4">
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Search Results</p>
                  <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {filteredVendors.length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className={`rounded-xl border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            {loading ? (
              <div className="p-12 text-center">
                <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
                <p className={`mt-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Loading vendors...</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className={`${isDark ? 'bg-gray-750' : 'bg-gray-50'}`}>
                    <tr>
                      <th className="px-6 py-3 text-left">
                        <input
                          type="checkbox"
                          checked={selectedVendors.length === filteredVendors.length && filteredVendors.length > 0}
                          onChange={toggleSelectAll}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </th>
                      <th 
                        className={`px-6 py-3 text-left text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700`}
                        onClick={() => handleSort('vendorId')}
                      >
                        <div className="flex items-center">
                          ID
                          <ArrowUpDown className="w-4 h-4 ml-1" />
                        </div>
                      </th>
                      <th 
                        className={`px-6 py-3 text-left text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700`}
                        onClick={() => handleSort('vendorName')}
                      >
                        <div className="flex items-center">
                          Vendor Name
                          <ArrowUpDown className="w-4 h-4 ml-1" />
                        </div>
                      </th>
                      <th className={`px-6 py-3 text-left text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                        Status
                      </th>
                      <th className={`px-6 py-3 text-right text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y ${isDark ? 'divide-gray-700' : 'divide-gray-200'}`}>
                    {filteredVendors.map((vendor) => (
                      <tr 
                        key={vendor.vendorId}
                        className={`${isDark ? 'hover:bg-gray-750' : 'hover:bg-gray-50'} transition-colors`}
                      >
                        <td className="px-6 py-4">
                          <input
                            type="checkbox"
                            checked={selectedVendors.includes(vendor.vendorId!)}
                            onChange={() => toggleVendorSelection(vendor.vendorId!)}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                        </td>
                        <td className={`px-6 py-4 text-sm ${isDark ? 'text-gray-300' : 'text-gray-900'}`}>
                          #{vendor.vendorId}
                        </td>
                        <td className={`px-6 py-4 text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {vendor.vendorName}
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                            Active
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end space-x-2">
                            <button
                              onClick={() => openEditModal(vendor)}
                              className={`p-2 rounded-lg transition-colors ${
                                isDark 
                                  ? 'text-gray-400 hover:text-blue-400 hover:bg-gray-700' 
                                  : 'text-gray-500 hover:text-blue-600 hover:bg-gray-100'
                              }`}
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => openDeleteModal(vendor)}
                              className={`p-2 rounded-lg transition-colors ${
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
                    ))}
                  </tbody>
                </table>
                
                {filteredVendors.length === 0 && !loading && (
                  <div className="p-12 text-center">
                    <Building2 className={`w-12 h-12 mx-auto ${isDark ? 'text-gray-600' : 'text-gray-400'}`} />
                    <p className={`mt-4 text-lg font-medium ${isDark ? 'text-gray-300' : 'text-gray-900'}`}>
                      No vendors found
                    </p>
                    <p className={`mt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {searchTerm ? 'Try adjusting your search terms' : 'Get started by adding your first vendor'}
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
          <div className={`w-full max-w-md rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} p-6`}>
            <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Add New Vendor
            </h3>
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Vendor Name
                </label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Enter vendor name"
                  className={`w-full px-3 py-2 border rounded-lg ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                />
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => {
                    setShowCreateModal(false);
                    setNewName('');
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
                  disabled={!newName.trim() || isSubmitting}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? 'Creating...' : 'Create'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className={`w-full max-w-md rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} p-6`}>
            <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Edit Vendor
            </h3>
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Vendor Name
                </label>
                <input
                  type="text"
                  value={editingName}
                  onChange={(e) => setEditingName(e.target.value)}
                  placeholder="Enter vendor name"
                  className={`w-full px-3 py-2 border rounded-lg ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                />
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => {
                    setShowEditModal(false);
                    setSelectedVendor(null);
                    setEditingName('');
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
                  disabled={!editingName.trim() || isSubmitting}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? 'Saving...' : 'Save'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && selectedVendor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className={`w-full max-w-md rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} p-6`}>
            <div className="flex items-center mb-4">
              <AlertCircle className="w-8 h-8 text-red-600 mr-3" />
              <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Delete Vendor
              </h3>
            </div>
            <p className={`mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Are you sure you want to delete <strong>{selectedVendor.vendorName}</strong>? 
              This action cannot be undone.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedVendor(null);
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