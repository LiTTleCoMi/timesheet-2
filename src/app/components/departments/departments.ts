import { Component, inject, OnInit } from '@angular/core';
import { DepartmentInterface } from '../../interfaces/department';
import { DepartmentsService } from '../../services/departments.service';
import { MatCard } from '@angular/material/card';
import { MaterialModule } from '../../modules/material-module';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-departments',
  imports: [MatCard, MaterialModule, AsyncPipe],
  templateUrl: './departments.html',
  styleUrl: './departments.scss',
})
export class Departments implements OnInit {
  private departmentsService = inject(DepartmentsService);
  private router = inject(Router);

  departments$!: Observable<DepartmentInterface[]>;

  ngOnInit() {
		this.departments$ = this.departmentsService.getDepartments()
  }

  goToDepartment(departmentId: string) {
    this.router.navigate(['timesheet', { id: departmentId }]);
  }
}
