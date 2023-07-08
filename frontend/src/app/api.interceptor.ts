import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

export function ApiInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  if (!req.url.startsWith('/assets')) {
    const clonedRequest = req.clone({
      url: environment.api + req.url,
    });
    return next(clonedRequest);
  } else {
    return next(req);
  }
}
