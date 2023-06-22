import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AboutComponent } from './about/about.component';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { CartComponent } from './cart/cart.component';
import { ContactFormComponent } from './contact/contact-form.component';
import { ContactMainContentComponent } from './contact/contact-main-content.component';
import { ContactComponent } from './contact/contact.component';
import { CookieLawComponent } from './cookieslaw/cookie-law.component';
import { CarouselComponent } from './home/carousel.component';
import { HomeComponent } from './home/home.component';
import { MainContentComponent } from './home/main-content.component';
import { FooterComponent } from './layout/footer.component';
import { NavbarComponent } from './layout/navbar.component';
import { LopdLawComponent } from './lopdlaw/lopd-law.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { FilterComponent } from './product/product-list/filter.component';
import { GalleryProductComponent } from './product/product-list/gallery-product.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { SortComponent } from './product/product-list/sort.component';
import { ProductService } from './services/product.service';
import { UserService } from './services/user.service';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './login/signup.component';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxPayPalModule } from 'ngx-paypal';
import { PaypalComponent } from './cart/paypal/paypal.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslationComponent } from './translation/translation.component';
import { HttpModule } from '@angular/http';
import { SignupErrorComponent } from './login/signup-error.component';
import { SignupSuccessComponent } from './login/signup-success.component';
import { ProductsCrudComponent } from './product/products-crud/products-crud.component';
import { ProductCreateComponent } from './product/products-crud/product-create/product-create.component';
import { ProductEditComponent } from './product/products-crud/product-edit/product-edit.component';
import { AddProductButtonComponent } from './product/products-crud/add-product-button/add-product-button.component';
import { SearchComponentComponent } from './product/product-list/search-component.component';
import { UserAreaComponent } from './user/user-area/user-area.component';
import { UserDataComponent } from './user/user-area/user-data.component';
import { UserOrderComponent } from './user/user-area/user-order.component';
import { SignupIncompleteComponent } from './login/signup-incomplete.component';
import { SendInstructionsRecoverPassComponent } from './login/send-instructions-recover-pass.component';
import { ResetPassComponent } from './login/reset-pass.component';
import { ResetPassSendOkComponent } from './login/reset-pass-send-ok.component';
import { ResetPassSuccessComponent } from './login/reset-pass-success.component';
import { InvoiceComponent } from './user/user-area/invoice.component';
import { AppGlobals } from './app.global';
import { OrderService } from './services/order.service';
import { MailService } from './services/mail.service';
import { FileUploadService } from './services/file-upload.service';
import { DeliveryPolicyComponent } from './delivery-policy/delivery-policy.component';
import { UsersManagementComponent } from './user/user-area/users-management.component';
import { UserShowComponent } from './user/user-area/user-show.component';
import { UserCreateComponent } from './user/user-area/user-create.component';
import { StockManagementComponent } from './user/user-area/stock-management.component';
import { ProductsByCategoryComponent } from './products-by-category/products-by-category.component';
import { GalleryComponent } from './products-by-category/gallery.component';
import { SortCategoryComponent } from './products-by-category/sort.component';
import { FilterCategoryComponent } from './products-by-category/filter.component';
import { ProductsHomeComponent } from './user/user-area/products-home.component';
import { GuestAddressComponent } from './cart/paypal/guest-address.component';
import { CategoriesHomeComponent } from './user/user-area/categories-home.component';
import { CookieService } from 'ngx-cookie-service';


registerLocaleData(localeEs);


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ProductListComponent,
    ProductDetailComponent,
    ContactComponent,
    AboutComponent,
    FooterComponent,
    CarouselComponent,
    MainContentComponent,
    LoginComponent,
    SignupComponent,
    ContactFormComponent,
    ContactMainContentComponent,
    FilterComponent,
    SortComponent,
    GalleryProductComponent,
    CookieLawComponent,
    LopdLawComponent,
    CartComponent,
    SortComponent,
    PaypalComponent,
    TranslationComponent,
    SignupErrorComponent,
    SignupSuccessComponent,
    ProductsCrudComponent,
    ProductCreateComponent,
    ProductEditComponent,
    AddProductButtonComponent,
    SearchComponentComponent,
    UserAreaComponent,
    UserDataComponent,
    UserOrderComponent,
    SignupIncompleteComponent,
    SendInstructionsRecoverPassComponent,
    ResetPassComponent,
    ResetPassSendOkComponent,
    ResetPassSuccessComponent,
    InvoiceComponent,
    DeliveryPolicyComponent,
    UsersManagementComponent,
    UserShowComponent,
    UserCreateComponent,
    StockManagementComponent,
    UserService,
    ProductService,
    OrderService,
    MailService,
    FileUploadService,
    ProductsByCategoryComponent,
    GalleryComponent,
    SortCategoryComponent,
    FilterCategoryComponent,
    ProductsHomeComponent,
    GuestAddressComponent,
    CategoriesHomeComponent,
  ],
  imports: [
    routes,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    NgxPaginationModule,
    NgxPayPalModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => {
          return new TranslateHttpLoader(http);
        },
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    AppGlobals,
    ProductService,
    OrderService,
    MailService,
    FileUploadService,
    CookieService,
    UserService,
    { provide: LOCALE_ID, useValue: 'es-ES' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
