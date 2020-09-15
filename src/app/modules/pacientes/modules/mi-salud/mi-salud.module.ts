import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MiSaludRoutingModule } from './mi-salud-routing.module';
import { MiSaludComponent } from './components/mi-salud/mi-salud.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [MiSaludComponent],
  imports: [CommonModule, MiSaludRoutingModule, ReactiveFormsModule, FormsModule, MatSnackBarModule, NgbCollapseModule],
})
export class MiSaludModule {}
