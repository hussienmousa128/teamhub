import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { StorageService } from '../storage/storage.service';
import { STORAGE_KEYS } from '../storage/storage.keys';

type LoginRequest = {
  username: string,
  password: string,
  expiresInMins?: number
}

type LoginResponse = {
  accessToken: string,
  refreshToken: string
}


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

}
