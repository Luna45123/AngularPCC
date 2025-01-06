import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'thDate'
})
export class ThDatePipe implements PipeTransform {
    monthsInThai: string[] = [
      "มกราคม",
      "กุมภาพันธ์",
      "มีนาคม",
      "เมษายน",
      "พฤษภาคม",
      "มิถุนายน",
      "กรกฎาคม",
      "สิงหาคม",
      "กันยายน",
      "ตุลาคม",
      "พฤศจิกายน",
      "ธันวาคม"
  ];

    shortMonthsInThai: string[] = [
      "ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", 
      "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."
  ];
  transform(data: any): string {
    if (!data) {
      console.warn('No date provided to ThDatePipe');
      return '';
    }

    // Parse dd/MM/yyyy format
    const parts = data.split('/');
    if (parts.length !== 3) {
      console.warn('Invalid date format provided to ThDatePipe:', data);
      return data;
    }

    const [day, month, year] = parts.map(Number);
    const date = new Date(year, month - 1, day); // Create valid Date object

    if (isNaN(date.getTime())) {
      console.warn('Invalid date provided to ThDatePipe:', data);
      return data;
    }

    const buddhistYear = date.getFullYear() + 543;
    const shortMonth = this.shortMonthsInThai[date.getMonth()];
    return `${day} ${shortMonth} ${buddhistYear}`;
  }

}
