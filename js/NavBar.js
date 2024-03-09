var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NavBar = function (_React$Component) {
    _inherits(NavBar, _React$Component);

    function NavBar(props) {
        _classCallCheck(this, NavBar);

        var _this = _possibleConstructorReturn(this, (NavBar.__proto__ || Object.getPrototypeOf(NavBar)).call(this, props));

        _this.switchStyle = _this.switchStyle.bind(_this);
        _this.styles = ['style.css', 'dark-style.css'];
        _this.lightModeStyleSheetName = _this.styles[0];
        _this.darkModeStyleSheetName = _this.styles[1];
        _this.state = { style: 'style.css' };
        return _this;
    }

    _createClass(NavBar, [{
        key: 'setInitialStyleSheet',
        value: function setInitialStyleSheet() {
            var themeFromLocalStorage = localStorage.getItem('theme');
            var newStyle = void 0;
            if (themeFromLocalStorage) {
                newStyle = themeFromLocalStorage === 'dark' ? this.darkModeStyleSheetName : this.lightModeStyleSheetName;
                this.updateStyleInState(newStyle);
            } else {
                var useDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (useDarkMode) newStyle = this.darkModeStyleSheetName;else newStyle = this.lightModeStyleSheetName;
                this.updateStyleInState(newStyle);
            }
            this.setStyle(newStyle);
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.setInitialStyleSheet();
        }
    }, {
        key: 'switchStyle',
        value: function switchStyle() {
            try {
                var newStyle = this.state.style === this.lightModeStyleSheetName ? this.darkModeStyleSheetName : this.lightModeStyleSheetName;
                this.updateStyleInState(newStyle);
                var theme = newStyle === this.lightModeStyleSheetName ? 'light' : 'dark';
                localStorage.setItem('theme', theme);
                this.setStyle(newStyle);
            } catch (error) {
                console.error('localStorage.setItem(key: ' + key + ', item: ' + item + ') error:', error);
            }
        }
    }, {
        key: 'updateStyleInState',
        value: function updateStyleInState(newStyle) {
            this.setState({ style: newStyle });
        }
    }, {
        key: 'setStyle',
        value: function setStyle(styleSheetName) {
            var appStyle = document.getElementById('app-style');
            appStyle.setAttribute('href', styleSheetName);
            var styleSwitchButton = document.getElementById('styleSwitchButton');
            styleSwitchButton.innerHTML = styleSheetName === this.darkModeStyleSheetName ? "Switch to Light Mode" : "Switch to Dark Mode";
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'nav',
                { className: 'navbar navbar-expand-lg navbar-dark bg-dark mb-3' },
                React.createElement(
                    'div',
                    { className: 'container-fluid' },
                    React.createElement(
                        'a',
                        { className: 'navbar-brand', href: '#' },
                        'Tax Calculator'
                    ),
                    React.createElement(
                        'button',
                        { className: 'navbar-toggler', type: 'button', 'data-bs-toggle': 'collapse', 'data-bs-target': '#navbarSupportedContent', 'aria-controls': 'navbarSupportedContent', 'aria-expanded': 'false', 'aria-label': 'Toggle navigation' },
                        React.createElement('span', { className: 'navbar-toggler-icon' })
                    ),
                    React.createElement(
                        'div',
                        { className: 'collapse navbar-collapse', id: 'navbarSupportedContent' },
                        React.createElement(
                            'ul',
                            { className: 'navbar-nav me-auto mb-2 mb-lg-0' },
                            React.createElement(
                                'li',
                                { className: 'nav-item' },
                                React.createElement(
                                    'a',
                                    { className: 'nav-link', 'aria-current': 'page', href: '#', id: 'styleSwitchButton', onClick: this.switchStyle },
                                    'Switch to Dark Mode'
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return NavBar;
}(React.Component);

var navbarContainer = document.getElementById('navbar');
var navbarRoot = ReactDOM.createRoot(navbarContainer);
navbarRoot.render(React.createElement(NavBar, null));