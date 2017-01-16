import DragZone from './DragZone';
import SutcaseDragAvatar from './SutcaseDragAvatar';

export default class SutcaseDragZone extends DragZone {
  constructor(elem, dropTargetFail, onDragEndCb) {
    super(elem, dropTargetFail);
    this.onDragEndCb = onDragEndCb;
  }

  _makeAvatar() {
    return new SutcaseDragAvatar(this, this._elem, this._dropTargetFail);
  }

  cloneDragZoneElem() {
    this._elem.classList.remove('add-flex');
    this._elem.classList.remove('invisible');

    let newElem = this._elem.cloneNode(true);

    this._elem.classList.add('remove-flex');

    return newElem;
  }

  showAdding() {
    this._elem.classList.remove('remove-flex');
    this._elem.classList.add('add-flex');
  }

  hideDragZoneElem() {
    this._elem.classList.remove('remove-flex');
    this._elem.classList.add('invisible');
  }
}
