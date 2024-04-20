import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CardComponent, CardHeaderDirective, CardContentDirective, CardActionsDirective, CardFooterDirective } from "./card.component";
import { MaterialModule } from "../material.module";

@NgModule({
    declarations: [
        CardComponent,
        CardHeaderDirective,
        CardContentDirective,
        CardActionsDirective,
        CardFooterDirective,
    ],
    imports: [
        CommonModule,
        MaterialModule,
    ],
    exports: [
        CardComponent,
        CardHeaderDirective,
        CardContentDirective,
        CardActionsDirective,
        CardFooterDirective,
    ]
})
export class MaterialCardModule {}