import { object, string } from 'zod';

export const emailRequiredSchema = object({
  body: object({
    email: string({
      required_error: 'Email is required',
    }).email('Email must be a valid email address'),
  })
});

export const emailLoginSchema = object({
  body: object({
    email: string({
      required_error: 'Email is required',
    }).email('Email must be a valid email address'),
    password: string({
      required_error: 'Password is required',
    }).min(8, 'Password must be at least 8 characters'),
  })
});

export const updatePasswordSchema = object({
  body: object({
    password: string({
      required_error: 'Password is required',
    }).min(8, 'Password must be at least 8 characters'),
    confirmPassword: string({
      required_error: 'Confirm Password is required',
    }).min(8, 'Password must be at least 8 characters'),
  }).refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  }),
});

export const verifyEmailSchema = object({
  body: object({
    email: string({
      required_error: 'Email is required',
    }).email('Not a valid Email'),
    code: string({
      required_error: 'Verification Code is required',
    }).min(6, 'Verification code must be at least 5 characters long'),
  }),
});

export const userUpdateFields = ['email', 'emailVerified', 'phone', 'phoneVerified', 'phoneData', 'registeredVia', 'username', 'gender', 'roles', 'firstname', 'lastname', 'displayname', 'dob', 'tos', 'version', 'deletedAt'];
export const userCreateFields = ['userId', ...userUpdateFields];
export const superAdminRoles = ['SUPER_ADMIN'];
export const adminRoles = ['ADMIN', ...superAdminRoles];
export const systemRoles = ['SYSTEM', ...adminRoles];
export const supportRoles = ['SUPPORT', ...systemRoles];
export const contentModerationRoles = ['MODERATOR', 'MODERATION', ...supportRoles];
export const disputeResolutionRoles = ['JURY', 'JUDGE', ...contentModerationRoles];
export const agentRoles = ['SCOUT', 'AGENT', ...contentModerationRoles];
export const allRoles = Array.from(new Set(['USER', ...agentRoles, ...disputeResolutionRoles]));

export const userAccountSettingsCategories = {
  FOLLOWING: 'FOLLOWING',
  NOTIFICATIONS: 'NOTIFICATIONS',
  PRIVACY: 'PRIVACY',
  SECURITY: 'SECURITY',
  ACCOUNT: 'ACCOUNT',
};

export const userAccountSettingsFields = {
  FOLLOWING: ['following'],
};
