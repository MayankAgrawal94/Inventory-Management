import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { WebsiteService } from '../../../shared/service/website.service';

@Component({
  selector: 'app-add-view-product',
  templateUrl: './add-view-product.component.html',
  styleUrls: ['./add-view-product.component.scss']
})
export class AddViewProductComponent implements OnInit {
  
  CstmForm: FormGroup;
  formType: string = 'add';
  constructor(
  	private formbulider: FormBuilder,
  	private webService:WebsiteService,
  ) { 

     	this.CstmForm = this.formbulider.group({
        name: [null, [Validators.required]],
        description: [null],
        quatity: [null, [Validators.required]],
      });
  }

  ngOnInit() {
  	this.webService._product.subscribe(data=>{
  		this.receivingData(data);
  	})
  }

  receivingData(data){
  		// console.log(data)	
  	if(data.type == 'edit'){
  		this.formType = 'edit'
  		this.CstmForm.controls['name'].setValue(data.body.name)
  		this.CstmForm.controls['description'].setValue(data.body.description)
  		this.CstmForm.controls['quatity'].setValue(data.body.quatity)
  	}else if(data.type == 'delete'){
  		this.onCancel();
  	}
  }

  onCancel(){
  	this.formType = 'add'
  	this.CstmForm.reset();
  }

  onSubmit(){
  	if(this.formType == 'add'){
  		this.webService._createNewProduct(this.CstmForm.value)
  		.subscribe(res=>{
  			if(res.error == false){
			  	let obj = {
			  		type: 'add',
			  		body: res.body
			  	}
			  	this.webService._product.next(obj)
			  	this.webService.openSnackBar(res.message, 'Success!', 2000); 
			  	this.onCancel();
  			}else{
  				this.webService.openSnackBar(res.message, 'Error!', 2000); 
  			}
  		},err=>{
      	console.log(err)
      	this.webService.openSnackBar('Server encountered with some error, please try after some time.', 'Error!', 2000);
  		})
  	}
  }

}
