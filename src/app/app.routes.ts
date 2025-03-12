import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { FullCastComponent } from './full-cast/full-cast.component';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomepageComponent},
    {path: ':mediaType/:id/:title', component: MovieDetailsComponent},
    {path: ':mediaType/:id/:title/cast', component: FullCastComponent}
];
