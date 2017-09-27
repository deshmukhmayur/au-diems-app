// src: https://gist.github.com/swalters/8d8772d20ee375df61277d5b048e6eb2
import { inject, customAttribute, TaskQueue } from 'aurelia-framework'

@customAttribute('md-auto-focus')
@inject(Element, TaskQueue)
export class AutoFocus {
  constructor(private element, private taskQueue) { }

  public attached() {
    this.taskQueue.queueTask(() => {
      let inputs = this.element.getElementsByTagName('input');
      if (inputs.length > 0) {
        let input = inputs[0];
        input.focus();
        let label = input.nextElementSibling;
        if (label.nodeName === "LABEL") {
          this.taskQueue.queueTask(() => { label.classList.add("active"); });
        }
      } else {
        console.warn('No input element found for auto-focus');
      }
    });

  }
}
