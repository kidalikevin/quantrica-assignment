export class FileUpload {
  key?: string;
  FileUrl: any;
  productName: string;
  productPrice: String;
  productColor: string;
  productInStock: any;
  productSaleDate: any;
  fileName: string;
  file: File;
  progress: number;
  dated: any;
  createdAt: Date = new Date();

  constructor(file: File) {
    this.file = file;
  }
}

export class FileData {
  key?: string;
  FileUrl: any;
  productName: string;
  productPrice: String;
  productColor: string;
  productInStock: any;
  productSaleDate: any;
  fileName: string;
  file: File;
  progress: number;
  dated: any;
  createdAt: Date = new Date();
}
