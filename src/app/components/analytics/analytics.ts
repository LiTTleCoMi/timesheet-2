import { Component } from '@angular/core';
import { MaterialModule } from '../../modules/material-module';
import { AnalyticsTable } from '../analytics-table/analytics-table';
import { EmployeeInterface } from '../../interfaces/employee';

@Component({
  selector: 'app-analytics',
  imports: [MaterialModule, AnalyticsTable],
  templateUrl: './analytics.html',
  styleUrl: './analytics.scss',
})
export class Analytics {
  employees: EmployeeInterface[] = [];

  employeeData: EmployeeInterface[] = [
    {
      departmentId: '1',
      friday: 6,
      id: '1',
      monday: 4,
      name: 'a',
      payRate: 70,
      saturday: 7,
      sunday: 6,
      thursday: 5,
      tuesday: 3,
      wednesday: 4,
    },
    {
      departmentId: '1',
      friday: 2,
      id: '2',
      monday: 4,
      name: 'b',
      payRate: 63,
      saturday: 1,
      sunday: 2,
      thursday: 3,
      tuesday: 3,
      wednesday: 4,
    },
    {
      departmentId: '2',
      friday: 9,
      id: '3',
      monday: 8,
      name: 'c',
      payRate: 76,
      saturday: 7,
      sunday: 5,
      thursday: 4,
      tuesday: 7,
      wednesday: 5,
    },
    {
      departmentId: '3',
      friday: 2,
      id: '4',
      monday: 3,
      name: 'd',
      payRate: 56,
      saturday: 3,
      sunday: 2,
      thursday: 0,
      tuesday: 4,
      wednesday: 5,
    },
  ];
}
