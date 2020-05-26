import React, {Component} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

class ListItem extends Component {

    componentWillUnmount() {
        console.log('deleted');
    }

    render() {
        const {item,onClickChoose,onClickDelete,onDoubleClick,onKeyUp} = this.props;
        if (item.editMode)
            return <div onClick={onClickChoose} onDoubleClick={onDoubleClick} className={classNames('to-do-item',{ active : item.isDone === true})}><input className="input2" onKeyUp={onKeyUp}></input><div className="delete-item" onClick={onClickDelete}></div></div>
        else 
            return <div onClick={onClickChoose}onDoubleClick={onDoubleClick} className={classNames('to-do-item',{ active : item.isDone === true})}>{item.text}{this.props.something}<div className="delete-item" onClick={onClickDelete}></div></div>;
    };
}


ListItem.propTypes = {
    item : PropTypes.shape({
        isDone : PropTypes.bool.isRequired,
        text : PropTypes.string.isRequired,
    }),
    onClickChoose : PropTypes.func.isRequired,
    onClickDelete : PropTypes.func.isRequired,
    onDoubleClick : PropTypes.func.isRequired,
    onKeyUp : PropTypes.func.isRequired,
}

export default ListItem;