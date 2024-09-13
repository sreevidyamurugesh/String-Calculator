import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule], // Add CommonModule to imports
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'string-calculator';
  numbers: string = '';
  result: number | null = null;

  resultEmpty: number | string = this.calculate('');
  resultSingle: number | string = this.calculate('1');
  resultComma: number | string = this.calculate('1,5');
  resultNewLine: number | string = this.calculate('1\n2,3');
  resultCustomDelimiter: number | string = this.calculate('//;\n1;2');
  resultNegative: number | string = this.calculate('1,-2,-3');

  calculate(input: string): number | string {
    try {
      return this.add(input);
    } catch (error) {
      if (error instanceof Error) {
        return error.message;
      }
      return 'An unknown error occurred';
    }
  }

  add(numbers: string): number {
    if (!numbers) {
      return 0;
    }

    let delimiter = /,|\n/;
    let customDelimiterMatch = numbers.match(/^\/\/(.+)\n/);

    if (customDelimiterMatch) {
      delimiter = new RegExp(customDelimiterMatch[1]);
      numbers = numbers.replace(/^\/\/(.+)\n/, '');
    }

    let numberArray = numbers.split(delimiter);
    let sum = 0;
    let negativeNumbers: number[] = [];

    for (let numStr of numberArray) {
      let num = parseInt(numStr);

      if (isNaN(num)) {
        continue;
      }

      if (num < 0) {
        negativeNumbers.push(num);
      }

      if (num <= 1000) {
        sum += num;
      }
    }

    if (negativeNumbers.length > 0) {
      throw new Error(`Negative numbers not allowed: ${negativeNumbers.join(", ")}`);
    }
    console.log("output", sum)
    return sum;
  }
}
