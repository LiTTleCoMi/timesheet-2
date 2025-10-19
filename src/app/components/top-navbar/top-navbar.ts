import { Component } from '@angular/core';
import { MaterialModule } from '../../modules/material-module';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-top-navbar',
  imports: [MaterialModule, RouterModule],
  templateUrl: './top-navbar.html',
  styleUrl: './top-navbar.scss'
})
export class TopNavbar {

}
