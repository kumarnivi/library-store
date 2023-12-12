import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import emailjs from '@emailjs/browser';
import { ToastrService } from 'ngx-toastr';
import * as AOS from 'aos';
import { gsap } from 'gsap/gsap-core';


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
  
  constructor(private el: ElementRef, private fb: FormBuilder, private toaster:ToastrService)
  {
   this.initializeForm()
  }


  @ViewChild('imageFirst', { static: true }) imageFirst!: ElementRef< HTMLDivElement>;
  


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






}

initScrollAnimations(): void {
  gsap.to(this.imageFirst.nativeElement, {
    scrollTrigger: {
      trigger: this.imageFirst.nativeElement,
      scrub: true,

      start: '50% center',
    } as gsap.plugins.ScrollTriggerInstanceVars,
    duration: 1.1,
    scale: 1.5,
    height: 250,


    
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


}
