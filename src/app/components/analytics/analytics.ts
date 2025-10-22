import { Component, inject } from '@angular/core';
import { MaterialModule } from '../../modules/material-module';
import { AnalyticsTable } from '../analytics-table/analytics-table';
import { EmployeeInterface } from '../../interfaces/employee';
import { DepartmentsService } from '../../services/departments.service';
import { Observable } from 'rxjs';
import { DepartmentInterface } from '../../interfaces/department';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-analytics',
  imports: [MaterialModule, AnalyticsTable, AsyncPipe],
  templateUrl: './analytics.html',
  styleUrl: './analytics.scss',
})
export class Analytics {
	private departmentService = inject(DepartmentsService);

	departments$: Observable<DepartmentInterface[]> = this.departmentService.getDepartments();
  employees: EmployeeInterface[] = [];
}
