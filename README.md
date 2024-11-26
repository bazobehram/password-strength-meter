
# Password Strength Meter for Angular 18

[![CI](https://github.com/bazobehram/password-strength-meter/actions/workflows/ci-workflow.yml/badge.svg)](https://github.com/bazobehram/password-strength-meter/actions/workflows/ci-workflow.yml)
[![npm version](https://badge.fury.io/js/password-strength-meter.svg)](https://badge.fury.io/js/password-strength-meter)
[![Coverage Status](https://coveralls.io/repos/github/bazobehram/password-strength-meter/badge.svg?branch=main)](https://coveralls.io/github/bazobehram/password-strength-meter?branch=main)

A customizable and updated password strength meter library for Angular applications, built using Angular 18 with standalone component support.

---

Password Strength Meter use zxcvbn to estimate the strength of the password and also provide a visual feedback with suggestions and warning messages.

[Password Strength Meter](https://www.npmjs.com/package/angular-password-strength-meter) use [zxcvbn](https://github.com/zxcvbn-ts/zxcvbn) to estimate the strength of the password and also provide a visual feedback with suggestions and warning messages.

## Features
- Updated to Angular v18.
- Full support for standalone component architecture.
- Visual password strength feedback with suggestions and warnings.
- Uses [zxcvbn](https://github.com/zxcvbn-ts/zxcvbn) for robust password strength estimation.
- Customizable styles, behavior, and feedback.

---

## Demo
[Live Demo](https://bazobehram.github.io/password-strength-meter/)

---

## Installation

Install the library and its dependencies:
```bash
npm install @zxcvbn-ts/core @zxcvbn-ts/language-en password-strength-meter
```

---

## Usage

### Step 1: Import and Use the Component

Import the `PasswordStrengthMeterComponent` directly into your application as it supports standalone components.

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordStrengthMeterComponent } from 'password-strength-meter';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, PasswordStrengthMeterComponent],
  template: `
    <input [(ngModel)]="password" type="password" placeholder="Enter password" />
    <password-strength-meter [password]="password" enableFeedback></password-strength-meter>
  `,
})
export class AppComponent {
  password: string = '';
}
```

### Step 2: Configure zxcvbn Service

To enable the default zxcvbn service for password strength estimation, configure your application as shown below:

```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { ApplicationConfig } from '@angular/core';
import { provideZxvbnServiceForPSM } from 'password-strength-meter/zxcvbn';

export const appConfig: ApplicationConfig = {
  providers: [provideZxvbnServiceForPSM()],
};

bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
```

---

## Customization

### Override zxcvbn Options
You can customize the zxcvbn service by providing a custom configuration:

```typescript
import { translations } from '@zxcvbn-ts/language-en';
import { provideZxvbnServiceForPSM, ZxvbnConfigType } from 'password-strength-meter/zxcvbn';

const zxvbnConfig: ZxvbnConfigType = {
  translations: translations,
};

export const appConfig: ApplicationConfig = {
  providers: [provideZxvbnServiceForPSM(zxvbnConfig)],
};
```

---

### Customize the Password Strength Service

You can override the default password strength meter service by implementing the `IPasswordStrengthMeterService` interface.

```typescript
import { Injectable } from '@angular/core';
import { IPasswordStrengthMeterService, FeedbackResult } from 'password-strength-meter';

@Injectable()
export class CustomPasswordStrengthService extends IPasswordStrengthMeterService {
  score(password: string): number {
    return password.length > 10 ? 4 : 2;
  }

  scoreWithFeedback(password: string): FeedbackResult {
    return {
      score: this.score(password),
      feedback: { warning: '', suggestions: [] },
    };
  }
}
```

---

## API Reference

| Property                 |   Bind   |   Type   | Default Value                                      | Description                                                                                      |
|--------------------------|:--------:|:--------:|---------------------------------------------------|--------------------------------------------------------------------------------------------------|
| `password`               |  Input() |  string  | `null`                                            | The password string to evaluate.                                                                |
| `minPasswordLength`      |  Input() |  number  | `8`                                               | Minimum password length to evaluate.                                                            |
| `enableFeedback`         |  Input() | boolean  | `false`                                           | Whether to show feedback messages for strength evaluation.                                       |
| `numberOfProgressBarItems` | Input() |  number  | `5`                                               | The number of segments in the progress bar.                                                     |
| `enableAsync`            |  Input() | boolean  | `false`                                           | Whether to calculate password strength asynchronously.                                          |
| `colors`                 |  Input() | string[] | `['darkred', 'orangered', 'orange', 'yellowgreen', 'green']` | Custom colors for progress bar segments, matching password strength levels (0–4).               |
| `strengthChange`         | Output() |  number  | `null`                                            | Emits the calculated strength score for the provided password (0–4).                            |

---

## License

This project is licensed under the [MIT License](https://github.com/bazobehram/password-strength-meter/blob/main/LICENSE).