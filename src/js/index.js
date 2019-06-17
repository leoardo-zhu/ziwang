var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var baseUrl = 'http://10.129.235.5:9001';

window.onload = function () {

    // 获取最新与最多下载资源
    fetch(baseUrl + '/resource').then(function (response) {
        return response.json();
    }).then(function (response) {
        ReactDOM.render(React.createElement(Resources, { resources: response.data }), document.getElementById('resources'));
    });

    // 获取热门资源
    fetch(baseUrl + '/resource/hot').then(function (response) {
        return response.json();
    }).then(function (response) {
        ReactDOM.render(React.createElement(HotResources, { resources: response.data }), document.getElementById('hot-resources'));
    });

    // 获取一级和二级分类标签
    fetch(baseUrl + '/resource/type').then(function (response) {
        return response.json();
    }).then(function (response) {
        ReactDOM.render(React.createElement(Category, { type: response.data }), document.getElementById('category'));
    });

    ReactDOM.render(React.createElement(UserModule, null), document.getElementById('user-module'));
};

function UserModule() {
    var user = {
        token: Cookies.get('TokenKey'),
        name: Cookies.get('NameKey'),
        avatar: Cookies.get('AvatarKey')
    };

    if (user.token === undefined) {
        return React.createElement(
            'div',
            { className: 'user' },
            React.createElement(
                'h2',
                null,
                '\u6B22\u8FCE\u6765\u5230\u8D44\u7F51'
            ),
            React.createElement(
                'a',
                { href: 'login.html', className: 'upload' },
                '\u7ACB\u5373\u767B\u5F55'
            )
        );
    } else {
        return React.createElement(
            'div',
            null,
            React.createElement(
                'div',
                { className: 'user' },
                React.createElement(
                    'div',
                    { className: 'photo' },
                    React.createElement('img', { src: 'img/user-photo.png', alt: '\u7528\u6237\u5934\u50CF' })
                ),
                React.createElement(
                    'div',
                    { className: 'detail' },
                    React.createElement(
                        'p',
                        null,
                        'Leonardo_Zhu'
                    ),
                    React.createElement(
                        'div',
                        { className: 'level' },
                        '\u7B49\u7EA7 ',
                        React.createElement(
                            'em',
                            null,
                            '1'
                        )
                    )
                )
            ),
            React.createElement(
                'a',
                { href: 'upload.html', className: 'upload' },
                '\u4E0A\u4F20\u8D44\u6E90'
            )
        );
    }
}

