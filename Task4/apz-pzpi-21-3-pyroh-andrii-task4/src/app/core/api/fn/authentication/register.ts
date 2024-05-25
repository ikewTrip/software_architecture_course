/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ApiResponseAuthResponse } from '../../models/api-response-auth-response';
import { RegisterRequest } from '../../models/register-request';

export interface Register$Params {
      body: RegisterRequest
}

export function register(http: HttpClient, rootUrl: string, params: Register$Params, context?: HttpContext): Observable<StrictHttpResponse<ApiResponseAuthResponse>> {
  const rb = new RequestBuilder(rootUrl, register.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<ApiResponseAuthResponse>;
    })
  );
}

register.PATH = '/api/v1/auth/register';
