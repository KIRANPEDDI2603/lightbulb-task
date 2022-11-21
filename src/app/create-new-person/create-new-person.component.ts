import { Component, ChangeDetectorRef, ElementRef, ViewChild, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder,FormGroup, FormControl, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CommonServices } from '../services/common.services';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create-new-person',
  templateUrl: './create-new-person.component.html',
  styleUrls: ['./create-new-person.component.css'],
})
export class CreateNewPersonComponent {
  @Input() public  personInfo;
  @Input() public isEdit;
  header:any;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  form: FormGroup;
  @ViewChild('fileInput') el: ElementRef;
  imageUrl: any;
  editFile: boolean = true;
  removeUpload: boolean = false;
    constructor(private activeModal: NgbActiveModal, private modalService: BsModalService, public fb: FormBuilder, private commonServices: CommonServices,
      private cd: ChangeDetectorRef) { }
  
    // get firstname(){
    //   return this.form.get('firstName')
    // }
    ngOnInit() {
      debugger
      this.form = this.fb.group({
        name: (!this.isEdit) ? ['', Validators.required] : [this.personInfo?.name],
        email: (!this.isEdit) ? ['', [Validators.required,Validators.email]] : [this.personInfo['email']],
        dob: (!this.isEdit) ? ['', Validators.required] : [this.personInfo.dob],
        country: (!this.isEdit) ? ['', Validators.required] : [this.personInfo.country],
        avatar: (!this.isEdit) ? [null] : [this.personInfo.avatar]
       });
      if(this.isEdit) {
        this.header = "Edit Person";
        this.imageUrl = this.personInfo?.avatar;
      } else {
        this.header = "Add New Person";
        this.imageUrl = 'https://i.pinimg.com/236x/d6/27/d9/d627d9cda385317de4812a4f7bd922e9--man--iron-man.jpg';

      }
    }
  
  uploadFile(event) {
    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);

      // When file uploads set it to file formcontrol
      reader.onload = () => {
        this.imageUrl = reader.result;
        this.form.patchValue({
          avatar: reader.result
        });
        this.editFile = false;
        this.removeUpload = true;
      }
      // ChangeDetectorRef since file is loading outside the zone
      this.cd.markForCheck();        
    }
  }

  // Function to remove uploaded file
  removeUploadedFile() {
    let newFileList = Array.from(this.el.nativeElement.files);
    this.imageUrl = 'https://i.pinimg.com/236x/d6/27/d9/d627d9cda385317de4812a4f7bd922e9--man--iron-man.jpg';
    this.editFile = true;
    this.removeUpload = false;
    this.form.patchValue({
      avatar: [null]
    });
  }

    onSubmit(){
      let service;
      if(!this.isEdit) {
        service = this.commonServices.createNewPerson(this.form.value);
      } else {
        const personId = this.personInfo?.id;
        service = this.commonServices.updatePersonInfo(personId, this.form.value);
      }
      service.subscribe(
        res => {
          this.commonServices.showSuccess('Updated Sucessfuly', 'Success');
          this.onClose();
        },
        _err => {
          this.commonServices.showError('Internal Server Erorr', 'Failed');
        }
      );
    }

    onClose() {
      this.passEntry.emit(true);
      this.activeModal.close(); //It closes successfully
    }
}
