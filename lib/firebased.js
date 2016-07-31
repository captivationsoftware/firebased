'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

exports.default = function (paths) {
  return function (FirebasedComponent) {
    var _class, _temp;

    return _temp = _class = function (_Component) {
      _inherits(_class, _Component);

      function _class(props) {
        _classCallCheck(this, _class);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_class).call(this, props));

        _this.state = {};
        return _this;
      }

      _createClass(_class, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
          this.decorate(this.props);
        }
      }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
          if ((0, _lodash.isFunction)(paths)) {
            this.cleanup();
            this.decorate(nextProps);
          }
        }
      }, {
        key: 'definitionsFor',
        value: function definitionsFor(props) {
          var _this2 = this;

          return (0, _lodash.mapValues)((0, _lodash.isFunction)(paths) ? paths(props) : paths, function (path) {
            return _this2.context.firebase.database().ref(path);
          });
        }
      }, {
        key: 'cleanup',
        value: function cleanup() {
          var _this3 = this;

          (0, _lodash.mapValues)(this.definitionsFor(this.props), function (ref, prop) {
            return ref.off('value', _this3.state.subscribers[prop]);
          });
        }
      }, {
        key: 'decorate',
        value: function decorate(props) {
          var _this4 = this;

          var definitions = this.definitionsFor(props);

          var refs = (0, _lodash.mapKeys)(definitions, function (path, prop) {
            return prop + 'Ref';
          });

          var subscribers = (0, _lodash.mapValues)(definitions, function (ref, prop) {
            return function (snapshot) {
              return _this4.setState((0, _lodash.set)({}, prop, snapshot.val()));
            };
          });

          (0, _lodash.mapValues)(definitions, function (ref, prop) {
            return ref.on('value', subscribers[prop]);
          });

          this.setState((0, _lodash.assign)({}, refs, { subscribers: subscribers }));
        }
      }, {
        key: 'render',
        value: function render() {
          var decorations = (0, _lodash.omit)(this.state, 'subscribers');
          return _react2.default.createElement(FirebasedComponent, _extends({}, this.props, decorations, { firebase: this.context.firebase }));
        }
      }]);

      return _class;
    }(_react.Component), _class.contextTypes = {
      firebase: _react.PropTypes.object
    }, _temp;
  };
};