// ========= Vendor DTOs =========
export interface VendorCreateDto {
  vendorName: string;
}

export interface VendorResponseDto {
  vendorId: number; // Assuming Long maps to number
  vendorName: string;
}

export interface VendorSummaryDto {
  vendorName: string;
}

export interface VendorUpdateDto {
  vendorName: string;
}

// ========= Vendor Plan DTOs =========
export interface VendorPlanCreateDto {
  planName: string;
  vendorId: number; // Assuming Long maps to number
  fee: number;      // Assuming Double maps to number
  mealTypes: string[]; // Assuming Set of strings
}

export interface VendorPlanResponseDto {
  vendorPlanId: number; // Assuming Long maps to number
  planName: string;
  vendorId: number;   // Assuming Long maps to number
  fee: number;        // Assuming Double maps to number
  mealTypes: string[]; // Assuming Set of strings
}

export interface VendorPlanSummaryDto {
  planName: string;
  vendorName: string;
  fee: number;        // Assuming Double maps to number
  mealTypes: string[]; // Assuming Set of strings
}

export interface VendorPlanUpdateDto {
  planName?: string; // Assuming fields can be optional for updates
  fee?: number;      // Assuming Double maps to number
}

// ========= Vendor Plan Selection DTOs =========
export interface VendorPlanSelectionCreateDto {
  vendorPlanId: number; // Assuming Long maps to number
  userId: number;       // Assuming Long maps to number
  selectedMonth: string; // Assuming LocalDate maps to string (e.g., "YYYY-MM-DD")
}

export interface VendorPlanSelectionResponseDto {
  vendorPlanSelectionId: number; // Assuming Long maps to number
  userId: number;                // Assuming Long maps to number
  vendorPlanId: number;          // Assuming Long maps to number
  selectedMonth: string;          // Assuming LocalDate maps to string
}

export interface VendorPlanSelectionSummaryDto {
  vendorPlanName: string;
  vendorName: string;
  selectedMonth: string; // Assuming LocalDate maps to string
  mealTypes: string[];  // Assuming Set of strings
  fee: number;           // Assuming double maps to number
}

export interface VendorPlanSelectionUpdateDto {
  // The image shows "planId: Long", assuming it means vendorPlanId for consistency
  vendorPlanId: number; // Assuming Long maps to number
}

// Representing the structure of the Monthly Mess Menu from the UI
export interface MonthlyMenuItem {
  day: string; // e.g., "Wednesday"
  date: string; // e.g., "4th September"
  breakfast: string[];
  lunch: string[];
  dinner: string[];
  snack?: string[]; // Optional
}

export interface MonthlyMessMenu {
  monthLabel: string; // e.g., "MENU: Wednesday, 4th September to Tuesday, 10th September 2024"
  items: MonthlyMenuItem[];
}

// For the "Quick Stats" / Gaurav's Secret Recipe section
export interface UserPlanSelection {
  vendorName: string;        // e.g., "Gaura's Secret Recipe"
  planName: string;          // e.g., "Full Board (3 meals/day)"
  planPeriod: string;        // e.g., "May 2025"
  mealTypes: string[];       // e.g., ["Veg", "Non Veg", "Egg"]
  paymentStatus: "Paid" | "Pending" | "Failed";
  paymentDate?: string;      // e.g., "May 2025 - Paid"
}

// For Mess Feedback
export interface MessFeedbackSubmission {
  rating: number; // e.g., 4.5
  additionalFeedback?: string;
} 