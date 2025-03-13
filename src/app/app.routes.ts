import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { FullCastComponent } from './full-cast/full-cast.component';
import { MoviesComponent } from './movies/movies.component';
import { PersonDetailsComponent } from './person-details/person-details.component';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomepageComponent},
    {path: 'person/:id/:name', component: PersonDetailsComponent},
    {path: ':mediaType/:id/:title', component: MovieDetailsComponent},
    {path: ':mediaType/:id/:title/cast', component: FullCastComponent},
    {path: 'movies', component: MoviesComponent},
];