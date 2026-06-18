import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MedusaService } from '../../services/medusa.service';

@Component({
  selector: 'app-contact',
  imports: [FormsModule, CommonModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class ContactComponent {
  protected contactForm = {
    name: '',
    company: '',
    phone: '',
    category: '',
    message: ''
  };

  protected submitted = false;
  protected submitting = false;
  protected submitError = false;

  constructor(private http: HttpClient, private medusa: MedusaService) {}

  onSubmit() {
    if (this.isFormValid() && !this.submitting) {
      this.submitting = true;

      // Fire-and-forget: Formspark
      this.http.post('https://submit-form.com/1izYfVt9E', {
        name: this.contactForm.name,
        company: this.contactForm.company,
        phone: this.contactForm.phone,
        category: this.contactForm.category,
        message: this.contactForm.message
      }, { headers: { Accept: 'application/json' }, responseType: 'text' as 'json' }).subscribe();

      // Fire-and-forget: Medusa
      this.medusa.submitForm({
        type: 'contact',
        name: this.contactForm.name,
        company: this.contactForm.company,
        phone: this.contactForm.phone,
        category: this.contactForm.category,
        message: this.contactForm.message
      }).subscribe();

      // Show success immediately and clear form
      this.submitting = false;
      this.submitted = true;
      this.submitError = false;
      this.contactForm = { name: '', company: '', phone: '', category: '', message: '' };
      setTimeout(() => this.submitted = false, 4000);
    }
  }

  isFormValid(): boolean {
    return !!(
      this.contactForm.name &&
      this.contactForm.phone &&
      this.contactForm.message
    );
  }

  resetForm() {
    this.contactForm = {
      name: '',
      company: '',
      phone: '',
      category: '',
      message: ''
    };
    this.submitted = false;
  }
}
