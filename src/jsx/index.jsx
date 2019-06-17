const baseUrl = 'http://10.129.235.5:9001'

window.onload = () => {

    // 获取最新与最多下载资源
    fetch(baseUrl + '/resource')
        .then(response => response.json())
        .then(response => {
            ReactDOM.render(
                <Resources resources={response.data} />,
                document.getElementById('resources')
            )
        })

    // 获取热门资源
    fetch(baseUrl + '/resource/hot')
        .then(response => response.json())
        .then(response => {
            ReactDOM.render(
                <HotResources resources={response.data} />,
                document.getElementById('hot-resources')
            )
        })

    // 获取一级和二级分类标签
    fetch(baseUrl + '/resource/type')
        .then(response => response.json())
        .then(response => {
            ReactDOM.render(
                <Category type={response.data} />,
                document.getElementById('category')
            )
        })

    ReactDOM.render(
        <UserModule />,
        document.getElementById('user-module')
    )
}

function UserModule() {
    const user = {
        token: Cookies.get('TokenKey'),
        name: Cookies.get('NameKey'),
        avatar: Cookies.get('AvatarKey')
    }

    if (user.token === undefined) {
        return (
            <div className="user">
                <h2>欢迎来到资网</h2>
                <a href="login.html" className="upload">立即登录</a>
            </div>
        )
    } else {
        return (
            <div>
                <div className="user">
                    <div className="photo">
                        <img src="img/user-photo.png" alt="用户头像" />
                    </div>
                    <div className="detail">
                        <p>Leonardo_Zhu</p>
                        <div className="level">
                            等级 <em>1</em>
                        </div>
                    </div>
                </div>

                <a href="upload.html" className="upload">上传资源</a>
            </div>

        )
    }
}

class Category extends React.Component {
    constructor(props) {
        super()
        this.state = {
            type: props.type,
            type2: [],
            tag1: {},
            tag2: {},
            index1: 0,
            index2: 0
        }
    }

    componentWillUpdate() {
        const { tag1, tag2 } = this.state
        fetch(baseUrl + `/resource/type/${tag1.type1Id}/${tag2.type2Id}`)
            .then(response => response.json())
            .then(response => {
                ReactDOM.render(
                    <Resources resources={response.data} />,
                    document.getElementById('resources')
                )
            })
    }

    /**
     * 更新一级分类样式
     * 移除二级分类样式
     * 更新二级分类
     * 更新一级标签
     * 移除二级标签
     */
    addTag1 = (index) => {
        const { type1Id, type1Name, type2 } = this.state.type[index]
        this.setState({
            index1: index + 1,
            index2: 0,
            type2: type2,
            tag1: { type1Id, type1Name },
            tag2: {}
        })
    }

    addTag2 = (index) => {
        const { type2Id, type2Name } = this.state.type2[index]
        this.setState({
            index2: index + 1,
            tag2: { type2Id, type2Name }
        })
        // this.setState({tags})
    }

    /**
     * 删除一级分类标签
     * 删除二级分类标签
     * 移除一级分类样式
     * 移除二级分类
     * 移除二级分类样式
     */
    removeTag1 = () => {
        this.setState({
            tag1: {},
            tag2: {},
            type2: [],
            index1: 0,
            index2: 0

        })
    }
    /**
     * 删除二级分类标签
     * 移除二级分类样式
     */
    removeTag2 = () => {
        this.setState({
            tag2: {},
            index2: {}
        })
    }

    render() {
        const { type, tag1, tag2, type2 } = this.state

        const tag1View = tag1.type1Id ?
            <li>
                {tag1.type1Name}
                <i className="fa fa-times-circle" onClick={() => this.removeTag1()}></i>
            </li> : ''

        const tag2View = tag2.type2Id ?
            <li>
                {tag2.type2Name}
                <i className="fa fa-times-circle" onClick={() => this.removeTag2()}></i>
            </li> : ''

        return (
            <div>
                <div className="query">
                    <div className="row">
                        <div className="dt">
                            资源类型：
                        </div>
                        <div className="dd">
                            <ul>
                                {
                                    type.map((type, index) =>
                                        <li key={type.type1Id}>
                                            <a href="javascript:void(0)" onClick={() => this.addTag1(index)}
                                                className={index == this.state.index1 - 1 ? 'active' : ''}
                                            >{type.type1Name}</a>
                                        </li>
                                    )
                                }
                            </ul>
                        </div>
                    </div>
                    <div className="row">
                        <div className="dt">
                            资源分类：
                        </div>
                        <div className="dd">
                            <ul>
                                {
                                    type2.map((type, index) =>
                                        <li key={type.type2Id}>
                                            <a href="javascript:void(0)"
                                                onClick={() => this.addTag2(index)}
                                                className={index == this.state.index2 - 1 ? 'active' : ''}
                                            >{type.type2Name}
                                            </a>
                                        </li>
                                    )
                                }
                            </ul>
                        </div>
                    </div>
                    <div className="row">
                        <div className="dt">
                            搜索：
                        </div>
                        <div className="dd">
                            <input type="text" id="search" autoComplete="off" />
                            <button>搜索</button>
                        </div>
                    </div>
                </div>
                <div className="condition">
                    <span>已选标签：</span>
                    <ul>
                        {tag1View}
                        {tag2View}
                    </ul>
                </div>
            </div>
        )
    }

}


function HotResources() {
    const hotResources = resources.hot
    console.log(hotResources)
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
    return null
}

class Resources extends React.Component {
    constructor(props) {
        super()
        this.state = {
            newResources: props.resources.new,
            mostResources: props.resources.most,
            boolean: true
        }
    }

    /**
     * 更换点击样式
     * 更换资源
     */
    changeResources = () => {
        const { boolean } = this.state
        this.setState({ boolean: !boolean })
    }

    render() {
        const { newResources, mostResources, boolean } = this.state

        const resources = boolean ? newResources : mostResources

        return (
            <div className="resources-list">
                <div className="title">
                    <a href="javascript:void(0)"
                        className={boolean ? 'active' : ''}
                        onClick={this.changeResources}
                    >
                        最新上传
                    </a>
                    <a href="javascript:void(0)"
                        className={!boolean ? 'active' : ''}
                        onClick={this.changeResources}
                    >
                        最多下载
                    </a>
                </div>
                <ul className="list">
                    {
                        resources.map(resource =>
                            <li key={resource.id}>
                                <div className="dt">
                                    <a href={`download.html?id=${resource.id}`}>
                                        <img src="img/zip.svg" alt="文件类型" />
                                    </a>
                                </div>
                                <div className="dd">
                                    <a href={`download.html?id=${resource.id}`} className="title">{resource.title}</a>
                                    <div className="tags">
                                        <ul>
                                            {resource.tags.split(',').map((tag, index) => <li key={index}>{tag}</li>)}
                                        </ul>
                                    </div>
                                </div>
                                <div className="detail">
                                    <span><i className="fa fa-cloud-download"></i> {resource.downloads}</span>
                                    <span>{resource.uploaddate}</span>
                                    <span>来自：<a href="#">{resource.user.nickname}</a></span>
                                </div>
                                <div className="price">
                                    {resource.cost ? resource.cost + ' 积分' : '免费'}
                                </div>
                            </li>
                        )
                    }
                </ul>
            </div>
        )
    }
}

