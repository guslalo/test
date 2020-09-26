import { Injectable } from '@angular/core';
import { NgbDateParserFormatter, NgbDateStruct, NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { TranslocoService } from '@ngneat/transloco';

export class NgbCustomDateParserFormatter extends NgbDateParserFormatter {
  constructor(private momentFormat: string) {
    super();
  }

  format(date: NgbDateStruct): string {
    if (date === null) {
      return '';
    }
    const d = moment({ year: date.year, month: date.month - 1, date: date.day });
    return d.isValid() ? d.format(this.momentFormat) : '';
  }

  parse(value: string): NgbDateStruct {
    if (!value) {
      return null;
    }
    const d = moment(value, this.momentFormat);
    return d.isValid() ? { year: d.year(), month: d.month() + 1, day: d.date() } : null;
  }
}

var LANGUAGE: string = '';

const I18N_VALUES = {
  es: {
    weekdays: ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'],
    months: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
  },
  pt: {
    weekdays: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
    months: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
  },
};

@Injectable()
export class CustomDatepickerI18n extends NgbDatepickerI18n {
  constructor(private translocoService: TranslocoService) {
    super();
    LANGUAGE = this.translocoService.getActiveLang();
  }

  getWeekdayShortName(weekday: number): string {
    return I18N_VALUES[LANGUAGE].weekdays[weekday - 1];
  }
  getMonthShortName(month: number): string {
    return I18N_VALUES[LANGUAGE].months[month - 1];
  }
  getMonthFullName(month: number): string {
    return this.getMonthShortName(month);
  }

  getDayAriaLabel(date: NgbDateStruct): string {
    return `${date.day}-${date.month}-${date.year}`;
  }
}
