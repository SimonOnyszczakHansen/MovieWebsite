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
  media: any;
  mediaId!: number
  mediaType!: string;
  trailerUrl: string = '';
  cast: any[] = []

  constructor(private tmdbService: TmdbService, private route: ActivatedRoute, private router: Router, private location: Location) { }

  ngOnInit(): void {
    this.mediaType = this.route.snapshot.paramMap.get('mediaType') || 'movie';
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.mediaId = +id;
      this.getMediaDetails();
      this.getMediaCredits();
      this.getMediaTrailer();
    }
  }

  getMediaDetails() {
    if (this.mediaType === 'movie') {
      this.tmdbService.getMovieDetails(this.mediaId).subscribe(data => {
        this.media = data
      })
    } else {
      this.tmdbService.getTvShowDetails(this.mediaId).subscribe(data => {
        this.media = data
      })
    }
  }

  getMediaTrailer() {
    if (this.mediaType === 'movie') {
      this.tmdbService.getMovieVideos(this.mediaId).subscribe(data => {
        if (data && data.results && data.results.length > 0) {
          const trailer = data.results.find((video: any) =>
            video.type === 'Trailer' && video.site === 'YouTube'
          );
          if (trailer) {
            this.trailerUrl = `https://www.youtube.com/watch?v=${trailer.key}`;
          }
        }
      });
    } else {
      this.tmdbService.getTvShowVideos(this.mediaId).subscribe(data => {
        if (data && data.results && data.results.length > 0) {
          const trailer = data.results.find((video: any) =>
            video.type === 'Trailer' && video.site === 'YouTube'
          );
          if (trailer) {
            this.trailerUrl = `https://www.youtube.com/watch?v=${trailer.key}`
          }
        }
      })
    }
  }

  getMediaCredits() {
    if (this.mediaType === 'movie') {
      this.tmdbService.getMovieCredits(this.mediaId).subscribe(data => {
        this.cast = data.cast
      })
    } else {
      this.tmdbService.getTvShowCredits(this.mediaId).subscribe(data => {
        this.cast = data.cast
      })
    }
  }

  formatRuntime(runtime: number): string {
    const hours = Math.floor(runtime / 60)
    const minutes = runtime % 60;
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  }

  goBack() {
    this.location.back()
  }

  viewFullCast() {
    this.router.navigate([this.mediaType, this.mediaId, this.media.title || this.media.name, 'cast'])
  }

  get title(): string {
    return this.media?.title || this.media?.name || '';
  }

  get releaseDate(): string {
    return this.media?.release_date || this.media?.first_air_date;
  }

  get runtime(): number {
    return this.mediaType === 'movie' ? this.media?.runtime : this.media?.episodes_run_time?.[0] || 0;
  }

  get creators(): string {
    return this.media?.created_by?.map((c: any) => c.name).join(', ')
  }
}
