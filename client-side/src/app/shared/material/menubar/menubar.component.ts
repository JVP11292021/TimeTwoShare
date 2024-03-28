import { Component, ContentChild, Directive, Input, OnInit, TemplateRef } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

@Directive({
  selector: 'ng-template[matexpMenuBarContent]'
})
export class MenubarDirective {}

@Directive({
  selector: 'ng-template[matexpMenuBarNavigation]'
})
export class MenubarNavDirective {
  static ngTemplateContextGuard(
    dir: MenubarNavDirective,
    ctx: any // Change the type of ctx to any
  ): ctx is { $implicit: MatDrawer } {
    return true;
  } 
}

@Directive({
  selector: 'ng-template[matexpMenuBarHeader]'
})
export class MenubarHeaderDirective {
  static ngTemplateContextGuard(
    dir: MenubarHeaderDirective,
    ctx: any // Change the type of ctx to any
  ): ctx is { $implicit: MenubarVisible } {
    return true;
  } 
}

export class MenubarVisible {
  public badgevisible = false;

  public badgevisibility(): void {
    this.badgevisible = true;
  }
}

export type MenubarConfig = {
  title: string;
  complete?: boolean;
}

@Component({
  selector: 'matexp-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.scss']
})
export class MenubarComponent {

  @Input() 
  config: MenubarConfig = {
    title: 'Default Title'
  };
  @Input() contentStyle: string = "text-align: center;min-height: 100vh;";

  public visible: MenubarVisible = new MenubarVisible();

  @ContentChild(MenubarHeaderDirective, { read:TemplateRef }) header!: TemplateRef<any>; 
  @ContentChild(MenubarDirective, { read:TemplateRef }) content!: TemplateRef<any>; 
  @ContentChild(MenubarNavDirective, { read:TemplateRef }) navigation!: TemplateRef<any>; 

}
