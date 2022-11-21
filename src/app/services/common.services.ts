import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class CommonServices {
  constructor(
    private httpClient: HttpClient, private toastrService: ToastrService) { }

  private urlCreateNewPerson = 'http://localhost:3000/persons';

  public showSuccess(message, title): void {
    this.toastrService.success(message, title);
  }

  public showError(message, title): void {
    this.toastrService.error(message, title);
  }

  createNewPerson(obj) {
    return this.httpClient
      .post<any>(`${this.urlCreateNewPerson}`, obj);
  }

  updatePersonInfo(Id, obj) {
    return this.httpClient
      .put<any>(`${this.urlCreateNewPerson}/${Id}`, obj);
  }

  getPersonsList() {
    return this.httpClient
      .get<any>(`${this.urlCreateNewPerson}`);
  }

  getPersonDetailsById(id) {
    return this.httpClient
    .get<any>(`${this.urlCreateNewPerson}/${id}`);

  }
}