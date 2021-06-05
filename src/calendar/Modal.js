import React, {useCallback, useState, useContext} from 'react';
import ModalItem from './ModalItem';
import TodayContext from '../contexts/today';
import './styles/Modal.scss';

//날짜정보 가져와야 함 -> 리덕스 필요
const Modal = ({open, close}) => {
    const {state} = useContext(TodayContext)
    const [modalValue, setModalValue] = useState('');
    const [todoList, setTodoList] = useState([]);

    const onChange = useCallback(e => {
        setModalValue(e.target.value);
    }, []);

    const onInsert = useCallback(() => {
        const nextId = todoList.length + 1;
        const todo = {id: nextId, todo: modalValue}
        setTodoList(todoList.concat(todo));
    }, [modalValue, todoList]);

    const onSubmit = useCallback(e => {
        e.preventDefault();
        onInsert();
        setModalValue('');
    }, [onInsert]);

    const onRemove = useCallback(id => {
        setTodoList(todoList.filter(todo => todo.id !== id));
    }, [todoList]);

    return (
        <div className={`Modal ${open ? 'openModal' : null}`}>
            {open && (
                <section>
                    <header>
                        <div className="dateinfo">
                            {`${state.todayYear}-${state.todayMonth < 10 ? `0${state.todayMonth}` : state.todayMonth}-${state.todayDate < 10 ? `0${state.todayDate}` : state.todayDate}`}
                        </div>
                    </header>
                    <form onSubmit={onSubmit}>
                        <input type="text" placeholder="todo" value={modalValue} onChange={onChange} />
                        <button className="insert-btn">+</button>
                    </form>
                    <div className="list">
                        {todoList.map(t => (<ModalItem key={t.id} todo={t} onRemove={onRemove} />))}
                    </div>
                    <footer>
                        <button className="close-btn" onClick={() => {close(); setModalValue('');}}>Close</button>
                    </footer>
                </section>
            )}
        </div>
    );
}

export default Modal;