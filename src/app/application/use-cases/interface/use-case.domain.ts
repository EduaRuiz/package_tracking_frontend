import { Observable } from 'rxjs';

export interface IUseCase<T, R> {
  execute(params: T): Observable<R>;
}
