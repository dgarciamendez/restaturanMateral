import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Mesa } from '../../../../core/models/mesa.model';

@Component({
  selector: 'app-mesa-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatRippleModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './mesa-card.component.html',
  styleUrl: './mesa-card.component.scss'
})
export class MesaCardComponent implements OnInit {
  @Input() mesa!: Mesa;
  @Input() isLoading: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  get tiempoTranscurrido(): string {
    if (!this.mesa.tiempoInicio) return '';

    const now = new Date();
    const diffMs = now.getTime() - this.mesa.tiempoInicio.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const hours = Math.floor(diffMins / 60);
    const mins = diffMins % 60;

    return `${hours}:${mins.toString().padStart(2, '0')} min`;
  }
}
