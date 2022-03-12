import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { User } from '../../models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { logoutUserRequest } from '../../store/users.actions';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.sass']
})
export class LayoutComponent implements OnInit {
  user: Observable<null | User>;
  userData!: User;
  userSubscription!: Subscription;

  constructor(private store: Store<AppState>) {
    this.user = store.select(state => state.users.user);
  }

  ngOnInit()  {
    this.userSubscription = this.user.subscribe(user => {
      this.userData = <User>user;
    })
  }

  logout(){
    this.store.dispatch(logoutUserRequest());
  }

  ngOnDestroy(){
    this.userSubscription.unsubscribe();
  }

}
