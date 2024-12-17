import { Component } from '@angular/core';
import { HeroComponent } from "./hero/hero.component";
import { HomeCardComponent } from "./home-card/home-card.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent, HomeCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
