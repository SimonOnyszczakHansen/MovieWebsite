import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { TmdbService } from '../../services/tmdb.service';
import { MoviesService } from '../../services/movies.service';
import { TvSeriesComponent } from '../tv-series/tv-series.component';
import { NgFor, CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TruncatePipe } from '../../shared/pipes/truncate.pipe';
import { TvService } from '../../services/tv.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule, NgFor, TruncatePipe],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
})
export class HomepageComponent implements OnInit, AfterViewInit {
  @ViewChild('trendingContentContainer') trendingContentContainer!: HTMLElement;
  @ViewChild('topRatedMoviesContainer') topRatedMoviesContainer!: HTMLElement;
  @ViewChild('topRatedTvContainer') topRatedTvContainer!: HTMLElement;
  @ViewChild('firstMovieCard') firstMovieCard!: HTMLElement;
  scrollAmount = 0;
  heroContent: any = {}
  isDayView: boolean = true;
  trendingContent: any[] = [];
  topRatedMovies: any[] = [];
  topRatedTv: any[] = [];


  constructor(private tmdbService: TmdbService, private router: Router, private moviesService: MoviesService, private tvService: TvService) { }

  ngOnInit(): void {
    this.getHeroContent();
    this.getTrendingContent();
    this.getTopRatedMovies();
    this.getTopRatedTv();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.scrollAmount = this.calculateScrollAmount(this.trendingContentContainer)
    }, 0);
  }

  getTrendingContent() {
    const timeWindow = this.isDayView ? 'week' : 'day';
    this.tmdbService.getTrendingContent(timeWindow).subscribe({
      next: (res) => this.trendingContent = res.results,
      error: (err) => console.error(err)
    })
  }

  getTopRatedMovies() {
    this.moviesService.getTopRatedMovies().subscribe({
      next: (res) => this.topRatedMovies = res.results,
      error: (err) => console.error(err)
    })
  }

  getTopRatedTv() {
    this.tvService.getTopRatedTv().subscribe({
      next: (res) => this.topRatedTv = res.results,
      error: (err) => console.error(err)
    })
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
      this.scrollAmount = this.calculateScrollAmount(this.trendingContentContainer)
    }, 0);
  }

  calculateScrollAmount(container: HTMLElement): number{
    const firstCard = container.querySelector('.movie-card');
    if (firstCard) {
      const cardWidth = firstCard.getBoundingClientRect().width;
      const gap = 22;
      const cardsToScroll = 5;
      return (cardWidth + gap) * cardsToScroll;
    }
    return 0;
  }

  scrollLeft(container: HTMLElement) {
    const scrollAmount = this.calculateScrollAmount(container)
    container.scrollBy({
      left: -scrollAmount,
      behavior: 'smooth'
    });
  }

  scrollRight(container: HTMLElement) {
    const scrollAmount = this.calculateScrollAmount(container)
    container.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
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

  goToMovieDetails(movie: any) {
    this.router.navigate(['/movie', movie.id, movie.title])
  }

  goToTvDetails(tv: any) {
    this.router.navigate(['/tv', tv.id, tv.name])
  }
}