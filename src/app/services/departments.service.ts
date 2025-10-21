import { inject, Injectable } from '@angular/core';
import { DepartmentInterface } from '../interfaces/department';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DepartmentsService {
	private http = inject(HttpClient);

	departments: DepartmentInterface[] = [];
	
	getDepartments(): Observable<DepartmentInterface[]> {
		return this.http.get<DepartmentInterface[]>(
      `https://hr-timesheet-test.firebaseio.com/departments.json`
    );
	}
}
