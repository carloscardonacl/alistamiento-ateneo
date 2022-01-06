import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';

export const ruta = 'https://sigespro.corvuslab.co/';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'SIGESPRO';
  
  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
  
}
