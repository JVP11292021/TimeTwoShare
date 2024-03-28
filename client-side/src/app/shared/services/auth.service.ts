import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ACCESS_TOKEN_STORED_NAME, REFRESH_TOKEN_STORED_NAME } from '../globals';
import { PersistanceStorageService } from './persistance-storage.service';

export type RegisterContext = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: "ADMIN" | "MANAGER" | "USER";
}

export type AuthenticateContext = {
  email: string;
  password: string;
}

export type TokenRetContext = {
  access_token: string;
  refresh_token: string;
  state: "VALID" | "EXPIRED";
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http: HttpClient = inject(HttpClient);
  private storage: PersistanceStorageService = inject(PersistanceStorageService);

  authenticate(authContext: AuthenticateContext, jwtToken: string): Observable<TokenRetContext> {
    return this.http.post<TokenRetContext>(
      'http://localhost:8081/t2s/v1/auth/authenticate',
       authContext,
       {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + jwtToken
        })
       });
  }

  simpleAuthentication(authContext: AuthenticateContext): Observable<TokenRetContext> {
    return this.http.post<TokenRetContext>('http://localhost:8081/t2s/v1/auth/authenticate', authContext);
  }

  refreshAccessToken(refreshToken: string) : Observable<TokenRetContext> {
    return this.http.post<TokenRetContext>(
      'http://localhost:8081/t2s/v1/auth/authenticate',
      {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + refreshToken
      })
    });
  }

  getLatestAccessTokenByEmail(email: string) : Observable<string> {
    return this.http.get<string>(`http://localhost:8081/t2s/v1/auth/${email}`);
  }

  register(registerContext: RegisterContext) : Observable<TokenRetContext> {
    return this.http.post<TokenRetContext>('http://localhost:8081/t2s/v1/auth/register', registerContext);
  }

  checkToken() : boolean {
    return this.storage.hasKey(ACCESS_TOKEN_STORED_NAME) && this.storage.hasKey(REFRESH_TOKEN_STORED_NAME);
  }
}
