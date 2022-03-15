import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  url:string = 'http://localhost/mios-ciu-back-v2/public/api/tablet/'

  postLogin(username:string,password:string):Observable<any[]>{
    return this.http.post<any[]>(this.url+'login',{username:username,password:password})
  }
  getIp():Observable<any[]>{
    return this.http.get<any[]>('https://api.ipify.org?format=json')
  }

  startTurn(username:string,ip:string):Observable<any[]>{
    return this.http.post<any[]>(this.url+'start',{username:username,ip:ip})
  }

  endTurn(username:string):Observable<any[]>{
    return this.http.post<any[]>(this.url+'end',{username:username})
  }
  
}
