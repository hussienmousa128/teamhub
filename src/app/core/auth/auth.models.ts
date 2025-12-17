export type LoginRequest = {
  username: string;
  password: string;
  expiresInMins?: number;
};

export type AuthUserBasic = {
  id: number;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  gender?: string;
  image?: string;

  // /auth/me بيرجع حقول إضافية، فبنسمح بأي حقول ثانية بدون ما نكسر التايبس
  [key: string]: unknown;
};

export type LoginResponse = AuthUserBasic & {
  accessToken: string;
  refreshToken: string;
};

export type MeResponse = AuthUserBasic;

export type RefreshRequest = {
  refreshToken: string;
  expiresInMins?: number;
};

export type RefreshResponse = {
  accessToken: string;
  refreshToken: string;
};

// (اختياري) نخليها جاهزة للخطوات القادمة
export type AuthErrorType = 'network' | 'invalid' | 'server' | 'unknown';

export type AuthError = {
  type: AuthErrorType;
  message: string;
  status?: number;
  original?: unknown;
};
