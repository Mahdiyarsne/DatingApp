import { Component, inject } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-cofirm-dialog',
  imports: [],
  templateUrl: './cofirm-dialog.component.html',
  styleUrl: './cofirm-dialog.component.css',
})
export class CofirmDialogComponent {
  bsModalRef = inject(BsModalRef);
  title = '';
  message = '';
  btnOkText = '';
  btnCancelText = '';
  result = false;

  confrim(){
    this.result = true;
    this.bsModalRef.hide();
  }

  decline(){
    this.bsModalRef.hide();
  }
}
