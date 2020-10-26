import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FileUtilsService {
  constructor() {}

  async getBase64(file: Blob) {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.readAsArrayBuffer(file)
      reader.onload =  ()=> {
        resolve(reader.result);
      };
      reader.onerror = function (err) {
        reject(err);
      };
    });
  }
  async getBase64Docs(file: Blob){
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.readAsText(file)
      reader.onload =  ()=> {
        let res = this.encodeUnicode(reader.result)
        resolve(res);
      };
      reader.onerror = function (err) {
        reject(err);
      };
    });
  }
  encodeUnicode(str) {
    return btoa(unescape(encodeURIComponent(str)));
  }
}
