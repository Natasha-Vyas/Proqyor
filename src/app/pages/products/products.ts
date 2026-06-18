import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { MedusaService } from '../../services/medusa.service';

interface Product {
  sku: string;
  name: string;
  category: string;
  subcategory: string;
  material: string;
  materialDetail: string;
  grade: string;
  standards: string;
  dimensions: string;
  thickness: string;
  finish: string;
  description: string;
  [key: string]: string;
}

interface SubcategoryGroup {
  name: string;
  products: Product[];
}

interface CategoryGroup {
  name: string;
  products: Product[];
}

interface FamilyData {
  title: string;
  slug: string;
  description: string;
  categories: CategoryGroup[];
}

import { PRODUCT_DATA } from './product-data';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.html',
  styleUrl: './products.scss'
})
export class ProductsComponent implements OnInit, OnDestroy {
  family: FamilyData | null = null;
  activeCategory = '';
  activeSubcategory = '';
  searchQuery = '';
  filteredCategories: CategoryGroup[] = [];
  private routeSub!: Subscription;
  quoteSubmitted = false;
  quoteSubmitting = false;

  constructor(private route: ActivatedRoute, private http: HttpClient, private medusa: MedusaService) {}

  ngOnInit() {
    this.routeSub = this.route.paramMap.subscribe(params => {
      const slug = params.get('family');
      this.family = PRODUCT_DATA.find(f => f.slug === slug) || null;
      if (this.family) {
        this.filteredCategories = this.family.categories;
        this.activeCategory = '';
        this.activeSubcategory = '';
      }
      window.scrollTo({ top: 0 });
    });
  }

  ngOnDestroy() {
    this.routeSub?.unsubscribe();
  }

  filterByCategory(catName: string) {
    if (!this.family) return;
    if (this.activeCategory === catName) {
      this.activeCategory = '';
      this.activeSubcategory = '';
      this.filteredCategories = this.family.categories;
    } else {
      this.activeCategory = catName;
      this.activeSubcategory = '';
      this.filteredCategories = this.family.categories.filter(c => c.name === catName);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  filterBySubcategory(cat: CategoryGroup, subName: string) {
    if (!this.family) return;
    this.activeCategory = cat.name;
    if (this.activeSubcategory === subName) {
      this.activeSubcategory = '';
      this.filteredCategories = this.family.categories.filter(c => c.name === cat.name);
    } else {
      this.activeSubcategory = subName;
      const filtered = cat.products.filter(p => (p.subcategory || 'General') === subName);
      this.filteredCategories = [{ name: cat.name, products: filtered }];
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  get totalProducts(): number {
    return this.family?.categories.reduce((sum, c) => sum + c.products.length, 0) || 0;
  }

  getSubcategories(category: CategoryGroup): SubcategoryGroup[] {
    const map = new Map<string, Product[]>();
    for (const p of category.products) {
      const sub = p.subcategory || 'General';
      if (!map.has(sub)) map.set(sub, []);
      map.get(sub)!.push(p);
    }
    return Array.from(map.entries()).map(([name, products]) => ({ name, products }));
  }

  // Quote popup
  quoteProduct: Product | null = null;
  quoteForm = {
    company: '',
    contactPerson: '',
    phone: '',
    quantity: '',
    notes: ''
  };

  openQuotePopup(product: Product) {
    this.quoteProduct = product;
    document.body.style.overflow = 'hidden';
  }

  closeQuotePopup() {
    this.quoteProduct = null;
    document.body.style.overflow = '';
  }

  submitQuote() {
    if (this.quoteSubmitting) return;
    this.quoteSubmitting = true;

    // Fire-and-forget: Formspark
    this.http.post('https://submit-form.com/1izYfVt9E', {
      _subject: `Quote Request: ${this.quoteProduct?.name}`,
      product: this.quoteProduct?.name,
      sku: this.quoteProduct?.sku,
      company: this.quoteForm.company,
      contactPerson: this.quoteForm.contactPerson,
      phone: this.quoteForm.phone,
      quantity: this.quoteForm.quantity,
      notes: this.quoteForm.notes
    }, { headers: { Accept: 'application/json' }, responseType: 'text' as 'json' }).subscribe();

    // Fire-and-forget: Medusa
    this.medusa.submitForm({
      type: 'product_quote',
      product: this.quoteProduct?.name,
      sku: this.quoteProduct?.sku,
      company: this.quoteForm.company,
      contact_person: this.quoteForm.contactPerson,
      phone: this.quoteForm.phone,
      quantity: this.quoteForm.quantity,
      notes: this.quoteForm.notes
    }).subscribe();

    // Show success immediately
    this.quoteSubmitting = false;
    this.quoteSubmitted = true;
    this.quoteForm = { company: '', contactPerson: '', phone: '', quantity: '', notes: '' };
    setTimeout(() => {
      this.quoteSubmitted = false;
      this.closeQuotePopup();
    }, 3000);
  }
}
