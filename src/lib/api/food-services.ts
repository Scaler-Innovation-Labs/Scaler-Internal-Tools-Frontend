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
  MessVendorPlan
} from '../types/food-services.d';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '/api'; 
async function fetchApi(endpoint: string, options?: RequestInit) {
  console.log('DEBUG: fetchApi called with endpoint:', endpoint);
  console.log('DEBUG: fetchApi called with options:', JSON.stringify(options, null, 2));
  
  const url = `${API_BASE_URL}${endpoint}`;
  console.log('DEBUG: Full URL:', url);
  
  if (options?.body) {
    console.log('DEBUG: Request body:', options.body);
  }
  
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });
  
  console.log('DEBUG: Response status:', response.status);
  console.log('DEBUG: Response statusText:', response.statusText);
  
  if (!response.ok) {
    const errorText = await response.text();
    console.log('DEBUG: Error response body:', errorText);
    throw new Error(`API call failed: ${response.statusText}`);
  }
  if (response.status === 204) {
    return null;
  }
  // Parse JSON if content-type is JSON, otherwise return plain text
  const contentType = response.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
  return response.json();
  } else {
    return response.text();
  }
}


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
export async function adminDeleteVendorPlanSelection(id: number): Promise<string> {
  return fetchApi(`/mess/admin/vendorPlanSelection/delete/${id}`, {
    method: 'DELETE',
  });
}


// GET /mess/vendorPlanSelection/fetch/{id}
export async function getUserVendorPlanSelectionById(id: number): Promise<VendorPlanSelectionResponseDto> {
  return fetchApi(`/mess/vendorPlanSelection/fetch/${id}`);
}

// GET /mess/vendorPlanSelection/fetchByUser/{userId}
export async function getUserVendorPlanSelectionByUserId(userId: number): Promise<VendorPlanSelectionSummaryDto> { // Doc implies a summary DTO might be returned
  return fetchApi(`/mess/vendorPlanSelection/fetchByUser/${userId}`);
}

// POST /mess/vendorPlanSelection/create
export async function createUserVendorPlanSelection(data: VendorPlanSelectionCreateDto): Promise<VendorPlanSelectionResponseDto> {
  console.log('DEBUG: API function called with data:', JSON.stringify(data, null, 2));
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
export async function deleteUserVendorPlanSelection(id: number): Promise<string> {
  return fetchApi(`/mess/vendorPlanSelection/delete/${id}`, {
    method: 'DELETE',
  });
}

// GET /mess/admin/vendorPlan/fetchAll - Available plans for users to select from
export async function getAvailableMessPlans(): Promise<MessVendorPlan[]> {
  try {
    const vendorPlans: VendorPlanSummaryDto[] = await fetchApi('/mess/admin/vendorPlan/fetchAll');
    
    // Map VendorPlanSummaryDto to MessVendorPlan format
    return vendorPlans.map(plan => ({
      id: plan.vendorPlanId,
      vendorName: plan.vendorName,
      planName: plan.planName,
      mealDescription: plan.mealTypes.join(', '),
      price: plan.fee
    }));
  } catch (error) {
    console.error('Failed to fetch vendor plans:', error);
    // Fallback to empty array instead of mocked data
    return [];
  }
}
