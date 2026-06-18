import { Component } from '@angular/core';
import { Router, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { TickerComponent } from './components/ticker/ticker';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, TickerComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  mobileMenuOpen = false;
  productsExpanded = false;

  constructor(private router: Router) {}

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
    if (!this.mobileMenuOpen) this.productsExpanded = false;
  }

  closeMobileMenu() {
    this.mobileMenuOpen = false;
    this.productsExpanded = false;
  }

  goToQuote() {
    this.router.navigate(['/home'], { fragment: 'quote-section' }).then(() => {
      setTimeout(() => {
        const el = document.getElementById('quote-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    });
  }

  navigateToProduct(slug: string) {
    this.closeMobileMenu();
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/products', slug]);
    });
  }
}
