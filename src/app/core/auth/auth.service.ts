import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { StorageService } from '../storage/storage.service';
import { STORAGE_KEYS } from '../storage/storage.keys';
import type { LoginRequest, LoginResponse, MeResponse, RefreshResponse, RegisterRequest } from './auth.models';


@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiBaseUrl;
  private readonly storage = inject(StorageService);

  login(payload : LoginRequest) : Observable<LoginResponse>{

    const url = `${this.baseUrl}/auth/login`;
    return this.http.post<LoginResponse>(url ,payload).pipe(
    tap((res)=>{
      this.storage.set(STORAGE_KEYS.accessToken, res.accessToken);
      this.storage.set(STORAGE_KEYS.refreshToken, res.refreshToken);
    })
    );
  }
  me():Observable<MeResponse>{
    const url = `${this.baseUrl}/auth/me`;
    return this.http.get<MeResponse>(url).pipe(
      tap((me)=> this.storage.set(STORAGE_KEYS.userBasic,JSON.stringify(me))
      )
    );
  }
  refresh() : Observable<RefreshResponse>{
    const refreshToken = this.storage.get(STORAGE_KEYS.refreshToken);
    const urlR = `${this.baseUrl}/auth/refresh`;
    if(!refreshToken){
      return throwError(() => new Error('No refresh token'));
    }
    return this.http.post<RefreshResponse>(urlR , {refreshToken}).pipe(
      tap((res)=>{
        this.storage.set(STORAGE_KEYS.accessToken, res.accessToken);
        this.storage.set(STORAGE_KEYS.refreshToken, res.refreshToken);
      })
    )
  }
  registerUser(payload: RegisterRequest) : Observable<RefreshResponse>{
    const url = `${this.baseUrl}/auth/register`;
    return this.http.post<RefreshResponse>(url ,payload).pipe(
      tap((res)=>{
        this.storage.set(STORAGE_KEYS.accessToken, res.accessToken);
        this.storage.set(STORAGE_KEYS.refreshToken, res.refreshToken);
      })
    )
  }
}
