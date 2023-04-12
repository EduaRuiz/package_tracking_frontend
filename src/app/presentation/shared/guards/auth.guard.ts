// // Libraries
// import { Injectable } from '@angular/core';
// import { CanActivate, CanLoad, Router } from '@angular/router';
// import { Observable } from 'rxjs';
// import { tap } from 'rxjs/operators';

// //Services
// import { PackageTrackingDelegate } from 'src/app/application';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthGuard implements CanActivate, CanLoad {
//   constructor(
//     private readonly delegate: PackageTrackingDelegate,
//     private readonly router: Router
//   ) {
//     this.delegate.toRefreshToken();
//   }

//   canActivate(): Observable<boolean> | boolean {
//     return this.delegate.execute<boolean>().pipe(
//       tap((valid) => {
//         !valid ?? localStorage.removeItem('access_token'),
//           this.router.navigate(['index']);
//       })
//     );
//   }

//   canLoad(): Observable<boolean> | boolean {
//     return this.delegate.execute<boolean>().pipe(
//       tap((valid) => {
//         !valid ?? localStorage.removeItem('access_token'),
//           this.router.navigate(['index']);
//       })
//     );
//   }
// }
