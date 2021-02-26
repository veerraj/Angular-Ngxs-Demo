import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Store } from '@ngxs/store';
import { User } from './shared/user.model';
import { AddUser, DeleteUser, EditUser } from './shared/user.action';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ngxsdemo';

  myfrom: FormGroup;
  users: Observable<User>;
  btnValue = "Submit";

  selectedName;

  constructor(private store: Store) {
    this.users = this.store.select(state => state.users.users);
  }

  ngOnInit() {
    this.formInit();
  }

  formInit() {
    this.myfrom = new FormGroup({
      'name': new FormControl(null),
      'email': new FormControl(null)
    })
  }

  addUser() {
    const newuser = new User(
      this.myfrom.value.name,
      this.myfrom.value.email
    )

    if (this.btnValue == "Submit") {
      this.store.dispatch(new AddUser({ name: newuser.name, email: newuser.email })).subscribe(
        () => {
          this.myfrom.reset();
        }
      );
    }
    else {
      console.log("hi",this.selectedName)
      this.store.dispatch(new EditUser({name: newuser.name, email: newuser.email},this.selectedName))
      .subscribe(()=>{
        this.myfrom.reset();
      })
    }


  }

  onEdit(user: User) {
    this.myfrom.controls.name.setValue(user.name);
    this.myfrom.controls.email.setValue(user.email);
    this.btnValue = "Update"
    this.selectedName = user.name;
  }

  onDelete(name) {
    this.store.dispatch(new DeleteUser(name))
  }
}
