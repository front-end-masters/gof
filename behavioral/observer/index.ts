interface Observable {
  subscribe(...observers: Observer[]): void;
  unsubscribe(...observers: Observer[]): void;
  notify(): void;
}

interface Observer {
  update(...args: unknown[]): void;
}

class InputObservable implements Observable {
  private observers: Observer[] = [];

  constructor(public element: HTMLInputElement) {}

  subscribe(...observers: Observer[]): void {
    observers.forEach(observer => {
      if (!this.observers.includes(observer)) {
        this.observers.push(observer);
      }
    });
  }

  unsubscribe(observer: Observer): void {
    const observerIndex = this.observers.indexOf(observer);

    if (observerIndex !== -1) {
      this.observers.splice(observerIndex, 1);
    }
  }

  notify(): void {
    this.observers.forEach(observer => observer.update(this));
  }
}

class ParagraphObserver implements Observer {
  constructor(public element: HTMLParagraphElement) {}

  update(observable: Observable): void {
    if (observable instanceof InputObservable) {
      this.element.innerText = observable.element.value;
    }

    //   else if ....
  }
}

const input = new InputObservable(new HTMLInputElement());
const p1 = new ParagraphObserver(new HTMLParagraphElement());
const p2 = new ParagraphObserver(new HTMLParagraphElement());
input.subscribe(p1, p2);

input.element.addEventListener('keydown', () => input.notify());
