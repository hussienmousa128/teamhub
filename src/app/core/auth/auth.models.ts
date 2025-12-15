export type LoginRequest = {
  username: string,
  password: string,
  expiresInMins?: number
}

export type LoginResponse = {
  accessToken: string,
  refreshToken: string
}

export type MeResponse = {
  id       : number,
  username : string,
  email    : string
}
export type RefreshRequest = {
  refreshToken: string,
  expiresInMins?: number
}
export type RefreshResponse = {
  accessToken: string,
  refreshToken: string
}
