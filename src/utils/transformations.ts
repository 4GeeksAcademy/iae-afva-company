import type {
  Appointment,
  AppointmentStatus,
  ClaimStatus,
  Clinic,
  Country,
  Currency,
  InsuranceClaim,
} from "../types/models";

export function count<T>(items: readonly T[]): number {
  return items.length;
}

export function sum<T>(
  items: readonly T[],
  valueSelector: (item: T) => number,
): number {
  return items.reduce((total, item) => total + valueSelector(item), 0);
}

export function average<T>(
  items: readonly T[],
  valueSelector: (item: T) => number,
): number | null {
  return items.length === 0 ? null : sum(items, valueSelector) / items.length;
}

export function min<T>(
  items: readonly T[],
  valueSelector: (item: T) => number,
): number | null {
  if (items.length === 0) {
    return null;
  }

  return items.reduce(
    (minimum, item) => Math.min(minimum, valueSelector(item)),
    Number.POSITIVE_INFINITY,
  );
}

export function max<T>(
  items: readonly T[],
  valueSelector: (item: T) => number,
): number | null {
  if (items.length === 0) {
    return null;
  }

  return items.reduce(
    (maximum, item) => Math.max(maximum, valueSelector(item)),
    Number.NEGATIVE_INFINITY,
  );
}

/** Calculates no-shows / (completed + no-shows) * 100. */
export function noShowRate(appointments: readonly Appointment[]): number | null {
  const eligible = appointments.filter(
    (appointment) =>
      appointment.status === "completed" || appointment.status === "no_show",
  );

  if (eligible.length === 0) {
    return null;
  }

  const noShows = eligible.filter(
    (appointment) => appointment.status === "no_show",
  ).length;

  return (noShows / eligible.length) * 100;
}

/** Calculates rejected / (approved + rejected + paid) * 100. */
export function claimRejectionRate(
  claims: readonly InsuranceClaim[],
): number | null {
  const eligibleStatuses: readonly ClaimStatus[] = [
    "approved",
    "rejected",
    "paid",
  ];
  const eligible = claims.filter((claim) =>
    eligibleStatuses.includes(claim.status),
  );

  if (eligible.length === 0) {
    return null;
  }

  const rejected = eligible.filter((claim) => claim.status === "rejected").length;
  return (rejected / eligible.length) * 100;
}

export interface ClinicAppointmentActivity {
  clinicId: string;
  country?: Country;
  total: number;
  byStatus: Partial<Record<AppointmentStatus, number>>;
}

/** Counts all appointments by clinic and includes per-status counts. */
export function summarizeAppointmentsByClinic(
  appointments: readonly Appointment[],
  clinics: readonly Clinic[],
): ClinicAppointmentActivity[] {
  const clinicCountries = new Map(
    clinics.map((clinic) => [clinic.id, clinic.country]),
  );
  const activities = new Map<string, ClinicAppointmentActivity>();

  for (const appointment of appointments) {
    let activity = activities.get(appointment.clinicId);

    if (!activity) {
      activity = {
        clinicId: appointment.clinicId,
        country: clinicCountries.get(appointment.clinicId),
        total: 0,
        byStatus: {},
      };
      activities.set(appointment.clinicId, activity);
    }

    activity.total += 1;
    activity.byStatus[appointment.status] =
      (activity.byStatus[appointment.status] ?? 0) + 1;
  }

  return Array.from(activities.values());
}

/** Groups all appointments by the country of their referenced clinic. */
export function countAppointmentsByCountry(
  appointments: readonly Appointment[],
  clinics: readonly Clinic[],
): Map<Country, number> {
  const clinicCountries = new Map(
    clinics.map((clinic) => [clinic.id, clinic.country]),
  );
  const counts = new Map<Country, number>();

  for (const appointment of appointments) {
    const country = clinicCountries.get(appointment.clinicId);

    if (country) {
      counts.set(country, (counts.get(country) ?? 0) + 1);
    }
  }

  return counts;
}

export function countAppointmentsByStatus(
  appointments: readonly Appointment[],
): Map<AppointmentStatus, number> {
  const counts = new Map<AppointmentStatus, number>();

  for (const appointment of appointments) {
    counts.set(
      appointment.status,
      (counts.get(appointment.status) ?? 0) + 1,
    );
  }

  return counts;
}

/** Keeps monetary totals separate; it does not convert or combine currencies. */
export interface MonetaryTotal {
  amount: number;
  currency: Currency;
}

type MonetaryItem = MonetaryTotal;

export function sumByCurrency<T extends MonetaryItem>(
  items: readonly T[],
): Map<Currency, number> {
  const totals = new Map<Currency, number>();

  for (const item of items) {
    totals.set(item.currency, (totals.get(item.currency) ?? 0) + item.amount);
  }

  return totals;
}

/** Sums a single currency and rejects mixed-currency inputs. */
export function sumMonetaryAmounts<T extends MonetaryItem>(
  items: readonly T[],
): MonetaryTotal | null {
  if (items.length === 0) {
    return null;
  }

  const currency = items[0].currency;
  if (items.some((item) => item.currency !== currency)) {
    throw new RangeError(
      "Cannot sum different currencies without explicit conversion",
    );
  }

  return { currency, amount: sum(items, (item) => item.amount) };
}

/**
 * Converts using an explicitly supplied rate, expressed as destination units
 * per one source unit. This does not represent a live exchange quote.
 *
 * @param amount Amount in the source currency.
 * @param from Source currency.
 * @param to Destination currency.
 * @param exchangeRate Destination units per source unit; must be finite and > 0.
 * @returns The original amount for matching currencies, otherwise the converted amount.
 * @throws {RangeError} If the exchange rate is missing, non-finite, or not positive.
 */
export function convertCurrency(
  amount: number,
  from: Currency,
  to: Currency,
  exchangeRate: number | undefined,
): number {
  if (
    exchangeRate === undefined ||
    !Number.isFinite(exchangeRate) ||
    exchangeRate <= 0
  ) {
    throw new RangeError("exchangeRate must be a finite number greater than zero");
  }

  return from === to ? amount : amount * exchangeRate;
}