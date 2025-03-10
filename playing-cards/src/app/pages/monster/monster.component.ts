import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, of, Subscription, switchMap } from 'rxjs';
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

  subscriptions: Subscription = new Subscription();

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
    const routeSubscription = this.route.params
      .pipe(
        // `switchMap` allows to take an Observable and create another that w'll use
        // on the next step.
        switchMap((params) => {
          if (params['id']) {
            this.monsterId.set(
              params['id'] ? parseInt(params['id']) : undefined,
            );
            return this.monsterService.get(this.monsterId());
          }
          // `of` creates an Observable with the value provided,
          // e.g. null in the code below
          return of(null);
        }),
      )
      // receives either the result of `monsterService.get` or null
      .subscribe((monsterFound) => {
        if (monsterFound) {
          this.monster = monsterFound;
          this.form.patchValue(this.monster);
        }
      });
    this.subscriptions.add(routeSubscription);
    const formSubscription = this.form.valueChanges.subscribe((data) => {
      this.monster = Object.assign(new Monster(), data);
    });
    this.subscriptions.add(formSubscription);
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
  next() {
    let nextId = this.monsterId() || 0;
    nextId++;
    this.router.navigate([`/monster/${nextId}`]);
  }

  submit(event: Event) {
    event.preventDefault();
    console.log(this.monster);
    let saveObservable = null;
    if (this.monsterId() === -1 || !this.monsterId()) {
      saveObservable = this.monsterService.add(this.monster);
    } else {
      this.monster.id = this.monsterId() as number;
      saveObservable = this.monsterService.update(this.monster);
    }
    this.subscriptions.add(
      saveObservable.subscribe(() => this.router.navigate(['/home'])),
    );
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
    const deleteSubscription = dialogRef
      .afterClosed()
      .pipe(
        filter((confirmation) => confirmation),
        switchMap(() => this.monsterService.delete(this.monsterId())),
      )
      .subscribe(() => this.navigateBack());

    this.subscriptions.add(deleteSubscription);
  }
}
