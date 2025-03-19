import { Component, OnInit } from '@angular/core';
import { TvService } from '../../services/tv.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tv-series',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tv-series.component.html',
  styleUrl: './tv-series.component.css'
})
export class TvSeriesComponent implements OnInit{
  tvSeries: any[] = [];
  pageNumber = 1;

  constructor(private tvservice: TvService, private router: Router) {}

  ngOnInit(): void {
    this.getTvSeriesDiscover()
  }

  goToDetails(tv: any) {
    this.router.navigate(['/tv', tv.id, tv.name])
  }

  getTvSeriesDiscover() {
    this.tvservice.getTvShowDiscover(this.pageNumber).subscribe(data => {
      this.tvSeries = data.results
    })
  }
}
