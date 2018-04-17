import { Validators } from '@angular/forms';


const regexAlphanumeric = '^[a-zA-Z0-9]*$';
const regexNumeric = '[0-9]*';

export class CreditApplication {
    public id: number;
    public companyName: string;
    public companyNIT: number;
    public clientSalary: number;
    public clientContractDate: Date;

    public getDefaultValues(): any {
        return {
            id: ['', [Validators.required, Validators.pattern(regexNumeric)]],
            companyName: [''],
            companyNIT: ['', [Validators.required, Validators.pattern(regexNumeric)]],
            clientSalary: ['', [Validators.required, Validators.pattern(regexNumeric)]],
            clientContractDate: ['', Validators.required],
        };
    }
}
