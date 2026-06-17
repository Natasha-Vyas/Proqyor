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
  constructor(private router: Router) {}

  goToQuote() {
    this.router.navigate(['/home'], { fragment: 'quote-section' }).then(() => {
      setTimeout(() => {
        const el = document.getElementById('quote-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    });
  }
}
