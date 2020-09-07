import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Producto } from '../../models/Producto.model';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  myAppUrl: string;
  myApiUrl: string;
  httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'
    } )
  }
  constructor(private http: HttpClient) { 
    this.myAppUrl = environment.appUrl;
    this.myApiUrl = 'api/productos/' ;
  }
  getProductos(){ 
    return this.http.get(this.myAppUrl + this.myApiUrl)
  }
  getProducto(prodId: number)  {
    return this.http.get<Producto>(this.myAppUrl + this.myApiUrl  +prodId)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
}
  saveProduct(User): Observable<Producto> {
    return this.http.post<Producto>(this.myAppUrl + this.myApiUrl, JSON.stringify(User), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
}
  updateProducto(prodId: number, producto: Producto): Observable<Producto> {
    console.log(producto);
    return this.http.put<Producto>(this.myAppUrl + this.myApiUrl + prodId, JSON.stringify(producto), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
}

deleteProductos(prodId: number): Observable<Producto> {
  return this.http.delete<Producto>(this.myAppUrl + this.myApiUrl + prodId)
  .pipe(
    retry(1),
    catchError(this.errorHandler)
  );
}
  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {

      errorMessage = error.error.message;
    } else {

      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
