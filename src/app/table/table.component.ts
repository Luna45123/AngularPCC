import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { DatePipe } from '@angular/common';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import * as echarts from 'echarts';
import { ThDatePipe } from '../shared/th-date.pipe';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  providers: [DatePipe],
})

export class TableComponent implements OnInit {
  @ViewChild('addModel') addModel!: ModalDirective;
  @ViewChild('deleteModel') deleteModel!: ModalDirective;
  dayList = [{ day: 'จันทร์', col: 'เหลือง' },
  { day: 'อังคาร', col: 'ชมพู' },
  { day: 'พุธ', col: 'เขียว' },
  { day: 'พฤหัส', col: 'ส้ม' },
  { day: 'ศุกร์', col: 'ฟ้า' },
  { day: 'เสาร์', col: 'ม่วง' },
  { day: 'อาทิตย์', col: 'แดง' }
  ];
  birthday: any;

  userId: number = 1001;

  dayInfo: any;

  colorInfo: any;

  current: number = 1;

  firstName: string = '';

  lastName: string = '';

  sex: string = '';

  formage: any;

  currentPageData: any[] = [];
  pageSize: number = 5;
  totalRecords: number = 0;
  recBy:any;

  filteredData: any[] = [];
  searchUserId: any;
  searchName: any;
  searchAge: any;
  searchBirthday: any;
  searchGender: any;
  searchRDate: any;
  searchBy: any;
  currentPageIndex = 1;
  currentEditIndex: number | null = null;
  isClicked = false;

  femaleStat: any = 0;
  maleStat: any = 0;
  otherStat: any = 0;

  ageStat1: any = 0;
  ageStat2: any = 0;
  ageStat3: any = 0;
  ageStat4: any = 0;
  id:number = 0;
  userIdToDelete: number = 0;

  bsConfig: Partial<BsDatepickerConfig>;
  constructor(private http: HttpClient, private datepipe: DatePipe, private thDatePipe: ThDatePipe) {
    this.bsConfig = Object.assign({}, { locale: 'th', containerClass: 'theme-default', isAnimated: true, showWeekNumbers: false, dateInputFormat: 'DD/MM/YYYY' });
  }
  // getRandomSex = (): string => {
  //   const sexes = ['male', 'female', 'other']; // Array of options
  //   const randomIndex = Math.floor(Math.random() * sexes.length); // Random index
  //   return sexes[randomIndex];
  // };

  sexMapping: { [key: string]: string } = {
    male: 'ชาย',
    female: 'หญิง',
    other: 'อื่นๆ',
    "":'-'
  };
  
  idList: any[] = [];
  // Array.from({ length: 30 }, (_, i) => ({
  //   userId: `U${i + 1}`,
  //   firstName: `FirstName${i + 1}`,
  //   lastName: `LastName${i + 1}`,
  //   birthday: `01/01/199${i % 10}`,
  //   age: 20 + (i % 10) * 5,
  //   sex: this.getRandomSex(),
  //   date: `${this.datepipe.transform(new Date(), 'dd/MM/yyyy')}`,
  //   by: `FirstName${i + 1}`
  // }));

  ngOnInit(): void {
    this.callApi();
    this.reset();
    this.searchGender = "";
  }

  reset(){
    this.filterData();
    this.updateGenderStats();
    this.genderChart();
    this.updateAge();
    this.ageBar();
    this.currentEditIndex = null;
  }

