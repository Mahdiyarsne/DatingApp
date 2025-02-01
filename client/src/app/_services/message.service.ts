import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { single } from 'rxjs';
import { PaginationResult } from '../_models/pagination';
import { Message } from '../_models/message';
import { setPaginationHeaders, setPaginationResponse } from './paginationHelper';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
baseUrl = environment.apiUrl;
private http = inject(HttpClient);
paginationResult = signal<PaginationResult<Message[]> | null> (null);


getMessages(pageNumber: number , pageSize: number , container: string){
  let params = setPaginationHeaders(pageNumber,pageSize);

  params = params.append('Container',container);

  return this.http.get<Message[]>(this.baseUrl + 'messages',{observe:'response',params})
  .subscribe({
    next: response => setPaginationResponse(response,this.paginationResult)
  })
}
getMessageThread(username: string){
  return this.http.get<Message[]>(this.baseUrl +'messages/thread/' + username);
}
}
