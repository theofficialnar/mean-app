import { Routes, RouterModule } from "@angular/router";

import { SignupComponent } from "./signup.component";
import { SigninComponent } from "./signin.component";
import { LogoutComponent } from "./logout.component";
import { AuthGuard } from "./auth.guard";

const AUTH_ROUTES: Routes = [
  { path: '', redirectTo: 'signup', pathMatch: 'full'},
  { path: 'signup', component: SignupComponent, canActivate: [AuthGuard]},
  { path: 'signin', component: SigninComponent},
  { path: 'logout', component: LogoutComponent}
];

// exported using .forChild to only be valid under Authentication tab
export const authRouting = RouterModule.forChild(AUTH_ROUTES);