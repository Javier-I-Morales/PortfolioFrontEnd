import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  dirgithub: string = "https://github.com/Javier-I-Morales";
  dirlinkedin: string = "https://www.linkedin.com/in/javier-ignacio-morales/";
  constructor() { }

  ngOnInit(): void {
  }

}
