import React from 'react';
import { connect } from 'react-redux';

class JobReports extends React.Component {
    render() {
        return (
            <div>
                <iframe frameborder={0} width="1000" height="800" src="https://analytics.zoho.com/open-view/1916670000000279087/37d494bab91f011ae9c7f8658623cb11"></iframe>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
    }
}

export default connect(mapStateToProps)(JobReports);