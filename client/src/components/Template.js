import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import './Template.css';
import logo from '../assets/bike-logo.png';

const { Header, Sider, Content, Footer } = Layout;

const menuItems = {
  '/': '1',
  '/bikes/new': '2',
  '/help': '3'
};

class Template extends React.Component {
  state = {
    collapsed: false
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };
  render() {
    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <img className="logo" src={logo} alt="" />
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[menuItems[this.props.location.pathname]]}
          >
            <Menu.Item key="1">
              <Link to="/">
                <Icon type="user" />
                <span>All Bikes</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/bikes/new">
                <Icon type="plus-square-o" />
                <span>Register a Bike</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/help">
                <Icon type="flag" />
                <span>Help</span>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              marginBottom: 0,
              padding: 24,
              background: '#fff',
              minHeight: 'calc(100vh - 64px - 24px - 66px)',
              overflowY: 'scroll'
            }}
          >
            {this.props.children}
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            SAS Bikes ©2017 Created by El Qiaopo
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default withRouter(Template);
