import { Component, inject, OnInit } from '@angular/core';
import { DepartmentInterface } from '../../interfaces/department';
import { DepartmentsService } from '../../services/departments.service';
import { MatCard } from "@angular/material/card";
import { MaterialModule } from "../../modules/material-module";

@Component({
  selector: 'app-departments',
  imports: [MatCard, MaterialModule],
  templateUrl: './departments.html',
  styleUrl: './departments.scss',
})
export class Departments implements OnInit {
  departments!: DepartmentInterface[];
  private departmentsService = inject(DepartmentsService);

  ngOnInit() {
    this.departments = this.departmentsService.departments;
  }
}
