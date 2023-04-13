import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataSignUpService {
  private data = new BehaviorSubject<{
    email: string;
    firebaseId: string;
    name: string;
  }>({ email: '', firebaseId: '', name: '' });

  constructor() {}

  public setData(email: string, firebaseId: string, name: string): void {
    this.data.next({ email, firebaseId, name });
  }

  public getData(): Observable<{
    email: string;
    firebaseId: string;
    name: string;
  }> {
    return this.data.asObservable();
  }
}
