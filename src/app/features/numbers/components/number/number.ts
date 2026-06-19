import { ScrollingModule } from '@angular/cdk/scrolling';
import { Component } from '@angular/core';

@Component({
  selector: 'app-number',
  imports: [ScrollingModule],
  templateUrl: './number.html',
  styleUrl: './number.css',
})
export class Number {
  numeros = Array(1000).fill(0);
}
