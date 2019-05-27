var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function Header() {

    var user = {
        token: Cookies.get('TokenKey'),
        name: Cookies.get('NameKey'),
        avatar: Cookies.get('AvatarKey')
    };

    return React.createElement(
        'div',
        { className: 'navbar' },
        React.createElement(
            'a',
            { href: 'index.html', className: 'logo-brand' },
            React.createElement('img', { src: 'img/logo-brand.png', alt: 'logo' })
        ),
        React.createElement(
            'ul',
            { className: 'ul-nav' },
            React.createElement(
                'li',
                { className: 'active' },
                React.createElement(
                    'a',
                    { href: '' },
                    '\u9996\u9875'
                )
            ),
            React.createElement(
                'li',
                null,
                React.createElement(
                    'a',
                    { href: '' },
                    '\u5168\u90E8\u8D44\u6E90'
                )
            ),
            React.createElement(
                'li',
                null,
                React.createElement(
                    'a',
                    { href: '' },
                    '\u4E0A\u4F20'
                )
            ),
            React.createElement(
                'li',
                null,
                React.createElement(
                    'a',
                    { href: 'me.html' },
                    '\u6211\u7684'
                )
            )
        ),
        user.name === undefined ? React.createElement(Login, null) : React.createElement(User, { user: user })
    );
}

function Login() {
    return React.createElement(
        'div',
        { className: 'login' },
        React.createElement(
            'a',
            { href: 'login.html' },
            '\u767B\u5F55'
        )
    );
}

var User = function (_React$Component) {
    _inherits(User, _React$Component);

    function User() {
        _classCallCheck(this, User);

        var _this = _possibleConstructorReturn(this, (User.__proto__ || Object.getPrototypeOf(User)).call(this));

        _this.state = {
            display: 'none'
        };
        return _this;
    }

    _createClass(User, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            return React.createElement(
                'div',
                { className: 'user-info' },
                React.createElement(
                    'li',
                    null,
                    React.createElement(
                        'a',
                        { href: '', className: 'notice' },
                        '\u901A\u77E5'
                    )
                ),
                React.createElement(
                    'li',
                    { className: 'hover' },
                    React.createElement('i', { className: 'fa fa-plus', id: 'hover-info', onMouseOver: function onMouseOver() {
                            return _this2.setState({ display: '' });
                        }, onMouseOut: function onMouseOut() {
                            return _this2.setState({ display: 'none' });
                        } }),
                    React.createElement(
                        'ul',
                        { className: 'hover-info', style: { display: this.state.display } },
                        React.createElement(
                            'li',
                            null,
                            React.createElement('i', { className: 'fa fa-user', 'aria-hidden': 'true' }),
                            React.createElement(
                                'a',
                                { href: './makeFriends-submit.html', target: '_blank' },
                                '\u4E2A\u4EBA\u4E2D\u5FC3'
                            )
                        ),
                        React.createElement(
                            'li',
                            null,
                            React.createElement('i', { className: 'fa fa-cog', 'aria-hidden': 'true' }),
                            React.createElement(
                                'a',
                                { href: './makeFriends-submit.html', target: '_blank' },
                                '\u8D26\u6237\u8BBE\u7F6E'
                            )
                        ),
                        React.createElement(
                            'li',
                            null,
                            React.createElement('i', { className: 'fa fa-user', 'aria-hidden': 'true' }),
                            React.createElement(
                                'a',
                                { href: './makeFriends-submit.html', target: '_blank' },
                                '\u6211\u7684\u4FE1\u606F'
                            )
                        )
                    )
                ),
                React.createElement(
                    'li',
                    null,
                    React.createElement(
                        'a',
                        { href: 'user-info.html', className: 'user-photo' },
                        React.createElement('img', { src: 'img/user-photo.png', alt: '\u7528\u6237\u5934\u50CF' })
                    )
                )
            );
        }
    }]);

    return User;
}(React.Component);

ReactDOM.render(React.createElement(Header, null), document.getElementsByTagName("header")[0]);

function getUser() {
    return {};
}