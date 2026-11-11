import type {
  AccessAction,
  Appointment,
  AppointmentStatus,
  ClaimStatus,
  Clinic,
  ClinicalRecord,
  Country,
  Currency,
  DataAccessLog,
  Employee,
  EmploymentStatus,
  InsuranceClaim,
  Invoice,
  InvoiceStatus,
  Patient,
  TrainingRecord,
  TrainingStatus,
} from "../types/models";

export interface ValidationIssue {
  field: string;
  message: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationIssue[];
}

/**
 * Related records enable reference checks; `today` fixes the date used when
 * validating whether a patient's date of birth is in the future.
 */
export interface ValidationContext {
  clinics?: readonly Clinic[];
  patients?: readonly Patient[];
  employees?: readonly Employee[];
  appointments?: readonly Appointment[];
  today?: string;
}

const countries: readonly Country[] = ["US", "GB"];
const currencies: readonly Currency[] = ["USD", "GBP"];
const appointmentStatuses: readonly AppointmentStatus[] = [
  "scheduled",
  "completed",
  "cancelled",
  "no_show",
];
const claimStatuses: readonly ClaimStatus[] = [
  "pending",
  "approved",
  "rejected",
  "paid",
];
const invoiceStatuses: readonly InvoiceStatus[] = [
  "pending",
  "paid",
  "overdue",
  "cancelled",
];
const employmentStatuses: readonly EmploymentStatus[] = [
  "active",
  "on_leave",
  "inactive",
];
const trainingStatuses: readonly TrainingStatus[] = [
  "pending",
  "completed",
  "expired",
];
const accessActions: readonly AccessAction[] = [
  "read",
  "create",
  "update",
  "delete",
];

function result(errors: ValidationIssue[]): ValidationResult {
  return { valid: errors.length === 0, errors };
}

function addIssue(
  errors: ValidationIssue[],
  field: string,
  message: string,
): void {
  errors.push({ field, message });
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function addRequiredText(
  value: unknown,
  field: string,
  errors: ValidationIssue[],
): void {
  if (!isNonEmptyString(value)) {
    addIssue(errors, field, "must be a non-empty string");
  }
}

function isOneOf(value: unknown, allowed: readonly string[]): boolean {
  return typeof value === "string" && allowed.includes(value);
}

function isValidDateOnly(value: unknown): value is string {
  if (typeof value !== "string") {
    return false;
  }

  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) {
    return false;
  }

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const parsed = new Date(0);
  parsed.setUTCHours(0, 0, 0, 0);
  parsed.setUTCFullYear(year, month - 1, day);

  return (
    parsed.getUTCFullYear() === year &&
    parsed.getUTCMonth() === month - 1 &&
    parsed.getUTCDate() === day
  );
}

function isValidLocalTime(value: unknown): value is string {
  if (typeof value !== "string") {
    return false;
  }

  const match = /^(\d{2}):(\d{2})$/.exec(value);
  return Boolean(
    match && Number(match[1]) <= 23 && Number(match[2]) <= 59,
  );
}

function isValidUtcTimestamp(value: unknown): value is string {
  if (typeof value !== "string") {
    return false;
  }

  const match = /^(\d{4}-\d{2}-\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.\d+)?Z$/.exec(
    value,
  );

  return Boolean(
    match &&
      isValidDateOnly(match[1]) &&
      Number(match[2]) <= 23 &&
      Number(match[3]) <= 59 &&
      Number(match[4]) <= 59 &&
      Number.isFinite(Date.parse(value)),
  );
}

function isValidTimeZone(value: unknown): value is string {
  if (!isNonEmptyString(value)) {
    return false;
  }

  try {
    new Intl.DateTimeFormat("en-US", { timeZone: value });
    return true;
  } catch {
    return false;
  }
}

function isFiniteNonNegative(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value) && value >= 0;
}

function addDateIssue(
  value: unknown,
  field: string,
  format: "date" | "timestamp",
  errors: ValidationIssue[],
  optional = false,
): void {
  if (optional && value === undefined) {
    return;
  }

  if (!isNonEmptyString(value)) {
    addIssue(
      errors,
      field,
      optional
        ? "must be a non-empty string when provided"
        : "is required",
    );
    return;
  }

  const valid =
    format === "date" ? isValidDateOnly(value) : isValidUtcTimestamp(value);
  if (!valid) {
    addIssue(
      errors,
      field,
      format === "date"
        ? "must be a valid date in YYYY-MM-DD format"
        : "must be a valid UTC ISO 8601 timestamp",
    );
  }
}

