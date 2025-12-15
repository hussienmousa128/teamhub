import { Injectable } from '@angular/core';

import { StorageService } from '../storage/storage.service';
import { STORAGE_KEYS} from '../storage/storage.keys';

@Injectable({
  providedIn: 'root',
})
export class AuthStateService {

  constructor(private readonly storage : StorageService){}

 get isLoggedIn() : boolean {
  return !!this.storage.get(STORAGE_KEYS.accessToken);
 }
 logout():void{
  this.storage.remove(STORAGE_KEYS.accessToken);
  this.storage.remove(STORAGE_KEYS.refreshToken);
  this.storage.remove(STORAGE_KEYS.userBasic);
 }
}
