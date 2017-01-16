let dragZone;
let avatar;
let dropTarget;
let downX;
let downY;

const onMouseDown = function onMouseDown(e) {
  if (e.which != 1) {
    return false;
  }

  dragZone = findDragZone(e);

  if (!dragZone) {
    return;
  }

  downX = e.pageX;
  downY = e.pageY;

  return false;
};

const onMouseMove = function onMouseMove(e) {
  if (!dragZone) return;

  if (!avatar) {
    if (Math.abs(e.pageX - downX) < 3 && Math.abs(e.pageY - downY) < 3) {
      return;
    }
    avatar = dragZone.onDragStart(downX, downY, e);

    if (!avatar) {
      cleanUp();
      return;
    }
  }

  avatar.onDragMove(e);

  const newDropTarget = findDropTarget(e);

  if (newDropTarget != dropTarget) {
    dropTarget && dropTarget.onDragLeave(newDropTarget, avatar, e);
    newDropTarget && newDropTarget.onDragEnter(dropTarget, avatar, e);
  }

  dropTarget = newDropTarget;

  dropTarget && dropTarget.onDragMove(avatar, e);

  return false;

}

const onMouseUp = function onMouseUp(e) {
  if (e.which != 1) {
    return false;
  }

  if (avatar) {

    if (dropTarget) {
      dropTarget.onDragEnd(avatar, e);
    } else {
      avatar.onDragCancel();
    }

  }

  cleanUp();
}

const cleanUp = function cleanUp() {
  dragZone = avatar = dropTarget = null;
}

const findDragZone = function findDragZone(event) {
  var elem = event.target;
  while (elem != document && !elem.dragZone) {
    elem = elem.parentNode;
  }
  return elem.dragZone;
}

var findDropTarget = (event) => {
  var elem = avatar.getTargetElem();

  while (elem != document && !elem.dropTarget) {
    elem = elem.parentNode;
  }

  if (!elem.dropTarget) {
    return null;
  }

  return elem.dropTarget;
}

export default function initDragAndDrop(dragZones, dropTargets) {
  document.ondragstart = function() {
    return false;
  }

  document.onmousemove = onMouseMove;
  document.onmouseup = onMouseUp;
  document.onmousedown = onMouseDown;
};
