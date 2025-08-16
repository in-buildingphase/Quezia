/**
 * Utility functions for user data handling and validation
 */

export interface UserProfileData {
  clerkId: string;
  email: string;
  username: string;
  grade: string;
  dob: string;
  phone: string;
}

/**
 * Validate user profile data
 */
export function validateUserProfile(data: Partial<UserProfileData>): string[] {
  const errors: string[] = [];

  if (!data.email || !isValidEmail(data.email)) {
    errors.push("Valid email is required");
  }

  if (!data.username || data.username.length < 3) {
    errors.push("Username must be at least 3 characters long");
  }

  if (data.phone && !isValidPhone(data.phone)) {
    errors.push("Phone number format is invalid");
  }

  if (data.dob && !isValidDate(data.dob)) {
    errors.push("Date of birth format is invalid");
  }

  return errors;
}

/**
 * Check if email is valid
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Check if phone number is valid (basic validation)
 */
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
}

/**
 * Check if date string is valid
 */
export function isValidDate(dateString: string): boolean {
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date.getTime());
}

/**
 * Format date for display
 */
export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  } catch {
    return dateString;
  }
}

/**
 * Generate a default username from email
 */
export function generateUsernameFromEmail(email: string): string {
  return email.split('@')[0].replace(/[^a-zA-Z0-9]/g, '');
}

/**
 * Sanitize user input
 */
export function sanitizeUserInput(input: string): string {
  return input.trim().replace(/[<>]/g, '');
}
