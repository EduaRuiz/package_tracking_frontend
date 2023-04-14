import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ISignUpServiceData } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class DataSignUpService {
  private data = new BehaviorSubject<ISignUpServiceData>({
    email: '',
    firebaseId: '',
    name: '',
  });

  constructor() {}

  public setData(email: string, firebaseId: string, name: string): void {
    this.data.next({ email, firebaseId, name });
  }

  public getData(): Observable<ISignUpServiceData> {
    return this.data.asObservable();
  }
}
