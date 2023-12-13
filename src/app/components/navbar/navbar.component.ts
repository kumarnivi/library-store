import { DOCUMENT } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  Inject,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RegisterServiceService } from 'src/app/shared/register-service.service';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isScrolled: boolean = false;

  constructor(
    private el: ElementRef,
    private router: Router,
    private renderer: Renderer2,
    public authService:RegisterServiceService,
    @Inject(DOCUMENT) private document: Document
   
  ) {}

  @ViewChild('menu', { static: true }) menu!: ElementRef<HTMLDivElement>;
  @ViewChild('logo', { static: true }) logo!: ElementRef<HTMLDivElement>;
  ngOnInit() {
    this.initialAnimations();
    // this.initScrollAnimations();
  
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any): void {
    const navbar = this.el.nativeElement.querySelector('.top-nav');
    if (window.pageYOffset >= 50) {
      this.renderer.setStyle(navbar, 'background', '#063547');
      this.renderer.setStyle(navbar, 'color', 'black');
      this.renderer.setStyle(navbar, 'box-shadow', ' 0 0 50px 10px #adadad2d');
    } else {
      this.renderer.removeStyle(navbar, 'background');
      this.renderer.removeStyle(navbar, 'color');
      this.renderer.removeStyle(navbar, 'box-shadow');
    }
  }

  initialAnimations(): void {
    gsap.from(this.menu.nativeElement.childNodes, {
      duration: 0.5,
      opacity: 0,
      y: -20,
      stagger: 0.2,
      delay: 0.5,
    });

    gsap.from(this.logo.nativeElement.childNodes, {
      duration: 0.5,
      opacity: 0,
      y: -20,
      stagger: 0.2,
      delay: 0.5,
    });
  }




  logOut() {
    this.authService.setCurrentUser(null);
    localStorage.removeItem('token')
    this.router.navigate(['/'])
  }
}
