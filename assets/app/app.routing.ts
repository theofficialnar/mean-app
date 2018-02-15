import { Routes, RouterModule } from '@angular/router';
import { MessagesComponent } from './messages/messages.component';
import { AuthenticationComponent } from './auth/authentication.component';
import { AUTH_ROUTES } from './auth/auth.routes';

//expect an array of routes
const APP_ROUTES: Routes = [
  // pathMatch: 'full' -> tells angular to only redirect when nothing else is on the url
  { path: '', redirectTo: '/messages', pathMatch: 'full' },
  { path: 'messages', component: MessagesComponent},
  
  // use children to add nested routes
  { path: 'auth', component: AuthenticationComponent, children: AUTH_ROUTES }
];

// Register created route to the built-in angular router module
// assign to a constant so that the newly added route will be exported properly on app.module
export const routing = RouterModule.forRoot(APP_ROUTES);