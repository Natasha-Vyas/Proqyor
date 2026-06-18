import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:9000';

@Injectable({ providedIn: 'root' })
export class MedusaService {
  constructor(private http: HttpClient) {}

  // Products
  getProducts(params?: { limit?: number; offset?: number; category_id?: string }) {
    return this.http.get<any>(`${API_URL}/store/products`, { params: params as any });
  }

  getProduct(id: string) {
    return this.http.get<any>(`${API_URL}/store/products/${id}`);
  }

  getCategories() {
    return this.http.get<any>(`${API_URL}/store/product-categories`);
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
    return this.http.post(`${API_URL}/store/quotes`, data);
  }

  // File upload
  uploadFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('files', file);
    return this.http.post(`${API_URL}/store/uploads`, formData);
  }
}
