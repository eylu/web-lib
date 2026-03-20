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
export default class OtherPage extends Component {
    renderRightForLayout(){
        return (
            'zxczxc'
        )
    }

    render() {
        return (
            <LayoutInner title="扩展规划" rightButtons={this.renderRightForLayout}>
                <div className="page-shell inner-page-shell">
                    <div className="panel-card">
                        <div className="panel-title">后续可扩展内容</div>
                        <ul className="bullet-list">
                            <li>成员批量导入导出与部门同步</li>
                            <li>审批流、工单流与账号回收自动化</li>
                            <li>登录日志、异常提醒与合规审计报表</li>
                        </ul>
                    </div>
                    <div className="page-actions">
                        <Link className="primary-link" to="/users">进入用户管理页</Link>
                        <Link className="secondary-link" to="/about">查看说明</Link>
                    </div>
                </div>

            </LayoutInner>
        );
    }
}
