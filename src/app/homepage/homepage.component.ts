import { Component, OnInit } from '@angular/core';
import { TmdbService } from '../../services/tmdb.service';
import { NgFor, CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule, NgFor, HttpClientModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent implements OnInit {
  movies: any[] = [];

  constructor(private tmdbService: TmdbService) { }

  ngOnInit(): void {
    this.getTrendingMovies();
  }

  getPopularMovies() {
    this.tmdbService.getPopularMovies().subscribe(
      (data: any) => {
        this.movies = data.results;
        console.log(this.movies);
      }
    )
  }

  getTrendingMovies() {
    this.tmdbService.getTrendingMovies().subscribe(
      (data: any) => {
        this.movies = data.results;
        console.log(this.movies);
      }
    )
  }
}
