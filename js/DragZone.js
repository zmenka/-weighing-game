import DragAvatar from './DragAvatar'

export default class DragZone {
  constructor(elem, dropTargetFail) {
    elem.dragZone = this;
    this._elem = elem;
    this._dropTargetFail = dropTargetFail;
  }

  _makeAvatar() {
    /* override */
  }

  onDragStart(downX, downY, event) {

    const avatar = this._makeAvatar();

    if (!avatar.initFromEvent(downX, downY, event)) {
      return false;
    }

    return avatar;
  };
}
