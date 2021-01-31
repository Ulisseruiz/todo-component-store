import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TodoDto } from '../models';

@Injectable()
export class TodosService {
  private readonly URL = 'http://localhost:3030/todos';
  constructor(private http: HttpClient) {}
  create(data: TodoDto): Observable<TodoDto> {
    return this.http.post<TodoDto>(this.URL, data);
  }

  all(): Observable<TodoDto[]> {
    return this.http.get<TodoDto[]>(this.URL);
  }

  update(data: TodoDto): Observable<TodoDto> {
    return this.http.put<TodoDto>(`${this.URL}/${data.id}`, data);
  }

  remove(data: TodoDto): Observable<TodoDto> {
    return this.http.delete<TodoDto>(`${this.URL}/${data.id}`);
  }
}
