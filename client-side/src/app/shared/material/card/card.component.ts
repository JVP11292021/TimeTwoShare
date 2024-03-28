import { Component, ContentChild, Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: 'ng-template[matexpCardHeader]'
})
export class CardHeaderDirective {}

@Directive({
  selector: 'ng-template[matexpCardContent]'
})
export class CardContentDirective {}

@Directive({
  selector: 'ng-template[matexpCardActions]'
})
export class CardActionsDirective {}

@Directive({
  selector: 'ng-template[matexpCardFooter]'
})
export class CardFooterDirective {}

@Component({
  selector: 'matexp-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() class: string = 'card-class';
  @Input() imgSource: string = '';

  @ContentChild(CardHeaderDirective, { read:TemplateRef }) header!: TemplateRef<any>;
  @ContentChild(CardContentDirective, { read:TemplateRef }) content!: TemplateRef<any>;
  @ContentChild(CardActionsDirective, { read:TemplateRef }) actions!: TemplateRef<any>;
  @ContentChild(CardFooterDirective, { read:TemplateRef }) footer!: TemplateRef<any>;
}
