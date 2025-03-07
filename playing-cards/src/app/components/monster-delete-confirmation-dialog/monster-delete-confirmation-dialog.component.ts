import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-monster-delete-confirmation-dialog',
  imports: [
    MatDialogActions,
    MatDialogTitle,
    MatDialogClose,
    MatDialogContent,
    MatButtonModule,
  ],
  templateUrl: './monster-delete-confirmation-dialog.component.html',
  styleUrl: './monster-delete-confirmation-dialog.component.css',
})
export class MonsterDeleteConfirmationDialogComponent {}
