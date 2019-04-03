import { Component, OnInit } from '@angular/core';
import { FileUpload, FileData } from 'src/app/models/upload';
import { UploadServiceService } from 'src/app/services/upload-service.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-singlproduct',
  templateUrl: './singlproduct.component.html',
  styleUrls: ['./singlproduct.component.css']
})
export class SinglproductComponent implements OnInit {
  selectedFiles: FileList;

  currentFileUpload: FileUpload;

  progress: { percentage: number } = { percentage: 0 };

  productDetails: FileData = new FileData();
  id: string;

  constructor(
    private uploadService: UploadServiceService,
    private activateroute: ActivatedRoute,
    private route: Router,
    private fireApi: FirebaseService) {
    this.id = this.activateroute.snapshot.params.id;
  }

  ngOnInit() {
    this.getData();
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
    this.updateImage();
  }

  update() {
    this.fireApi.updateProduct(this.productDetails.key, this.productDetails);
  }

  updateImage() {
    const file = this.selectedFiles.item(0);
    this.currentFileUpload = new FileUpload(file);

    this.uploadService.pushFileToStorage(
      'updating',
      this.productDetails.key,
      this.currentFileUpload,
      this.productDetails,
      this.progress
    );
  }

  getData() {
    this.fireApi
      .getSingleProduct(this.id)
      .snapshotChanges()
      .map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      })
      .subscribe(resp => {
        this.productDetails = resp[0];
      });
  }

  deleteProduct(key: string, filename: string) {
    this.uploadService.deleteFileData(key);
    this.uploadService.deleteFileStorage(filename);
    this.route.navigate(['dashboard']);
  }
}
