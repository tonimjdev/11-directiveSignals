import { Component, OnInit, computed, signal } from '@angular/core';
import { UsersServiceService } from '../../services/users-service.service';
import { Datum } from '../../interfaces/user-request.interface';

@Component({
  selector: 'app-user-info-page',
  templateUrl: './user-info-page.component.html',
  styleUrl: './user-info-page.component.css'
})
export class UserInfoPageComponent implements OnInit {

  constructor( private usersService: UsersServiceService ) {}

  public userId = signal(1);
  public currentUser = signal<Datum | undefined>(undefined);
  public userWasFound = signal(true);

  public fullName = computed<string>( () => {
    if ( !this.currentUser() ) return 'Usuario no encontrado';
    return `${ this.currentUser()?.first_name } ${ this.currentUser()?.last_name }`
  })

  ngOnInit(): void {
    this.loadUser( this.userId() )
  }

  loadUser( id:number ) {
    if ( id <= 0 ) return;

    this.userId.set(id);

    this.usersService.getUserById( id )
    .subscribe( {
      next: (user) => {
        this.currentUser.set( user );
        this.userWasFound.set(true);
      },
      error: () => {
        this.userWasFound.set(false);
        this.currentUser.set(undefined);
      }
    });
  }




}
