import { Component } from '@angular/core';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { UserManagemnetComponent } from "../user-managemnet/user-managemnet.component";
import { HasRoleDirective } from '../../_directives/has-role.directive';
import { PhotoManagemnetComponent } from "../photo-managemnet/photo-managemnet.component";

@Component({
  selector: 'app-admin-panle',
  imports: [TabsModule, UserManagemnetComponent, HasRoleDirective, PhotoManagemnetComponent],
  templateUrl: './admin-panle.component.html',
  styleUrl: './admin-panle.component.css'
})
export class AdminPanleComponent {

}
