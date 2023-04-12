import { Observable } from 'rxjs';

export interface IUseCase<R> {
  execute(...params: any[]): Observable<R>;
}
