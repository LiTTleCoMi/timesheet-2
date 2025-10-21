import { Component, input, OnInit } from '@angular/core';
import { EmployeeInterface } from '../../interfaces/employee';
import { CurrencyPipe, DecimalPipe, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-analytics-table',
  imports: [TitleCasePipe, DecimalPipe, CurrencyPipe],
  templateUrl: './analytics-table.html',
  styleUrl: './analytics-table.scss',
})
export class AnalyticsTable implements OnInit {
  departmentId = input<string>();
  employeeData = input.required<EmployeeInterface[]>();

  weekdays: string[] = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
  ];
  employees: EmployeeInterface[] = [];

  ngOnInit() {
    this.employees = this.employeeData().filter(
      (employee: EmployeeInterface) => employee.departmentId === this.departmentId()
    );
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