function addEmailIssue(
  value: unknown,
  field: string,
  errors: ValidationIssue[],
): void {
  addRequiredText(value, field, errors);
  if (
    isNonEmptyString(value) &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
  ) {
    addIssue(errors, field, "must be a valid email address");
  }
}

function addReferenceIssue(
  value: unknown,
  field: string,
  entities: readonly { id: string }[] | undefined,
  errors: ValidationIssue[],
): void {
  if (
    entities !== undefined &&
    isNonEmptyString(value) &&
    !entities.some((entity) => entity.id === value)
  ) {
    addIssue(errors, field, "does not reference an existing record");
  }
}

function findById<T extends { id: string }>(
  entities: readonly T[] | undefined,
  id: string,
): T | undefined {
  return entities?.find((entity) => entity.id === id);
}

function today(context: ValidationContext): string {
  return context.today ?? new Date().toISOString().slice(0, 10);
}

export function validateClinic(clinic: Clinic): ValidationResult {
  const errors: ValidationIssue[] = [];

  addRequiredText(clinic.id, "id", errors);
  addRequiredText(clinic.name, "name", errors);
  if (!isOneOf(clinic.country, countries)) {
    addIssue(errors, "country", "must be US or GB");
  }
  addRequiredText(clinic.city, "city", errors);
  addRequiredText(clinic.zipCode, "zipCode", errors);
  addRequiredText(clinic.address, "address", errors);
  if (!isValidTimeZone(clinic.timeZone)) {
    addIssue(errors, "timeZone", "must be a valid IANA time-zone identifier");
  }
  if (typeof clinic.active !== "boolean") {
    addIssue(errors, "active", "must be a boolean");
  }

  return result(errors);
}

export function validatePatient(
  patient: Patient,
  context: ValidationContext = {},
): ValidationResult {
  const errors: ValidationIssue[] = [];

  addRequiredText(patient.id, "id", errors);
  addRequiredText(patient.firstName, "firstName", errors);
  addRequiredText(patient.lastName, "lastName", errors);
  addDateIssue(patient.dateOfBirth, "dateOfBirth", "date", errors);
  if (
    isValidDateOnly(patient.dateOfBirth) &&
    isValidDateOnly(today(context)) &&
    patient.dateOfBirth > today(context)
  ) {
    addIssue(errors, "dateOfBirth", "cannot be in the future");
  }
  addEmailIssue(patient.email, "email", errors);
  addRequiredText(patient.phone, "phone", errors);
  addRequiredText(patient.clinicId, "clinicId", errors);
  addReferenceIssue(patient.clinicId, "clinicId", context.clinics, errors);

  return result(errors);
}

export function validateAppointment(
  appointment: Appointment,
  context: ValidationContext = {},
): ValidationResult {
  const errors: ValidationIssue[] = [];

  addRequiredText(appointment.id, "id", errors);
  addRequiredText(appointment.patientId, "patientId", errors);
  addRequiredText(appointment.clinicId, "clinicId", errors);
  addRequiredText(appointment.employeeId, "employeeId", errors);
  addDateIssue(appointment.appointmentDate, "appointmentDate", "date", errors);
  if (!isValidLocalTime(appointment.appointmentTime)) {
    addIssue(errors, "appointmentTime", "must be a valid local time in HH:mm format");
  }
  if (!isOneOf(appointment.status, appointmentStatuses)) {
    addIssue(errors, "status", "is not an allowed appointment status");
  }
  addRequiredText(appointment.reason, "reason", errors);
  addReferenceIssue(appointment.patientId, "patientId", context.patients, errors);
  addReferenceIssue(appointment.clinicId, "clinicId", context.clinics, errors);
  addReferenceIssue(appointment.employeeId, "employeeId", context.employees, errors);

  const patient = isNonEmptyString(appointment.patientId)
    ? findById(context.patients, appointment.patientId)
    : undefined;
  if (patient && patient.clinicId !== appointment.clinicId) {
    addIssue(errors, "clinicId", "does not match the patient's clinic");
  }

  const employee = isNonEmptyString(appointment.employeeId)
    ? findById(context.employees, appointment.employeeId)
    : undefined;
  if (employee && employee.clinicId !== appointment.clinicId) {
    addIssue(errors, "clinicId", "does not match the employee's clinic");
  }

  return result(errors);
}

