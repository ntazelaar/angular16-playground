import { Component, signal, computed, effect } from '@angular/core';

import randomWords from 'random-words';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Angular 16 Playground';

  numberTest = signal<number>(0);
  arrayTest = signal<string[]>([]);
  events = signal<string[]>([]);
  arrayAsString = computed<string>(() => JSON.stringify(this.arrayTest()));

  numberEffect = effect(
    () => {
      this.addLogline(`Value of number changed to ${this.numberTest()}`);
    },
    {
      allowSignalWrites: true,
    }
  );

  arrayEffect = effect(
    () => {
      const arrayValue = this.arrayTest();
      this.addLogline(
        `New element ${arrayValue[arrayValue.length - 1]} added to array`
      );
    },
    {
      allowSignalWrites: true,
    }
  );

  private addLogline(text: string) {
    const line = `[${new Date().toUTCString()}] ${text}`;
    this.events.mutate((currentValue) => currentValue.push(line));
  }

  onIncrementClick() {
    this.numberTest.update((value) => value + 1);
  }

  onSetNumberClick() {
    this.numberTest.set(Math.floor(Math.random() * 1000))
  }

  onMutateClick() {
    this.arrayTest.mutate((currentValue) => {
      const word = randomWords(1)[0];
      currentValue.push(word);
    });
  }
}
