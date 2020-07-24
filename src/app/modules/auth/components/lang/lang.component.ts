import { Component, OnInit } from '@angular/core';
//translate
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-lang',
  templateUrl: './lang.component.html',
  styleUrls: ['./lang.component.scss']
})
export class LangComponent implements OnInit {

  constructor(public translocoService: TranslocoService) { }

  ngOnInit(): void {
  
  }
  setActiveLang(lang: string) {
    this.translocoService.setActiveLang(lang);
  }


}
