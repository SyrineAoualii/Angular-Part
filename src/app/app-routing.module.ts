import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AdminComponent } from './pages/admin/admin.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { UnauthorizesComponent } from './pages/unauthorizes/unauthorizes.component';
import { HomeComponent } from './pages/home/home.component';
//import { AuthGuard } from './guards/auth.guard';
import { Role } from './models/role.enum';
import { AminCourseComponent } from './amin-course/amin-course.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ToastComponent } from './pages/toast/toast.component';
import { AchatComponent } from './pages/achat/achat.component';
import { TestComponent } from './pages/test/test.component';
import { TsComponent } from './pages/ts/ts.component';


const routes: Routes = [
  {path:'',component:HomeComponent,children:[
    {path:'',component:LayoutComponent},
    {path:'signup',component:SignupComponent},
    {path:'login',component:LoginComponent},
  ] 
},
{path:'profile',component:ProfileComponent},
{path:'toast',component:ToastComponent},
{path:'achat',component:AchatComponent},
{path:'test',component:TestComponent},
{path:'ts',component:TsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor(private router: Router) {
    this.router.errorHandler = (error: any) => {
      this.router.navigate(['/404']);
    };
  }
}