  onPageChange(page: number): void {
    this.current = page;
    const startIndex = (this.current - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.currentPageData = this.filteredData.slice(startIndex, endIndex);
  }

  onPageSizeChange(newSize: number): void {
    this.pageSize = newSize;
    this.currentPageData = this.idList.slice(0, this.pageSize);
  }

  ngOnChanges(): void {
    this.filterData();
  }
  filterData(): void {
    // if (this.searchName) {
    //   this.filteredData = this.idList.filter(user =>
    //     (user.firstName + ' ' + user.lastName).toLowerCase().includes(this.searchName.toLowerCase())
    //   );
    this.filteredData = [...this.idList];
    this.totalRecords = this.filteredData.length;
    this.currentPageData = this.filteredData.slice(0, this.pageSize);
  }

  callApi() {
    this.http.get<any>('http://localhost:8778/formUser/getAll', {}).toPromise().then((response) => {
      console.log(response);
      this.idList = response;
      this.reset();
    });
  }

  callApiSearch() {
    let [name, lastname] = '';
    const params: any = {};
    if (this.searchAge) params.age = this.searchAge;
    if (this.searchBirthday) params.birthDate = this.datepipe.transform(this.searchBirthday, 'dd/MM/yyyy');
    if (this.searchGender) params.gender = this.searchGender;
    if (this.searchName){
        [name, lastname] = this.searchName.split(" ");
        params.name = name;
        params.lastname = (lastname === undefined)? '':lastname;
    } 
    if (this.searchBy) params.recordedBy = this.searchBy;
    if (this.searchRDate) params.recordedDate = this.datepipe.transform(this.searchRDate, 'dd/MM/yyyy');
    if (this.searchUserId) params.userId = this.searchUserId;
  
    this.http.get<any>('http://localhost:8778/formUser/search', { params }).toPromise().then(
      (response) => {
        this.idList = response;
        this.currentPageIndex = 1;
        this.reset();
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  callApipost(newdata: {}) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    this.http.post<any>('http://localhost:8778/formUser/save', newdata, { headers}).toPromise().then((response) => {
      this.currentPageIndex=1;
      this.id=0;
      this.callApi();
      this.reset();
    });
  }



  open() {
    this.clear();
    this.addModel.show();
  }
  openD(){
    this.deleteModel.show();
  }
  close() {
    this.addModel.hide();
    this.clear();

  }
  closeD(){
    this.deleteModel.hide();
    this.userIdToDelete = 0;
  }

  add() {
    // this.callApipost();
    let today = this.datepipe.transform(new Date(), 'dd/MM/yyyy');
    let fomDate = this.datepipe.transform(this.birthday, 'dd/MM/yyyy');
    let newdata = { userId: this.userId, firstName: this.firstName, lastName: this.lastName, birthday: fomDate, age: this.formage, sex: this.sex, date: today, by: this.recBy,id:0};
    if (this.currentEditIndex !== null) {
      let newdataEdit = { userId: this.userId, firstName: this.firstName, lastName: this.lastName, birthday: fomDate, age: this.formage, sex: this.sex, date: today, by: this.recBy,id:this.currentEditIndex};
      this.callApipost(newdataEdit);
      this.currentEditIndex = null;
    } else {
      this.callApipost(newdata);
    }
    


    this.addModel.hide();
    this.filterData();
    this.updateAge();
    this.updateGenderStats();
    this.clear();

  }
  clear() {
    this.firstName = '';
    this.lastName = '';
    this.birthday = null;
    this.sex = '';
    this.formage = null;
    this.currentEditIndex = null;
    this.searchName = '';
    this.searchBirthday = null;
    this.searchUserId = '';
    this.searchRDate = null;
    this.searchGender = '';
    this.searchBy = '';
    this.searchAge = '';    
  }
  clearData(){
    this.clear();
    this.callApi();
  }

  calAge(bday: any, today: any) {
    if (this.birthday != null) {
      let age = today.getFullYear() - bday.getFullYear();
      const monthDiff = today.getMonth() - bday.getMonth();
      const dayDiff = today.getDate() - bday.getDate();

      if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        age--;
      }

      this.formage = age;
    }


  }
  bsValue() {
    let bday = new Date(this.birthday);
    let today = new Date();

    if (bday > today) {
      alert('วันเกิดไม่ถูกต้อง');
      this.formage = null;
      this.birthday = null;
      return;
    } else {
      this.calAge(bday, today);
    }
  }

  parseDate(dateString: string): Date {
    const [day, month, year] = dateString.split('/').map(Number);
    return new Date(year, month - 1, day);
  }

  edit(data: any, index: number): void {
    this.userId = data.userId;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.birthday = data.birthday ? this.parseDate(data.birthday) : null;
    this.sex = data.sex;
    this.formage = data.age;
    this.currentEditIndex = index;
    this.recBy = data.by;
    this.addModel.show();
  }
  delete(userId: number): void {
    this.userIdToDelete = userId;
    this.deleteModel.show();
  }
  confirmDelete(): void {
    if (this.userIdToDelete != 0) {
      this.http.delete<any>(`http://localhost:8778/formUser/delete?id=${this.userIdToDelete}`).toPromise().then((response) => {
        this.callApi();
        this.reset();
        this.currentPageIndex = 1;
        this.deleteModel.hide();
        this.userIdToDelete = 0;
      }).catch(error => {
        console.error('Error deleting user:', error);
        this.deleteModel.hide();
      });
    }
  }
  genderChart() {
    const chartDom = document.getElementById('gender')!;
    const myChart = echarts.init(chartDom,'dark');

    const option: echarts.EChartsOption = {
      title: {
        text: 'User Gender',
        subtext: 'เพศของผู้ใช้งาน',
        left: 'center',
        top: '30px'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: 'เพศ',
          type: 'pie',
          radius: '50%',
          data: [
            { value: this.femaleStat, name: 'หญิง' },
            { value: this.maleStat, name: 'ชาย' },
            { value: this.otherStat, name: 'อื่นๆ' }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgb(122, 97, 187)'
            }
          }
        }
      ]
    };
    // Set the options to the chart
    myChart.setOption(option);

    // Handle window resizing to keep the chart responsive
    window.addEventListener('resize', () => {
      myChart.resize();
    });
  }
  updateGenderStats() {
    this.femaleStat = this.idList.filter(user => user.sex.toLowerCase() === 'female').length;
    this.maleStat = this.idList.filter(user => user.sex.toLowerCase() === 'male').length;
    this.otherStat = this.idList.filter(user => user.sex.toLowerCase() === 'other').length;
  }

  ageBar() {
    var chartDom = document.getElementById('age');
    var myChart = echarts.init(chartDom,'dark');
    var option;

    option = {
      title: {
        text: 'User age',
        left: 'center',
        top: '15px'
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow"
        }
      },
      xAxis: {
        type: 'category',
        data: ['15-25', '25-40', '40-60', '60 or above'],
        axisTick: {
          alignWithLabel: true
        }
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          itemStyle: { normal: { color: 'rgb(150, 129, 204)' } },
          data: [this.ageStat1, this.ageStat2, this.ageStat3, this.ageStat4],
          type: 'bar',
          showBackground: true,
          barWidth: "47%",
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)'
          }
        }
      ]
    };

    option && myChart.setOption(option);
  }
  updateAge() {
    this.ageStat1 = this.idList.filter(user => user.age >= 15 && user.age < 25).length;
    this.ageStat2 = this.idList.filter(user => user.age >= 25 && user.age < 40).length;
    this.ageStat3 = this.idList.filter(user => user.age >= 40 && user.age < 60).length;
    this.ageStat4 = this.idList.filter(user => user.age > 60).length;
  }
}
