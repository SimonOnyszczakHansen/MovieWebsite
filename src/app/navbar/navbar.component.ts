import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TmdbService } from '../../services/tmdb.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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

  constructor(private router: Router, private tmdbService: TmdbService) { }

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
    this.searchQuery = '';

    switch(result.media_type) {
      case 'movie':
        this.router.navigate(['/movie', result.id, result.title]);
        break;
      case 'tv':
        this.router.navigate(['/tv', result.id, result.name]);
        break;
      case 'person':
        this.router.navigate(['/actor', result.id, result.name]);
        break;
    }
  }

  closeSearchResults() {
    this.showResults = false;
  }

  goToHome() {
    this.router.navigate(['/home'])
    this.closeMobileMenu()
  }

  goToMovies() {
    this.closeMobileMenu()
  }

  goToTVSeries() {
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

  onSearch() {

  }
}
