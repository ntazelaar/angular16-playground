import { Component, signal, computed, effect, OnDestroy } from '@angular/core';

import randomWords from 'random-words';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  title = 'Angular 16 Playground';

  numberTest = signal<number>(0);
  arrayTest = signal<string[]>([]);
  logItems = signal<string[]>([]);
  arrayAsString = computed<string>(() => JSON.stringify(this.arrayTest()));

  numberEffect = effect(
    () => {
      this.addLogItem(`Value of number changed to ${this.numberTest()}`);
    },
    {
      allowSignalWrites: true,
    }
  );

  arrayEffect = effect(
    () => {
      this.addLogItem(
        `New element ${this.arrayTest().slice(-1)} added to array`
      );
    },
    {
      allowSignalWrites: true,
    }
  );

  private addLogItem(text: string) {
    const line = `[${new Date().toUTCString()}] ${text}`;
    this.logItems.mutate((currentValue) => currentValue.push(line));
  }

  onIncrementClick() {
    this.numberTest.update((value) => value + 1);
  }

  onSetNumberClick() {
    this.numberTest.set(Math.floor(Math.random() * 1000));
  }

  onMutateClick() {
    this.arrayTest.mutate((currentValue) => {
      const word = randomWords(1)[0];
      currentValue.push(word);
    });
  }

  ngOnDestroy(): void {
    this.numberEffect.destroy();
    this.arrayEffect.destroy();
  }
}
