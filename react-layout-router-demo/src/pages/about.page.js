import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    firebaseConnect,
    dataToJS,
} from 'react-redux-firebase';
import { Link } from 'react-router';

import LayoutInner from './layout-inner';

@firebaseConnect([
    'flights'
])
@connect(
    ({ firebase }) => ({
        flights: dataToJS(firebase, '/flights'),
    })
)
export default class AboutPage extends Component {
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

    renderRightForLayout(){
        return (
            123123
        )
    }

    render() {
        return (
            <LayoutInner title="维护说明" isPhone={this.state.isPhone} rightButtons={this.renderRightForLayout}>
                <div className="page-shell inner-page-shell">
                    <div className="panel-card">
                        <div className="panel-title">页面目标</div>
                        <p className="panel-text">
                            统一沉淀用户资料、角色策略和安全规范，确保管理员与业务负责人在同一页面协作。
                        </p>
                    </div>
                    <div className="panel-card">
                        <div className="panel-title">建议维护方式</div>
                        <ul className="bullet-list">
                            <li>按周检查待激活、待审批和停用中的账号状态</li>
                            <li>按部门维护角色模板，避免重复分配权限</li>
                            <li>为高权限角色强制开启 SSO、MFA 与操作审计</li>
                        </ul>
                    </div>
                    <div className="page-actions">
                        <Link className="primary-link" to="/users">查看用户管理页</Link>
                        <Link className="secondary-link" to="/">返回首页</Link>
                    </div>
                </div>
            </LayoutInner>
        );
    }
}
