import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Emitters } from '../emitters/emitter';
import * as xls from 'xlsx';
import { CommonModule } from '@angular/common';
import { ColumnMode, DatatableComponent, NgxDatatableModule, SelectionType, SortDirection, SortType, TableColumn } from '@swimlane/ngx-datatable';
import { users } from '../constants/users-constants';
import { FormsModule } from '@angular/forms';

@Component({
  standalone:true,
  selector: 'app-dashboard',
  imports:[CommonModule, FormsModule,NgxDatatableModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {  

  message = "";
  uploadUsers: any;

  ColumnMode = ColumnMode;

  // rows = [];
  selected: any  = [];

  SelectionType = SelectionType;


  @ViewChild('iceTable')
  iceTable: DatatableComponent;
  editing: any;
  isEditable: any = {};

  // ngAfterViewInit(): void {
  //   this.iceTable.onColumnSort({
  //     sorts: [
  //       { prop: 'startTime', dir: SortDirection.desc },
  //       { prop: 'iceSouth', dir: SortDirection.desc },
  //     ],
  //   });
  // }
  sortType: SortType = SortType.single;

  columns: TableColumn[] = [
    {
      sortable: false,
      name: 'id',
    },
    {
      name: 'name'
    },
    {
      name: 'email'
    },
    {
      name: 'mobileNo'
    }
  ];

  rows = [];  
  usersHeader = users;
  authenticated: boolean;
  user = { id : 1, name : 'Hello'};

  constructor(
    private http: HttpClient

  ) {
  }

  ngOnInit(): void {
    Emitters.authEmitter.subscribe((auth:boolean) => {
      console.log(auth)
      this.authenticated = auth
    })
    this.http
    .get('http://localhost:5000/api/user', {
      withCredentials: true
    })
    .subscribe((res: any) => {
      this.message = `Hi ${res.name}`; 
      Emitters.authEmitter.emit(true)
    },
    (err) =>  {
      this.message = "You are not logged In";
      Emitters.authEmitter.emit(false)
    }
  );
  }

  ngOnChanges() {
    console.log(this.isEditable);
  }

  readExeFile(e: any): void {

    const file = e.target.files[0];
    let fr = new FileReader();
    fr.readAsArrayBuffer(file);

    fr.onload = () =>{
      let data = fr.result;

      let workBook = xls.read(data,{type:'array'});

      const sheetName = workBook.SheetNames[0];

      const sheet1 = workBook.Sheets[sheetName]

      this.uploadUsers = xls.utils.sheet_to_json(sheet1, {raw:true});
      console.log(this.uploadUsers);
      this.rows = this.uploadUsers;

    }
  }

  callServer() {
    const headers = new HttpHeaders()
          .set('Authorization', 'my-auth-token')
          .set('Content-Type', 'application/json');

    this.http.post('http://localhost:5000/sendmail', JSON.stringify(this.user), {
      headers: headers
    })
    .subscribe(data => {
      console.log(data);
    });
  }

  //@ts-ignore
  color({ row, column, value }) {
    return {
      yellow: row.id === 7,
    };
  }
// @ts-ignore
  onSelect({ selected }) {
    console.log('Select Event', selected, this.selected);

    this.selected.splice(0, this.selected.length);
// @ts-ignore

    this.selected.push(...selected);
  }

  onActivate(event: any) {
    console.log('Activate Event', event);
  }

  // add() {
  //   this.selected.push(this.rows[1], this.rows[3]);
  // }

  // update() {
  //   this.selected = [this.rows[1], this.rows[3]];
  // }

  // remove() {
  //   this.selected = [];
  // }
// @ts-ignore

  displayCheck(row) {
    return row.name !== 'Ethel Price';
  }

  enableEdit(index: any) {
    console.log('Edit', this.isEditable);
    this.isEditable[index] = !this.isEditable[index];
  }
  onCancel(index: any) {
    console.log('Cancel', this.isEditable);
    this.isEditable[index] = !this.isEditable[index];
  }
  onSave(index: any, value: any) {
    this.isEditable[index] = !this.isEditable[index];
    console.log(this.uploadUsers[index]);
  }

  //@ts-ignore
  onDelete(index) {
    console.log(index);
    this.uploadUsers.splice(index, 1);
    console.log(this.uploadUsers);
    this.uploadUsers = [...this.uploadUsers];
  }


  delete(value: any) {
    console.log(value);
  }

  onClickBtn() {
    alert("Hi Add Button !!!!!");
}

}
