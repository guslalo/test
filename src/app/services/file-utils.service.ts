import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileUtilsService {

  constructor() { }

  async getBase64(file: Blob) {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.readAsDataURL(file)
      reader.onload = function () {
        resolve(reader.result);
      }
      reader.onerror = function (err) {
        reject(err);
      }
    })
  }
}
