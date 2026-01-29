import { Injectable } from '@angular/core';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private readonly TOKEM_KEY = 'auth_token'
  private readonly USER_KEY = 'auth_user'

  setToken(token:string):void{
    sessionStorage.setItem(this.TOKEM_KEY,token)
  }
  getToken():string | null{
    return sessionStorage.getItem(this.TOKEM_KEY)
  }
  setUser(user:User):void{
    sessionStorage.setItem(this.USER_KEY,JSON.stringify(user))
  }
   getUser():User|null{
    const user= sessionStorage.getItem(this.USER_KEY)
    return user? JSON.parse(user):null
  }

  clear():void{
    sessionStorage.removeItem(this.TOKEM_KEY);
    sessionStorage.removeItem(this.USER_KEY);
  }
}
