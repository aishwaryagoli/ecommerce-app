import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  productName: string = '';
  message: string = '';

  apiUrl =
    'https://ecom-function-app-a8g4bpgfhbfxdxep.southindia-01.azurewebsites.net/api/ProcessOrder';

  constructor(private http: HttpClient) {}

  placeOrder() {
    if (!this.productName.trim()) {
      this.message = '⚠️ Please enter a product name';
      return;
    }

    const order = {
      product: this.productName,
      date: new Date().toISOString()
    };

    this.http.post<any>(this.apiUrl, order).subscribe({
      next: (res) => {
        this.message = `✅ ${res.message}`;
        this.productName = '';
      },
      error: (err) => {
        console.error(err);
        this.message = '❌ Failed to place order';
      }
    });
  }
}
