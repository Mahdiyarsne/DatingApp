import { Component, inject, OnInit } from '@angular/core';
import { AdminService } from '../../_services/admin.service';
import { User } from '../../_models/user';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { RolesModelComponent } from '../../modals/roles-model/roles-model.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-user-managemnet',
  imports: [],
  templateUrl: './user-managemnet.component.html',
  styleUrl: './user-managemnet.component.css',
})
export class UserManagemnetComponent implements OnInit {
  private adminService = inject(AdminService);
  private modalService = inject(BsModalService);
  users: User[] = [];
  bsModalRef :BsModalRef<RolesModelComponent> = new BsModalRef<RolesModelComponent>();


  ngOnInit(): void {
    this.getUsersWithRoles();
  }

  openRolesModel(user: User){
    const initialState: ModalOptions = {
      class:'modal-lg',
      initialState :{
       title:'User roles',
       username :user.username,
       selectedRoles:[...user.roles],
       availbaleRoles:['Admin','Moderator','Member'],
       users:this.users,
       rolesUpdated: false
      }
    }
    this.bsModalRef= this.modalService.show(RolesModelComponent,initialState);
    this.bsModalRef.onHidden?.subscribe({
      next:() =>{
        if(this.bsModalRef.content && this.bsModalRef.content.rolesUpdated){
          const selectedRoles = this.bsModalRef.content.selectedRoles; 
          this.adminService.updateUserRoles(user.username , selectedRoles).subscribe({
            next: roles => user.roles = roles
          })
        }
      }
    })
  }

  getUsersWithRoles(){
    this.adminService.getUserWithRoles().subscribe({
      next : users => this.users = users
    })
  }
}
