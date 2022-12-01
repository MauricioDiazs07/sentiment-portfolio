import { NgModule } from "@angular/core";
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from "@angular/material/card";

const myModules: any[] = [
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatCardModule
];

@NgModule({
    imports: [ ...myModules],
    exports: [ ...myModules]
})  

export class MaterialModule{ }