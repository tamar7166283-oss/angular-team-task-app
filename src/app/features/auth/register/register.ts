import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/authService';
import {StorageService} from '../../../core/services/storageService'
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
registerForm: FormGroup;
constructor(private fb:FormBuilder,
            private authService: AuthService,
            private router : Router)
{
  this.registerForm=this.fb.group({
      name:['',[Validators.required,Validators.minLength(2)]],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(3)]]
  })
}

onSubmit(){
  if(this.registerForm?.valid)
  {
    this.authService.register(this.registerForm.value).subscribe({
      next:(res)=>{
        console.log("registeration succeed");
        this.router.navigate(['/projects'])
      },
      error:()=>{
        console.log("registeration failed");
      }
    })
  }
}
}
