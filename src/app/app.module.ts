import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AdminComponent } from './pages/admin/admin.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { UnauthorizesComponent } from './pages/unauthorizes/unauthorizes.component';
import { HomeComponent } from './pages/home/home.component';
import {HttpClientModule} from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CourseSaveComponent } from './components/course-save/course-save.component';
import { CourseDeleteComponent } from './components/course-delete/course-delete.component';
import { authInterceptorProviders } from './interceptors/auth.interceptor';
import { AminCourseComponent } from './amin-course/amin-course.component';

import { LayoutComponent } from './pages/layout/layout.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { FooterComponent } from './pages/footer/footer.component';

import { ToastrModule } from 'ngx-toastr';
import { SignupComponent } from './pages/signup/signup.component';
import { ToastComponent } from './pages/toast/toast.component';
import { AchatComponent } from './pages/achat/achat.component';
import { TestComponent } from './pages/test/test.component';
import { TsComponent } from './pages/ts/ts.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    AdminComponent,
    NotFoundComponent,
    UnauthorizesComponent,
    HomeComponent,
    CourseSaveComponent,
    CourseDeleteComponent,
    AminCourseComponent,

    LayoutComponent,
    NavbarComponent,
    FooterComponent,
    SignupComponent,
    ToastComponent,
    AchatComponent,
    TestComponent,
    TsComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot()
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
