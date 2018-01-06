import { Component, OnInit, Inject, forwardRef } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, FormControl,  } from '@angular/forms';
import { Router } from '@angular/router'

@Component({
  selector: 'app-presume',
  templateUrl: './presume.component.html',
  styleUrls: ['./presume.component.css']
})
export class PresumeComponent implements OnInit {

  labelPosition: string = 'left'
  validateForm: FormGroup
  validateForm2: FormGroup
  validateForm3: FormGroup
  validateForm4: FormGroup
  constructor(
    @Inject(forwardRef(() => FormBuilder)) private formBuilder: FormBuilder,
    private router: Router
  ) {
  }

  submit(): void {
    console.log(this.validateForm.value)
  }
  submit2(): void {
    console.log(this.validateForm2.value)
  }
  submit3(): void {
    console.log(this.validateForm3.value)
  }
  submit4(): void {
    console.log(this.validateForm4.value)
  }
  reset(): void {
    this.validateForm.reset()
  }
  handleMaolink(name): void {
    let offTop = document.getElementById(name).offsetTop
    document.body.scrollTop = document.documentElement.scrollTop = offTop
    this.router.navigate(['presume'],{ fragment: name })
  }
  ctrl(item: string): AbstractControl {
    return this.validateForm.controls[item]
  }

  statusCtrl(item: string): string {
    if (!this.validateForm.controls[item]) return
    const control: AbstractControl = this.validateForm.controls[item]
    return control.dirty && control.hasError('status') ? control.errors.status : ''
  }

  messageCtrl(item: string): string {
    if (!this.validateForm.controls[item]) return
    const control: AbstractControl = this.validateForm.controls[item]
    return control.dirty && control.hasError('message') ? control.errors.message : ''
  }

  ngOnInit(): void {
    this.validateForm = this.formBuilder.group({
      name: [ '', [this.cityValidator] ],
      sex: [ '' ],
      phone: [''],
      email: [ '' ],
      address: [''],
      time: [ '']
    })
    this.validateForm2 = this.formBuilder.group({
      schoolName: [''],
      times: [''],
      majorName: [''],
      education: [''],
      remark: ['']
    })
    this.validateForm3 = this.formBuilder.group({
      comName: [''],
      times: [''],
      job: [''],
      money: [''],
      remark: ['']
    })
    this.validateForm4 = this.formBuilder.group({
      money: [''],
      jobs: [''],
      tims: [''],
      org: ['']
    })
  }

  cityValidator = (control: FormControl) => {
    if (!control.value) {
      return { status: 'error', message: '请填写姓名' }
    }
    return { status: 'success' }
  }

}
