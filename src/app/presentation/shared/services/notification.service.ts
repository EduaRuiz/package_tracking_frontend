import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor() {}

  showMessage(
    title: string,
    message: string,
    type: 'success' | 'error' | 'warning' | 'info' = 'success'
  ) {
    Swal.fire(title, message, type);
  }
}
