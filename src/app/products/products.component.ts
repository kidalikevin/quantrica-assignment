import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { FileUpload } from '../models/upload';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: FileUpload[];
  loader = false;
  constructor(private fireApi: FirebaseService, private route: Router) {}

  ngOnInit() {
    this.loader = true;
    this.getData();
  }

  getData() {
    this.fireApi
      .getProducts()
      .snapshotChanges()
      .map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      })
      .subscribe(resp => {
        this.loader = false;
        this.products = resp;
      });
  }

  viewSingleProduct(productId) {
    this.route.navigate(['product', productId]);
  }
}
