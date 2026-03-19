import React, { Component } from 'react';
import Layout from './layout';

const toolGroups = [
    {
        name: 'ChatGPT',
        category: '综合助手',
        status: 'status-live',
        statusText: '已接入',
        description: '适合进行知识问答、写作辅助、需求整理和多轮头脑风暴。',
        meta: ['内容创作', '方案拆解', '团队协作'],
        highlights: ['统一 AI 工具说明入口', '可沉淀常见使用场景', '适合做团队默认推荐'],
    },
    {
        name: 'Claude',
        category: '长文理解',
        status: 'status-test',
        statusText: '测试中',
        description: '更适合长文本阅读、文档分析和较复杂的上下文处理场景。',
        meta: ['长文总结', '策略分析', '知识库问答'],
        highlights: ['适合复杂文档对比', '能补充内容分析场景', '推荐给产品与运营'],
    },
    {
        name: 'Perplexity',
        category: '检索问答',
        status: 'status-live',
        statusText: '已接入',
        description: '强调联网检索与引用，适合快速调研、行业信息追踪和事实核验。',
        meta: ['行业调研', '信息检索', '快速验证'],
        highlights: ['适合做资讯类问题入口', '有助于补齐来源可信度', '便于对外信息收集'],
    },
    {
        name: 'Midjourney',
        category: '视觉生成',
        status: 'status-plan',
        statusText: '规划中',
        description: '用于概念图、海报灵感和视觉风格探索，适合设计前期提案。',
        meta: ['视觉概念', '海报灵感', '品牌氛围'],
        highlights: ['适合与设计流程结合', '优先补充使用规范', '建议后续增加案例库'],
    },
];

const comparisonRows = [
    ['ChatGPT', '内容创作 / 办公辅助', '高', '运营、产品、研发', '默认推荐'],
    ['Claude', '长文档理解 / 分析', '中', '产品、策略、研究', '适合复杂文档'],
    ['Perplexity', '联网调研 / 引用核验', '高', '运营、市场、商务', '适合搜索型需求'],
    ['Midjourney', '图片生成 / 灵感探索', '中', '设计、品牌', '待补充规范'],
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
                    <span className="tool-tag">{item.category}</span>
                    <span className={`status-badge ${item.status}`}>{item.statusText}</span>
                </div>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <div className="tool-meta">
                    {item.meta.map((text, metaIndex) => (
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
            <Layout title="工具管理" isPhone={this.state.isPhone}>
                <div className="page-shell">
                    <div className="tool-toolbar">
                        <div>
                            <h1 className="section-title">AI 工具管理页面</h1>
                            <p className="section-desc">
                                统一整理团队正在使用和准备接入的 AI 工具，先覆盖工具说明、适用场景和对比信息，
                                为后续权限管理、申请流程和案例沉淀打基础。
                            </p>
                        </div>
                        <div className="toolbar-stats">
                            <div className="toolbar-chip">
                                <strong>4</strong>
                                <span>核心工具</span>
                            </div>
                            <div className="toolbar-chip">
                                <strong>3</strong>
                                <span>管理维度</span>
                            </div>
                            <div className="toolbar-chip">
                                <strong>1</strong>
                                <span>优先对比页</span>
                            </div>
                        </div>
                    </div>

                    <div className="tool-grid">
                        {toolGroups.map((item, index) => this.renderToolCard(item, index))}
                    </div>

                    <div className="panel-card" style={{marginBottom: 24}}>
                        <div className="panel-title">工具对比总览</div>
                        <div className="comparison-table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>工具</th>
                                        <th>定位</th>
                                        <th>上手难度</th>
                                        <th>推荐团队</th>
                                        <th>备注</th>
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
                        <div className="roadmap-card">
                            <h4>阶段一：说明整理</h4>
                            <p>先把 AI 工具的名称、定位、适用场景和状态维护起来，形成统一信息入口。</p>
                        </div>
                        <div className="roadmap-card">
                            <h4>阶段二：对比视图</h4>
                            <p>把高频工具放入同一视图比较，突出推荐人群、优缺点和接入优先级。</p>
                        </div>
                        <div className="roadmap-card">
                            <h4>阶段三：流程扩展</h4>
                            <p>后续可继续加入申请、审批、反馈和使用案例，让工具管理更完整。</p>
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }
}
