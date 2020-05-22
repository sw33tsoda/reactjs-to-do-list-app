import React, {Component} from 'react';
import classNames from 'classnames';

class ListItem extends Component {

    render() {
        const {item,onClickChoose,onClickDelete,onDoubleClick,onKeyUp} = this.props;
        if (item.editMode)
            return <div onClick={onClickChoose} onDoubleClick={onDoubleClick} className={classNames('to-do-item',{ active : item.isDone === true})}><input className="input2" onKeyUp={onKeyUp}></input><div className="delete-item" onClick={onClickDelete}></div></div>
        else 
            return <div onClick={onClickChoose}onDoubleClick={onDoubleClick} className={classNames('to-do-item',{ active : item.isDone === true})}>{item.text}<div className="delete-item" onClick={onClickDelete}></div></div>;
    };
}

export default ListItem;