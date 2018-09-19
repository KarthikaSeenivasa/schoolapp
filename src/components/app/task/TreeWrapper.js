import React from 'react';
import { Tree } from 'antd';

import TreeNodeData from './TreeNodeData';

const { TreeNode } = Tree;

class TreeWrapper extends React.Component {

    renderTreeNodes = (tasks, onDeleteHandler, onEditHandler) => {
        return tasks.map((task) => {
            let nodeData = (<TreeNodeData task={task} onDelete={onDeleteHandler} onEdit={onEditHandler} />);
            if (task.subtasks) {
                return (
                    <TreeNode title={nodeData} key={task.id} dataRef={task} selectable={false}>
                        {this.renderTreeNodes(task.subtasks, onDeleteHandler, onEditHandler)}
                    </TreeNode>
                );
            }
            return (
                <TreeNode title={nodeData} key={task.id} dataRef={task} selectable={false} />
            );
        });
    }

    render() {

        return (
            <Tree autoExpandParent style={{ position: 'relative', height: '100%', width: '100%' }} showLine>
                {this.renderTreeNodes(this.props.tasks, this.props.onDelete, this.props.onEdit)}
            </Tree >
        )
    }
}

export default TreeWrapper;
