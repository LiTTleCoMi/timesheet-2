import { Injectable } from '@angular/core';
import { DepartmentInterface } from '../interfaces/department';

@Injectable({
  providedIn: 'root',
})
export class DepartmentsService {
  departments: DepartmentInterface[] = [
    { id: '1', name: 'Customer Success' },
    { id: '2', name: 'Sales' },
    { id: '3', name: 'Finance' },
  ];
}
