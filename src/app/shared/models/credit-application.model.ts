import { Validators } from '@angular/forms';


const regexAlphanumeric = '^[a-zA-Z0-9]*$';
const regexNumeric = '[0-9]*';


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
            companyNIT : ['', [Validators.required, Validators.pattern(regexNumeric)]],
            birthclientSalaryDate : ['', Validators.required],
            clientContractDate : ['', Validators.required],
        };
    }
}
