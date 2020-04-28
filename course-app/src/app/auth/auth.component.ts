import { Component, OnInit, OnDestroy, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoginMode = false;
  isLoading = false;
  error: string = null;
  closeSub: Subscription;

  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;

  constructor(private authService: AuthService, private router: Router, private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
   
  }

  switchMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(authForm : NgForm){
    
    if(!authForm.valid)
      return;

    let authObs : Observable<AuthResponseData>;
    const email = authForm.value.email;
    const password = authForm.value.password;

    this.isLoading = true;

    if(this.isLoginMode){
      authObs = this.authService.login(email,password);
    }else{
      authObs = this.authService.signIn(email,password);
    }

    authObs.subscribe(
      respData => {
        console.log(respData);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      errorMessage => {
        console.log(errorMessage);
        this.isLoading = false;
        this.showError(errorMessage);
        this.error = errorMessage;
      }
    );

    authForm.reset();
  }

  onHandleError(){
    this.error = null;
  }

  ngOnDestroy(){
    if(this.closeSub){
      this.closeSub.unsubscribe();
    }
  }

  private showError(message: string){
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);

    const hostViewContainerRef = this.alertHost.viewContainerRef;

    hostViewContainerRef.clear();
    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);
    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.close.subscribe(() => {
        this.closeSub.unsubscribe();
        hostViewContainerRef.clear();
    });
  }
}
