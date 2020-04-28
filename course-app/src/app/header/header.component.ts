import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  //@Output() featureSelected = new EventEmitter<string>();
  userSub: Subscription;
  isAuthenticated = false;

  constructor(private dataStorageService: DataStorageService, private authService: AuthService) { }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
          this.isAuthenticated = !!user;
        });
  }

  /*onSelect(feature:string){
    this.featureSelected.emit(feature);
  }*/

  onLogout(){
    this.authService.logout();
  }
  
  onSaveData(){
    this.dataStorageService.saveRecipes();
  }

  onFetchData(){
    this.dataStorageService.fetchRecipes().subscribe();
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

}
