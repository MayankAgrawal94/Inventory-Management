import {Component, OnInit, ViewChild, OnDestroy} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { WebsiteService } from '../../../shared/service/website.service';


export interface StockData {
  rec_id: number;
  name: string;
  description: string;
  quatity: number;
}

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent implements OnInit {

  displayedColumns: string[] = [ 'name', 'quatity','description', 'action' ];
  dataSource: MatTableDataSource<StockData>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  
  serviceData:any;


  constructor(
    private webService:WebsiteService,
  ) { 
    this.serviceData = {}
    this.serviceData.tableList = []
  }

  ngOnInit() {
    this._getTableData();

  	this.webService._product.subscribe(data=>{
  		this.receivingData(data);
  	})

  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  updateTable(){
    this.dataSource = new MatTableDataSource(this.serviceData.tableList);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  receivingData(data){
  	// console.log(data)	
  	if(data.type == 'add'){
  		this.serviceData.tableList.push(data.body)
  		this.updateTable();
  	}
  }

  _getTableData(){
    this.webService._getAllProducts()
    .subscribe(res=>{
      // console.log(res)
      if(res.error == false){
        this.serviceData.tableList = res.body
        this.updateTable();
      }else{
        this.webService.openSnackBar(res.message, 'Error!', 2000); 
      }
    },err=>{
      console.log(err)
      this.webService.openSnackBar('Server encountered with some error, please try after some time.', 'Error!', 2000);
    })
  }

  onEdit(row){
  	let obj = {
  		type: 'edit',
  		body: row
  	}
  	this.webService._product.next(obj)
  }

  onDelete(id){
		this.webService._productDelete(id)
		.subscribe(res=>{
			if(res.error == false){
		  	let obj = {
		  		type: 'delete',
		  		body: id
		  	}
		  	this.webService._product.next(obj)
		  	this.webService.openSnackBar(res.message, 'Success!', 2000); 
		  	this.dataSource.data = this.dataSource.data.filter(it=> it.rec_id != id)
		  	this.serviceData.tableList = this.serviceData.tableList.filter(it=> it.rec_id != id)
			}else{
				this.webService.openSnackBar(res.message, 'Error!', 2000); 
			}
		},err=>{
    	console.log(err)
    	this.webService.openSnackBar('Server encountered with some error, please try after some time.', 'Error!', 2000);
		})
  }

  ngOnDestroy() {
    // this.end();
  }

}
