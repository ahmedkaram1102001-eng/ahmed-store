// // src/app/pages/login/login.component.js

// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { AuthService } from '../../services/auth.service';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent {
  
//   loginForm;
//   loading = false;
//   submitted = false;
//   errorMessage = '';
//   showPassword = false;
  
//   constructor(formBuilder, authService, router) {
//     this.formBuilder = formBuilder;
//     this.authService = authService;
//     this.router = router;
//   }
  
//   ngOnInit() {
//     // تحقق إذا المستخدم مسجل دخول
//     if (this.authService.isLoggedIn()) {
//       this.router.navigate(['/dashboard']);
//     }
    
//     // إنشاء الفورم
//     this.loginForm = this.formBuilder.group({
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', [Validators.required, Validators.minLength(6)]],
//       rememberMe: [false]
//     });
//   }
  
//   // Getter للـ Form Controls
//   get f() {
//     return this.loginForm.controls;
//   }
  
//   // تسجيل الدخول
//   onSubmit() {
//     var self = this;
//     self.submitted = true;
//     self.errorMessage = '';
    
//     // التحقق من الفورم
//     if (self.loginForm.invalid) {
//       return;
//     }
    
//     self.loading = true;
    
//     var credentials = {
//       email: self.f.email.value,
//       password: self.f.password.value
//     };
    
//     self.authService.login(credentials).subscribe({
//       next: function(response) {
//         if (response.success) {
//           console.log('تم تسجيل الدخول بنجاح');
//           self.router.navigate(['/dashboard']);
//         } else {
//           self.errorMessage = response.message || 'خطأ في تسجيل الدخول';
//           self.loading = false;
//         }
//       },
//       error: function(error) {
//         console.error('خطأ:', error);
        
//         if (error.status === 401) {
//           self.errorMessage = 'البريد الإلكتروني أو كلمة المرور غير صحيحة';
//         } else if (error.status === 0) {
//           self.errorMessage = 'فشل الاتصال بالسيرفر';
//         } else {
//           self.errorMessage = (error.error && error.error.message) || 'حدث خطأ. حاول مرة أخرى';
//         }
        
//         self.loading = false;
//       },
//       complete: function() {
//         self.loading = false;
//       }
//     });
//   }
  
//   // إظهار/إخفاء كلمة المرور
//   togglePassword() {
//     this.showPassword = !this.showPassword;
//   }
// }

// // src/app/guards/auth.guard.js

// import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';
// import { AuthService } from '../services/auth.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuard {
  
//   constructor(authService, router) {
//     this.authService = authService;
//     this.router = router;
//   }
  
//   canActivate(route, state) {
//     if (this.authService.isLoggedIn()) {
//       return true;
//     }
    
//     this.router.navigate(['/login'], {
//       queryParams: { returnUrl: state.url }
//     });
//     return false;
//   }
// }
// // src/app/pages/dashboard/dashboard.component.js

// import { Component, OnInit } from '@angular/core';
// import { AuthService } from '../../services/auth.service';

// @Component({
//   selector: 'app-dashboard',
//   template: `
//     <div class="dashboard">
//       <header>
//         <h1>لوحة التحكم</h1>
//         <div class="user-info">
//           <span>مرحباً، {{ user?.name }}</span>
//           <button (click)="logout()" class="btn-logout">
//             تسجيل الخروج
//           </button>
//         </div>
//       </header>
      
//       <div class="content">
//         <h2>مرحباً بك في التطبيق!</h2>
//         <p>البريد الإلكتروني: {{ user?.email }}</p>
//       </div>
//     </div>
//   `,
//   styles: [`
//     .dashboard { padding: 20px; }
//     header {
//       display: flex;
//       justify-content: space-between;
//       align-items: center;
//       padding: 20px;
//       background: white;
//       border-radius: 10px;
//       box-shadow: 0 2px 10px rgba(0,0,0,0.1);
//       margin-bottom: 20px;
//     }
//     .user-info { display: flex; align-items: center; gap: 15px; }
//     .btn-logout {
//       padding: 8px 16px;
//       background: #dc3545;
//       color: white;
//       border: none;
//       border-radius: 6px;
//       cursor: pointer;
//     }
//     .btn-logout:hover { background: #c82333; }
//     .content {
//       background: white;
//       padding: 30px;
//       border-radius: 10px;
//       box-shadow: 0 2px 10px rgba(0,0,0,0.1);
//     }
//   `]
// })
// export class DashboardComponent {
  
//   user = null;
  
//   constructor(authService) {
//     this.authService = authService;
//   }
  
