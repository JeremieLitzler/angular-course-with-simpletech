import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MonsterType } from '../../utils/monster.utils';
import { PlayingCardComponent } from '../../components/playing-card/playing-card.component';
import { Monster } from '../../models/monster.model';
import { MonsterService } from '../../services/monster/monster.service';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialog } from '@angular/material/dialog';
import { MonsterDeleteConfirmationDialogComponent } from '../../components/monster-delete-confirmation-dialog/monster-delete-confirmation-dialog.component';

@Component({
  selector: 'app-monster',
  imports: [
    ReactiveFormsModule,
    PlayingCardComponent,
    PlayingCardComponent,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './monster.component.html',
  styleUrl: './monster.component.css',
})
export class MonsterComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);
  private monsterService = inject(MonsterService);
  private readonly dialog = inject(MatDialog);

  routeSubscription: Subscription | null = null;
  formSubscription: Subscription | null = null;

  form = this.formBuilder.group({
    name: ['', [Validators.required]],
    image: ['', [Validators.required]],
    type: [MonsterType.ELECTRIC, [Validators.required]],
    hp: [0, [Validators.required, Validators.min(1), Validators.max(200)]],
    figureCaption: ['', [Validators.required]],
    attackName: ['', [Validators.required]],
    attackStrength: [
      0,
      [Validators.required, Validators.min(1), Validators.max(200)],
    ],
    attackDescription: ['', [Validators.required]],
  });
  getUploadImageButtonLabel(imageInput: HTMLInputElement) {
    const fileUploaded = imageInput.files?.[0]?.name;
    if (fileUploaded) {
      return `Uploaded file: ${imageInput.files?.[0]?.name}`;
    } else {
      return 'Upload file: ...';
    }
  }

  monsterTypes = Object.values(MonsterType);
  monsterId = signal<number | undefined>(undefined);
  monster = Object.assign(new Monster(), this.form.value);

  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe((params) => {
      this.monsterId.set(params['id'] ? parseInt(params['id']) : undefined);
      const monsterFound = this.monsterService.get(this.monsterId());
      if (monsterFound) {
        this.monster = monsterFound;
        this.form.patchValue(this.monster);
      }
    });
    this.formSubscription = this.form.valueChanges.subscribe((data) => {
      this.monster = Object.assign(new Monster(), data);
    });
  }
  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
    this.formSubscription?.unsubscribe();
  }
  next() {
    let nextId = this.monsterId() || 0;
    nextId++;
    this.router.navigate([`/monster/${nextId}`]);
  }

  submit(event: Event) {
    event.preventDefault();
    console.log(this.monster);

    if (this.monsterId() === -1 || !this.monsterId()) {
      this.monsterService.add(this.monster);
    } else {
      this.monster.id = this.monsterId() as number;
      this.monsterService.update(this.monster);
    }
    this.router.navigate(['/home']);
  }

  isFieldValid(fieldName: string) {
    const formControl = this.form.get(fieldName);
    return formControl?.invalid && (formControl?.dirty || formControl?.touched);
  }

  onFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const reader = new FileReader();
    if (target.files && target.files.length) {
      const [file] = target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.form.patchValue({ image: reader.result as string });
      };
    }
  }

  navigateBack() {
    this.router.navigate(['/home']);
  }

  deleteMonster() {
    const dialogRef = this.dialog.open(
      MonsterDeleteConfirmationDialogComponent,
    );
    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.monsterService.delete(this.monsterId());
        this.navigateBack();
      }
    });
  }
}
