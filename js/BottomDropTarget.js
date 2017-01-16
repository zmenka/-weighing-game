import GameDropTarget from './GameDropTarget';

export default class BottomDropTarget extends GameDropTarget {

  _checkElemIsTarget(elem) {
    return !!elem.classList.contains('place-for-bags');
  }
}
