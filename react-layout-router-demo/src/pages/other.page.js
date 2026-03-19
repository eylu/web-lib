
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
import LayoutInner from './layout-inner';

/**
 * initialize a Page Component named HomePage
 * connect firebase's data
 *
 */
@firebaseConnect([
    'flights'
])
@connect(
    ({ firebase }) => ({
        flights: dataToJS(firebase, '/flights'),
    })
)
export default class OtherPage extends Component {
    constructor(props){
        super(props);


    }



    /**
     * componentDidMount
     *
     * auth user by firebase
     * if no auth, turn to login url and show LoginComponent
     */
    componentDidMount(){
        let { firebase , params} = this.props;

    }

    renderRightForLayout(){
        return (
            'zxczxc'
        )
    }



    render() {


        return (
            <LayoutInner title="补充信息" rightButtons={this.renderRightForLayout}>
                <div className="page-shell inner-page-shell">
                    <div className="panel-card">
                        <div className="panel-title">后续可扩展内容</div>
                        <ul className="bullet-list">
                            <li>工具申请流程和权限管理</li>
                            <li>工具使用反馈与评分</li>
                            <li>团队共享 Prompt 和最佳实践</li>
                        </ul>
                    </div>
                    <div className="page-actions">
                        <Link className="primary-link" to="/tools">进入工具管理页</Link>
                        <Link className="secondary-link" to="/about">查看说明</Link>
                    </div>
                </div>

            </LayoutInner>
        );
    }
}

