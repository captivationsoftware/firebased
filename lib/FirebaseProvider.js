'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _firebase = require('firebase');

var _firebase2 = _interopRequireDefault(_firebase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FirebaseProvider = function (_Component) {
  _inherits(FirebaseProvider, _Component);

  function FirebaseProvider() {
    _classCallCheck(this, FirebaseProvider);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(FirebaseProvider).apply(this, arguments));
  }

  _createClass(FirebaseProvider, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        firebase: _firebase2.default.apps.length === 0 ? _firebase2.default.initializeApp(this.props.config) : _firebase2.default.apps[0]
      };
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        this.props.children
      );
    }
  }]);

  return FirebaseProvider;
}(_react.Component);

FirebaseProvider.childContextTypes = {
  firebase: _react.PropTypes.object
};
FirebaseProvider.propTypes = {
  config: _react.PropTypes.object.isRequired,
  children: _react.PropTypes.element.isRequired
};
exports.default = FirebaseProvider;