import { Component, inject } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-roles-model',
  imports: [],
  templateUrl: './roles-model.component.html',
  styleUrl: './roles-model.component.css',
})
export class RolesModelComponent {
  bsModalRef = inject(BsModalRef);
  username= '';
  title = '';
  availbaleRoles: string[] = [];
  selectedRoles: string[] = [];
  rolesUpdated = false;

  updateChecked(chackedValue : string){
    if(this.selectedRoles.includes(chackedValue)){
      this.selectedRoles = this.selectedRoles.filter(r => r !== chackedValue);
    }else{
      this.selectedRoles.push(chackedValue);
    }
  }

  onSelectRoles(){
    this.rolesUpdated= true;
    this.bsModalRef.hide();
  }


}
