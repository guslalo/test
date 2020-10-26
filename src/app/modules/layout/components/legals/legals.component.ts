import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ClinicService } from 'src/app/services/clinic.service';

@Component({
  selector: 'app-legals',
  templateUrl: './legals.component.html',
  styleUrls: ['./legals.component.scss']
})
export class LegalsComponent implements OnInit {
  public content: string;
  public trustedContent: SafeHtml;
  public clinic:string;
  private term: string;
  constructor(private sanitizer: DomSanitizer, private clinicService:ClinicService, private router: Router) { }

  ngOnInit(): void {
    if(this.router.url == '/terms-and-conditions') this.term = 'use-term'
    else if(this.router.url == '/privacy') this.term = 'privacy-term'
    else if(this.router.url == '/consent') this.term = 'telemedicine-consent'
    this.clinic = '5f236fc966fbb0054894b780';
    this.clinicService.getPoliticas(this.clinic,this.term).subscribe(
        data => {
          this.content = decodeURIComponent(escape(atob(data.payload.content)))
          this.trustedContent = this.sanitizer.bypassSecurityTrustHtml(this.content)
        },
        error => {
          console.log(error)
        }
      )
  }

}
