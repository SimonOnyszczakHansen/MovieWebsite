import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
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

  constructor(private moviesService: MoviesService, private router: Router) {}

  ngOnInit(): void {
    this.getMoviesDiscover()
  }

  getMoviesDiscover() {
    this.moviesService.getMoviesDiscover(this.pageNumber).subscribe(data => {
      this.movies = data.results
    })
  }

  goToDetails(movie: any) {
    this.router.navigate(['/movie', movie.id, movie.title])
  }

  showMore() {
    this.pageNumber += 1;
    this.moviesService.getMoviesDiscover(this.pageNumber).subscribe(data => {
      this.movies = [...this.movies, ...data.results]
    });
  }
}
