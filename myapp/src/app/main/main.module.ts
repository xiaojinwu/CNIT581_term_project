import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { ConfirmDialog, MainComponent } from './main.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';

import {MatButtonModule} from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonToggleModule} from '@angular/material/button-toggle'; 
import {MatDialogModule} from '@angular/material/dialog';
import { CreateTaskDialog, DashComponent, EditTaskDialog } from './pages/dash/dash.component';
import {MatDividerModule} from '@angular/material/divider';
import {MatChipsModule} from '@angular/material/chips';
import { AboutComponent } from './pages/dash/about/about.component';

@NgModule({
  declarations: [
    MainComponent, 
    ConfirmDialog, 
    DashComponent,
    CreateTaskDialog,
    EditTaskDialog,
    AboutComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule, 
    MatGridListModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatDividerModule,
    MatChipsModule
  ],
  bootstrap: [MainComponent]
})
export class MainModule { }
