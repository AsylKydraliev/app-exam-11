import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.sass']
})
export class RegistrationComponent implements OnInit {
  @ViewChild('f') form!: NgForm;

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {

  }
}
