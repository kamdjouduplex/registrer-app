import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  myForm: FormGroup; 

  constructor(private fb: FormBuilder, private afs: AngularFirestore, private router: Router) { }

  ngOnInit() {
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
    //this.myForm.valueChanges.subscribe(console.log);
  }

  get name() {
    return this.myForm.get('name');
  }

  get email() {
    return this.myForm.get('email');
  }
  addUser(){
    let form = this.myForm.value;
    if(form.password === form.confirmPassword){
      const user: any = {
        name: form.name,
        email: form.email,
        phone: form.phone,
        location: form.location,
        password: form.password
      }
      this.afs.collection('users').add(user)
      .then( () => {
        console.log('Successfully created');
        this.router.navigate(['/users']);
      })
      .catch( (error) => console.log('Error: ', error));
    } else {
      alert("confirm password not match");
    }
  }

}
