import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Member } from '../_models/member';
import { PaginationResult } from '../_models/pagination';
import { setPaginationHeaders, setPaginationResponse } from './paginationHelper';

@Injectable({
  providedIn: 'root',
})
export class LikesService {
  baseUrl = environment.apiUrl;
  private http = inject(HttpClient);
  likeIds = signal<number[]>([]);
  paginationResult = signal<PaginationResult<Member[]> | null> (null);


  toggleLike(tragetId: number)
  {
    return this.http.post(`${this.baseUrl}likes/${tragetId}`,{});
  }

  getLikes(predicate:string, pageNumber:number , pageSize: number){
    let params =  setPaginationHeaders(pageNumber,pageSize);
    params = params.append('prdicate',predicate);

   return this.http.get<Member[]>(`${this.baseUrl}likes`,
    {observe:'response',params}).subscribe({
      next: response => setPaginationResponse(response, this.paginationResult)
    })
  }

  getLikeIds(){
    return this.http.get<number[]>(`${this.baseUrl}likes/list`).subscribe({
      next:ids => this.likeIds.set(ids)
    })
  }
}
