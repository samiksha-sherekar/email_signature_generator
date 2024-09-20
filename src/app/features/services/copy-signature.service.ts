import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CopySignatureService {

  constructor() { }
  
  copyToClip(elementId: string): void {
    let str: any = document.getElementById(elementId);
    str = str?.innerHTML;

    if (str) {
      function listener(e: ClipboardEvent) {
        e.clipboardData?.setData("text/html", str);
        e.clipboardData?.setData("text/plain", str);
        e.preventDefault();
      }
      document.addEventListener("copy", listener);
      document.execCommand("copy");
      document.removeEventListener("copy", listener);
      
    } else {
      alert("An unexpected error occurred. Please try again later.");
    }
  }
}
