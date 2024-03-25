import {Directive, ElementRef, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Directive({
  selector: '[appSelectedCharacter]'
})
export class SelectedCharacterDirective implements OnInit, OnChanges {
  @Input() color: string = 'black';
  @Input() selected: boolean = false;

  constructor(private el: ElementRef) { }

  ngOnInit() {
    this.highlight();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.highlight();
  }

  highlight() {
    if (this.selected) {
      this.el.nativeElement.style.border = `3px solid ${this.color}`
    } else {
      this.el.nativeElement.style.border = 'unset';
    }
  }


}