var Category = function (_React$Component) {
    _inherits(Category, _React$Component);

    function Category(props) {
        _classCallCheck(this, Category);

        var _this = _possibleConstructorReturn(this, (Category.__proto__ || Object.getPrototypeOf(Category)).call(this));

        _this.addTag1 = function (index) {
            var _this$state$type$inde = _this.state.type[index],
                type1Id = _this$state$type$inde.type1Id,
                type1Name = _this$state$type$inde.type1Name,
                type2 = _this$state$type$inde.type2;

            _this.setState({
                index1: index + 1,
                index2: 0,
                type2: type2,
                tag1: { type1Id: type1Id, type1Name: type1Name },
                tag2: {}
            });
        };

        _this.addTag2 = function (index) {
            var _this$state$type2$ind = _this.state.type2[index],
                type2Id = _this$state$type2$ind.type2Id,
                type2Name = _this$state$type2$ind.type2Name;

            _this.setState({
                index2: index + 1,
                tag2: { type2Id: type2Id, type2Name: type2Name }
            });
            // this.setState({tags})
        };

        _this.removeTag1 = function () {
            _this.setState({
                tag1: {},
                tag2: {},
                type2: [],
                index1: 0,
                index2: 0

            });
        };

        _this.removeTag2 = function () {
            _this.setState({
                tag2: {},
                index2: {}
            });
        };

        _this.state = {
            type: props.type,
            type2: [],
            tag1: {},
            tag2: {},
            index1: 0,
            index2: 0
        };
        return _this;
    }

    _createClass(Category, [{
        key: 'componentWillUpdate',
        value: function componentWillUpdate() {
            var _state = this.state,
                tag1 = _state.tag1,
                tag2 = _state.tag2;

            fetch(baseUrl + ('/resource/type/' + tag1.type1Id + '/' + tag2.type2Id)).then(function (response) {
                return response.json();
            }).then(function (response) {
                ReactDOM.render(React.createElement(Resources, { resources: response.data }), document.getElementById('resources'));
            });
        }

        /**
         * 更新一级分类样式
         * 移除二级分类样式
         * 更新二级分类
         * 更新一级标签
         * 移除二级标签
         */


        /**
         * 删除一级分类标签
         * 删除二级分类标签
         * 移除一级分类样式
         * 移除二级分类
         * 移除二级分类样式
         */

        /**
         * 删除二级分类标签
         * 移除二级分类样式
         */

    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _state2 = this.state,
                type = _state2.type,
                tag1 = _state2.tag1,
                tag2 = _state2.tag2,
                type2 = _state2.type2;


            var tag1View = tag1.type1Id ? React.createElement(
                'li',
                null,
                tag1.type1Name,
                React.createElement('i', { className: 'fa fa-times-circle', onClick: function onClick() {
                        return _this2.removeTag1();
                    } })
            ) : '';

            var tag2View = tag2.type2Id ? React.createElement(
                'li',
                null,
                tag2.type2Name,
                React.createElement('i', { className: 'fa fa-times-circle', onClick: function onClick() {
                        return _this2.removeTag2();
                    } })
            ) : '';

            return React.createElement(
                'div',
                null,
                React.createElement(
                    'div',
                    { className: 'query' },
                    React.createElement(
                        'div',
                        { className: 'row' },
                        React.createElement(
                            'div',
                            { className: 'dt' },
                            '\u8D44\u6E90\u7C7B\u578B\uFF1A'
                        ),
                        React.createElement(
                            'div',
                            { className: 'dd' },
                            React.createElement(
                                'ul',
                                null,
                                type.map(function (type, index) {
                                    return React.createElement(
                                        'li',
                                        { key: type.type1Id },
                                        React.createElement(
                                            'a',
                                            { href: 'javascript:void(0)', onClick: function onClick() {
                                                    return _this2.addTag1(index);
                                                },
                                                className: index == _this2.state.index1 - 1 ? 'active' : ''
                                            },
                                            type.type1Name
                                        )
                                    );
                                })
                            )
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'row' },
                        React.createElement(
                            'div',
                            { className: 'dt' },
                            '\u8D44\u6E90\u5206\u7C7B\uFF1A'
                        ),
                        React.createElement(
                            'div',
                            { className: 'dd' },
                            React.createElement(
                                'ul',
                                null,
                                type2.map(function (type, index) {
                                    return React.createElement(
                                        'li',
                                        { key: type.type2Id },
                                        React.createElement(
                                            'a',
                                            { href: 'javascript:void(0)',
                                                onClick: function onClick() {
                                                    return _this2.addTag2(index);
                                                },
                                                className: index == _this2.state.index2 - 1 ? 'active' : ''
                                            },
                                            type.type2Name
                                        )
                                    );
                                })
                            )
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'row' },
                        React.createElement(
                            'div',
                            { className: 'dt' },
                            '\u641C\u7D22\uFF1A'
                        ),
                        React.createElement(
                            'div',
                            { className: 'dd' },
                            React.createElement('input', { type: 'text', id: 'search', autoComplete: 'off' }),
                            React.createElement(
                                'button',
                                null,
                                '\u641C\u7D22'
                            )
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'condition' },
                    React.createElement(
                        'span',
                        null,
                        '\u5DF2\u9009\u6807\u7B7E\uFF1A'
                    ),
                    React.createElement(
                        'ul',
                        null,
                        tag1View,
                        tag2View
                    )
                )
            );
        }
    }]);

    return Category;
}(React.Component);

