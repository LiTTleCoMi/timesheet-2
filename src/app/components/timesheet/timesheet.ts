import { Component, inject, OnInit, Signal, WritableSignal, signal } from '@angular/core';
import { DepartmentInterface } from '../../interfaces/department';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialModule } from '../../modules/material-module';
import { EmployeeInterface } from '../../interfaces/employee';
import { AsyncPipe, DecimalPipe, JsonPipe, TitleCasePipe } from '@angular/common';
import { FormControl, ValidatorFn, AbstractControl, FormsModule } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { EmployeeService } from '../../services/employee.service';
import { DepartmentsService } from '../../services/departments.service';
@Component({
  selector: 'app-timesheet',
  imports: [MaterialModule, TitleCasePipe, AsyncPipe, FormsModule],
  templateUrl: './timesheet.html',
  styleUrl: './timesheet.scss',
})
export class Timesheet implements OnInit {
  $departments: Observable<DepartmentInterface[]> | undefined;
  $department: Observable<DepartmentInterface | undefined> | undefined;
  employees: WritableSignal<EmployeeInterface[]> = signal<EmployeeInterface[]>([]);
  employeeNameFC = new FormControl('', this.nameValidator());
  weekdays: string[] = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
  ];

  private employeeService: EmployeeService = inject(EmployeeService);
  private departmentsService: DepartmentsService = inject(DepartmentsService);
  private router: Router = inject(Router);
  private route: ActivatedRoute = inject(ActivatedRoute);

  private departmentId: string = this.route.snapshot.params['id'] as string;
  private employeesFromServer: Signal<EmployeeInterface[]> = toSignal(
    this.employeeService.getEmployeeHoursByDepartment(this.departmentId),
    { initialValue: [] }
  );
  ngOnInit(): void {
    this.$departments = this.departmentsService.getDepartments();
    const departmentId = this.departmentId;

    this.$department = this.$departments.pipe(
      map((departments) => departments.find((dept) => dept.id === departmentId))
    );

    // Seed our writable signal from the server data once (no manual subscribe/effect)
    const fromDb = this.employeesFromServer();
    this.employees.set(Array.isArray(fromDb) ? fromDb : []);
  }
  addEmployee(): void {
    const rawName = (this.employeeNameFC.value || '').toString().trim();
    if (!rawName) {
      return;
    }
    const departmentIdFromRoute = this.route.snapshot.params['id'] as string;

    const updated = [
      ...this.employees(),
      {
        departmentId: departmentIdFromRoute,
        name: rawName,
        payRate: Math.floor(Math.random() * 50) + 50,
        monday: 0,
        tuesday: 0,
        wednesday: 0,
        thursday: 0,
        friday: 0,
        saturday: 0,
        sunday: 0,
      },
    ];

    this.employees.set(updated);

    this.employeeNameFC.setValue('');
    this.employeeNameFC.markAsPristine();
    this.employeeNameFC.markAsUntouched();
  }
  nameValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = (control?.value || '').toString().trim().toLowerCase();
      if (!value) {
        return null;
      }
      const list = this.employees();
      if (Array.isArray(list) && list.length) {
        for (const employee of list) {
          if ((employee.name || '').toString().trim().toLowerCase() === value) {
            return { duplicate: true };
          }
        }
      }
      return null;
    };
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
  deleteEmployee(index: number): void {
    const list = this.employees();
    if (!Array.isArray(list)) {
      return;
    }
    if (index < 0 || index >= list.length) {
      return;
    }
    const updated = list.slice();
    updated.splice(index, 1);
    this.employees.set(updated);
  }

  async submit(): Promise<void> {
    this.employees().forEach((employee) => {
      if (employee.id) {
        this.employeeService.updateEmployeeHours(employee);
      } else {
        this.employeeService.saveEmployeeHours(employee);
      }
    });
    this.router.navigate(['./departments']);
  }
}
