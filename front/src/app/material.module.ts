import { NgModule } from "@angular/core";
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';

const myModules: any[] = [
    MatInputModule,
    MatFormFieldModule
];

@NgModule({
    imports: [ ...myModules],
    exports: [ ...myModules]
})  

export class MaterialModule{ }