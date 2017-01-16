import DropTarget from './DropTarget';

export default class GameDropTarget extends DropTarget {

  _hideHoverIndication(avatar) {
    this._targetElem && this._targetElem.classList.remove('hover');
  }

  _showHoverIndication(avatar) {
    this._targetElem && this._targetElem.classList.add('hover');
  }

  _checkElemIsTarget(elem) {
    /* override */
  }

  _getTargetElem(avatar, event) {
    const target = avatar.getTargetElem();

    if (!this._checkElemIsTarget(target)) {
      return;
    }

    return target;
  }

  onDragEnd(avatar, event) {

    if (!this._targetElem) {
      // перенос закончился вне подходящей точки приземления
      avatar.onDragCancel();
      return;
    }

    this._hideHoverIndication();

    // получить информацию об объекте переноса
    var avatarInfo = avatar.getDragInfo(event);

    var currentTargetElem = avatarInfo.dragZoneElem.parentNode;

    if (this._targetElem != currentTargetElem) {
      avatarInfo.dragZone.hideDragZoneElem();
      this._elem.appendChild(avatarInfo.dragZoneElem);
    }

    avatar.onDragEnd();

    this._targetElem = null;
  }
}
