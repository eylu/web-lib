import React, { Component } from 'react';
import Layout from './layout';

const tools = [
    {
        name: '事件分析',
        role: '实时行为观察',
        status: 'status-live',
        statusText: '已上线',
        team: '产品分析',
        email: '支持自定义事件、属性拆解与实时趋势追踪',
        tags: ['PV / UV', '事件流', '分钟级刷新'],
        highlights: ['适合快速定位功能使用情况', '支持按渠道、版本与人群进行过滤', '可下钻到单个事件属性分布'],
    },
    {
        name: '漏斗分析',
        role: '转化路径诊断',
        status: 'status-live',
        statusText: '核心工具',
        team: '增长运营',
        email: '观察关键步骤转化率，识别流失节点与优化优先级',
        tags: ['转化率', '步骤对比', '按用户分层'],
        highlights: ['支持新老用户分组对比', '适合注册、付费、激活等关键旅程', '可结合事件属性观察转化差异'],
    },
    {
        name: '留存分析',
        role: '用户价值追踪',
        status: 'status-test',
        statusText: '内测中',
        team: '用户研究',
        email: '衡量次日、7日、30日留存，帮助判断产品粘性与功能效果',
        tags: ['次日留存', 'Cohort', '行为回访'],
        highlights: ['可按首次来源观察留存质量', '适合评估新功能上线后的持续使用情况', '建议和事件分析联动查看'],
    },
    {
        name: '看板洞察',
        role: '业务指标总览',
        status: 'status-plan',
        statusText: '待设计',
        team: '管理驾驶舱',
        email: '聚合核心指标、异常提醒和周报视图，为管理层提供统一观察面板',
        tags: ['指标卡片', '异常预警', '周报摘要'],
        highlights: ['适合沉淀跨团队共识指标', '需要设计统一视觉层级与筛选交互', '建议与设计同学联合梳理组件规范'],
    },
];

const comparisonRows = [
    ['事件分析', '查看功能使用趋势与属性分布', '产品、研发、运营', '高'],
    ['漏斗分析', '诊断关键流程的转化损耗', '增长、运营、产品', '高'],
    ['留存分析', '跟踪用户后续回访与活跃情况', '产品、用户研究', '中'],
    ['看板洞察', '沉淀核心业务指标与异常提醒', '管理层、业务负责人', '高'],
];

const deliverySteps = [
    {
        title: '先总结现有工具',
        desc: '先把事件、漏斗、留存、看板四类分析工具的用途、适用对象与优先级梳理清楚。',
    },
    {
        title: '补一版页面信息架构',
        desc: '按照“工具概览 → 能力卡片 → 对比表 → 设计需求”组织页面，方便设计与开发同步。',
    },
    {
        title: '邀请设计人员介入',
        desc: '页面进入视觉设计阶段后，建议补齐卡片样式、图表占位和交互状态说明。',
    },
];

export default class ToolsPage extends Component {
    constructor(props){
        super(props);

        this.state = {
            isPhone: props.isPhone,
        };
    }

    componentWillReceiveProps(nextProps){
        if(this.state.isPhone != nextProps.isPhone){
            this.setState({
                isPhone: nextProps.isPhone,
            });
        }
    }

    renderToolCard(item, index){
        return (
            <div className="tool-card" key={index}>
                <div className="tool-card-header">
                    <span className="tool-tag">{item.team}</span>
                    <span className={`status-badge ${item.status}`}>{item.statusText}</span>
                </div>
                <h3>{item.name}</h3>
                <p>{item.role} · {item.email}</p>
                <div className="tool-meta">
                    {item.tags.map((text, metaIndex) => (
                        <span className="meta-pill" key={metaIndex}>{text}</span>
                    ))}
                </div>
                <ul className="tool-list">
                    {item.highlights.map((text, highlightIndex) => (
                        <li key={highlightIndex}>{text}</li>
                    ))}
                </ul>
            </div>
        );
    }

    render() {
        return (
            <Layout title="分析工具页" isPhone={this.state.isPhone}>
                <div className="page-shell">
                    <div className="tool-toolbar">
                        <div>
                            <h1 className="section-title">分析工具总览</h1>
                            <p className="section-desc">
                                先把当前可用的分析工具总结清楚，再把页面结构交给设计人员继续细化视觉与交互，
                                让团队可以更快对齐工具定位、适用场景和下一步建设重点。
                            </p>
                        </div>
                        <div className="toolbar-stats">
                            <div className="toolbar-chip">
                                <strong>4</strong>
                                <span>已梳理工具</span>
                            </div>
                            <div className="toolbar-chip">
                                <strong>2</strong>
                                <span>优先上线模块</span>
                            </div>
                            <div className="toolbar-chip">
                                <strong>1</strong>
                                <span>待设计页面</span>
                            </div>
                        </div>
                    </div>

                    <div className="tool-grid">
                        {tools.map((item, index) => this.renderToolCard(item, index))}
                    </div>

                    <div className="content-grid">
                        <div className="panel-card">
                            <div className="panel-title">本页建议展示的信息</div>
                            <ul className="bullet-list">
                                <li>每个分析工具解决什么问题、由谁使用、当前所处阶段。</li>
                                <li>工具之间的差异：实时趋势、转化诊断、留存追踪与综合看板。</li>
                                <li>需要设计补充的模块：图表样式、筛选区、空状态、数据刷新提示。</li>
                            </ul>
                        </div>
                        <div className="panel-card">
                            <div className="panel-title">设计协作建议</div>
                            <ul className="bullet-list">
                                <li>先输出低保真页面结构，确认工具卡片与数据表的层级关系。</li>
                                <li>再由设计补齐图表容器、状态标签、导航高亮与移动端适配。</li>
                                <li>如果后续要接入真实数据，建议提前预留筛选栏与时间维度切换。</li>
                            </ul>
                        </div>
                    </div>

                    <div className="panel-card" style={{margin: '24px 0'}}>
                        <div className="panel-title">工具能力对比</div>
                        <div className="comparison-table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>工具</th>
                                        <th>核心价值</th>
                                        <th>主要使用人群</th>
                                        <th>优先级</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {comparisonRows.map((row, index) => (
                                        <tr key={index}>
                                            {row.map((col, columnIndex) => (
                                                <td key={columnIndex}>{col}</td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="roadmap-grid">
                        {deliverySteps.map((item, index) => (
                            <div className="roadmap-card" key={index}>
                                <h4>{item.title}</h4>
                                <p>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </Layout>
        );
    }
}
