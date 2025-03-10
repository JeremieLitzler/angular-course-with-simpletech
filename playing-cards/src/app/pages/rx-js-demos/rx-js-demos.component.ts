import { AsyncPipe } from '@angular/common';
import { Component, inject, OnDestroy } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscriber, Subscription } from 'rxjs';

@Component({
  selector: 'app-rx-js-demos',
  imports: [AsyncPipe, ReactiveFormsModule],
  templateUrl: './rx-js-demos.component.html',
  styleUrl: './rx-js-demos.component.css',
})
export class RxJsDemosComponent implements OnDestroy {
  protected router = inject(Router);
  speakerSubscription: Subscription | null = null;
  anotherSpeaker$: Observable<string> | null = null;

  textFormControl = new FormControl('');
  textTyped$ = this.textFormControl.valueChanges;

  letter = '';
  constructor() {
    // The naming convention is to put a "$" at the end of an Observable
    const speaker$ = new Observable<string>(
      (subscriber: Subscriber<string>) => {
        const textToSend = 'Hello RxJS';
        for (let i = 0; i < textToSend.length; i++) {
          setTimeout(
            () => {
              subscriber.next(textToSend[i]);
            },
            (i + 1) * 250,
          );
        }
        setTimeout(() => {
          subscriber.complete();
        }, textToSend.length * 1000);

        // setTimeout(
        //   () => {
        //     subscriber.error();
        //   },
        //   Math.random() * textToSend.length * 1000,
        // );
      },
    );

    const speakerObserver = {
      next: (value: string) => {
        this.letter += value;
      },
      complete: () => {
        console.log('Speaker has finished!');
      },
      error: () => {
        console.log('Speaker choked...');
      },
    };

    this.speakerSubscription = speaker$.subscribe(speakerObserver);

    // The naming convention is to put a "$" at the end of an Observable
    this.anotherSpeaker$ = new Observable<string>(
      (subscriber: Subscriber<string>) => {
        const textToSend = 'Hello RxJS';
        for (let i = 0; i < textToSend.length; i++) {
          setTimeout(
            () => {
              subscriber.next(textToSend[i]);
            },
            (i + 1) * 250,
          );
        }
        setTimeout(() => {
          subscriber.complete();
        }, textToSend.length * 1000);

        // setTimeout(
        //   () => {
        //     subscriber.error();
        //   },
        //   Math.random() * textToSend.length * 1000,
        // );
      },
    );
  }
  ngOnDestroy(): void {
    this.speakerSubscription?.unsubscribe();
  }
}
