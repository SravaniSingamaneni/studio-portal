import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent {
  submitted = false;

  serviceOptions = ['Event Planning', 'Decorations', 'Party Hosting', 'Gift Shop', 'Not sure yet'];

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.pattern(/^[0-9+\-() ]{7,15}$/)]],
    service: ['', Validators.required],
    eventDate: [''],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  constructor(private fb: FormBuilder) { }

  // shortcut so the template can write f['email'] instead of form.controls['email']
  get f() { return this.form.controls; }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();   // reveals all error messages
      return;
    }
    console.log('Form data:', this.form.value);   // later: send to the C# API
    this.submitted = true;
    this.form.reset({ service: '' });
  }
}
