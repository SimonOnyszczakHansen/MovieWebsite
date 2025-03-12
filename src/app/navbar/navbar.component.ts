import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  searchQuery: string = '';
  isMobileMenuOpen: boolean = false;

  constructor(private router: Router) { }

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
