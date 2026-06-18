import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:9000';
const API_KEY = 'pk_6014714fc48f7807b4d2170add5cd45f26e9a34604f22baa3e062596ca952e97';

@Injectable({ providedIn: 'root' })
export class MedusaService {
  private headers = { 'x-publishable-api-key': API_KEY };

  constructor(private http: HttpClient) {}

  // Products
  getProducts(params?: { limit?: number; offset?: number; category_id?: string }) {
    return this.http.get<any>(`${API_URL}/store/products`, { params: params as any, headers: this.headers });
  }

  getProduct(id: string) {
    return this.http.get<any>(`${API_URL}/store/products/${id}`, { headers: this.headers });
  }

  getCategories() {
    return this.http.get<any>(`${API_URL}/store/product-categories`, { headers: this.headers });
  }

  // Quotes (custom)
  submitQuote(data: {
    company_name: string;
    contact_person: string;
    phone: string;
    document_type: string;
    file_urls?: string[];
    notes?: string;
  }): Observable<any> {
    return this.http.post(`${API_URL}/store/quotes`, data, { headers: this.headers });
  }

  // Submissions
  submitForm(data: {
    type: 'contact' | 'product_quote' | 'document';
    name?: string;
    company?: string;
    contact_person?: string;
    phone?: string;
    category?: string;
    message?: string;
    product?: string;
    sku?: string;
    quantity?: string;
    document_type?: string;
    files?: string;
    notes?: string;
  }): Observable<any> {
    return this.http.post(`${API_URL}/store/submissions`, data, { headers: this.headers });
  }

  // File upload
  uploadFiles(files: File[]): Observable<any> {
    const formData = new FormData();
    files.forEach(f => formData.append('files', f));
    return this.http.post(`${API_URL}/store/uploads`, formData, {
      headers: { 'x-publishable-api-key': API_KEY }
    });
  }
}
