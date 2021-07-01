import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @Input() userForm: FormGroup = new FormGroup({});
  @Output() onSend = new EventEmitter();
  matcher = new MyErrorStateMatcher();

  get username() {
    return this.userForm.get('username');
  }

  get datetime() {
    return this.userForm.get('datetime');
  }

  get fileUrl() {
    return this.userForm.get('fileUrl');
  }
  ngOnInit(): void {
  }

  uploadFile(event: any) {
    const file = event.target.files[0];
    if (!file) {
      return;
    }
    this.userForm.controls['fileUrl'].setValue(file.name);
    console.log(event);
  }

  sendForm(){
   this.onSend.emit(this.userForm.value)
  }
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
