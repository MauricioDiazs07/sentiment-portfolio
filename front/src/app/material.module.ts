import { NgModule } from "@angular/core";
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';

const myModules: any[] = [
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule
];

@NgModule({
    imports: [ ...myModules],
    exports: [ ...myModules]
})  

export class MaterialModule{ }