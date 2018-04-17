import { Validators } from '@angular/forms';

export class CreditApplication {
    public clientid: number;
    public companyName: string;
    public companyNIT: number;
    public clientSalary: number;
    public clientContractDate: Date;

    public getDefaultValues(): any {
        return {
            clientid : ['', Validators.required],
            companyName : ['', Validators.required],
            companyNIT : ['', Validators.required],
            birthclientSalaryDate : ['', Validators.required],
            clientContractDate : ['', Validators.required],
        };
    }
}
