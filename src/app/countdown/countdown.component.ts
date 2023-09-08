import { Component, OnDestroy, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.css'],
  animations: [
    trigger('countdownAnimation', [
      state('void', style({ opacity: 0, transform: 'scale(0)' })),
      transition('void => *', [
        animate('1s ease-out', style({ opacity: 1, transform: 'scale(1)' })),
      ]),
      transition('* => void', [
        animate('1s ease-in', style({ opacity: 0, transform: 'scale(0)' })),
      ]),
    ]),
  ],
})
export class CountdownComponent implements OnInit, OnDestroy {
  countdown: number = 10;
  counting: boolean = false;

  private countdownInterval: any;

  ngOnInit() {
    this.startCountdown();
  }

  toggleCountdown() {
    if (!this.counting) {
      this.startCountdown();
    } else {
      this.stopCountdown();
    }
  }

  private startCountdown() {
    this.counting = true;
    this.countdown = 10;

    this.countdownInterval = setInterval(() => {
      this.countdown--;

      if (this.countdown <= 0) {
        clearInterval(this.countdownInterval);
        this.counting = false;
      }
    }, 1000);
  }

  private stopCountdown() {
    clearInterval(this.countdownInterval);
    this.counting = false;
  }

  ngOnDestroy() {
    this.stopCountdown();
  }
}