//   ngOnInit() {
//     this.user = this.authService.getCurrentUser();
//   }
  
//   logout() {
//     this.authService.logout();
//   }
// }
// // src/app/interceptors/auth.interceptor.js

// import { Injectable } from '@angular/core';
// import { AuthService } from '../services/auth.service';

// @Injectable()
// export class AuthInterceptor {
  
//   constructor(authService) {
//     this.authService = authService;
//   }
  
//   intercept(request, next) {
//     // الحصول على التوكن
//     var token = this.authService.getToken();
    
//     // إضافة التوكن
//     if (token) {
//       request = request.clone({
//         setHeaders: {
//           Authorization: 'Bearer ' + token
//         }
//       });
//     }
    
//     return next.handle(request);
//   }
// }
// // src/app/app.module.js

// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// import { AppRoutingModule } from './app-routing.module';
// import { AppComponent } from './app.component';
// import { LoginComponent } from './pages/login/login.component';
// import { DashboardComponent } from './pages/dashboard/dashboard.component';
// import { AuthInterceptor } from './interceptors/auth.interceptor';

// @NgModule({
//   declarations: [
//     AppComponent,
//     LoginComponent,
//     DashboardComponent
//   ],
//   imports: [
//     BrowserModule,
//     AppRoutingModule,
//     HttpClientModule,
//     ReactiveFormsModule,
//     FormsModule
//   ],
//   providers: [
//     {
//       provide: HTTP_INTERCEPTORS,
//       useClass: AuthInterceptor,
//       multi: true
//     }
//   ],
//   bootstrap: [AppComponent]
// })
// export class AppModule { }
// // src/app/app-routing.module.js

// import { NgModule } from '@angular/core';
// import { RouterModule } from '@angular/router';
// import { LoginComponent } from './pages/login/login.component';
// import { DashboardComponent } from './pages/dashboard/dashboard.component';
// import { AuthGuard } from './guards/auth.guard';

// var routes = [
//   { path: '', redirectTo: '/login', pathMatch: 'full' },
//   { path: 'login', component: LoginComponent },
//   { 
//     path: 'dashboard', 
//     component: DashboardComponent,
//     canActivate: [AuthGuard]
//   },
//   { path: '**', redirectTo: '/login' }
// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }
// // login.js (Vanilla JavaScript)

// // عناصر الصفحة
// var loginForm = document.getElementById('loginForm');
// var emailInput = document.getElementById('email');
// var passwordInput = document.getElementById('password');
// var errorDiv = document.getElementById('error');
// var loadingDiv = document.getElementById('loading');

// // دالة تسجيل الدخول
// loginForm.addEventListener('submit', function(e) {
//   e.preventDefault();
  
//   // إخفاء رسائل الخطأ
//   errorDiv.style.display = 'none';
//   loadingDiv.style.display = 'block';
  
//   var email = emailInput.value;
//   var password = passwordInput.value;
  
//   // Validation
//   if (!email || !password) {
//     errorDiv.textContent = 'الرجاء ملء جميع الحقول';
//     errorDiv.style.display = 'block';
//     loadingDiv.style.display = 'none';
//     return;
//   }
  
//   // إرسال البيانات للـ API
//   fetch('https://your-api.com/api/login', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       email: email,
//       password: password
//     })
//   })
//   .then(function(response) {
//     return response.json();
//   })
//   .then(function(data) {
//     loadingDiv.style.display = 'none';
    
//     if (data.success) {
//       // حفظ التوكن
//       localStorage.setItem('token', data.token);
//       localStorage.setItem('user', JSON.stringify(data.user));
      
//       // التوجيه للداشبورد
//       window.location.href = '/dashboard.html';
//     } else {
//       errorDiv.textContent = data.message || 'خطأ في تسجيل الدخول';
//       errorDiv.style.display = 'block';
//     }
//   })
//   .catch(function(error) {
//     loadingDiv.style.display = 'none';
//     errorDiv.textContent = 'حدث خطأ. حاول مرة أخرى';
//     errorDiv.style.display = 'block';
//     console.error('Error:', error);
//   });
// });

// // دالة تسجيل الخروج
// function logout() {
//   localStorage.removeItem('token');
//   localStorage.removeItem('user');
//   window.location.href = '/login.html';
// }

// // التحقق من تسجيل الدخول
// function isLoggedIn() {
//   return !!localStorage.getItem('token');
// }

// // الحصول على المستخدم الحالي
// function getCurrentUser() {
//   var userStr = localStorage.getItem('user');
//   return userStr ? JSON.parse(userStr) : null;
// }