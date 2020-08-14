import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  public model: any;
  constructor() { }

  ngOnInit(): void {
  }

}
