import type {
  VendorCreateDto,
  VendorResponseDto,
  VendorSummaryDto,
  VendorUpdateDto,
  VendorPlanCreateDto,
  VendorPlanResponseDto,
  VendorPlanSummaryDto,
  VendorPlanUpdateDto,
  VendorPlanSelectionCreateDto,
  VendorPlanSelectionResponseDto,
  VendorPlanSelectionSummaryDto,
  VendorPlanSelectionUpdateDto,
  // ... other DTOs will be imported as needed
} from '../types/food-services.d';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '/api'; // Placeholder

// Helper function for API calls (you might have a generic one already)
async function fetchApi(endpoint: string, options?: RequestInit) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      // Add Authorization header if needed, e.g.:
      // 'Authorization': `Bearer ${getAuthToken()}`,
      ...options?.headers,
    },
  });
  if (!response.ok) {
    // More sophisticated error handling can be added here
    throw new Error(`API call failed: ${response.statusText}`);
  }
  if (response.status === 204) { // No Content
    return null;
  }
  return response.json();
}

// ========= Vendor Endpoints =========

// GET /mess/admin/vendor/fetch/{id}
export async function getVendorById(id: number): Promise<VendorResponseDto> {
  return fetchApi(`/mess/admin/vendor/fetch/${id}`);
}

// GET /mess/admin/vendor/fetchAll
export async function getAllVendors(): Promise<VendorSummaryDto[]> {
  return fetchApi('/mess/admin/vendor/fetchAll');
}

// POST /mess/admin/vendor/create
export async function createVendor(data: VendorCreateDto): Promise<VendorResponseDto> {
  return fetchApi('/mess/admin/vendor/create', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// PUT /mess/admin/vendor/update/{id}
export async function updateVendor(id: number, data: VendorUpdateDto): Promise<VendorResponseDto> {
  return fetchApi(`/mess/admin/vendor/update/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

// DELETE /mess/admin/vendor/delete/{id}
export async function deleteVendor(id: number): Promise<string> { // Backend doc says "String for delete"
  return fetchApi(`/mess/admin/vendor/delete/${id}`, {
    method: 'DELETE',
  });
}

// ========= Vendor Plan Endpoints =========

// GET /mess/admin/vendorPlan/fetch/{id}
export async function getVendorPlanById(id: number): Promise<VendorPlanResponseDto> {
  return fetchApi(`/mess/admin/vendorPlan/fetch/${id}`);
}

// GET /mess/admin/vendorPlan/fetchAll
export async function getAllVendorPlans(): Promise<VendorPlanSummaryDto[]> {
  return fetchApi('/mess/admin/vendorPlan/fetchAll');
}

// POST /mess/admin/vendorPlan/create
export async function createVendorPlan(data: VendorPlanCreateDto): Promise<VendorPlanResponseDto> {
  return fetchApi('/mess/admin/vendorPlan/create', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// PUT /mess/admin/vendorPlan/update/{id}
export async function updateVendorPlan(id: number, data: VendorPlanUpdateDto): Promise<VendorPlanResponseDto> {
  return fetchApi(`/mess/admin/vendorPlan/update/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

// PATCH /mess/admin/vendorPlan/partialUpdate/{id}
export async function partialUpdateVendorPlan(id: number, data: Partial<VendorPlanUpdateDto>): Promise<VendorPlanResponseDto> {
  return fetchApi(`/mess/admin/vendorPlan/partialUpdate/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

// DELETE /mess/admin/vendorPlan/delete/{id}
export async function deleteVendorPlan(id: number): Promise<string> { // Backend doc says "String for delete"
  return fetchApi(`/mess/admin/vendorPlan/delete/${id}`, {
    method: 'DELETE',
  });
}

// ========= Vendor Plan Selection Endpoints (Admin) =========

// POST /mess/admin/vendorPlanSelection/create
export async function adminCreateVendorPlanSelection(data: VendorPlanSelectionCreateDto): Promise<VendorPlanSelectionResponseDto> {
  return fetchApi('/mess/admin/vendorPlanSelection/create', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// PUT /mess/admin/vendorPlanSelection/update/{vendorPlanSelectionId}
export async function adminUpdateVendorPlanSelection(vendorPlanSelectionId: number, data: VendorPlanSelectionUpdateDto): Promise<VendorPlanSelectionResponseDto> {
  return fetchApi(`/mess/admin/vendorPlanSelection/update/${vendorPlanSelectionId}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

// DELETE /mess/admin/vendorPlanSelection/delete/{id}
// Note: API doc has {id}, but it might mean vendorPlanSelectionId. Using {id} as per doc.
export async function adminDeleteVendorPlanSelection(id: number): Promise<string> {
  return fetchApi(`/mess/admin/vendorPlanSelection/delete/${id}`, {
    method: 'DELETE',
  });
}

// ========= Vendor Plan Selection Endpoints (User) =========

// GET /mess/vendorPlanSelection/fetch/{id}
// Note: API doc has {id}, assuming it means vendorPlanSelectionId for consistency with user update/delete.
export async function getUserVendorPlanSelectionById(id: number): Promise<VendorPlanSelectionResponseDto> {
  return fetchApi(`/mess/vendorPlanSelection/fetch/${id}`);
}

// GET /mess/vendorPlanSelection/fetchByUser/{userId}
export async function getUserVendorPlanSelectionByUserId(userId: number): Promise<VendorPlanSelectionSummaryDto> { // Doc implies a summary DTO might be returned
  return fetchApi(`/mess/vendorPlanSelection/fetchByUser/${userId}`);
}

// POST /mess/vendorPlanSelection/create
export async function createUserVendorPlanSelection(data: VendorPlanSelectionCreateDto): Promise<VendorPlanSelectionResponseDto> {
  return fetchApi('/mess/vendorPlanSelection/create', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// PUT /mess/vendorPlanSelection/update/{vendorPlanSelectionId}
export async function updateUserVendorPlanSelection(vendorPlanSelectionId: number, data: VendorPlanSelectionUpdateDto): Promise<VendorPlanSelectionResponseDto> {
  return fetchApi(`/mess/vendorPlanSelection/update/${vendorPlanSelectionId}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

// DELETE /mess/vendorPlanSelection/delete/{id}
// Note: API doc has {id}, but it might mean vendorPlanSelectionId. Using {id} as per doc.
export async function deleteUserVendorPlanSelection(id: number): Promise<string> {
  return fetchApi(`/mess/vendorPlanSelection/delete/${id}`, {
    method: 'DELETE',
  });
}

// TODO: Add functions for Vendor Plan and Vendor Plan Selection endpoints 