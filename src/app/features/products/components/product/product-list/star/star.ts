import { Component, signal, input, computed } from '@angular/core';

@Component({
  selector: 'app-star',
  imports: [],
  templateUrl: './star.html',
  styleUrl: './star.css',
})
export class Star {
  rating = input<number>(100, {alias:"rating"});
  //stars = signal(0);
  //arr: number[] = [];

  stars = computed(() => {
    const rating =  this.rating();
    if (rating > 0 && rating <= 40)return 1;
    if (rating <=80)return 2;
    if (rating <=120)return 3;
    if (rating <=160)return 4;
    if (rating <=200)return 5;
    return 0;
  });

  arr = computed (() =>
    Array.from({length: this.stars()}).fill(1)
  );
}
