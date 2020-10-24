import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Params } from '@angular/router';
import { ClinicService } from 'src/app/services/clinic.service';

@Component({
  selector: 'app-legals',
  templateUrl: './legals.component.html',
  styleUrls: ['./legals.component.scss']
})
export class LegalsComponent implements OnInit {
  public content: string;
  public trustedContent: SafeHtml;
  constructor(private sanitizer: DomSanitizer, private route: ActivatedRoute, private clinicService:ClinicService) { }

  ngOnInit(): void {
    this.clinicService.getPoliticas(this.route.snapshot.params.clinicId,this.route.snapshot.params.term ).subscribe(
        data => {
          console.log(data.payload.content)
          this.content = atob(data.payload.content)
          console.log(this.content)
          this.trustedContent = this.sanitizer.bypassSecurityTrustHtml(this.content)
        },
        error => {
          console.log(error)
        }
      )
  }

}
