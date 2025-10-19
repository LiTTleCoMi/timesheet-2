import { Component, inject, OnInit } from '@angular/core';
import { DepartmentInterface } from '../../interfaces/department';
import { DepartmentsService } from '../../services/departments.service';
import { MatCard } from '@angular/material/card';
import { MaterialModule } from '../../modules/material-module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-departments',
  imports: [MatCard, MaterialModule],
  templateUrl: './departments.html',
  styleUrl: './departments.scss',
})
export class Departments implements OnInit {
  private departmentsService = inject(DepartmentsService);
  private router = inject(Router);

  departments!: DepartmentInterface[];

  ngOnInit() {
    this.departments = this.departmentsService.departments;
  }

  goToDepartment(departmentId: string) {
    this.router.navigate(['timesheet', { id: departmentId }]);
  }
}
