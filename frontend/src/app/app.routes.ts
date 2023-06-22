import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { ModuleWithProviders } from '@angular/core';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './login/signup.component';
import { LopdLawComponent } from './lopdlaw/lopd-law.component';
import { CookieLawComponent } from './cookieslaw/cookie-law.component';
import { CartComponent } from './cart/cart.component';
import { ProductsCrudComponent } from './product/products-crud/products-crud.component';
import { ProductEditComponent } from './product/products-crud/product-edit/product-edit.component';
import { ProductCreateComponent } from './product/products-crud/product-create/product-create.component';
import { UserAreaComponent } from './user/user-area/user-area.component';
import { AuthGuard } from './auth.guard';
import { AuthAdminGuard } from './auth-admin.guard';
import { AuthNoLoginGuard } from './auth-no-login.guard';
import { SendInstructionsRecoverPassComponent } from './login/send-instructions-recover-pass.component';
import { ResetPassComponent } from './login/reset-pass.component';
import { InvoiceComponent } from './user/user-area/invoice.component';
import { DeliveryPolicyComponent } from './delivery-policy/delivery-policy.component';
import { UserShowComponent } from './user/user-area/user-show.component';
import { UserCreateComponent } from './user/user-area/user-create.component';
import { ProductsByCategoryComponent } from './products-by-category/products-by-category.component';
import { GuestAddressComponent } from './cart/paypal/guest-address.component';


const appRoutes: Routes = [
  { path: '', redirectTo: 'en/home', pathMatch: 'full' },
  { path: ':lang/home', component: HomeComponent },
  { path: ':lang/contact', component: ContactComponent },
  { path: ':lang/product/:id', component: ProductDetailComponent },
  { path: ':lang/about', component: AboutComponent },
  { path: ':lang/login', component: LoginComponent, canActivate: [AuthNoLoginGuard] },
  { path: ':lang/signup', component: SignupComponent, canActivate: [AuthNoLoginGuard] },
  { path: ':lang/cart', component: CartComponent },
  { path: ':lang/politica-de-privacidad', component: LopdLawComponent },
  { path: ':lang/politica-de-cookies', component: CookieLawComponent },
  { path: ':lang/politica-de-entregas', component: DeliveryPolicyComponent },
  { path: ':lang/products-admin', component: ProductsCrudComponent, canActivate: [AuthGuard, AuthAdminGuard] },
  { path: ':lang/products-edit/:id', component: ProductEditComponent, canActivate: [AuthGuard, AuthAdminGuard] },
  { path: ':lang/products-create', component: ProductCreateComponent, canActivate: [AuthGuard, AuthAdminGuard]  },
  { path: ':lang/user-area', component: UserAreaComponent, canActivate: [AuthGuard] },
  { path: ':lang/send-recover-pass', component: SendInstructionsRecoverPassComponent },
  { path: ':lang/resetpassword/:code', component: ResetPassComponent },
  { path: ':lang/invoice/:id', component: InvoiceComponent },
  { path: ':lang/user-show/:id', component: UserShowComponent },
  { path: ':lang/user-create', component: UserCreateComponent },
  // { path: ':lang/products/:category', component: ProductsByCategoryComponent },
  { path: ':lang/guest-address', component: GuestAddressComponent },
  { path: ':lang/products', component: ProductListComponent },
  { path: ':lang/products/:category', component: ProductListComponent },

];

export const routes: ModuleWithProviders = RouterModule.forRoot(appRoutes);
