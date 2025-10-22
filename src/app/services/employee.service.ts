import { EnvironmentInjector, inject, Injectable, runInInjectionContext } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { EmployeeInterface } from '../interfaces/employee';
import { addDoc, collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { defer, from, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private envInjector: EnvironmentInjector = inject(EnvironmentInjector);
  private firestore: Firestore = inject(Firestore);

  saveEmployeeHours(employee: EmployeeInterface): Promise<any> {
    return runInInjectionContext(this.envInjector, () => {
      const colRef = collection(this.firestore, 'employee-hours');
      return addDoc(colRef, employee);
    });
  }

  getEmployeeHoursByDepartment(departmentId: string): Observable<EmployeeInterface[]> {
    return defer(() =>
      runInInjectionContext(this.envInjector, () => {
        const colRef = collection(this.firestore, 'employee-hours');
        const q = query(colRef, where('departmentId', '==', departmentId));
        return from(getDocs(q)).pipe(
          map(
            (snapshot) =>
              snapshot.docs.map((doc) => ({ id: doc.id, ...(doc.data() as any) })) as EmployeeInterface[]
          )
        );
      })
    );
	}
	
	async updateEmployeeHours(employee: EmployeeInterface): Promise<void> {
		const colRef = collection(this.firestore, 'employee-hours');
		const employeeDocRef = doc(colRef, employee.id);
		return await setDoc(employeeDocRef, employee);
	}
}