function HotResources() {
    var hotResources = resources.hot;
    console.log(hotResources);
    // if (hotResources.length) {
    //     return hotResources.map(resource =>
    //         <li>
    //             <p className="title">
    //                 <a href={`download.html?id=${resource.id}`}>{resource.title}</a>
    //             </p>
    //             <p className="detail">
    //                 <span>{resource.uploaddate}</span>
    //                 <span className="downloads"><i className="fa fa-cloud-download"></i> {resource.downloads}</span>
    //             </p>
    //         </li>
    //     )
    // }
    // else 
    return null;
}

var Resources = function (_React$Component2) {
    _inherits(Resources, _React$Component2);

    function Resources(props) {
        _classCallCheck(this, Resources);

        var _this3 = _possibleConstructorReturn(this, (Resources.__proto__ || Object.getPrototypeOf(Resources)).call(this));

        _this3.changeResources = function () {
            var boolean = _this3.state.boolean;

            _this3.setState({ boolean: !boolean });
        };

        _this3.state = {
            newResources: props.resources.new,
            mostResources: props.resources.most,
            boolean: true
        };
        return _this3;
    }

    /**
     * 更换点击样式
     * 更换资源
     */


    _createClass(Resources, [{
        key: 'render',
        value: function render() {
            var _state3 = this.state,
                newResources = _state3.newResources,
                mostResources = _state3.mostResources,
                boolean = _state3.boolean;


            var resources = boolean ? newResources : mostResources;

            return React.createElement(
                'div',
                { className: 'resources-list' },
                React.createElement(
                    'div',
                    { className: 'title' },
                    React.createElement(
                        'a',
                        { href: 'javascript:void(0)',
                            className: boolean ? 'active' : '',
                            onClick: this.changeResources
                        },
                        '\u6700\u65B0\u4E0A\u4F20'
                    ),
                    React.createElement(
                        'a',
                        { href: 'javascript:void(0)',
                            className: !boolean ? 'active' : '',
                            onClick: this.changeResources
                        },
                        '\u6700\u591A\u4E0B\u8F7D'
                    )
                ),
                React.createElement(
                    'ul',
                    { className: 'list' },
                    resources.map(function (resource) {
                        return React.createElement(
                            'li',
                            { key: resource.id },
                            React.createElement(
                                'div',
                                { className: 'dt' },
                                React.createElement(
                                    'a',
                                    { href: 'download.html?id=' + resource.id },
                                    React.createElement('img', { src: 'img/zip.svg', alt: '\u6587\u4EF6\u7C7B\u578B' })
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'dd' },
                                React.createElement(
                                    'a',
                                    { href: 'download.html?id=' + resource.id, className: 'title' },
                                    resource.title
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'tags' },
                                    React.createElement(
                                        'ul',
                                        null,
                                        resource.tags.split(',').map(function (tag, index) {
                                            return React.createElement(
                                                'li',
                                                { key: index },
                                                tag
                                            );
                                        })
                                    )
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'detail' },
                                React.createElement(
                                    'span',
                                    null,
                                    React.createElement('i', { className: 'fa fa-cloud-download' }),
                                    ' ',
                                    resource.downloads
                                ),
                                React.createElement(
                                    'span',
                                    null,
                                    resource.uploaddate
                                ),
                                React.createElement(
                                    'span',
                                    null,
                                    '\u6765\u81EA\uFF1A',
                                    React.createElement(
                                        'a',
                                        { href: '#' },
                                        resource.user.nickname
                                    )
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'price' },
                                resource.cost ? resource.cost + ' 积分' : '免费'
                            )
                        );
                    })
                )
            );
        }
    }]);

    return Resources;
}(React.Component);