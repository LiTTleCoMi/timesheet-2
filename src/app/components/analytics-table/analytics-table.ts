import { Component, inject, input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { EmployeeInterface } from '../../interfaces/employee';
import { AsyncPipe, CurrencyPipe, DecimalPipe, TitleCasePipe } from '@angular/common';
import { empty, Observable, of } from 'rxjs';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-analytics-table',
  imports: [TitleCasePipe, DecimalPipe, CurrencyPipe, AsyncPipe],
  templateUrl: './analytics-table.html',
  styleUrl: './analytics-table.scss',
})
export class AnalyticsTable implements OnInit, OnChanges {
  private employeeService = inject(EmployeeService);

  departmentId = input<string>();
  employeeData = input<EmployeeInterface[]>();

  weekdays: string[] = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
  ];
  employees$!: Observable<EmployeeInterface[]>;

	ngOnInit() {
		const emp = this.employeeData?.();
    if (emp && emp.length) {
      this.employees$ = of(emp);
      return;
    }
    const deptId = this.departmentId();
    if (deptId) {
      this.employees$ = this.employeeService.getEmployeeHoursByDepartment(deptId);
    }
	}
	
	ngOnChanges(changes: SimpleChanges) {
		const emp = this.employeeData();
    const deptId = this.departmentId();
		if (changes['employeeData'] && deptId && (!emp || emp.length === 0)) {
			this.employees$ = this.employeeService.getEmployeeHoursByDepartment(deptId);
		}
	}

  getTotalHours(employee: EmployeeInterface): number {
    return (
      employee.monday +
      employee.tuesday +
      employee.wednesday +
      employee.thursday +
      employee.friday +
      employee.saturday +
      employee.sunday
    );
  }
}
