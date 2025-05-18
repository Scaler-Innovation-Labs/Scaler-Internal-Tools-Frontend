// ========= Vendor DTOs =========
export interface VendorCreateDto {
  vendorName: string;
}

export interface VendorResponseDto {
  vendorId: number;
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
  vendorId: number;
  fee: number;
  mealTypes: string[];
}

export interface VendorPlanResponseDto {
  vendorPlanId: number;
  planName: string;
  vendorId: number;
  fee: number;
  mealTypes: string[];
}

export interface VendorPlanSummaryDto {
  planName: string;
  vendorName: string;
  fee: number;
  mealTypes: string[];
}

export interface VendorPlanUpdateDto {
  planName?: string;
  fee?: number;
}

// ========= Vendor Plan Selection DTOs =========
export interface VendorPlanSelectionCreateDto {
  vendorPlanId: number;
  userId: number;
  selectedMonth: string;
}

export interface VendorPlanSelectionResponseDto {
  vendorPlanSelectionId: number;
  userId: number;
  vendorPlanId: number;
  selectedMonth: string;
}

export interface VendorPlanSelectionSummaryDto {
  vendorPlanName: string;
  vendorName: string;
  selectedMonth: string;
  mealTypes: string[];
  fee: number;
}

export interface VendorPlanSelectionUpdateDto {
  vendorPlanId: number;
}

// Representing the structure of the Monthly Mess Menu from the UI
export interface MonthlyMenuItem {
  day: string;
  date: string;
  breakfast: string[];
  lunch: string[];
  dinner: string[];
  snack?: string[];
}

export interface MonthlyMessMenu {
  monthLabel: string;
  items: MonthlyMenuItem[];
}

// For the "Quick Stats"
export interface UserPlanSelection {
  vendorName: string;
  planName: string;
  planPeriod: string;
  mealTypes: string[];
  paymentStatus: "Paid" | "Pending" | "Failed";
  paymentDate?: string;
}

// For Mess Feedback
export interface MessFeedbackSubmission {
  rating: number;
  additionalFeedback?: string;
} 