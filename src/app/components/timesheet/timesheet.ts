import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartmentsService } from '../../services/departments.service';
import { DepartmentInterface } from '../../interfaces/department';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatCard } from "@angular/material/card";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-timesheet',
  imports: [MatCard, MatFormFieldModule, ReactiveFormsModule, MatInput],
  templateUrl: './timesheet.html',
  styleUrl: './timesheet.scss',
})
export class Timesheet implements OnInit {
  private route = inject(ActivatedRoute);
  private departmentsService = inject(DepartmentsService);

  departments!: DepartmentInterface[];
  department!: DepartmentInterface | undefined;

  employeeNameFC = new FormControl('');

  ngOnInit() {
    this.departments = this.departmentsService.departments;
    this.department = this.departments.find(
      (department) => department.id === this.route.snapshot.params['id']
    );
  }
}
