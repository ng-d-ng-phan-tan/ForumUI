import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    // Thực hiện kiểm tra xem người dùng đã đăng ký hay chưa
    const isUserLoggedIn = false; // Thay đổi thành kiểm tra xem người dùng đã đăng ký hay chưa

    if (isUserLoggedIn) {
      return true;
    } else {
      return this.router.parseUrl('/auth/login'); // Đẩy người dùng về trang đăng nhập nếu chưa đăng ký
    }
  }
}
