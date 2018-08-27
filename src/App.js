import React from 'react';
import './style.scss'
import { Layout } from 'antd';

import Routes from './routes/Routes';
import routes from './routes/routemappings';
import TopHeader from './components/TopHeader';

const {Content} = Layout;

class App extends React.Component {

    render() {
        return (
            <Layout className="app-container" hasSider={true}>
                <TopHeader />
                <Content className="app-content">
                    <Routes routes={routes} />
                </Content>
            </Layout>
        )
    }
}
export default App;