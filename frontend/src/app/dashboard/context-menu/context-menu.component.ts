import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.css']
})
export class ContextMenuComponent implements OnInit {
  @Input()
  x: number = 0;
  @Input()
  y: number = 0;
  @Input()
  lat: number = 0;
  @Input()
  lng: number = 0;


  @Output()
  onAddMissingPlace: EventEmitter<{lat: number, lng: number}>;

  constructor() {
    this.onAddMissingPlace = new EventEmitter();
   }

  ngOnInit(): void {
  }

  public addMissingPlace() {
    this.onAddMissingPlace.emit({lat: this.lat, lng: this.lng});
  }
  public doSomething() {
    alert("doSomething");
  }

  get style() {
    return `
      position: absolute;
      left: ${this.x}px;
      top: ${this.y}px;
    `
  }
}
