import initDragAndDrop from './DragManager';
import SutcaseDragZone from './SutcaseDragZone';
import ScaleDropTarget from './ScaleDropTarget';
import BottomDropTarget from './BottomDropTarget';
import DropTargetFail from './DropTargetFail';

export default class Game {
  constructor() {
    const scales = document.querySelector('.scales');
    if (!scales) {
      console.log('Cant start game');
    }
    this._scales = scales;

    this._weights = [1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3];
    this._sum = this._weights.reduce((sum, current) => {
      return sum + current;
    }, 0);

    initDragAndDrop();
    this.init();
    this.addEventListener();
    this.createResetButton();

    this.createWinnerMessage();
  }

  init() {
    this._scales.classList.remove('more-on-left');
    this._scales.classList.remove('more-on-right');

    const placeForBags = document.querySelector('.place-for-bags');
    const scalesPlatforms = document.querySelectorAll('.bags-on-scale');

    this._removeOldSutcases();

    // new BottomDropTarget(placeForBags);

    for (let i = 0; i < scalesPlatforms.length; ++i) {
      new ScaleDropTarget(scalesPlatforms[i]);
    }

    const dropFail = new DropTargetFail(placeForBags);

    for (let i = 0; i < this._weights.length; ++i) {
      let div = document.createElement('div');
      div.className = 'sutcase sutcase-' + (i + 1);
      div.setAttribute("data-weight", this._weights[i]);
      placeForBags.appendChild(div);
      new SutcaseDragZone(div, dropFail, this.getOnDragEndCb());
    }
  }

  addEventListener() {
    document.addEventListener('smth-is-dropped', (event) => {
      // console.log('smth-is-dropped', event);
      const leftWeight = this._getWeightOfSutcases(this._scales.querySelectorAll('.platform-left .sutcase'));
      const rightWeight = this._getWeightOfSutcases(this._scales.querySelectorAll('.platform-right .sutcase'));
      // console.log('weight', leftWeight, rightWeight);
      this._scales.classList.remove('more-on-left');
      this._scales.classList.remove('more-on-right');
      if (leftWeight < rightWeight) {
        this._scales.classList.add('more-on-right');
      } else if (leftWeight > rightWeight) {
        this._scales.classList.add('more-on-left');
      } else if (leftWeight + rightWeight == this._sum) {
        this.showWinnerMessage();
      };
    }, false);
  }

  createResetButton() {
    let button = document.createElement('button');
    button.appendChild(document.createTextNode('Сбросить'));
    button.className = 'reset';

    button.onclick = () => {
      // this.showWinnerMessage();
      this.init();
    }
    this._scales.appendChild(button);
  }

  createWinnerMessage() {
    let msg = document.createElement('div');
    msg.appendChild(document.createTextNode('Победа!'));
    msg.className = 'winner-msg';
    this._scales.appendChild(msg);
  }

  showWinnerMessage() {
    const msg = this._scales.querySelector('.winner-msg');
    if (msg) {
      msg.classList.remove('winner-start');
      setTimeout(() => {
        msg.classList.add('winner-start');
      }, 20);
    }
  }

  _removeOldSutcases() {
    let sutcases = document.getElementsByClassName('sutcase');
    while (sutcases[0]) {
      sutcases[0].parentNode.removeChild(sutcases[0]);
    }
  }

  getOnDragEndCb() {
    return (elem) => {
      var event = new CustomEvent('smth-is-dropped', {
        bubbles: true
      });
      elem && elem.dispatchEvent(event);
    }
  }

  _getWeightOfSutcases(sutcases) {
    let weight = 0;
    for (let i = 0; i < sutcases.length; ++i) {
      var curWeight = Number(sutcases[i].getAttribute("data-weight"));
      if (!isNaN(curWeight)) {
        weight += curWeight;
      }
    }
    return weight;
  }
}
