import DragAvatar from './DragAvatar';
import {
  getCoords,
  getElementUnderClientXY,
  animate,
  bounceEaseOut
} from './utils';

export default class SutcaseDragAvatar extends DragAvatar {

  initFromEvent(downX, downY, event) {
    if (!event.target.classList.contains('sutcase')) return false;

    if (this._dragZoneElem != event.target) {
      console.log("!!!!!!!!!!!!!", this._dragZoneElem, event.target)
    };
    // this._dragZoneElem = event.target;
    this._elem = this._dragZone.cloneDragZoneElem();

    // создать вспомогательные свойства shiftX/shiftY
    const coords = getCoords(this._dragZoneElem);
    this._shiftX = downX - coords.left;
    this._shiftY = downY - coords.top;

    // инициировать начало переноса
    this._elem.style.zIndex = 9999;
    this._elem.style.position = 'absolute';

    document.body.appendChild(this._elem);

    this.initPosition = {
      left: event.pageX - this._shiftX,
      top: event.pageY - this._shiftY
    };

    return true;
  }

  _destroy(callCb = true) {

    const coords = getCoords(this._dragZoneElem);
    const startTop = parseInt(this._elem.style.top);
    const duration = (coords.top - startTop) * 15;
    animate({
      duration: duration,
      timing: bounceEaseOut,
      draw: (progress) => {
        this._elem.style.top = startTop + progress * (coords.top - startTop) + 'px';
      }
    });

    setTimeout(() => {
      this._elem.parentNode && this._elem.parentNode.removeChild(this._elem);
      this._dragZone.showAdding();
      callCb && this._dragZone.onDragEndCb && this._dragZone.onDragEndCb(this._dragZoneElem);
    }, duration);
  }

  onDragCancel() {

    const currentPlace = this._dragZoneElem.parentNode;
    const dropFailElem = this._dragTargetFail.getDropTargetFailElem();

    if (dropFailElem != currentPlace) {
      dropFailElem.appendChild(this._dragZoneElem);
      this._dragZone.onDragEndCb && this._dragZone.onDragEndCb(this._dragZoneElem);
    }

    this._destroy(false);
  }

  onDragEnd() {
    this._destroy();
  }
}
