import { format } from 'date-fns';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import React, { useEffect, useState } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import { useDispatch } from 'react-redux';
// import { deleteTodo, updateTodo } from '../slices/todoSlice';
import styles from '../styles/modules/todoItem.module.scss';
import { getClasses } from '../utils/getClasses';
import CheckButton from './CheckButton';
import TodoModal from './TodoModal';
import { checkTodo, deleteTodo } from '../redux/reducers/todo';

const child = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

//create your forceUpdate hook


function TodoItem({ todo }) {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);
  const [loctodo, setLocTodo] = useState(todo)
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [days, setDays] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const deadline = todo.time.toString()
  const slice = deadline.slice(0,-3)
  // console.log(slice);

  const handleCheck = () => {
    setChecked(!checked);
    setLocTodo({...loctodo, status: checked ? false : true})
    dispatch(checkTodo({...loctodo, status: checked ? false : true}));
  };

  const handleDelete = () => {
    dispatch(deleteTodo(loctodo.todoId));
    toast.success('Todo Deleted Successfully');
  };

  const handleUpdate = () => {
    setUpdateModalOpen(true);
  };

  const leading0 = (num) => {
    return num < 10 ? "0" + num : num;
  }

  const getTimeUntil = (deadline) => {
    const time = deadline - Date.parse(new Date())
    if (time < 0) {
      setDays(0)
      setSeconds(0)
    } else {
      setDays(Math.floor(time / (1000 * 60 * 60 * 24)))
      setSeconds(Math.floor((time / 1000) % 60))
    }
  }

  useEffect(() => {
    if (loctodo.status === true) {
      setChecked(true);
    } else {
      setChecked(false);
    }
    setInterval(() => getTimeUntil(deadline), 1000);
    return () => getTimeUntil(deadline)
  }, [loctodo.status, deadline]);
  // console.log(todo);
  // console.log(format(format1, 'yyyy/MM/dd'));

  return (
    <>
      <motion.div className={styles.item} variants={child}>
        <div className={styles.todoDetails}>
          <CheckButton checked={checked} handleCheck={handleCheck} />
          <div className={styles.texts}>
            <p
              className={getClasses([
                styles.todoText,
                loctodo.status === true && styles['todoText--completed'],
              ])}
            >
              {loctodo.todo}
            </p>
            <p className={styles.time}>
            </p>
            <p className={styles.time}>
              {/* {format(new Date(todo.time), 'p, MM/dd/yyyy')} */}
              {format(slice*1000, 'MM/dd/yyyy')} || <span> {leading0(days)} days left</span> || {leading0(seconds)? leading0(seconds) : 'has been stop'}
            </p>
          </div>
        </div>
        <div className={styles.todoActions}>
          <div
            className={styles.icon}
            onClick={() => handleDelete()}
            onKeyDown={() => handleDelete()}
            tabIndex={0}
            role="button"
          >
            <MdDelete />
          </div>
          <div
            className={styles.icon}
            onClick={() => handleUpdate()}
            onKeyDown={() => handleUpdate()}
            tabIndex={0}
            role="button"
          >
            <MdEdit />
          </div>
        </div>
      </motion.div>
      <TodoModal
        type="update"
        modalOpen={updateModalOpen}
        setModalOpen={setUpdateModalOpen}
        todo={loctodo}
      />
    </>
  );
}

export default TodoItem;
