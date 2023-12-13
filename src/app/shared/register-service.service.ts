import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserInterface } from '../components/user.interface';


@Injectable({
  providedIn: 'root'
})
export class RegisterServiceService {
  private currentUserSig: BehaviorSubject<UserInterface | undefined | null> = new BehaviorSubject<UserInterface | undefined | null>(undefined);
  currentUser$ = this.currentUserSig.asObservable();

  setCurrentUser(user: UserInterface | undefined | null) {
    this.currentUserSig.next(user);
  }

  getCurrentUser(): UserInterface | undefined | null {
    return this.currentUserSig.getValue();
  }

  constructor() { }
}