export function validateClinicalRecord(
  record: ClinicalRecord,
  context: ValidationContext = {},
): ValidationResult {
  const errors: ValidationIssue[] = [];

  addRequiredText(record.id, "id", errors);
  addRequiredText(record.patientId, "patientId", errors);
  addRequiredText(record.clinicId, "clinicId", errors);
  addRequiredText(record.employeeId, "employeeId", errors);
  addDateIssue(record.createdAt, "createdAt", "timestamp", errors);
  addRequiredText(record.diagnosis, "diagnosis", errors);
  addRequiredText(record.treatment, "treatment", errors);
  addReferenceIssue(record.patientId, "patientId", context.patients, errors);
  addReferenceIssue(record.clinicId, "clinicId", context.clinics, errors);
  addReferenceIssue(record.employeeId, "employeeId", context.employees, errors);

  if (record.appointmentId !== undefined) {
    addRequiredText(record.appointmentId, "appointmentId", errors);
    addReferenceIssue(
      record.appointmentId,
      "appointmentId",
      context.appointments,
      errors,
    );
  }

  const appointment = record.appointmentId
    ? findById(context.appointments, record.appointmentId)
    : undefined;
  if (appointment) {
    if (appointment.patientId !== record.patientId) {
      addIssue(errors, "patientId", "does not match the linked appointment");
    }
    if (appointment.clinicId !== record.clinicId) {
      addIssue(errors, "clinicId", "does not match the linked appointment");
    }
    if (appointment.employeeId !== record.employeeId) {
      addIssue(errors, "employeeId", "does not match the linked appointment");
    }
  }

  return result(errors);
}

export function validateInsuranceClaim(
  claim: InsuranceClaim,
  context: ValidationContext = {},
): ValidationResult {
  const errors: ValidationIssue[] = [];

  addRequiredText(claim.id, "id", errors);
  addRequiredText(claim.patientId, "patientId", errors);
  addRequiredText(claim.appointmentId, "appointmentId", errors);
  addRequiredText(claim.clinicId, "clinicId", errors);
  addRequiredText(claim.insurer, "insurer", errors);
  if (!isFiniteNonNegative(claim.amount)) {
    addIssue(errors, "amount", "must be a finite non-negative number");
  }
  if (!isOneOf(claim.currency, currencies)) {
    addIssue(errors, "currency", "must be USD or GBP");
  }
  if (!isOneOf(claim.status, claimStatuses)) {
    addIssue(errors, "status", "is not an allowed claim status");
  }
  addDateIssue(claim.submittedAt, "submittedAt", "timestamp", errors);
  addReferenceIssue(claim.patientId, "patientId", context.patients, errors);
  addReferenceIssue(claim.clinicId, "clinicId", context.clinics, errors);
  addReferenceIssue(claim.appointmentId, "appointmentId", context.appointments, errors);

  const appointment = findById(context.appointments, claim.appointmentId);
  if (appointment) {
    if (appointment.patientId !== claim.patientId) {
      addIssue(errors, "patientId", "does not match the linked appointment");
    }
    if (appointment.clinicId !== claim.clinicId) {
      addIssue(errors, "clinicId", "does not match the linked appointment");
    }
  }

  return result(errors);
}

