import React, {Component} from 'react';
import ListItem from './ListItem';
import classNames from 'classnames';

class ToDoList extends Component {
    constructor() {
        super();
        this.state = {
            toDoList : {
                filter:'default',
                appName : 'to-do-list',
                items: [
                    {text:'Ngủ dậy',isDone:false,editMode:false},
                    {text:'Đánh răng',isDone:false,editMode:false},
                    {text:'Đi học',isDone:false,editMode:false},
                    {text:'Cười',isDone:false,editMode:false},
                    {text:'Khóc',isDone:false,editMode:false},
                    {text:'Nắng',isDone:false,editMode:false},
                    {text:'Mứa',isDone:false,editMode:false},
                ],
            }
        }
        this.addItem = this.addItem.bind(this);
        this.allDone = this.allDone.bind(this);
    }

    chooseItem (item) {
        return async () => {
            const isDone = item.isDone;
            const indexOfItem = this.state.toDoList.items.indexOf(item);
            const {toDoList} = this.state;
            toDoList.items[indexOfItem].isDone = !isDone;
            await this.setState({
                toDoList:{
                    ...this.state.toDoList,
                    items:toDoList.items,
                }
            });

            // await console.log(this.state.toDoList.filter);
        }
    }

    addItem (event) {
        const submitKey = 13; // Enter
        const itemValue = event.target.value.trim();
        if (event.keyCode === submitKey)
            if (!itemValue) alert('Empty input!');
            else {
                const items = this.state.toDoList.items;
                items.unshift({text:itemValue,isDone:false});
                this.setState({
                    toDoList:{
                        ...this.state.toDoList,
                        items:items,
                    }
                });
                event.target.value = null;
            }
        
    }

    allDone() {
        const {items:temp_items} = this.state.toDoList;
        let isEverythingDone = true;
        for (const item of temp_items) if (!item.isDone) isEverythingDone = false;

        const items = (!isEverythingDone) 
            ? temp_items.map(item => {  return {...item, isDone :true}  })
            : temp_items.map(item => {  return {...item, isDone :false}  });    

        this.setState({
            toDoList: {
                ...this.state.toDoList,
                items:items,
            },
        });
    }

    deleteItem(item) {
        return async () => {
            let {items} = this.state.toDoList;
            items = await items.filter(i => i !== item);
            await this.setState({
                toDoList: {
                    ...this.state.toDoList,
                    items:items,
                }
            });
            // await console.log(items);
        }
    }

    setFilter(filter) {
        return async () => {
            await this.setState({
                toDoList:{
                    ...this.state.toDoList,
                    filter:filter,
                }
            });
            // await console.log(this.state.toDoList.filter,filter);
        }
    }

    editItem(item) {
        return async () => {
            const {items} = this.state.toDoList;
            const indexOfItem = items.indexOf(item);
            items[indexOfItem].editMode = !items[indexOfItem.editMode];
            await this.setState({
                toDoList:{
                    ...this.state.toDoList,
                    items:items,
                }
            });
            // await console.log(this.state.toDoList.items);
        }
    }

    submitEdit(item) {
        return async (event) => {
            const itemValue = event.target.value.trim();
            if (event.keyCode === 13)
                if (!itemValue) alert('Empty input!');
                else {
                    const {items} = this.state.toDoList;
                    const indexOfItem = items.indexOf(item);
                    items[indexOfItem].text = itemValue;
                    items[indexOfItem].editMode = false;
                    await this.setState({
                        ...this.state.toDoList,
                        items:items,
                    });
                }
            }
    }

    render() {
        const {toDoList} = this.state;
        const unDones = toDoList.items.reduce((num,item) => !item.isDone ? num+1 : num ,0);
        return (
            <div id={toDoList.appName}>
                <p className="title"><span>{unDones}</span> have not done yet!</p>
                <div className="allDone-and-add">
                    <button className="button" onClick={this.allDone}>All</button>
                    <input className="input" type="text" placeholder="Add something needs to be done." onKeyUp={this.addItem}></input>
                </div>
                <div className="to-do-item-group">
                    {toDoList.items.map((item,index) => {
                        if (toDoList.filter === 'undone' && !item.isDone) 
                            return <ListItem onDoubleClick={this.editItem(item)} onKeyUp={this.submitEdit(item)} onClickDelete={this.deleteItem(item)} onClickChoose={this.chooseItem(item)} key={index} item={item}/>;
                        else if (toDoList.filter === 'done' && item.isDone) 
                            return <ListItem onDoubleClick={this.editItem(item)} onKeyUp={this.submitEdit(item)} onClickDelete={this.deleteItem(item)} onClickChoose={this.chooseItem(item)} key={index} item={item}/>;
                        else if (toDoList.filter === 'default')
                            return <ListItem onDoubleClick={this.editItem(item)} onKeyUp={this.submitEdit(item)} onClickDelete={this.deleteItem(item)} onClickChoose={this.chooseItem(item)} key={index} item={item}/>;
                        return null;
                    })}
                </div>
                <button className={classNames('button button-bottom',{filterActive:toDoList.filter === 'default'})} onClick={this.setFilter('default')}>Default</button>
                <button className={classNames('button button-bottom',{filterActive:toDoList.filter === 'undone'})} onClick={this.setFilter('undone')}>Undone</button>
                <button className={classNames('button button-bottom',{filterActive:toDoList.filter === 'done'})} onClick={this.setFilter('done')}>Done</button>
            </div>
        );
    };
}

export default ToDoList;