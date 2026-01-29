import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from "../footer/footer";
import {  HeaderComponent } from "../header/header";

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, Footer, HeaderComponent],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout {

}
