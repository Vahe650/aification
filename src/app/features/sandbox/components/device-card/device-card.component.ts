import { Component, Input, Output, EventEmitter, ChangeDetectorRef, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { CdkDragEnd, CdkDragMove } from '@angular/cdk/drag-drop';
import { Device } from '../../../../core/models/device.model';

@Component({
  selector: 'app-device-card',
  templateUrl: './device-card.component.html',
  styleUrls: ['./device-card.component.scss']
})
export class DeviceCardComponent implements OnInit, OnChanges {
  @Input() device!: Device;
  @Output() delete = new EventEmitter<void>();
  @Output() toggle = new EventEmitter<void>();
  @Output() positionChange = new EventEmitter<{ x: number; y: number }>();

  currentPosition = { x: 0, y: 0 };
  private isDragging = false;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    if (this.device) {
      this.currentPosition = {
        x: this.device.position.x,
        y: this.device.position.y
      };
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['device'] && !this.isDragging) {
      this.currentPosition = {
        x: this.device.position.x,
        y: this.device.position.y
      };
    }
  }

  onDelete(event: Event): void {
    event.stopPropagation();
    this.delete.emit();
  }

  onToggle(event: Event): void {
    event.stopPropagation();
    this.toggle.emit();
  }

  onDragMoved(event: CdkDragMove): void {
    this.isDragging = true;
    const element = event.source.element.nativeElement;
    const workspaceContent = element.closest('.workspace-content') as HTMLElement;
    
    if (workspaceContent) {
      const workspaceRect = workspaceContent.getBoundingClientRect();
      const elementRect = element.getBoundingClientRect();
      const scrollLeft = workspaceContent.scrollLeft || 0;
      const scrollTop = workspaceContent.scrollTop || 0;
      
      const computedStyle = getComputedStyle(workspaceContent);
      let paddingLeft = parseFloat(computedStyle.paddingLeft) || 0;
      let paddingTop = parseFloat(computedStyle.paddingTop) || 0;
      
      if (computedStyle.paddingLeft.includes('%')) {
        paddingLeft = (workspaceRect.width * parseFloat(computedStyle.paddingLeft)) / 100;
      }
      if (computedStyle.paddingTop.includes('%')) {
        paddingTop = (workspaceRect.height * parseFloat(computedStyle.paddingTop)) / 100;
      }
      
      // Обновляем текущую позицию для визуального отображения
      const x = elementRect.left - workspaceRect.left + scrollLeft - paddingLeft;
      const y = elementRect.top - workspaceRect.top + scrollTop - paddingTop;
      
      this.currentPosition = {
        x: Math.max(0, x),
        y: Math.max(0, y)
      };
      
      this.cdr.detectChanges();
    }
  }

  onDragEnded(event: CdkDragEnd): void {
    this.isDragging = false;
    
    // Используем текущую позицию, которая уже обновлена в onDragMoved
    this.positionChange.emit({
      x: this.currentPosition.x,
      y: this.currentPosition.y
    });
  }
}
