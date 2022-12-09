import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { JwtDecodeService } from '../services/jwt-decode.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private jwtDecodeService: JwtDecodeService
  ) { }

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {

    const tokenP = async () => {
      const { value } = await Preferences.get({ key: 'token' });
      if (value) {
        const userToken: any = this.jwtDecodeService.decodeToken(value);
        if (!userToken.complete) {
          this.router.navigate(['/edit']);
          return true;
        }
        return true;
      } else {
        this.router.navigate(['/auth']);
        return false;
      }
    };
    return tokenP();
  }


}
