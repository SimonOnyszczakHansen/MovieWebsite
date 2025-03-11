import { Component, OnInit } from '@angular/core';
import { TmdbService } from '../../services/tmdb.service';
import { NgFor } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-full-cast',
  standalone: true,
  imports: [NgFor],
  templateUrl: './full-cast.component.html',
  styleUrl: './full-cast.component.css'
})
export class FullCastComponent implements OnInit {
  cast: any[] = []
  movie: any;
  movieId!: number;

  constructor(private tmdbService: TmdbService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    if (id) {
      this.movieId = +id
      this.getMovieCredits(this.movieId)
    }
  }

  getMovieCredits(movieId: number) {
    this.tmdbService.getMovieCredits(movieId).subscribe(data => {
      this.cast = data.cast
    })
  }

  getMovieDetails(movieId: number) {
    this.tmdbService.getMovieDetails(movieId).subscribe(data => {
      this.movie = data
    })
  }
}
