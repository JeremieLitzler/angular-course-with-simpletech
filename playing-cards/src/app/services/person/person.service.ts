import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from '../../interfaces/person.interface';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  private DATA: Person[] = [
    {
      lastName: 'Dupont',
      firstName: 'Jean',
      birthDate: new Date('1985-06-12'),
    },
    {
      lastName: 'Durand',
      firstName: 'Marie',
      birthDate: new Date('1990-08-22'),
    },
    {
      lastName: 'Martin',
      firstName: 'Paul',
      birthDate: new Date('1975-03-15'),
    },
    {
      lastName: 'Bernard',
      firstName: 'Lucie',
      birthDate: new Date('2000-01-01'),
    },
    {
      lastName: 'Leroy',
      firstName: 'Antoine',
      birthDate: new Date('1982-11-05'),
    },
    {
      lastName: 'Moreau',
      firstName: 'Sophie',
      birthDate: new Date('1995-04-10'),
    },
    {
      lastName: 'Petit',
      firstName: 'Alexandre',
      birthDate: new Date('1987-09-18'),
    },
    {
      lastName: 'Roux',
      firstName: 'Camille',
      birthDate: new Date('1992-02-25'),
    },
    {
      lastName: 'Fournier',
      firstName: 'Nicolas',
      birthDate: new Date('1989-12-03'),
    },
    {
      lastName: 'Gauthier',
      firstName: 'Emma',
      birthDate: new Date('1996-07-14'),
    },
    {
      lastName: 'Garcia',
      firstName: 'Lucas',
      birthDate: new Date('1998-05-23'),
    },
    {
      lastName: 'Perrin',
      firstName: 'Chloé',
      birthDate: new Date('2001-03-11'),
    },
    {
      lastName: 'Girard',
      firstName: 'Hugo',
      birthDate: new Date('1984-10-29'),
    },
    {
      lastName: 'Bonnet',
      firstName: 'Manon',
      birthDate: new Date('1993-08-08'),
    },
    {
      lastName: 'Masson',
      firstName: 'Julien',
      birthDate: new Date('1978-06-02'),
    },
    {
      lastName: 'Faure',
      firstName: 'Laura',
      birthDate: new Date('1997-11-21'),
    },
    {
      lastName: 'Riviere',
      firstName: 'Matthieu',
      birthDate: new Date('1983-05-30'),
    },
    {
      lastName: 'Brun',
      firstName: 'Elodie',
      birthDate: new Date('2002-09-17'),
    },
    {
      lastName: 'Blanc',
      firstName: 'Thomas',
      birthDate: new Date('1991-01-15'),
    },
    {
      lastName: 'Henry',
      firstName: 'Alice',
      birthDate: new Date('1986-12-25'),
    },
  ];

  search(term: string): Observable<Person[]> {
    const delay = Math.round(Math.random() * 400) + 100;
    const filteredData = this.DATA.filter((item: Person) => {
      const searchContainedInFirstName = item.firstName
        .toLowerCase()
        .includes(term.toLowerCase());
      const searchContainedInLastName = item.lastName
        .toLowerCase()
        .includes(term.toLowerCase());
      return searchContainedInFirstName || searchContainedInLastName;
    });
    return new Observable((observer) => {
      setTimeout(() => {
        observer.next(filteredData);
        observer.complete();
      }, delay);
    });
  }
}
