import { Component, OnInit } from '@angular/core';
import { TmdbService } from '../../services/tmdb.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [CommonModule, NgIf],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css'
})
export class MovieDetailsComponent implements OnInit {
  movie: any;
  movieId!: number
  trailerUrl: string = '';
  cast: any[] = []

  constructor(private tmdbService: TmdbService, private route: ActivatedRoute, private router: Router, private location: Location) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    if(id) {
      this.movieId = +id
      this.getMovieDetails(this.movieId);
      this.getMovieTrailer(this.movieId);
      this.getMovieCredits(this.movieId)
    }
  }

  getMovieDetails(movieId: number) {
    this.tmdbService.getMovieDetails(movieId).subscribe(data => {
      this.movie = data
    })
  }

  getMovieTrailer(movieId: number) {
    this.tmdbService.getMovieVideos(movieId).subscribe(data => {
      if (data && data.results && data.results.length > 0) {
        const trailer = data.results.find((video: any) =>
          video.type === 'Trailer' && video.site === 'YouTube'
        );
        if (trailer) {
          this.trailerUrl = `https://www.youtube.com/watch?v=${trailer.key}`;
        }
      }
    });
  }

  getMovieCredits(movieId: number) {
    this.tmdbService.getMovieCredits(movieId).subscribe(data => {
      this.cast = data.cast
    })
  }

  formatRuntime(runtime: number): string {
    const hours = Math.floor(runtime / 60)
    const minutes = runtime % 60;
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  }

  goBack() {
    this.location.back()
  }

  viewFullCast(movieId: number, movieTitle: string) {
    this.router.navigate(['/movie', movieId, movieTitle, 'cast'])
  }
}
