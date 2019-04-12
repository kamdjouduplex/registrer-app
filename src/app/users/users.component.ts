import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  user: any = {};
  users: any[] = [];
  constructor(
    private afs: AngularFirestore,
    ) { }

  ngOnInit() {
    this.getUserList();
  }

  getUserList(){
    this.afs.collection('users').ref.get()
    .then( (data) => {
      data.forEach( (result) => {
        this.user = {
          id: result.id,
          data: result.data()
        };
        this.users.push( this.user );
      })
    })
    .catch( (error) => console.log('Error: ', error));
  }

  deleteUser(id){
    if (confirm("Are you sure you want to delete this user ?")) {
      this.afs.collection('users').doc(id).delete()
      .then( () => {
        console.log("Deleted");
        this.users = [];
        this.getUserList();
      })
      .catch( (error) => console.log('Error: ', error));
    } else {
      return;
    }
    
  }

}
