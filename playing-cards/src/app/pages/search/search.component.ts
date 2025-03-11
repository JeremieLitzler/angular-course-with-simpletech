import { Component, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, AsyncPipe } from '@angular/common';
import { PersonService } from '../../services/person/person.service';
import { Person } from '../../interfaces/person.interface';
import { switchMap, Observable, startWith, debounceTime, map, tap } from 'rxjs';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, AsyncPipe],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchPageComponent {
  private personService = inject(PersonService);

  loading = false;
  searchTextFormControl = new FormControl<string>('');
  searchResult$: Observable<Person[]> =
    // `valueChanges` is equivalent to `subscribe()`
    // which allows to use `pipe()`
    this.searchTextFormControl.valueChanges.pipe(
      // Wait 500 ms before starting a new search.
      // Prevents calling the service as the user
      // types his/her search.
      debounceTime(500),
      // Start the search with nothing
      startWith(''),
      tap(() => (this.loading = true)),
      // The operator `switchMap` takes the values of an
      // Observable and returns a new Observable from
      // those values. It takes care of cancelling any
      // previous Observable
      //
      // In the example, it returns an Observable from the
      // PersonService using the current search term.
      // But if you type something new (second search) before
      // the first call to PersonService finishes, then the
      // first call is cancelled.
      switchMap((searchTerm: string | null) => {
        return this.personService.search(searchTerm ?? '');
      }),
      tap(() => (this.loading = false)),
    );

  searchResultCount$: Observable<number> = this.searchResult$.pipe(
    map((searchResult) => searchResult.length),
  );
}
