import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { fetchTodo } from '../redux/reducers/todo';
import styles from '../styles/modules/app.module.scss';
import TodoItem from './TodoItem';

const container = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};
const child = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

function AppContent() {

  const { todoList } = useSelector((state) => state.todo);
  const { user: currentUser } = useSelector(state => state.auth);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTodo())
  }, [dispatch])
  const { initialFilterStatus } = useSelector((state) => state.filter);


  // const sortedTodoList = [...todoList];
  // sortedTodoList.sort((a, b) => new Date(b.time) - new Date(a.time));

  // const filteredTodoList = sortedTodoList.filter((item) => {
  //   if (filterStatus === 'all') {
  //     return true;
  //   }
  //   return item.status === filterStatus;
  // });

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  const sortedTodoList = [...todoList]
  sortedTodoList.sort((a, b) => new Date(a.time) - new Date(b.time))

  const filteredTodoList = sortedTodoList.filter((item) => {
    if (initialFilterStatus === 'all') {
      return true
    } if(initialFilterStatus === 'week'){
      const day = Math.floor((item.time - Date.parse(new Date())) / (1000 * 60 * 60 * 24))
      if (day <= 7) {
        return true
      }
    } else {
      return (item.status).toString() === initialFilterStatus
    }
  })

  return (
    todoList.length > 0 ?
      <motion.div
        className={styles.content__wrapper}
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence>
          {
            filteredTodoList && filteredTodoList.length > 0 ? (
              filteredTodoList.map((todo) => (
                <TodoItem key={todo.todoId} todo={todo} />
              ))
            ) : (
              <motion.p variants={child} className={styles.emptyText}>
                No Todos
              </motion.p>
            )
          }
        </AnimatePresence>
      </motion.div>
      : 'Data Null'
  );
}

export default AppContent;
