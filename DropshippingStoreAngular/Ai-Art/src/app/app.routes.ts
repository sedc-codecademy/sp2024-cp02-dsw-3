import { Routes } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { CartComponent } from './cart/cart.component';
import { RegisterComponent } from './register/register.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { authGuard } from './auth.guard';


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
  { path: 'generate-your-art', canActivate: [authGuard],children: [

    {path: '',loadComponent: ()=>
        import('./generate/generate.component').then((c)=>c.GenerateComponent) },
    {path: 'list-for-sale',loadComponent: ()=> import('./generate/components/list-image-form/list-image-form.component').then((c)=>c.ListImageFormComponent)}
]},
  { path: 'contact', component: ContactComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'cart', component: CartComponent },
  {path: 'favorites', loadComponent: ()=>
    import('./favorites/favorites.component').then((c)=>c.FavoritesComponent)
},
  {
    path: 'account',
    component: AccountComponent,
  },
  {path: 'notfound', component: NotFoundComponent },
    {
        path: '**', redirectTo: 'notfound'
    }
];
