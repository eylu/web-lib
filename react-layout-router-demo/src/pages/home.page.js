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
            <Layout title="分析工具工作台" isPhone={this.state.isPhone}>
                <div className="page-shell">
                    <div className="page-hero">
                        <div className="page-hero-copy">
                            <span className="page-badge">Analytics Tools</span>
                            <h1>集中查看团队现在能用的分析工具</h1>
                            <p>
                                先完成工具盘点与页面结构整理，再邀请设计人员介入细化视觉方案，
                                帮助团队快速对齐每个分析模块的定位与建设优先级。
                            </p>
                            <div className="page-actions">
                                <Link className="primary-link" to="/tools">进入分析工具页</Link>
                                <Link className="secondary-link" to="/about">查看页面说明</Link>
                            </div>
                        </div>
                        <div className="hero-metrics">
                            <div className="metric-card">
                                <strong>4</strong>
                                <span>分析工具类型</span>
                            </div>
                            <div className="metric-card">
                                <strong>3</strong>
                                <span>首屏信息模块</span>
                            </div>
                            <div className="metric-card">
                                <strong>1</strong>
                                <span>待设计协作项</span>
                            </div>
                        </div>
                    </div>

                    <div className="content-grid">
                        <div className="panel-card">
                            <div className="panel-title">这次页面先解决什么</div>
                            <ul className="bullet-list">
                                <li>把已有分析工具做成清晰的能力摘要，便于先讨论内容范围</li>
                                <li>用统一卡片和表格梳理工具差异，降低后续设计沟通成本</li>
                                <li>明确哪些模块已经能展示，哪些部分还需要设计补位</li>
                            </ul>
                        </div>
                        <div className="panel-card">
                            <div className="panel-title">建议优先建设</div>
                            <ul className="bullet-list">
                                <li>事件分析：作为日常使用频率最高的基础模块优先呈现</li>
                                <li>漏斗分析：帮助增长场景快速识别转化问题</li>
                                <li>看板洞察：在设计介入后再补充图表与管理驾驶舱样式</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }
}
