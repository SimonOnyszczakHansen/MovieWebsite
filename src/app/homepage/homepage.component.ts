import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { TmdbService } from '../../services/tmdb.service';
import { NgFor, CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TruncatePipe } from '../../shared/pipes/truncate.pipe';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule, NgFor, TruncatePipe],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
})
export class HomepageComponent implements OnInit, AfterViewInit {
  @ViewChild('movieContainer') movieContainer!: ElementRef;
  @ViewChild('firstMovieCard') firstMovieCard!: ElementRef;
  scrollAmount = 0;
  combinedContent: any[] = [];
  heroContent: any = {}
  isDayView: boolean = true;

  constructor(private tmdbService: TmdbService, private router: Router) { }

  ngOnInit(): void {
    this.getTrendingContent();
    this.getHeroContent();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.calculateScrollAmount();
    }, 0);
  }

  getTrendingContent() {
    const timeWindow = this.isDayView ? 'week' : 'day';
    this.tmdbService.getTrendingContent(timeWindow).subscribe(movies => {
      this.combinedContent = [...movies.results]
        .sort((a, b) => b.popularity - a.popularity);
      this.updateView();
    });
  }

  getHeroContent() {
    this.tmdbService.getTrendingContent('day').subscribe(movies => {
      const results = movies.results.sort((a: any, b: any) => b.popularity - a.popularity);
      const randomIndex = Math.floor(Math.random() * Math.min(5, results.length));
      this.heroContent = results[randomIndex] || {};
    });
  }

  updateView() {
    setTimeout(() => {
      this.calculateScrollAmount();
    }, 0);
  }

  calculateScrollAmount() {
    if (this.firstMovieCard?.nativeElement && this.movieContainer?.nativeElement) {
      const cardWidth = this.firstMovieCard.nativeElement.offsetWidth;
      const gap = 22;
      const cardsToScroll = 5;
      this.scrollAmount = (cardWidth + gap) * cardsToScroll;
    }
  }

  scrollLeft() {
    if (this.movieContainer?.nativeElement) {
      this.movieContainer.nativeElement.scrollBy({
        left: -this.scrollAmount,
        behavior: 'smooth'
      });
    }
  }

  scrollRight() {
    if (this.movieContainer?.nativeElement) {
      this.movieContainer.nativeElement.scrollBy({
        left: this.scrollAmount,
        behavior: 'smooth'
      });
    }
  }

  toggleView() {
    this.isDayView = !this.isDayView;
    this.getTrendingContent();
  }

  goToDetails(item: any) {
    const route = item.media_type === 'movie' ? '/movie' : '/tv';
    const title = item.title || item.name;
    this.router.navigate([route, item.id, title]);
  }
}