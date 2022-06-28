import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { menu } from 'menu';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private REST_API_SERVER = 'http://localhost:3000/menus';

  constructor(private _httpClient: HttpClient) {}

  getMenu() {
    return this._httpClient.get<menu[]>(`${this.REST_API_SERVER}`);
  }

  addMenuItem(dish:menu){
    return this._httpClient.post<menu>(`${this.REST_API_SERVER}`, dish);
  }

  editMenuItem(resource:menu){
    return this._httpClient.patch<menu>(`${this.REST_API_SERVER}/${resource.id}` , resource);
  }

  deleteMenuItem(id:number){
    return this._httpClient.delete<menu>(`${this.REST_API_SERVER}/${id}`);
  }


}
