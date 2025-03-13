import { Component, OnInit } from '@angular/core';
import { TmdbService } from '../../services/tmdb.service';
import { CommonModule, NgFor } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [CommonModule, NgFor],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css'
})
export class MoviesComponent implements OnInit {
  movies: any[] = []
  pageNumber: number = 1;

  constructor(private tmdbService: TmdbService, private router: Router) {}

  ngOnInit(): void {
    this.getMoviesDiscover()
  }

  getMoviesDiscover() {
    this.tmdbService.getMoviesDiscover(this.pageNumber).subscribe(data => {
      this.movies = data.results
    })
  }

  goToDetails(movie: any) {
    this.router.navigate(['/movie', movie.id, movie.title])
  }

  showMore() {
    this.pageNumber += 1;
    this.tmdbService.getMoviesDiscover(this.pageNumber).subscribe(data => {
      this.movies = [...this.movies, ...data.results]
    });
  }
}
