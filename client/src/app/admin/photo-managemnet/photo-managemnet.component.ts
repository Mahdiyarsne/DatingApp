import { Component, OnInit } from '@angular/core';
import { Photo } from '../../_models/photo';
import { AdminService } from '../../_services/admin.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-photo-managemnet',
  imports: [NgFor],
  templateUrl: './photo-managemnet.component.html',
  styleUrl: './photo-managemnet.component.css'
})
export class PhotoManagemnetComponent implements OnInit {
  photos:Photo[]=[];

  constructor(private adminService:AdminService) { }

  ngOnInit(): void {
    this.getPhotosForApproval();
  }

  getPhotosForApproval(){
    this.adminService.getPhotosForApproval().subscribe({
      next: photos => this.photos = photos
    })
  }

  approvePhoto(photoId:number){
    this.adminService.aprrovePhoto(photoId).subscribe({
      next: () => this.photos.splice(this.photos.findIndex(p => p.id === photoId), 1)
    })
  }

  rejectPhoto(photoId:number){
    this.adminService.rejectPhoto(photoId).subscribe({
      next: () => this.photos.splice(this.photos.findIndex(p => p.id === photoId), 1)
    })
  }
}
