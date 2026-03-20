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
            <LayoutInner title="页面说明" isPhone={this.state.isPhone} rightButtons={this.renderRightForLayout}>
                <div className="page-shell inner-page-shell">
                    <div className="panel-card">
                        <div className="panel-title">页面目标</div>
                        <p className="panel-text">
                            先将分析工具做结构化总结，让产品、研发和设计都能在同一页面上理解工具范围与阶段状态。
                        </p>
                    </div>
                    <div className="panel-card">
                        <div className="panel-title">建议维护方式</div>
                        <ul className="bullet-list">
                            <li>新增工具时先补一张卡片，说明工具价值、目标用户与上线阶段</li>
                            <li>定期检查能力对比表，保证优先级与团队认知同步</li>
                            <li>设计开始后，再逐步替换占位说明为正式视觉稿与交互稿</li>
                        </ul>
                    </div>
                    <div className="page-actions">
                        <Link className="primary-link" to="/tools">查看分析工具页</Link>
                        <Link className="secondary-link" to="/">返回首页</Link>
                    </div>
                </div>
            </LayoutInner>
        );
    }
}
