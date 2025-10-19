import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DepartmentsService } from '../../services/departments.service';
import { DepartmentInterface } from '../../interfaces/department';
import { AbstractControl, FormControl, ValidatorFn } from '@angular/forms';
import { EmployeeInterface } from '../../interfaces/employee';
import { MaterialModule } from '../../modules/material-module';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-timesheet',
  imports: [JsonPipe, MaterialModule],
  templateUrl: './timesheet.html',
  styleUrl: './timesheet.scss',
})
export class Timesheet implements OnInit {
  private route = inject(ActivatedRoute);
  private departmentsService = inject(DepartmentsService);

  departments!: DepartmentInterface[];
  department!: DepartmentInterface | undefined;

  employeeNameFC = new FormControl('', this.nameValidator());
  employees: EmployeeInterface[] = [];
  employeeId = 0;

  ngOnInit() {
    this.departments = this.departmentsService.departments;
    this.department = this.departments.find(
      (department) => department.id === this.route.snapshot.params['id']
    );
  }

  addEmployee() {
    if (this.employeeNameFC.value?.trim()) {
      this.employeeId++;

      this.employees.push({
        id: this.employeeId.toString(),
        departmentId: this.department?.id,
        name: this.employeeNameFC.value.trim(),
        payRate: Math.floor(Math.random() * 50) + 50,
      });

      this.employeeNameFC.setValue('');
    }
  }

  nameValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let error = null;
      if (this.employees && this.employees.length) {
        for (const employee of this.employees) {
          if (employee.name.toLowerCase() === control.value.toLowerCase()) {
            error = { duplicate: true };
          }
        }
      }

      return error;
    };
  }
}
