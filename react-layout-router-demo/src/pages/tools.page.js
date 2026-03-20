import React, { Component } from 'react';
import Layout from './layout';

const members = [
    {
        name: 'Lucien Chen',
        role: '管理员',
        status: 'status-live',
        statusText: '正常',
        team: '产品团队',
        email: 'lucien.chen@team.io',
        tags: ['Owner', 'SSO', '高权限'],
        highlights: ['负责组织配置与角色策略', '可审核新成员申请', '维护关键账号安全策略'],
    },
    {
        name: 'Mia Zhou',
        role: '运营经理',
        status: 'status-live',
        statusText: '正常',
        team: '运营团队',
        email: 'mia.zhou@team.io',
        tags: ['Active', '内容运营', '最近登录 2h'],
        highlights: ['管理运营成员分组', '可查看业务数据看板', '支持邀请外部协作者'],
    },
    {
        name: 'Aron Li',
        role: '访客',
        status: 'status-test',
        statusText: '待激活',
        team: '设计协作',
        email: 'aron.li@agency.io',
        tags: ['Invite', '只读权限', '外部成员'],
        highlights: ['等待完成邮箱验证', '激活后自动加入设计项目组', '限制敏感配置与导出权限'],
    },
    {
        name: 'Nina Wang',
        role: '审计员',
        status: 'status-plan',
        statusText: '待审批',
        team: '财务与合规',
        email: 'nina.wang@team.io',
        tags: ['审批中', '日志查看', '合规'],
        highlights: ['申请访问操作日志', '需绑定 MFA 后启用账号', '上线后纳入季度审计流程'],
    },
];

const permissionRows = [
    ['管理员', '组织设置、角色配置、成员导入导出', '全部项目', 'MFA + 审批'],
    ['业务负责人', '成员分组、资源分配、邀请成员', '所属团队', 'SSO'],
    ['普通成员', '查看与编辑被授权内容', '授权项目', 'SSO / 邮箱'],
    ['访客', '只读访问、评论、受限下载', '指定空间', '邮箱验证'],
];

const lifecycleSteps = [
    {
        title: '入职开通',
        desc: '通过部门模板批量发放基础角色，缩短新成员开通时间。',
    },
    {
        title: '权限调整',
        desc: '根据岗位变化进行角色升级、团队迁移与敏感权限审批。',
    },
    {
        title: '离职回收',
        desc: '自动停用账号、移交资源并保留完整审计日志。',
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

    renderUserCard(item, index){
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
            <Layout title="用户管理" isPhone={this.state.isPhone}>
                <div className="page-shell">
                    <div className="tool-toolbar">
                        <div>
                            <h1 className="section-title">用户管理中心</h1>
                            <p className="section-desc">
                                把成员信息、角色权限、激活状态和生命周期管理集中到一个界面，
                                方便团队快速完成开通、审批、停用与审计追踪。
                            </p>
                        </div>
                        <div className="toolbar-stats">
                            <div className="toolbar-chip">
                                <strong>128</strong>
                                <span>总用户数</span>
                            </div>
                            <div className="toolbar-chip">
                                <strong>24</strong>
                                <span>待处理变更</span>
                            </div>
                            <div className="toolbar-chip">
                                <strong>98%</strong>
                                <span>已绑定 SSO</span>
                            </div>
                        </div>
                    </div>

                    <div className="tool-grid">
                        {members.map((item, index) => this.renderUserCard(item, index))}
                    </div>

                    <div className="panel-card" style={{marginBottom: 24}}>
                        <div className="panel-title">角色与权限矩阵</div>
                        <div className="comparison-table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>角色</th>
                                        <th>核心权限</th>
                                        <th>可访问范围</th>
                                        <th>安全要求</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {permissionRows.map((row, index) => (
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
                        {lifecycleSteps.map((item, index) => (
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
