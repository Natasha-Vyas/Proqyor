import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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

  onSubmit() {
    if (this.isFormValid()) {
      console.log('Form submitted:', this.contactForm);
      this.submitted = true;

      setTimeout(() => {
        this.resetForm();
      }, 3000);
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
