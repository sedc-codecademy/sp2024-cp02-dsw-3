import { Component, inject } from '@angular/core';
import { AppStore } from '../../../../../store/app.store';
import {MatDividerModule} from '@angular/material/divider';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-recent-open',
  standalone: true,
  imports: [MatDividerModule, RouterLink],
  templateUrl: './recent-open.component.html',
  styleUrl: './recent-open.component.css'
})
export class RecentOpenComponent {
  appStore = inject(AppStore)
  constructor(private router: Router){}
  ngOnInit(){
    console.log(this.appStore.recentOpen())
  }
  // openRecent(id:string){
  //   this.router.navigate([`categories/details/${id}`])
  // }
}
