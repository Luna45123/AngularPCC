import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dropfile',
  templateUrl: './dropfile.component.html',
  styleUrls: ['./dropfile.component.scss'],
  providers: [DatePipe]

})
export class DropfileComponent implements OnInit {
  @ViewChild('pdfModal') pdfModal!: ModalDirective;
  @ViewChild('dropfileModal') dropfileModal!: ModalDirective;
  pdfUrls: SafeResourceUrl[] = [];  // Store URLs for PDF previews
  selectedPdfUrl: SafeResourceUrl | null = null;  // Currently selected PDF URL for viewing
  cdata: any[] = [];
  timestamp: string = ""
  base64Files: { id:number,name: string; base64: string ,time:string,path:string}[] = [];
  pdf: SafeResourceUrl | undefined;
  time:string = "";

  constructor(private http: HttpClient, private sanitizer: DomSanitizer, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.getPdf();
  }



  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  
    const files = event.dataTransfer?.files;
    if (files) {
      this.handleFiles(files); // Call the new method to handle files
    }
    console.log("drop");
  }


  handleFile(file: File): void {
    if (file.type === 'application/pdf') {
      // this.files.push(file);
     
      // this.renderPdf(file);
      this.closedrop();
    } else {
      alert('Only PDF files are allowed.');
    }
    // this.cdata = [...this.files];
  }


  // onFilesSelected(event: Event): void {
  //   const input = event.target as HTMLInputElement;
  //   if (input.files) {
  //     for (let i = 0; i < input.files.length; i++) {
  //       this.handleFile(input.files[i]);
  //     }
  //   }
  // }
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      Array.from(input.files).forEach((file) => {
        const reader = new FileReader();

        reader.onload = () => {
          const base64String = reader.result as string;
          const currentDateAndTime = this.datePipe.transform(new Date(), 'dd-MM-yyyy HH:mm:ss');
          if (currentDateAndTime) {
            const [datePart, timePart] = currentDateAndTime.split(' '); // Split into date and time
            const [day, month, year] = datePart.split('-'); // Split date into parts
            const beYear = parseInt(year, 10) + 543; // Convert to BE year
            this.time = (`${day}-${month}-${beYear} ${timePart}`); // Return formatted string with time
          }
          this.base64Files.push({
            id:0,
            name: file.name,
            base64: base64String.substring('data:application/pdf;base64,'.length),
            time: this.time,
            path: `C:/${file.name}`
          });
          console.log(`File: ${file.name}, Base64: ${base64String.substring(0, 30)}...`);
          this.savePDF();
        };

        reader.readAsDataURL(file); // Read file as Base64
      });
    }


  }



  handleFiles(files: FileList): void {
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
  
      reader.onload = () => {
        const base64String = reader.result as string;
        const currentDateAndTime = this.datePipe.transform(new Date(), 'dd-MM-yyyy HH:mm:ss');
        if (currentDateAndTime) {
          const [datePart, timePart] = currentDateAndTime.split(' '); // Split into date and time
          const [day, month, year] = datePart.split('-'); // Split date into parts
          const beYear = parseInt(year, 10) + 543; // Convert to BE year
          this.time = (`${day}-${month}-${beYear} ${timePart}`); // Return formatted string with time
        }
        this.base64Files.push({
          id: 0,
          name: file.name,
          base64: base64String.substring('data:application/pdf;base64,'.length),
          time: this.time,
          path: `C:/${file.name}` // Path, though not accurate in browser environment
        });
        console.log(`File: ${file.name}, Base64: ${base64String.substring(0, 30)}...`);
        this.savePDF();
      };
  
      reader.readAsDataURL(file); // Read file as Base64
    });
  }


  savePDF() {
    this.http.post<any>('http://localhost:8778/sunvat/pdf', this.base64Files).subscribe(
      () => {
        this.base64Files = [];
        this.getPdf();
        this.dropfileModal.hide();
      },
      (error) => {
        console.error('Error saving data:', error);
        alert("ไม่สามารถบันทึกได้กรุณาลองใหม่อีกครั้ง");
      }
    );
  }

  getPdf(): void {
    this.http.get<any>(`http://localhost:8778/sunvat/getPdf`).toPromise().then((response) => {
      this.base64Files = response;  // Assuming response is an array of { name, base64 }
      // Now extract the base64 data and push to pdfUrls
      this.pdfUrls = this.base64Files.map(file => file.base64);
      this.cdata = [...this.pdfUrls];

    }).catch((error) => {
      console.error('Error fetching PDFs from backend:', error);
    });
  }

  // renderPdf(file: File): void {
  //   const reader = new FileReader();
  //   reader.onload = (e: any) => {
  //     const pdfData = new Uint8Array(e.target.result);
  //     const pdfUrl = URL.createObjectURL(new Blob([pdfData], { type: 'application/pdf' }));

  //     // Sanitize the URL to bypass Angular's security checks
  //     this.pdfUrls.push(this.sanitizer.bypassSecurityTrustResourceUrl(pdfUrl));
  //   };
  //   reader.readAsArrayBuffer(file);
  // }

  // Handle file click to display the selected PDF
  onFileClick(index: number): void {
    // Set the selected PDF URL correctly and show the modal
    if (this.pdfUrls[index]) {
      const pdfBase64 = `data:application/pdf;base64,${this.pdfUrls[index]}`;
      this.pdf = this.sanitizer.bypassSecurityTrustResourceUrl(pdfBase64);
      this.selectedPdfUrl = this.pdfUrls[index];
      this.pdfModal.show();
    } else {
      console.error('Selected PDF URL is invalid');
    }
  }

  opendrop() {
    this.dropfileModal.show();
  }

  closedrop() {
    this.dropfileModal.hide();
  }

  closePDF() {
    // console.log(this.files);
    this.pdfModal.hide();
    this.selectedPdfUrl = null;

  }

  onPdfModalClosed(): void {
    console.log('PDF modal has been closed');
    this.selectedPdfUrl = null; // Reset the selected PDF URL
  }

  deletePdf(id:number){
    this.http.delete<any>(`http://localhost:8778/sunvat/deletePdf?id=${id}`).toPromise().then((response) => {
        console.log(response);
        this.getPdf();
    }).catch(error => {
      console.error('Error deleting:', error);
    });
  }

}

