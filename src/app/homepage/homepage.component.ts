import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { TmdbService } from '../../services/tmdb.service';
import { NgFor, CommonModule } from '@angular/common';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule, NgFor],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
})
export class HomepageComponent implements OnInit, AfterViewInit {
  @ViewChild('movieContainer') movieContainer!: ElementRef;
  @ViewChild('firstMovieCard') firstMovieCard!: ElementRef;
  scrollAmount = 0;
  movies: any[] = [];
  isDayView: boolean = true;

  constructor(private tmdbService: TmdbService) {}

  ngOnInit(): void {
    this.getTrendingMovies();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.calculateScrollAmount();
    }, 0);
  }

  getTrendingMovies() {
    this.tmdbService.getTrendingMovies().subscribe((data: any) => {
      this.movies = data.results;
      console.log('Movies:', this.movies);
      setTimeout(() => {
        this.calculateScrollAmount();
      }, 0);
    });
  }

  calculateScrollAmount() {
    if (this.firstMovieCard?.nativeElement && this.movieContainer?.nativeElement) {
      const cardWidth = this.firstMovieCard.nativeElement.offsetWidth;
      const gap = 20;
      const cardsToScroll = 6;
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
  }
}
