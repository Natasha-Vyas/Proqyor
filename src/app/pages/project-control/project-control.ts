import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-project-control',
  imports: [CommonModule, RouterLink],
  templateUrl: './project-control.html',
  styleUrl: './project-control.scss'
})
export class ProjectControlComponent {}
