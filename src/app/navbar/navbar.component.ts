import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { TmdbService } from '../../services/tmdb.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

interface SearchResult {
  id: number;
  media_type: 'movie' | 'tv' | 'person';
  title?: string;
  name?: string;
  poster_path?: string;
  profile_path?: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  searchQuery: string = '';
  searchResults: any[] = [];
  showResults: boolean = false;
  isMobileMenuOpen: boolean = false;
  private routerSub!: Subscription

  constructor(private router: Router, private tmdbService: TmdbService) {
    this.routerSub = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.searchQuery = '';
        this.searchResults = [];
        this.showResults = false;
      }
    })
  }

  ngOnDestroy() {
    this.routerSub.unsubscribe();
  }

  onSearchInput() {
    if (this.searchQuery.length > 2) {
      this.tmdbService.searchMulti(this.searchQuery).subscribe({
        next: (response: any) => {
          this.searchResults = response.results
            .filter((item: SearchResult) => ['movie', 'tv', 'person'].includes(item.media_type))
            .slice(0, 5);
          this.showResults = true;
        },
        error: (err) => console.error('Search error:', err)
      });
    } else {
      this.searchResults = [];
      this.showResults = false;
    }
  }

  navigateToResult(result: SearchResult) {
    this.showResults = false;
    this.searchResults = [];
    this.searchQuery = '';

    setTimeout(() => {
      switch (result.media_type) {
        case 'movie':
          this.router.navigate(['movie', result.id, result.title]);
          break;
        case 'tv':
          this.router.navigate(['tv', result.id, result.name]);
          break;
        case 'person':
          this.router.navigate(['person', result.id, result.name]);
          break;
      }
    }, 50);
  }

  closeSearchResults() {
    this.showResults = false;
  }

  goToHome() {
    this.router.navigate(['/home'])
    this.closeMobileMenu()
  }

  goToMovies() {
    this.router.navigate(['/movies'])
    this.closeMobileMenu()
  }

  goToTVSeries() {
    this.router.navigate(['/tv'])
    this.closeMobileMenu()
  }

  goToGenres() {
    this.closeMobileMenu()
  }

  goToActors() {
    this.closeMobileMenu()
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
  }
}