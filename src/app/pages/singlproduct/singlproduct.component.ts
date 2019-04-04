import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FileUpload, FileData } from 'src/app/models/upload';
import { UploadServiceService } from 'src/app/services/upload-service.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/operator/map';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-singlproduct',
  templateUrl: './singlproduct.component.html',
  styleUrls: ['./singlproduct.component.css']
})
export class SinglproductComponent implements OnInit {
  @ViewChild('inputFile') myInputVariable: ElementRef;
  selectedFiles: FileList;

  currentFileUpload: FileUpload;

  progress: { percentage: number } = { percentage: 0 };

  productDetails: FileData = new FileData();
  id: string;
  private readonly notifier: NotifierService;

  constructor(
    private uploadService: UploadServiceService,
    private activateroute: ActivatedRoute,
    private route: Router,
    notifierService: NotifierService,
    private fireApi: FirebaseService) {
    this.id = this.activateroute.snapshot.params.id;
    this.notifier = notifierService;
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
    this.notifier.notify('success', 'Information updated successfully!');
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

    //   this.myInputVariable.nativeElement.value = '';
    //   this.notifier.notify( 'success', 'Information updated successfully!' );

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
