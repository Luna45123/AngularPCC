import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { DtDataItem } from '../dt-data-item';
import { ThDatePipe } from '../shared/th-date.pipe';
import Swal from 'sweetalert2';
import { DtDataItem2 } from '../dt-data-item2';

@Component({
  selector: 'app-lab2v2',
  templateUrl: './lab2v2.component.html',
  styleUrls: ['./lab2v2.component.scss'],
  providers: [DatePipe, ThDatePipe]
})
export class Lab2v2Component implements OnInit {

  @ViewChild('seeModal') seeModal!: ModalDirective;
  bsConfig: Partial<BsDatepickerConfig>;
  constructor(private http: HttpClient, private datepipe: DatePipe) {
    this.bsConfig = Object.assign({}, { locale: 'th', containerClass: 'theme-default', isAnimated: true, showWeekNumbers: false, dateInputFormat: 'DD/MM/YYYY' });
  }

  ngOnInit(): void {
  }

  date: any;

  headDate: any;

  headNumber: string = '';

  totalRecords: any;

  totalRecordsDt: any;

  pageSize: number = 10;

  pageSizeDt: number = 10;

  currentPageData: any[] = [];

  currentPageIndex: number = 1;

  current: number = 1;

  currentDt: number = 1;

  HdData: any[] = [];

  filteredData: any[] = [];

  Dtdata: any[] = [];

  filteredDataDt: any[] = [];

  currentPageDataDt: any;

  formBookNumber: any;

  formNumber: any;

  formDate: any;

  formAmout: any;

  formPtextNumber: any;

  formBranch: any;

  formBsName: any;

  text: number = 0;

  vrtrate: number = 0;

  vrtrateag: number = 0;

  charge: number = 0;

  id: number = 0;

  index: number = -1;

  loading: boolean = false;

  addBtnText: String = "เพิ่ม";

  deleteCheck: boolean = false;

  currentPageIndexDt: any;

  tempInput: String = "";

  heand:String = "";
  searchHDApi() {
    console.log(this.headNumber);
    this.heand = this.headNumber;
    if (this.date == '' || this.date == null) {
      this.searchDT();
    } else {
      this.open();
      this.http.get<any>(`http://localhost:8778/sunvat/getBydateHD?date=${this.datepipe.transform(this.date, 'dd/MM/yyyy')}`, {}).toPromise().then((response) => {
        console.log(response);
        this.HdData = [...response];
        this.reset();

      });
    }

  }

  searchDT() {
    console.log(this.headNumber);
    this.http.get<any>(`http://localhost:8778/sunvat/getDT?fk=${this.headNumber}`, {}).toPromise().then((response) => {
      this.Dtdata = [...response];
      console.log(this.Dtdata);
      this.filterDataDt();
    });
  }

  filterData(): void {
    this.filteredData = [...this.HdData];
    this.totalRecords = this.filteredData.length;
    this.currentPageData = this.filteredData.slice(0, this.pageSize);
  }

  filterDataDt(): void {
    this.currentPageDataDt = [...this.Dtdata];
    // this.totalRecordsDt = this.filteredDataDt.length;
    // this.currentPageDataDt = this.filteredDataDt.slice(0, this.pageSizeDt);
  }

  open() {
    this.seeModal.show();
  }

  close() {
    this.seeModal.hide();
    this.date = null;
  }

  clearAll() {
    this.clearFormDT();
    this.Dtdata = [];
    this.HdData = [];
    this.clearHD();
    this.filterDataDt();
    this.filterData();
    this.index = -1;
  }

  clearHD() {
    this.date = null;
    this.headNumber = "";
  }

  clearFormDT() {
    this.formBookNumber = null;
    this.tempInput = "";
    this.formDate = null;
    this.formAmout = null;
    this.formPtextNumber = null;
    this.formBranch = null;
    this.formBsName = null;
    this.text = 0;
    this.vrtrate = 0;
    this.vrtrateag = 0;
    this.charge = 0;
  }

