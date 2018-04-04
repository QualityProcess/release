import {Injectable} from '@angular/core';

// Application specific configuration 
@Injectable()
export class SecretService {
  public get adalConfig(): any {
    return {
      tenant: 'atomiconium.onmicrosoft.com',
      clientId: 'ee2ec70a-88b0-4a5d-8ae2-e924d65965f9',
      redirectUri: window.location.origin + '/',
      postLogoutRedirectUri: window.location.origin + '/'
    };
  }
}
