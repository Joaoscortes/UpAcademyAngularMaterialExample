import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogFormComponent } from './components/dialog-form/dialog-form.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public userForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog
  ) {
    this.userForm = this.getDefaultFormGroup();
  }

  getDefaultFormGroup() {
    return this.formBuilder.group({
      username: [
        '',
        [Validators.required, Validators.minLength(4)]
      ],
      datetime: [
        new Date(),
        [Validators.required]
      ],
      fileUrl: ['']
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogFormComponent, {
      width: '50%',
      data: this.getDefaultFormGroup()
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userForm.patchValue(result.value)
      }
    });
  }


  submitForm(form: any) {
    console.log(form);
  }
}
