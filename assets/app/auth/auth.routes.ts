import { Routes } from "@angular/router";
import { SignupComponent } from "./signup.component";
import { SigninComponent } from "./signin.component";
import { LogoutComponent } from "./logout.component";
import { AuthGuard } from "./auth.guard";

// export the array to be used as childroutes
export const AUTH_ROUTES: Routes = [
  { path: '', redirectTo: 'signup', pathMatch: 'full'},
  { path: 'signup', component: SignupComponent, canActivate: [AuthGuard]},
  { path: 'signin', component: SigninComponent},
  { path: 'logout', component: LogoutComponent}
];