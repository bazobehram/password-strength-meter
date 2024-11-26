import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PasswordStrengthMeterComponent } from 'angular-password-strength-meter';

@Component({
    selector: 'app-custom-component',
    templateUrl: './custom-component.component.html',
    styleUrl: './custom-component.component.scss',
    standalone: true,
    imports: [FormsModule, PasswordStrengthMeterComponent],
})
export class CustomComponentComponent {
  text: string = '';
  score: number | null = null;

  public onPasswordStrengthChange(score: number | null) {
    this.score = score;
  }
}
