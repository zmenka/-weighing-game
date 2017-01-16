import {
  getCoords,
  getElementUnderClientXY
} from './utils';

export default class DragAvatar {
  constructor(dragZone, dragElem, dropTargetFail) {
    this._dragZone = dragZone;
    this._dragZoneElem = dragElem;
    this._dragTargetFail = dropTargetFail;
    this._elem = dragElem;
    this._currentTargetElem = null;
    this.initPosition = {};
  }

  initFromEvent(downX, downY, event) {
    /* override */
  }

  getDragInfo() {
    return {
      elem: this._elem,
      dragZoneElem: this._dragZoneElem,
      dragZone: this._dragZone
    };
  }

  getTargetElem() {
    return this._currentTargetElem;
  }

  onDragMove(event) {
    this._elem.style.left = event.pageX - this._shiftX + 'px';
    this._elem.style.top = event.pageY - this._shiftY + 'px';

    this._currentTargetElem = getElementUnderClientXY(this._elem, event.clientX, event.clientY);
  }

  onDragCancel() {
    /* override */
  }

  onDragEnd() {
    /* override */
  }
}
