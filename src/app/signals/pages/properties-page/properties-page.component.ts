import { Component, computed, effect, signal } from '@angular/core';
import { Datum } from '../../interfaces/user-request.interface';

@Component({
  selector: 'app-properties-page',
  templateUrl: './properties-page.component.html',
  styleUrl: './properties-page.component.css',
})
export class PropertiesPageComponent {

  public counter = signal(10);

  public user = signal<Datum>({
    id: 1,
    email: 'george.bluth@reqres.in',
    first_name: 'George',
    last_name: 'Bluth',
    avatar: 'https://reqres.in/img/faces/1-image.jpg',
  });

  public fullName = computed( () => `${ this.user().first_name } ${ this.user().last_name }`)

  public userChangeEffect = effect( () => {

  });

  increaseBy(value:number) {
    this.counter.update( current => current + value );
  }

  onFieldUpdated( field: keyof Datum, value: string ) {

    // this.user.set({
    //   ...this.user(),
    //   [field]: value,
    // });

    this.user.update( current => ({
      ...current,
      [field]: value,
    }));

  // this.user.update( current => {

  //   switch( field ) {

  //     case 'email':
  //       current.email = value;
  //       break;

  //     case 'avatar':
  //       current.avatar = value;
  //       break;

  //     case 'email':
  //       current.email = value;
  //       break;

  //     case 'first_name':
  //       current.first_name = value;
  //       break;

  //     case 'last_name':
  //       current.last_name = value;
  //       break;

  //     case 'id':
  //       current.id = Number(value);
  //       break;

  //   }
  //})

  }



}
