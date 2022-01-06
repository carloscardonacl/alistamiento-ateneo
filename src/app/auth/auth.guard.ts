import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { UserService } from "../core/services/user.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private _user: UserService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log("canActive");

    return this._user.validarToken().pipe(
      tap((estaAutenticado) => {
        if (!estaAutenticado) {
          this.router.navigateByUrl("/login");
        }
      })
    );
  }
}
