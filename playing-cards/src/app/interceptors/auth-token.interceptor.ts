import { HttpInterceptorFn } from '@angular/common/http';
import { LocalStorageDatabaseNameKeys } from '../constants/local.storage.database.name.keys';

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem(
    LocalStorageDatabaseNameKeys.SESSION_TOKEN_DB,
  );

  let requestToSend = req;
  if (token) {
    const headers = req.headers.set('Authorization', `Token ${token}`);
    requestToSend = req.clone({ headers });
  }

  return next(requestToSend);
};
