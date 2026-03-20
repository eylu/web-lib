import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    firebaseConnect,
    dataToJS,
} from 'react-redux-firebase';
import { Link } from 'react-router';

import Layout from './layout';

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

        this.state = {
            isPhone: props.isPhone,
        }
    }

    componentWillReceiveProps(nextProps){
        let { isPhone } = this.state;
        if(isPhone != nextProps.isPhone){
            this.setState({
                isPhone: nextProps.isPhone,
            });
        }
    }

    render() {
        return (
            <Layout title="用户管理工作台" isPhone={this.state.isPhone}>
                <div className="page-shell">
                    <div className="page-hero">
                        <div className="page-hero-copy">
                            <span className="page-badge">User Management</span>
                            <h1>集中维护成员、权限与账号状态</h1>
                            <p>
                                以用户为中心统一查看组织成员、角色分配、激活状态和安全要求，
                                帮助团队更快完成开通、调整和审计闭环。
                            </p>
                            <div className="page-actions">
                                <Link className="primary-link" to="/users">进入用户管理</Link>
                                <Link className="secondary-link" to="/about">查看维护说明</Link>
                            </div>
                        </div>
                        <div className="hero-metrics">
                            <div className="metric-card">
                                <strong>128</strong>
                                <span>组织成员</span>
                            </div>
                            <div className="metric-card">
                                <strong>16</strong>
                                <span>角色模板</span>
                            </div>
                            <div className="metric-card">
                                <strong>7</strong>
                                <span>待审批申请</span>
                            </div>
                        </div>
                    </div>

                    <div className="content-grid">
                        <div className="panel-card">
                            <div className="panel-title">当前管理重点</div>
                            <ul className="bullet-list">
                                <li>统一成员信息入口，按团队与角色快速检索</li>
                                <li>完善账号激活、停用与审批中的状态追踪</li>
                                <li>补齐管理员、普通成员与访客的权限边界</li>
                            </ul>
                        </div>
                        <div className="panel-card">
                            <div className="panel-title">建议优先建设</div>
                            <ul className="bullet-list">
                                <li>角色模板：减少重复授权配置</li>
                                <li>安全校验：SSO、MFA 与异常登录提醒</li>
                                <li>生命周期：入职、转岗、离职自动流转</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }
}
