import { Injectable } from '@angular/core';
import { StorageKey } from './storage.keys';




@Injectable({
  providedIn: 'root',
})
export class StorageService {

get(key: StorageKey):string | null{
 return localStorage.getItem(key);
}
set(key:StorageKey , value:string):void{
    localStorage.setItem(key , value);
}
remove(key:StorageKey):void{
  localStorage.removeItem(key);
}
clear():void{
  localStorage.clear();
}
}
