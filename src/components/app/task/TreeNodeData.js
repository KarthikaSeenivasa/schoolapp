import React from 'react';
import { Button } from 'antd';

class TreeNodeData extends React.Component {

    state = {
        isMouseOver: false
    }

    setIsMouseOver = (isMouseOver) => {
        this.setState({
            isMouseOver
        });
    }

    render() {
        let { task } = this.props;
        return (
            <div className="tree-node" onMouseEnter={(e) => { this.setIsMouseOver(true) }} onMouseLeave={(e) => { this.setIsMouseOver(false) }}>
                <span className="node-data">
                    {task.taskName}
                </span>
                {
                    this.state.isMouseOver &&
                    <span className="node-actions">
                        <Button type="primary" onClick={()=>{this.props.onEdit(task)}} style={{ marginRight: '3px', height: '20px', lineHeight: '1px' }}>Edit</Button>
                        <Button type="primary" onClick={()=>{this.props.onDelete(task)}} style={{ marginRight: '3px', height: '20px', lineHeight: '1px' }}>Delete</Button>
                    </span>
                }
            </div>
        )
    }
}

export default TreeNodeData;