  onPageChange(page: number): void {
    this.current = page;
    const startIndex = (this.current - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.currentPageData = this.filteredData.slice(startIndex, endIndex);
  }

  onPageChangeDt(page: number): void {
    console.log("W")
    this.currentDt = page;
    const startIndex = (this.currentDt - 1) * this.pageSizeDt;
    const endIndex = startIndex + this.pageSizeDt;
    this.currentPageDataDt = this.filteredDataDt.slice(startIndex, endIndex);
  }


  reset() {
    this.filterData();
  }
  addData() {
    let newData!: DtDataItem2;
    if (!this.formBookNumber || !this.tempInput || !this.formDate || !this.formAmout || !this.formPtextNumber || !this.formBranch || !this.formBsName) {
      alert('กรุณากรอกข้อมูลให้ครบทุกช่อง');
      return;
    }
    if (this.index >= 0) {
      console.log(this.heand);
      newData = {
        id: this.id, bookRef: this.formBookNumber, vdtNo: this.heand, date: this.datepipe.transform(this.formDate, 'dd/MM/yyyy'), createDate: this.datepipe.transform(this.formDate, 'dd/MM/yyyy'), pnum: this.formPtextNumber, bsName: this.formBsName, amount: this.formAmout, vatAmount: this.text, vatTax: this.vrtrate, vatAgent: this.vrtrateag, freeAmount: this.charge, branch: this.formBranch, color: 'edit', delete: false, update: true, tempInput: this.tempInput,createBy:"System",updateBy:"System"
      };
      this.Dtdata[this.index] = newData;
    } else {
      newData = {
        id: 0, bookRef: this.formBookNumber, vdtNo: this.heand, date: this.datepipe.transform(this.formDate, 'dd/MM/yyyy'), createDate: this.datepipe.transform(this.formDate, 'dd/MM/yyyy'), pnum: this.formPtextNumber, bsName: this.formBsName, amount: this.formAmout, vatAmount: this.text, vatTax: this.vrtrate, vatAgent: this.vrtrateag, freeAmount: this.charge, branch: this.formBranch, color: 'add', delete: false, update: false, tempInput: this.tempInput,createBy:"System",updateBy:"System"
      };
      this.Dtdata.push(newData);
    }


    this.id = 0;
    this.index = -1;
    this.filterDataDt();
    this.clearFormDT();
    this.addBtnText = "เพิ่ม";
  }

  parseDate(dateString: string): Date {
    const [day, month, year] = dateString.split('/').map(Number);
    return new Date(year, month - 1, day);
  }

  edit(data: any, index: any) {
    this.id = data.id;
    this.formBookNumber = data.bookRef;
    this.formNumber = data.vdtNo;
    this.formDate = data.createDate ? this.parseDate(data.createDate) : null;
    this.formAmout = data.amount;
    this.formPtextNumber = data.pnum;
    this.formBranch = data.branch;
    this.formBsName = data.bsName;
    this.index = index;
    this.addBtnText = "บันทึก";
    this.calltex();
    console.log(this.index);
  }



  calltex() {
    if (this.formAmout != '') {
      this.http.get<any>(`http://localhost:8778/sunvat/getVat?amount=${this.formAmout}`, {}).toPromise().then((response) => {
        console.log(response);
        this.text = response.tex;
        this.vrtrate = response.vrtrate;
        this.vrtrateag = response.vrtrateag;
        this.charge = response.charge;
      });
    }

  }

  delete(index: any) {
    if (!this.Dtdata[index].delete) {
      this.Dtdata[index].color = 'delete';
      this.Dtdata[index].delete = true;
    } else {
      this.Dtdata[index].color = 'non';
      this.Dtdata[index].delete = false;
    }
  }



  save() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    if (confirm("คุณต้องการบันทึกไหม?") == true) {
      this.loading = true;

      this.http.post<any>('http://localhost:8778/sunvat/saveAll', this.Dtdata, { headers }).subscribe(
        () => {
          this.searchDT();
          this.loading = false;
          alert("บันทึกข้อมูลเรียบร้อย");
        },
        (error) => {
          console.error('Error saving data:', error);
          this.loading = false;
          alert("ไม่สามารถบันทึกได้กรุณาลองใหม่อีกครั้ง");
        }
      );
    };

    console.log(this.index);
  }
  onPageSizeChange(newSize: number): void {
    this.pageSizeDt = newSize;
    this.currentPageDataDt = this.Dtdata.slice(0, this.pageSizeDt);
  }
  fwF() {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Your work has been saved",
      showConfirmButton: false,
      timer: 1500,
    });
  }

}
