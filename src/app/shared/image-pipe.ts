import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

@Pipe({
  name: 'defaultImage',
})
export class ImagePipe implements PipeTransform {
  transform(value: string): string{
    if (!value) {
      return 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50"><rect fill="#ddd" width="50" height="50"/><text fill="#999" font-size="30" x="50%" y="50%" text-anchor="middle" dy=".35em">?</text></svg>');
    }
    if (value.startsWith('/uploads/')) {
      return `${environment.apiEndpoint}${value}`;
    }
    return value;
  }
}
