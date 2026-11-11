export type Country = "US" | "GB";
export type Currency = "USD" | "GBP";

export type AppointmentStatus =
  | "scheduled"
  | "completed"
  | "cancelled"
  | "no_show";

export type ClaimStatus = "pending" | "approved" | "rejected" | "paid";
export type InvoiceStatus = "pending" | "paid" | "overdue" | "cancelled";
export type EmploymentStatus = "active" | "on_leave" | "inactive";
export type TrainingStatus = "pending" | "completed" | "expired";
export type AccessAction = "read" | "create" | "update" | "delete";

export interface Clinic {
  id: string;
  name: string;
  country: Country;
  city: string;
  zipCode: string;
  address: string;
  timeZone: string;
  active: boolean;
}

export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  phone: string;
  clinicId: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  clinicId: string;
  employeeId: string;
  appointmentDate: string;
  appointmentTime: string;
  status: AppointmentStatus;
  reason: string;
}

export interface ClinicalRecord {
  id: string;
  patientId: string;
  clinicId: string;
  employeeId: string;
  appointmentId?: string;
  createdAt: string;
  diagnosis: string;
  treatment: string;
  notes?: string;
}

export interface InsuranceClaim {
  id: string;
  patientId: string;
  appointmentId: string;
  clinicId: string;
  insurer: string;
  amount: number;
  currency: Currency;
  status: ClaimStatus;
  submittedAt: string;
  rejectionReason?: string;
}

export interface Invoice {
  id: string;
  patientId: string;
  clinicId: string;
  appointmentId: string;
  amount: number;
  currency: Currency;
  issuedAt: string;
  dueDate: string;
  status: InvoiceStatus;
  paidAt?: string;
}

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  clinicId: string;
  department: string;
  role: string;
  hireDate: string;
  status: EmploymentStatus;
}

export interface TrainingRecord {
  id: string;
  employeeId: string;
  courseName: string;
  trainingHours: number;
  completedAt?: string;
  expiresAt?: string;
  status: TrainingStatus;
}

export interface DataAccessLog {
  id: string;
  employeeId: string;
  patientId?: string;
  action: AccessAction;
  resourceType: string;
  resourceId: string;
  timestamp: string;
  authorized: boolean;
}