import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PersistanceStorageService {

  constructor() { }

  saveData<TData>(key: string, data: TData): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  getData(key: string): any | null {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  removeData(key: string): void {
    localStorage.removeItem(key);
  }

  clearStorage(): void {
    localStorage.clear();
  }

  hasKey(key: string): boolean {
    return localStorage.getItem(key) !== null;
  }
}
