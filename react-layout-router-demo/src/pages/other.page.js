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
            <LayoutInner title="设计需求" rightButtons={this.renderRightForLayout}>
                <div className="page-shell inner-page-shell">
                    <div className="panel-card">
                        <div className="panel-title">后续建议补充的设计内容</div>
                        <ul className="bullet-list">
                            <li>工具卡片的插画、图标和不同状态标签的视觉规范</li>
                            <li>图表区的占位样式、空状态、加载状态与错误状态</li>
                            <li>移动端页面的堆叠方式，以及表格在小屏上的可读性方案</li>
                        </ul>
                    </div>
                    <div className="page-actions">
                        <Link className="primary-link" to="/tools">进入分析工具页</Link>
                        <Link className="secondary-link" to="/about">查看说明</Link>
                    </div>
                </div>

            </LayoutInner>
        );
    }
}
