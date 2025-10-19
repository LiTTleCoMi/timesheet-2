import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartmentsService } from '../../services/departments.service';
import { DepartmentInterface } from '../../interfaces/department';

@Component({
  selector: 'app-timesheet',
  imports: [],
  templateUrl: './timesheet.html',
  styleUrl: './timesheet.scss',
})
export class Timesheet implements OnInit {
  private route = inject(ActivatedRoute);
  private departmentsService = inject(DepartmentsService);

  departments!: DepartmentInterface[];
  department!: DepartmentInterface | undefined;

  ngOnInit() {
    this.departments = this.departmentsService.departments;
    this.department = this.departments.find(
      (department) => department.id === this.route.snapshot.params['id']
    );
  }
}
