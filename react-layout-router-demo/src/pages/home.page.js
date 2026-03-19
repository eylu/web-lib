import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    firebaseConnect,
    isLoaded,
    isEmpty,
    dataToJS,
    pathToJS,
} from 'react-redux-firebase';
import { Link } from 'react-router';

/**
 * import libs: antd, material
 */

import Layout from './layout';
/**
 * initialize a Page Component named HomePage
 * connect firebase's data
 *
 */
@firebaseConnect([
    'flights'
])
@connect(
    (state) =>{
        const { firebase, hasNewRoute } = state;

        return {
            flights: dataToJS(firebase, '/flights'),
            hasNewRoute: hasNewRoute,
        }
    }
)
export default class HomePage extends Component {
    constructor(props){
        super(props);

        /**
         * bind some handle to self
         */
        this.state = {
            isPhone: props.isPhone,
        }
    }


    /**
     * componentDidMount
     *
     * auth user by firebase
     * if no auth, turn to login url and show LoginComponent
     */
    componentDidMount(){
        console.log('Home', window.history.length);
        let { firebase } = this.props;
        // console.log('HomePage', this.props);
        // dispatch({type:'SHOW_ORDER', data: true})
        // console.log(this.props);
        // firebase.logout();
        // firebase.auth().onAuthStateChanged((user) => {
        //     // console.log('is login：',user)
        //     if (user) {
        //     // User is signed in.
        //     }else{
        //         hashHistory.push('/login')
        //     }
        // });
    }

    componentWillReceiveProps(nextProps){
        // console.log('nextProps Home:',nextProps);
        let { isPhone } = this.state;
        if(isPhone != nextProps.isPhone){
            this.setState({
                isPhone: nextProps.isPhone,
            });
        }
    }



    render() {

        return (
            <Layout title="AI 工具工作台" isPhone={this.state.isPhone}>
                <div className="page-shell">
                    <div className="page-hero">
                        <div className="page-hero-copy">
                            <span className="page-badge">Tool Management</span>
                            <h1>集中管理团队常用的 AI 工具</h1>
                            <p>
                                先把 AI 工具说明和对比能力整理起来，方便团队统一了解工具定位、
                                适用场景与当前状态。
                            </p>
                            <div className="page-actions">
                                <Link className="primary-link" to="/tools">进入工具管理页</Link>
                                <Link className="secondary-link" to="/about">查看使用说明</Link>
                            </div>
                        </div>
                        <div className="hero-metrics">
                            <div className="metric-card">
                                <strong>12</strong>
                                <span>已整理工具</span>
                            </div>
                            <div className="metric-card">
                                <strong>4</strong>
                                <span>优先推荐分类</span>
                            </div>
                            <div className="metric-card">
                                <strong>3</strong>
                                <span>待补充说明</span>
                            </div>
                        </div>
                    </div>

                    <div className="content-grid">
                        <div className="panel-card">
                            <div className="panel-title">当前整理重点</div>
                            <ul className="bullet-list">
                                <li>AI 对比工具：收集、定位与推荐人群</li>
                                <li>内容创作工具：快速生成、润色与翻译能力</li>
                                <li>设计辅助工具：视觉稿、原型和素材产出</li>
                            </ul>
                        </div>
                        <div className="panel-card">
                            <div className="panel-title">推荐管理维度</div>
                            <ul className="bullet-list">
                                <li>功能定位：工具能解决什么问题</li>
                                <li>接入状态：已上线、测试中、规划中</li>
                                <li>适用团队：产品、运营、研发、设计</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }
}

