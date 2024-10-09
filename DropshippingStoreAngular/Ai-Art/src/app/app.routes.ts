import { Routes } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { GenerateComponent } from './generate/generate.component';
import { ContactComponent } from './contact/contact.component';
import { CartComponent } from './cart/cart.component';
import { RegisterComponent } from './register/register.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  {path: 'categories',children: [

    {path: '',loadComponent: ()=>
        import('./categories/categories.component').then((c)=>c.CategoriesComponent) },
    {path: 'details/:id',loadComponent: ()=> import('./categories/components/card-details/card-details.component').then((c)=>c.CardDetailsComponent)}
]
},
{path: 'cart', loadComponent: ()=>
    import('./cart/cart.component').then((c)=>c.CartComponent)
},
  { path: 'generate-your-art', component: GenerateComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cart', component: CartComponent },
  {path: 'favorites', loadComponent: ()=>
    import('./favorites/favorites.component').then((c)=>c.FavoritesComponent)
},
{
  path: 'account',
  loadComponent: () => import('./account/account.component').then(m => m.AccountComponent),
  children: [
    { path: 'user-info', loadComponent: () => import('./account/user-info/user-info.component').then(c => c.UserInfoComponent) },
    { path: 'change-info', loadComponent: () => import('./account/change-user-info/change-user-info.component').then(c => c.ChangeUserInfoComponent) },
    { path: 'generated-images', loadComponent: () => import('./account/generated-images/generated-images.component').then(c => c.GeneratedImagesComponent) },
    { path: 'purchased-images', loadComponent: () => import('./account/purchased-images/purchased-images.component').then(c => c.PurchasedImagesComponent) },
    { path: '', redirectTo: 'user-info', pathMatch: 'full' }
  ]
},
  {path: 'notfound', component: NotFoundComponent },
    {
        path: '**', redirectTo: 'notfound'
    }
];