export function validateInvoice(
  invoice: Invoice,
  context: ValidationContext = {},
): ValidationResult {
  const errors: ValidationIssue[] = [];

  addRequiredText(invoice.id, "id", errors);
  addRequiredText(invoice.patientId, "patientId", errors);
  addRequiredText(invoice.clinicId, "clinicId", errors);
  addRequiredText(invoice.appointmentId, "appointmentId", errors);
  if (!isFiniteNonNegative(invoice.amount)) {
    addIssue(errors, "amount", "must be a finite non-negative number");
  }
  if (!isOneOf(invoice.currency, currencies)) {
    addIssue(errors, "currency", "must be USD or GBP");
  }
  addDateIssue(invoice.issuedAt, "issuedAt", "date", errors);
  addDateIssue(invoice.dueDate, "dueDate", "date", errors);
  if (
    isValidDateOnly(invoice.issuedAt) &&
    isValidDateOnly(invoice.dueDate) &&
    invoice.dueDate < invoice.issuedAt
  ) {
    addIssue(errors, "dueDate", "cannot be earlier than issuedAt");
  }
  if (!isOneOf(invoice.status, invoiceStatuses)) {
    addIssue(errors, "status", "is not an allowed invoice status");
  }
  addDateIssue(invoice.paidAt, "paidAt", "date", errors, true);
  addReferenceIssue(invoice.patientId, "patientId", context.patients, errors);
  addReferenceIssue(invoice.clinicId, "clinicId", context.clinics, errors);
  addReferenceIssue(invoice.appointmentId, "appointmentId", context.appointments, errors);

  const appointment = findById(context.appointments, invoice.appointmentId);
  if (appointment) {
    if (appointment.patientId !== invoice.patientId) {
      addIssue(errors, "patientId", "does not match the linked appointment");
    }
    if (appointment.clinicId !== invoice.clinicId) {
      addIssue(errors, "clinicId", "does not match the linked appointment");
    }
  }

  return result(errors);
}

export function validateEmployee(
  employee: Employee,
  context: ValidationContext = {},
): ValidationResult {
  const errors: ValidationIssue[] = [];

  addRequiredText(employee.id, "id", errors);
  addRequiredText(employee.firstName, "firstName", errors);
  addRequiredText(employee.lastName, "lastName", errors);
  addEmailIssue(employee.email, "email", errors);
  addRequiredText(employee.clinicId, "clinicId", errors);
  addRequiredText(employee.department, "department", errors);
  addRequiredText(employee.role, "role", errors);
  addDateIssue(employee.hireDate, "hireDate", "date", errors);
  if (!isOneOf(employee.status, employmentStatuses)) {
    addIssue(errors, "status", "is not an allowed employment status");
  }
  addReferenceIssue(employee.clinicId, "clinicId", context.clinics, errors);

  return result(errors);
}

export function validateTrainingRecord(
  training: TrainingRecord,
  context: ValidationContext = {},
): ValidationResult {
  const errors: ValidationIssue[] = [];

  addRequiredText(training.id, "id", errors);
  addRequiredText(training.employeeId, "employeeId", errors);
  addRequiredText(training.courseName, "courseName", errors);
  if (!isFiniteNonNegative(training.trainingHours)) {
    addIssue(errors, "trainingHours", "must be a finite non-negative number");
  }
  addDateIssue(training.completedAt, "completedAt", "date", errors, true);
  addDateIssue(training.expiresAt, "expiresAt", "date", errors, true);
  if (
    isValidDateOnly(training.completedAt) &&
    isValidDateOnly(training.expiresAt) &&
    training.expiresAt < training.completedAt
  ) {
    addIssue(errors, "expiresAt", "cannot be earlier than completedAt");
  }
  if (!isOneOf(training.status, trainingStatuses)) {
    addIssue(errors, "status", "is not an allowed training status");
  }
  addReferenceIssue(training.employeeId, "employeeId", context.employees, errors);

  return result(errors);
}

export function validateDataAccessLog(
  log: DataAccessLog,
  context: ValidationContext = {},
): ValidationResult {
  const errors: ValidationIssue[] = [];

  addRequiredText(log.id, "id", errors);
  addRequiredText(log.employeeId, "employeeId", errors);
  if (log.patientId !== undefined) {
    addRequiredText(log.patientId, "patientId", errors);
    addReferenceIssue(log.patientId, "patientId", context.patients, errors);
  }
  if (!isOneOf(log.action, accessActions)) {
    addIssue(errors, "action", "is not an allowed access action");
  }
  addRequiredText(log.resourceType, "resourceType", errors);
  addRequiredText(log.resourceId, "resourceId", errors);
  addDateIssue(log.timestamp, "timestamp", "timestamp", errors);
  if (typeof log.authorized !== "boolean") {
    addIssue(errors, "authorized", "must be a boolean");
  }
  addReferenceIssue(log.employeeId, "employeeId", context.employees, errors);

  return result(errors);
}