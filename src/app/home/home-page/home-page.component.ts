import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import emailjs from '@emailjs/browser';
import { ToastrService } from 'ngx-toastr';
import * as AOS from 'aos';
import { gsap } from 'gsap/gsap-core';
import * as ScrollMagic from 'scrollmagic';
// import * as fullpage from 'fullpage.js/dist/fullpage'; // Import fullpage.js with type definitions
import {  Power2, TimelineMax } from 'gsap'; 
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';

// declare var TweenMax: any;

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  myForm: FormGroup | any ;
  emailjs:any;
  loading: boolean = false;
  submitted: any;
  myForm1: FormGroup | any
  display: any;
  center:google.maps.LatLngLiteral = {lat:24,lng:12}
  zoom = 4;
  markerPositions: any;

  constructor(private el: ElementRef, private fb: FormBuilder, private toaster:ToastrService)
  {
   this.initializeForm()
   this.initializeForm1()
  }

  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow ;
  @ViewChild('imageFirst', { static: true }) imageFirst!: ElementRef< HTMLDivElement>;
  
  

  openInfoWindow(marker: MapMarker) {
    this.infoWindow.open(marker);
  }
  
  
  // ngAfterViewInit() {
  //   // Initialize fullpage.js
  //   new fullpage('#fullpage', {
  //     anchors: ['firstPage', 'secondPage', 'thirdPage'],
  //     menu: '#menu',
  //     autoScrolling: false,
  //   });

  //   // Init ScrollMagic controller
  //   let controller = new ScrollMagic.Controller();

  //   // Tween - Section 2
  //   let tween1 = TweenMax.to('#bg img', 1, {
  //     maxWidth: '1200px',
  //     top: '30%',
  //     left: '80%',
  //     opacity: 0.25,
  //     ease: Power2.easeInOut // You can adjust easing as needed
  //   });

  //   new ScrollMagic.Scene({
  //     triggerElement: '#section2'
  //   })
  //   .setTween(tween1) // Associate TweenMax animation with the ScrollMagic scene
  //   .addTo(controller);

  //   // Tween - Section 3
  //   let tween2 = TweenMax.to('#bg img', 1, {
  //     top: '20%',
  //     ease: Power2.easeInOut // Adjust easing as needed
  //   });

  //   new ScrollMagic.Scene({
  //     triggerElement: '#section3',
  //     duration: 300
  //   })
  //   .setTween(tween2) // Associate TweenMax animation with the ScrollMagic scene
  //   .addTo(controller);
  // }
  


// ngAfterViewInit(): void {
//   this.initScrollAnimations()
// }




ngOnInit(): void {

  AOS.init({
    // Global settings:
    disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
    startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
    initClassName: 'aos-init', // class applied after initialization
    animatedClassName: 'aos-animate', // class applied on animation
    useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
    disableMutationObserver: false, // disables automatic mutations' detections (advanced)
    debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
    throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)
    // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
    offset: 120, // offset (in px) from the original trigger point
    delay: 0, // values from 0 to 3000, with step 50ms
    duration: 400, // values from 0 to 3000, with step 50ms
    easing: 'ease', // default easing for AOS animations
    once: false, // whether animation should happen only once - while scrolling down
    mirror: false, // whether elements should animate out while scrolling past them
    // Anchor placement:
    anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
  });


  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".two",
      start: "0% 195%",
      end: "70% 150%",
      scrub: true,
      // markers: true,
    }
  });


  tl.to("#fanta",{
    top: "188%",
    left: "60%",    
})

this.initScrollAnimations()




}

moveMap(event:google.maps.MapMouseEvent){
  if(event.latLng != null) {
    this.center =(event.latLng?.toJSON())
  }
}

move(event:google.maps.MapMouseEvent){
  if(event.latLng != null) {
    this.display =(event.latLng?.toJSON())
  }
}


initScrollAnimations(): void {
  gsap.to(this.imageFirst.nativeElement, {
    scrollTrigger: {
      trigger: this.imageFirst.nativeElement,
      scrub: true,
      start: '20% center',
     
    } as gsap.plugins.ScrollTriggerInstanceVars,
    duration: 1.1,
    scale: 1.5,
    height: 150,


    
  });

  
}



//  this.formGroup
initializeForm(): void {
  this.myForm = this.fb.group({
    toName:  new FormControl('',[
     Validators.required
    ]),
    fromEmail: new FormControl('',[
     Validators.required, Validators.email
    ]),
      
    message: new FormControl('', [
     Validators.required
    ]),
    phoneno:new FormControl( '',[
     Validators.required
    ])
})
}


get f(): { [key: string]: AbstractControl } {
  return this.myForm.controls;
}

// footer email
initializeForm1(): void {
  this.myForm1 = this.fb.group({
    email:  new FormControl('',[
     Validators.required, Validators.email
    ]),
  })

}

get l(): { [key: string]: AbstractControl } {
  return this.myForm1.controls;
}


onSubmit(): void {

  this.submitted = true
  if (this.myForm.valid) {
    this.loading = true
    const templateParams = {
      to_name: this.myForm.value.toName,
      from_email: this.myForm.value.fromEmail,
      phoneno: this.myForm.value.phoneno,
      message: this.myForm.value.message
  };
    console.log(this.myForm.value)
    emailjs.send('service_0q7yc3a','template_qm22pv4', templateParams, 'UXMQMKDA99YgnOre5')
    .then((response) => {
      this.submitted = false
      this.toaster.success('Signup successfully!');
      this.loading = false
       console.log(this.toaster.success() ,'SUCCESS!');
       this.myForm.reset();
    }, (err) => {
       console.log('FAILED...', err);
       this.loading = true
    });
  } else {
    this.loading = false
  }


this.loading = false
}




onSubmit1(): void {

  this.submitted = true
  if (this.myForm1.valid) {
    this.loading = true
    const templateParams = {
      email: this.myForm.value.email,
      
  };
    console.log(this.myForm.value)
    emailjs.send('service_0q7yc3a','template_qm22pv4', templateParams, 'UXMQMKDA99YgnOre5')
    .then((response) => {
      this.submitted = false
      this.toaster.success('Signup successfully!');
      this.loading = false
       console.log(this.toaster.success() ,'SUCCESS!');
       this.myForm1.reset();
    }, (err) => {
       console.log('FAILED...', err);
       this.loading = true
    });
  } else {
    this.loading = false
  }


this.loading = false
}
}
