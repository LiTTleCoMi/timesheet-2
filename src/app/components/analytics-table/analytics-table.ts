import { Component } from '@angular/core';
import { EmployeeInterface } from '../../interfaces/employee';

@Component({
  selector: 'app-analytics-table',
  imports: [],
  templateUrl: './analytics-table.html',
  styleUrl: './analytics-table.scss',
})
export class AnalyticsTable {
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
}
