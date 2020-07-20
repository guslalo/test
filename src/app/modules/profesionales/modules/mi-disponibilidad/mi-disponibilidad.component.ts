import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import { Element } from '@angular/compiler';


@Component({
  selector: 'app-mi-disponibilidad',
  templateUrl: './mi-disponibilidad.component.html',
  styleUrls: ['./mi-disponibilidad.component.scss']
})
export class MiDisponibilidadComponent implements OnInit {
  options: any;

  calendar:boolean;
  constructor(private elementRef:ElementRef) { }

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    //dateClick: this.handleDateClick.bind(this), // bind is important!
    events: [
      { title: 'event 1', date: '2020-07-21' },
      { title: 'event 2', date: '2020-07-20' }
    ]
  };
  ngAfterViewInit() {
    
      
  }

  initCalendar(){
    setTimeout (() => {
      this.calendar = true;
   }, 200);
  
  }

  ngOnInit(): void {
    
    this.calendar = false;
    
  }
 
  

}
