import { Validators } from '@angular/forms';

const regexAlphanumeric = '^[a-zA-Z0-9]*$';
const regexNumeric = '[0-9]*';

export class Client {
    public id: string;
    public name: string;
    public lastName: string;
    public birthDate: Date;

    public getDefaultValues(): any {
        return {
            id : ['', [Validators.required, Validators.pattern(regexNumeric)]],
            name : ['', Validators.required],
            lastName : ['', Validators.required],
            birthDate : ['', Validators.required],
        };
    }
}
