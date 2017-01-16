/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Game = __webpack_require__(1);

	var _Game2 = _interopRequireDefault(_Game);

	__webpack_require__(13);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	new _Game2.default();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _DragManager = __webpack_require__(2);

	var _DragManager2 = _interopRequireDefault(_DragManager);

	var _SutcaseDragZone = __webpack_require__(3);

	var _SutcaseDragZone2 = _interopRequireDefault(_SutcaseDragZone);

	var _ScaleDropTarget = __webpack_require__(8);

	var _ScaleDropTarget2 = _interopRequireDefault(_ScaleDropTarget);

	var _BottomDropTarget = __webpack_require__(11);

	var _BottomDropTarget2 = _interopRequireDefault(_BottomDropTarget);

	var _DropTargetFail = __webpack_require__(12);

	var _DropTargetFail2 = _interopRequireDefault(_DropTargetFail);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Game = function () {
	  function Game() {
	    _classCallCheck(this, Game);

	    var scales = document.querySelector('.scales');
	    if (!scales) {
	      console.log('Cant start game');
	    }
	    this._scales = scales;

	    this._weights = [1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3];
	    this._sum = this._weights.reduce(function (sum, current) {
	      return sum + current;
	    }, 0);

	    (0, _DragManager2.default)();
	    this.init();
	    this.addEventListener();
	    this.createResetButton();

	    this.createWinnerMessage();
	  }

	  _createClass(Game, [{
	    key: 'init',
	    value: function init() {
	      this._scales.classList.remove('more-on-left');
	      this._scales.classList.remove('more-on-right');

	      var placeForBags = document.querySelector('.place-for-bags');
	      var scalesPlatforms = document.querySelectorAll('.bags-on-scale');

	      this._removeOldSutcases();

	      // new BottomDropTarget(placeForBags);

	      for (var i = 0; i < scalesPlatforms.length; ++i) {
	        new _ScaleDropTarget2.default(scalesPlatforms[i]);
	      }

	      var dropFail = new _DropTargetFail2.default(placeForBags);

	      for (var _i = 0; _i < this._weights.length; ++_i) {
	        var div = document.createElement('div');
	        div.className = 'sutcase sutcase-' + (_i + 1);
	        div.setAttribute("data-weight", this._weights[_i]);
	        placeForBags.appendChild(div);
	        new _SutcaseDragZone2.default(div, dropFail, this.getOnDragEndCb());
	      }
	    }
	  }, {
	    key: 'addEventListener',
	    value: function addEventListener() {
	      var _this = this;

	      document.addEventListener('smth-is-dropped', function (event) {
	        // console.log('smth-is-dropped', event);
	        var leftWeight = _this._getWeightOfSutcases(_this._scales.querySelectorAll('.platform-left .sutcase'));
	        var rightWeight = _this._getWeightOfSutcases(_this._scales.querySelectorAll('.platform-right .sutcase'));
	        // console.log('weight', leftWeight, rightWeight);
	        _this._scales.classList.remove('more-on-left');
	        _this._scales.classList.remove('more-on-right');
	        if (leftWeight < rightWeight) {
	          _this._scales.classList.add('more-on-right');
	        } else if (leftWeight > rightWeight) {
	          _this._scales.classList.add('more-on-left');
	        } else if (leftWeight + rightWeight == _this._sum) {
	          _this.showWinnerMessage();
	        };
	      }, false);
	    }
	  }, {
	    key: 'createResetButton',
	    value: function createResetButton() {
	      var _this2 = this;

	      var button = document.createElement('button');
	      button.appendChild(document.createTextNode('Сбросить'));
	      button.className = 'reset';

	      button.onclick = function () {
	        // this.showWinnerMessage();
	        _this2.init();
	      };
	      this._scales.appendChild(button);
	    }
	  }, {
	    key: 'createWinnerMessage',
	    value: function createWinnerMessage() {
	      var msg = document.createElement('div');
	      msg.appendChild(document.createTextNode('Победа!'));
	      msg.className = 'winner-msg';
	      this._scales.appendChild(msg);
	    }
	  }, {
	    key: 'showWinnerMessage',
	    value: function showWinnerMessage() {
	      var msg = this._scales.querySelector('.winner-msg');
	      if (msg) {
	        msg.classList.remove('winner-start');
	        setTimeout(function () {
	          msg.classList.add('winner-start');
	        }, 20);
	      }
	    }
	  }, {
	    key: '_removeOldSutcases',
	    value: function _removeOldSutcases() {
	      var sutcases = document.getElementsByClassName('sutcase');
	      while (sutcases[0]) {
	        sutcases[0].parentNode.removeChild(sutcases[0]);
	      }
	    }
	  }, {
	    key: 'getOnDragEndCb',
	    value: function getOnDragEndCb() {
	      return function (elem) {
	        var event = new CustomEvent('smth-is-dropped', {
	          bubbles: true
	        });
	        elem && elem.dispatchEvent(event);
	      };
	    }
	  }, {
	    key: '_getWeightOfSutcases',
	    value: function _getWeightOfSutcases(sutcases) {
	      var weight = 0;
	      for (var i = 0; i < sutcases.length; ++i) {
	        var curWeight = Number(sutcases[i].getAttribute("data-weight"));
	        if (!isNaN(curWeight)) {
	          weight += curWeight;
	        }
	      }
	      return weight;
	    }
	  }]);

	  return Game;
	}();

	exports.default = Game;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = initDragAndDrop;
	var dragZone = void 0;
	var avatar = void 0;
	var dropTarget = void 0;
	var downX = void 0;
	var downY = void 0;

	var onMouseDown = function onMouseDown(e) {
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

	var onMouseMove = function onMouseMove(e) {
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

	  var newDropTarget = findDropTarget(e);

	  if (newDropTarget != dropTarget) {
	    dropTarget && dropTarget.onDragLeave(newDropTarget, avatar, e);
	    newDropTarget && newDropTarget.onDragEnter(dropTarget, avatar, e);
	  }

	  dropTarget = newDropTarget;

	  dropTarget && dropTarget.onDragMove(avatar, e);

	  return false;
	};

	var onMouseUp = function onMouseUp(e) {
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
	};

	var cleanUp = function cleanUp() {
	  dragZone = avatar = dropTarget = null;
	};

	var findDragZone = function findDragZone(event) {
	  var elem = event.target;
	  while (elem != document && !elem.dragZone) {
	    elem = elem.parentNode;
	  }
	  return elem.dragZone;
	};

	var findDropTarget = function findDropTarget(event) {
	  var elem = avatar.getTargetElem();

	  while (elem != document && !elem.dropTarget) {
	    elem = elem.parentNode;
	  }

	  if (!elem.dropTarget) {
	    return null;
	  }

	  return elem.dropTarget;
	};

	function initDragAndDrop(dragZones, dropTargets) {
	  document.ondragstart = function () {
	    return false;
	  };

	  document.onmousemove = onMouseMove;
	  document.onmouseup = onMouseUp;
	  document.onmousedown = onMouseDown;
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _DragZone2 = __webpack_require__(4);

	var _DragZone3 = _interopRequireDefault(_DragZone2);

	var _SutcaseDragAvatar = __webpack_require__(7);

	var _SutcaseDragAvatar2 = _interopRequireDefault(_SutcaseDragAvatar);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var SutcaseDragZone = function (_DragZone) {
	  _inherits(SutcaseDragZone, _DragZone);

	  function SutcaseDragZone(elem, dropTargetFail, onDragEndCb) {
	    _classCallCheck(this, SutcaseDragZone);

	    var _this = _possibleConstructorReturn(this, (SutcaseDragZone.__proto__ || Object.getPrototypeOf(SutcaseDragZone)).call(this, elem, dropTargetFail));

	    _this.onDragEndCb = onDragEndCb;
	    return _this;
	  }

	  _createClass(SutcaseDragZone, [{
	    key: '_makeAvatar',
	    value: function _makeAvatar() {
	      return new _SutcaseDragAvatar2.default(this, this._elem, this._dropTargetFail);
	    }
	  }, {
	    key: 'cloneDragZoneElem',
	    value: function cloneDragZoneElem() {
	      this._elem.classList.remove('add-flex');
	      this._elem.classList.remove('invisible');

	      var newElem = this._elem.cloneNode(true);

	      this._elem.classList.add('remove-flex');

	      return newElem;
	    }
	  }, {
	    key: 'showAdding',
	    value: function showAdding() {
	      this._elem.classList.remove('remove-flex');
	      this._elem.classList.add('add-flex');
	    }
	  }, {
	    key: 'hideDragZoneElem',
	    value: function hideDragZoneElem() {
	      this._elem.classList.remove('remove-flex');
	      this._elem.classList.add('invisible');
	    }
	  }]);

	  return SutcaseDragZone;
	}(_DragZone3.default);

	exports.default = SutcaseDragZone;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _DragAvatar = __webpack_require__(5);

	var _DragAvatar2 = _interopRequireDefault(_DragAvatar);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var DragZone = function () {
	  function DragZone(elem, dropTargetFail) {
	    _classCallCheck(this, DragZone);

	    elem.dragZone = this;
	    this._elem = elem;
	    this._dropTargetFail = dropTargetFail;
	  }

	  _createClass(DragZone, [{
	    key: '_makeAvatar',
	    value: function _makeAvatar() {
	      /* override */
	    }
	  }, {
	    key: 'onDragStart',
	    value: function onDragStart(downX, downY, event) {

	      var avatar = this._makeAvatar();

	      if (!avatar.initFromEvent(downX, downY, event)) {
	        return false;
	      }

	      return avatar;
	    }
	  }]);

	  return DragZone;
	}();

	exports.default = DragZone;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _utils = __webpack_require__(6);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var DragAvatar = function () {
	  function DragAvatar(dragZone, dragElem, dropTargetFail) {
	    _classCallCheck(this, DragAvatar);

	    this._dragZone = dragZone;
	    this._dragZoneElem = dragElem;
	    this._dragTargetFail = dropTargetFail;
	    this._elem = dragElem;
	    this._currentTargetElem = null;
	    this.initPosition = {};
	  }

	  _createClass(DragAvatar, [{
	    key: 'initFromEvent',
	    value: function initFromEvent(downX, downY, event) {
	      /* override */
	    }
	  }, {
	    key: 'getDragInfo',
	    value: function getDragInfo() {
	      return {
	        elem: this._elem,
	        dragZoneElem: this._dragZoneElem,
	        dragZone: this._dragZone
	      };
	    }
	  }, {
	    key: 'getTargetElem',
	    value: function getTargetElem() {
	      return this._currentTargetElem;
	    }
	  }, {
	    key: 'onDragMove',
	    value: function onDragMove(event) {
	      this._elem.style.left = event.pageX - this._shiftX + 'px';
	      this._elem.style.top = event.pageY - this._shiftY + 'px';

	      this._currentTargetElem = (0, _utils.getElementUnderClientXY)(this._elem, event.clientX, event.clientY);
	    }
	  }, {
	    key: 'onDragCancel',
	    value: function onDragCancel() {
	      /* override */
	    }
	  }, {
	    key: 'onDragEnd',
	    value: function onDragEnd() {
	      /* override */
	    }
	  }]);

	  return DragAvatar;
	}();

	exports.default = DragAvatar;

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getCoords = getCoords;
	exports.getElementUnderClientXY = getElementUnderClientXY;
	exports.animate = animate;
	function getCoords(elem) {
	  var box = elem.getBoundingClientRect();

	  var body = document.body;
	  var docElem = document.documentElement;

	  var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
	  var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;

	  var clientTop = docElem.clientTop || body.clientTop || 0;
	  var clientLeft = docElem.clientLeft || body.clientLeft || 0;

	  var top = box.top + scrollTop - clientTop;
	  var left = box.left + scrollLeft - clientLeft;

	  return {
	    top: Math.round(top),
	    left: Math.round(left)
	  };
	}

	function getElementUnderClientXY(elem, clientX, clientY) {
	  var display = elem.style.display || '';
	  elem.style.display = 'none';

	  var target = document.elementFromPoint(clientX, clientY);

	  elem.style.display = display;

	  if (!target || target == document) {
	    target = document.body;
	  }

	  return target;
	}

	function animate(options) {

	  var start = performance.now();

	  requestAnimationFrame(function animate(time) {
	    // timeFraction от 0 до 1
	    var timeFraction = (time - start) / options.duration;
	    if (timeFraction > 1) timeFraction = 1;

	    // текущее состояние анимации
	    var progress = options.timing(timeFraction);

	    options.draw(progress);

	    if (timeFraction < 1) {
	      requestAnimationFrame(animate);
	    }
	  });
	}

	function makeEaseOut(timing) {
	  return function (timeFraction) {
	    return 1 - timing(1 - timeFraction);
	  };
	}

	function bounce(timeFraction) {
	  for (var a = 0, b = 1, result; 1; a += b, b /= 2) {
	    if (timeFraction >= (7 - 4 * a) / 11) {
	      return -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2);
	    }
	  }
	}

	var bounceEaseOut = exports.bounceEaseOut = makeEaseOut(bounce);

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _DragAvatar2 = __webpack_require__(5);

	var _DragAvatar3 = _interopRequireDefault(_DragAvatar2);

	var _utils = __webpack_require__(6);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var SutcaseDragAvatar = function (_DragAvatar) {
	  _inherits(SutcaseDragAvatar, _DragAvatar);

	  function SutcaseDragAvatar() {
	    _classCallCheck(this, SutcaseDragAvatar);

	    return _possibleConstructorReturn(this, (SutcaseDragAvatar.__proto__ || Object.getPrototypeOf(SutcaseDragAvatar)).apply(this, arguments));
	  }

	  _createClass(SutcaseDragAvatar, [{
	    key: 'initFromEvent',
	    value: function initFromEvent(downX, downY, event) {
	      if (!event.target.classList.contains('sutcase')) return false;

	      if (this._dragZoneElem != event.target) {
	        console.log("!!!!!!!!!!!!!", this._dragZoneElem, event.target);
	      };
	      // this._dragZoneElem = event.target;
	      this._elem = this._dragZone.cloneDragZoneElem();

	      // создать вспомогательные свойства shiftX/shiftY
	      var coords = (0, _utils.getCoords)(this._dragZoneElem);
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
	  }, {
	    key: '_destroy',
	    value: function _destroy() {
	      var _this2 = this;

	      var callCb = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;


	      var coords = (0, _utils.getCoords)(this._dragZoneElem);
	      var startTop = parseInt(this._elem.style.top);
	      var duration = (coords.top - startTop) * 15;
	      (0, _utils.animate)({
	        duration: duration,
	        timing: _utils.bounceEaseOut,
	        draw: function draw(progress) {
	          _this2._elem.style.top = startTop + progress * (coords.top - startTop) + 'px';
	        }
	      });

	      setTimeout(function () {
	        _this2._elem.parentNode && _this2._elem.parentNode.removeChild(_this2._elem);
	        _this2._dragZone.showAdding();
	        callCb && _this2._dragZone.onDragEndCb && _this2._dragZone.onDragEndCb(_this2._dragZoneElem);
	      }, duration);
	    }
	  }, {
	    key: 'onDragCancel',
	    value: function onDragCancel() {

	      var currentPlace = this._dragZoneElem.parentNode;
	      var dropFailElem = this._dragTargetFail.getDropTargetFailElem();

	      if (dropFailElem != currentPlace) {
	        dropFailElem.appendChild(this._dragZoneElem);
	        this._dragZone.onDragEndCb && this._dragZone.onDragEndCb(this._dragZoneElem);
	      }

	      this._destroy(false);
	    }
	  }, {
	    key: 'onDragEnd',
	    value: function onDragEnd() {
	      this._destroy();
	    }
	  }]);

	  return SutcaseDragAvatar;
	}(_DragAvatar3.default);

	exports.default = SutcaseDragAvatar;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _GameDropTarget2 = __webpack_require__(9);

	var _GameDropTarget3 = _interopRequireDefault(_GameDropTarget2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ScaleDropTarget = function (_GameDropTarget) {
	  _inherits(ScaleDropTarget, _GameDropTarget);

	  function ScaleDropTarget() {
	    _classCallCheck(this, ScaleDropTarget);

	    return _possibleConstructorReturn(this, (ScaleDropTarget.__proto__ || Object.getPrototypeOf(ScaleDropTarget)).apply(this, arguments));
	  }

	  _createClass(ScaleDropTarget, [{
	    key: '_checkElemIsTarget',
	    value: function _checkElemIsTarget(elem) {
	      return !!elem.classList.contains('bags-on-scale');
	    }
	  }]);

	  return ScaleDropTarget;
	}(_GameDropTarget3.default);

	exports.default = ScaleDropTarget;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _DropTarget2 = __webpack_require__(10);

	var _DropTarget3 = _interopRequireDefault(_DropTarget2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var GameDropTarget = function (_DropTarget) {
	  _inherits(GameDropTarget, _DropTarget);

	  function GameDropTarget() {
	    _classCallCheck(this, GameDropTarget);

	    return _possibleConstructorReturn(this, (GameDropTarget.__proto__ || Object.getPrototypeOf(GameDropTarget)).apply(this, arguments));
	  }

	  _createClass(GameDropTarget, [{
	    key: '_hideHoverIndication',
	    value: function _hideHoverIndication(avatar) {
	      this._targetElem && this._targetElem.classList.remove('hover');
	    }
	  }, {
	    key: '_showHoverIndication',
	    value: function _showHoverIndication(avatar) {
	      this._targetElem && this._targetElem.classList.add('hover');
	    }
	  }, {
	    key: '_checkElemIsTarget',
	    value: function _checkElemIsTarget(elem) {
	      /* override */
	    }
	  }, {
	    key: '_getTargetElem',
	    value: function _getTargetElem(avatar, event) {
	      var target = avatar.getTargetElem();

	      if (!this._checkElemIsTarget(target)) {
	        return;
	      }

	      return target;
	    }
	  }, {
	    key: 'onDragEnd',
	    value: function onDragEnd(avatar, event) {

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
	  }]);

	  return GameDropTarget;
	}(_DropTarget3.default);

	exports.default = GameDropTarget;

/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var DropTarget = function () {
	  function DropTarget(elem) {
	    _classCallCheck(this, DropTarget);

	    elem.dropTarget = this;
	    this._elem = elem;
	    this._targetElem = null;
	  }

	  _createClass(DropTarget, [{
	    key: "_getTargetElem",
	    value: function _getTargetElem(avatar, event) {
	      return this._elem;
	    }
	  }, {
	    key: "_hideHoverIndication",
	    value: function _hideHoverIndication(avatar) {
	      /* override */
	    }
	  }, {
	    key: "_showHoverIndication",
	    value: function _showHoverIndication(avatar) {
	      /* override */
	    }
	  }, {
	    key: "onDragMove",
	    value: function onDragMove(avatar, event) {

	      var newTargetElem = this._getTargetElem(avatar, event);

	      if (this._targetElem != newTargetElem) {

	        this._hideHoverIndication(avatar);
	        this._targetElem = newTargetElem;
	        this._showHoverIndication(avatar);
	      }
	    }
	  }, {
	    key: "onDragEnd",
	    value: function onDragEnd(avatar, event) {
	      this._hideHoverIndication(avatar);
	      this._targetElem = null;
	    }
	  }, {
	    key: "onDragEnter",
	    value: function onDragEnter(fromDropTarget, avatar, event) {
	      /* override */
	    }
	  }, {
	    key: "onDragLeave",
	    value: function onDragLeave(toDropTarget, avatar, event) {
	      this._hideHoverIndication();
	      this._targetElem = null;
	    }
	  }]);

	  return DropTarget;
	}();

	exports.default = DropTarget;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _GameDropTarget2 = __webpack_require__(9);

	var _GameDropTarget3 = _interopRequireDefault(_GameDropTarget2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var BottomDropTarget = function (_GameDropTarget) {
	  _inherits(BottomDropTarget, _GameDropTarget);

	  function BottomDropTarget() {
	    _classCallCheck(this, BottomDropTarget);

	    return _possibleConstructorReturn(this, (BottomDropTarget.__proto__ || Object.getPrototypeOf(BottomDropTarget)).apply(this, arguments));
	  }

	  _createClass(BottomDropTarget, [{
	    key: '_checkElemIsTarget',
	    value: function _checkElemIsTarget(elem) {
	      return !!elem.classList.contains('place-for-bags');
	    }
	  }]);

	  return BottomDropTarget;
	}(_GameDropTarget3.default);

	exports.default = BottomDropTarget;

/***/ },
/* 12 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var DropTargetFail = function () {
	  function DropTargetFail(elem) {
	    _classCallCheck(this, DropTargetFail);

	    elem.DropTargetFail = this;
	    this._elem = elem;
	  }

	  _createClass(DropTargetFail, [{
	    key: "getDropTargetFailElem",
	    value: function getDropTargetFailElem() {
	      return this._elem;
	    }
	  }]);

	  return DropTargetFail;
	}();

	exports.default = DropTargetFail;

/***/ },
/* 13 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
/******/ ]);