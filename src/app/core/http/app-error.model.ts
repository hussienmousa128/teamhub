export type AppErrorType = 'network' | 'unauthorized' | 'server' | 'unknown';
export interface AppError { type: AppErrorType; message: string; status?: number; original?: unknown; }
