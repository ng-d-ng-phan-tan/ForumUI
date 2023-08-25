import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.POST_SERVICE_URL;
  }

  async importData(file: File) {
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const raw_data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    const header: any = raw_data[0];
    const result = raw_data.map((row: any) => {
      const obj: any = {};
      for (const i in row) {
        if (i in header) {
          obj[header[i]] = row[i];
        }
      }
      return obj;
    });
    result.splice(0, 1);
    return result;
  }

  exportData(data: any[], fileName: string) {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet);
    XLSX.writeFile(workbook, `${fileName}.xlsx`, { compression: true });
  }

  approve(question_id: string) {
    const data = {
      user_approved_id: JSON.parse(localStorage.getItem('loginUser') as string)
        .user_id,
      approved_at: Date.now().toString(),
    };
    return this.http.post(
      `${this.baseUrl}admin/questions/approve/` + question_id,
      data
    );
  }
}
