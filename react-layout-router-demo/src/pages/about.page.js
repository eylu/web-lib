
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
import Layout from './layout';
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
export default class AboutPage extends Component {
    constructor(props){
        super(props);

        this.state = {
            isPhone: props.isPhone,
        }

    }



    /**
     * componentDidMount
     *
     * auth user by firebase
     * if no auth, turn to login url and show LoginComponent
     */
    componentDidMount(){
        let { firebase , params} = this.props;
        // console.log('AboutPage', this.props);

    }

    componentWillReceiveProps(nextProps){
        // console.log('nextProps Home:',nextProps);
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
        var MyLayout = this.state.isPhone ? LayoutInner : Layout;
        return (
            <LayoutInner title="使用说明" isPhone={this.state.isPhone} rightButtons={this.renderRightForLayout}>
                <div className="page-shell inner-page-shell">
                    <div className="panel-card">
                        <div className="panel-title">页面目标</div>
                        <p className="panel-text">
                            把常见 AI 工具的用途、状态和适用场景统一展示，帮助团队更快做选型。
                        </p>
                    </div>
                    <div className="panel-card">
                        <div className="panel-title">建议维护方式</div>
                        <ul className="bullet-list">
                            <li>按周更新工具状态与适用说明</li>
                            <li>新增工具时补齐功能、定价和适用团队</li>
                            <li>优先补充高频使用的对比工具</li>
                        </ul>
                    </div>
                    <div className="page-actions">
                        <Link className="primary-link" to="/tools">查看工具管理页</Link>
                        <Link className="secondary-link" to="/">返回首页</Link>
                    </div>
                </div>
            </LayoutInner>
        );
    }
}

