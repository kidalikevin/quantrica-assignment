import { Component, OnInit } from '@angular/core';
import { FileUpload } from '../models/upload';
import { UploadServiceService } from '../services/upload-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-productupload',
  templateUrl: './productupload.component.html',
  styleUrls: ['./productupload.component.css']
})
export class ProductuploadComponent implements OnInit {
  selectedFiles: FileList;

  currentFileUpload: FileUpload;

  progress: { percentage: number } = { percentage: 0 };

  productDetails = {
    productName: null,
    productPrice: null,
    productSaleDate: null,
    productColor: null,
    productInStock: null
  };

  constructor(public uploadService: UploadServiceService, private activateroute: ActivatedRoute) {
  }

  ngOnInit() {}

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  upload() {
    const file = this.selectedFiles.item(0);
    this.currentFileUpload = new FileUpload(file);

    this.uploadService.pushFileToStorage(
      'uploading',
      null,
      this.currentFileUpload,
      this.productDetails,
      this.progress
    );
  }
}
