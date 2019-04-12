import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from './models/user';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  users = [];
  constructor(private afs: AngularFirestore) { 
    //this.users = this.afs.collection('students').valueChanges();
  }

  getUsers(){
    let d: any;
    this.afs.collection('users').ref.get()
    .then( (data) => {
      d = data;
    })
    return d;
  }

  getPeople(){
    return new Promise<any>((resolve, reject) => {
      this.afs.collection('/users').snapshotChanges()
      .subscribe(snapshots => {
        resolve(snapshots)
      })
    })
  }
}
