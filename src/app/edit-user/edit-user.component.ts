import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  myForm: FormGroup;
  id: string;
  user: any;

  constructor(
    private fb: FormBuilder, 
    private afs: AngularFirestore, 
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.getOneUser();
    this.myForm = this.fb.group({
      name: ['', [
        Validators.required,
        Validators.minLength(2)
      ]],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      phone: '',
      location: '',
      password: '',
      confirmPassword: ''
    })
  }

  getOneUser(){
    this.id = this.route.snapshot.paramMap.get("id")
    this.afs.collection('users').doc(this.id).ref.get()
    .then( (resp) => {
        this.user = resp.data();
        this.myForm = this.fb.group({
          name: [this.user.name, [
            Validators.required,
            Validators.minLength(2)
          ]],
          email: [this.user.email, [
            Validators.required,
            Validators.email
          ]],
          phone: this.user.phone,
          location: this.user.location,
          password: '',
          confirmPassword: ''
        })
    })
    .catch( (error) => console.log('Error: ', error));
  }

  editUser(){
    let form = this.myForm.value;
    const updatedUser: any = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      location: form.location
    }
    this.afs.collection('users').doc(this.id).update(updatedUser)
    .then( () => {
      console.log('Successfully updated!');
      this.router.navigate(['/users']);
    })
    .catch( (error) => console.log('Error: ', error));
  }

}
