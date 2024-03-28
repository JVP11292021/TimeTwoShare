import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MaterialModule } from "../material.module";
import { MenubarComponent, MenubarNavDirective, MenubarHeaderDirective, MenubarDirective } from "./menubar.component";
import { RouterModule } from "@angular/router";

@NgModule({
    declarations: [
        MenubarComponent,
        MenubarNavDirective,
        MenubarHeaderDirective,
        MenubarDirective, 
    ],
    imports: [
        RouterModule,
        CommonModule,
        MaterialModule,
    ],
    exports: [
        MenubarComponent,
        MenubarNavDirective,
        MenubarHeaderDirective,
        MenubarDirective,
    ]
})
export class MaterialMenubarModule {}