import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase';
import { FileUpload } from '../models/upload';

@Injectable({
  providedIn: 'root'
})
export class UploadServiceService {

  constructor(private db: AngularFireDatabase) { }

  private basePath = '/cars';

  pushFileToStorage(
    uploadType,
    key,
    fileUpload: FileUpload,
    productDetais,
    progress: { percentage: number }
  ) {
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef
      .child(`${this.basePath}/${fileUpload.file.name}`)
      .put(fileUpload.file);

    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      snapshot => {
        // File upload indicator
        const snap = snapshot as firebase.storage.UploadTaskSnapshot;
        progress.percentage = Math.round(
          (snap.bytesTransferred / snap.totalBytes) * 100
        );
      },
      error => {
        // fail
        console.log(error);
      },
      () => {

        // success
        fileUpload.FileUrl = uploadTask.snapshot.downloadURL;
        fileUpload.fileName = fileUpload.file.name;
        fileUpload.productName = productDetais.productName;
        fileUpload.productPrice = productDetais.productPrice;
        fileUpload.productColor = productDetais.productColor;
        fileUpload.productSaleDate = productDetais.productSaleDate;
        fileUpload.productInStock = productDetais.productInStock;
        fileUpload.dated = new Date().toUTCString();
        this.saveFileData(fileUpload, uploadType, key);
      }
    );
  }

  private saveFileData(fileUpload: FileUpload, uploadType: string, key: string) {
    if (uploadType === 'updating') {
      this.db.list(`${this.basePath}`)
      .update(key, fileUpload)
      .catch(error => console.log(error));
    } else {
      this.db.list(`${this.basePath}`).push(fileUpload);
    }
  }

  deleteFileData(key: string) {
    return this.db.list(`${this.basePath}/`).remove(key);
  }

  deleteFileStorage(name: string) {
    const storageRef = firebase.storage().ref();
    storageRef.child(`${this.basePath}/${name}`).delete();
  }
}
