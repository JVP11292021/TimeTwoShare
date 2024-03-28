import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MaterialModule } from "./material.module";
import { MaterialCardModule } from "./card/card.module";
import { MaterialMenubarModule } from "./menubar/menubar.module";



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports:[
    MaterialCardModule,
    MaterialMenubarModule,
    MaterialModule
]
})
export class MaterialExpandedModule { }
