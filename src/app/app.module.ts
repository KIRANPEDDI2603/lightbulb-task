import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalModule } from 'ngx-bootstrap/modal';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PersonsListComponent } from './persons-list/persons-list.component';
import { CommonServices } from './services/common.services';
import { CreateNewPersonComponent } from './create-new-person/create-new-person.component';
import { AgePipe } from './pipe/pipe-age';

@NgModule({
  declarations: [
    AppComponent,
    PersonsListComponent,
    CreateNewPersonComponent,
    AgePipe
  ],
  imports: [
    BrowserModule,
    NgbModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    ModalModule.forRoot()
  ],
  providers: [CommonServices],
  bootstrap: [AppComponent]
})
export class AppModule { }
