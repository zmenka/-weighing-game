export default class DropTarget {

  constructor(elem) {
    elem.dropTarget = this;
    this._elem = elem;
    this._targetElem = null;
  }

  _getTargetElem(avatar, event) {
    return this._elem;
  }

  _hideHoverIndication(avatar) {
    /* override */
  }

  _showHoverIndication(avatar) {
    /* override */
  }

  onDragMove(avatar, event) {

    const newTargetElem = this._getTargetElem(avatar, event);

    if (this._targetElem != newTargetElem) {

      this._hideHoverIndication(avatar);
      this._targetElem = newTargetElem;
      this._showHoverIndication(avatar);
    }
  }

  onDragEnd(avatar, event) {
    this._hideHoverIndication(avatar);
    this._targetElem = null;
  }

  onDragEnter(fromDropTarget, avatar, event) {
    /* override */
  }

  onDragLeave(toDropTarget, avatar, event) {
    this._hideHoverIndication();
    this._targetElem = null;
  }
}
