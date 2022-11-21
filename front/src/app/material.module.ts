import { NgModule } from "@angular/core";
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';

const myModules: any[] = [
    MatInputModule,
    MatCardModule,
    MatSelectModule,
];

@NgModule({
    imports: [ ...myModules],
    exports: [ ...myModules]
})  

export class MaterialModule{ }