import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { User } from './user';
import { UserService } from './user.service';

@Component({
  selector: 'user-update',
  templateUrl: './userupdate.component.html',
  providers: [UserService]
})

export class UserUpdateComponent implements OnInit{ 
  user: User;
  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router){ }

  ngOnInit(): void {
    let id:number;
    this.route.params.forEach((params: Params) => {
      id = +params['id'];
    });
    this.userService.getUser(id)
      .then((user) => {
        this.user = user;
      });
  }
  updateUser(user:User): void {
    this.userService
    .updateUser(user, user.id)
    .then((user) => {
      alert("User has been updated successfully");
      this.router.navigate(['/users']);
    }).catch((err) => {
      alert("User could not be updated, please try again!");
    });
  }

}