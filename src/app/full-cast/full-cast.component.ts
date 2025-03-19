import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { TvService } from '../../services/tv.service';
import { NgFor, Location, NgIf} from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-full-cast',
  standalone: true,
  imports: [NgFor],
  templateUrl: './full-cast.component.html',
  styleUrl: './full-cast.component.css'
})
export class FullCastComponent implements OnInit {
  cast: any[] = []
  media: any;
  mediaId!: number;
  mediaType!: string;

  constructor(private tvService: TvService, private MoviesService: MoviesService, private route: ActivatedRoute, private location: Location, private router: Router) { }

  ngOnInit(): void {
    this.mediaType = this.route.snapshot.paramMap.get('mediaType') || 'movie';
    const id = this.route.snapshot.paramMap.get('id')
    if (id) {
      this.mediaId = +id
      this.getMediaCredits()
      this.getMediaDetails()
    }
  }

  getMediaCredits() {
    if (this.mediaType === 'movie') {
      this.MoviesService.getMovieCredits(this.mediaId).subscribe(data => {
        this.cast = data.cast
      })
    } else {
      this.tvService.getTvShowCredits(this.mediaId).subscribe(data => {
        this.cast = data.cast
      })
    }
  }

  getMediaDetails() {
    if (this.mediaType === 'movie') {
      this.MoviesService.getMovieDetails(this.mediaId).subscribe(data => {
        this.media = data
      })
    } else {
      this.tvService.getTvShowDetails(this.mediaId).subscribe(data => {
        this.media = data
      })
    }
  }

  goToActorPage(actorId: number, actorName: string) {
    this.router.navigate(['/person', actorId, actorName])
  }

  goBack() {
    this.location.back()
  }
}
