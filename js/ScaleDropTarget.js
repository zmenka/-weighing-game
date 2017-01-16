import GameDropTarget from './GameDropTarget';

export default class ScaleDropTarget extends GameDropTarget {

  _checkElemIsTarget(elem) {
    return !!elem.classList.contains('bags-on-scale');
  }
}
