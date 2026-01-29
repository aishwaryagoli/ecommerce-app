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

  // later this will be Azure Function URL
  apiUrl = 'https://example.azurewebsites.net/api/orders';

  constructor(private http: HttpClient) {}

  placeOrder() {
    const order = {
      product: this.productName,
      date: new Date()
    };

    this.http.post(this.apiUrl, order).subscribe({
      next: () => {
        this.message = '✅ Order placed successfully!';
        this.productName = '';
      },
      error: () => {
        this.message = '❌ Failed to place order';
      }
    });
  }
}
