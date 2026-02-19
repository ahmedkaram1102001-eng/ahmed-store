import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SearchService {
  private termSubject = new BehaviorSubject<string>('');
  readonly term$ = this.termSubject.asObservable();

  setTerm(term: string) {
    this.termSubject.next(term || '');
  }
}
