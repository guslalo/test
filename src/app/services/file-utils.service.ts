import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FileUtilsService {
  constructor() {}

  async getBase64(file: Blob) {
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
    // first we use encodeURIComponent to get percent-encoded UTF-8,
    // then we convert the percent encodings into raw bytes which
    // can be fed into btoa.
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
        function toSolidBytes(match, p1) {
            
            return String.fromCharCode(('0x' + p1) as unknown as number);
        }));
  }
}
