export default class DropTargetFail {
  constructor(elem) {
    elem.DropTargetFail = this;
    this._elem = elem;
  }

  getDropTargetFailElem() {
    return this._elem;
  }
}
