import { Component } from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { CreateNewPersonComponent } from '../create-new-person/create-new-person.component';
import { CommonServices } from '../services/common.services';
import { Person } from '../interface/personDetails'

@Component({
  selector: 'app-persons-list',
  templateUrl: './persons-list.component.html',
  styleUrls: ['./persons-list.component.css']
})
export class PersonsListComponent {
  bsModalRef: BsModalRef;
  listofPersons: any;
  personDetails: any={};
  isEdit: any;
  constructor(private modalService: NgbModal, private commonServices: CommonServices) {}

  ngOnInit() {
    this.getPersonsList();
  }

  getPersonsList() {
  this.commonServices.getPersonsList().subscribe(
    res => {
      this.listofPersons = res;
    },
    _err => {
      this.commonServices.showError('Internal Server Erorr', 'Failed');
    }
  );
}

  editPersonDetails(id) {
    const personId = id;
    this.getPersonDetails(personId);
  }

    getPersonDetails(id) {
      this.commonServices.getPersonDetailsById(id).subscribe(
        res => {
          this.personDetails = res;
          this.isEdit = true;
          this.openModalWithComponent();
        },
        _err => {
          this.commonServices.showError('Internal Server Erorr', 'Failed');
        }
      );
    }

  public openModalWithComponent() {
    const modalRef = this.modalService.open(CreateNewPersonComponent, {
      backdrop: 'static',
      keyboard: false
    });
    if (this.isEdit) {
      modalRef.componentInstance.personInfo = this.personDetails;
      modalRef.componentInstance.isEdit = this.isEdit;
    } else {
        this.personDetails = {};
    }
    modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {
      if(receivedEntry) {
      this.isEdit = false;
      modalRef.componentInstance.personInfo = {};
      this.getPersonsList();
      }
      })
  }
}
