import { Validators } from '@angular/forms';

export class Client {
    public id: string;
    public name: string;
    public lastName: string;
    public birthDate: Date;

    public getDefaultValues(): any {
        return {
            id : ['', Validators.required],
            name : ['', Validators.required],
            lastName : ['', Validators.required],
            birthDate : ['', Validators.required],
        };
    }
}
