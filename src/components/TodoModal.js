import React, { useEffect, useRef, useState } from 'react';
import { MdOutlineClose } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import toast from 'react-hot-toast';
// import { addTodo, updateTodo } from '../slices/todoSlice';
import styles from '../styles/modules/modal.module.scss';
import Button from './Button';
import FormDatePicker from './FormDatePicker';
import { postTodo, updateTodo } from '../redux/reducers/todo';
// import { format } from 'date-fns';
// import { convertToRaw } from 'draft-js';
// import draftToHtml from 'draftjs-to-html';
import { EditorState } from 'draft-js';
// import { Editor } from 'react-draft-wysiwyg';

const dropIn = {
  hidden: {
    opacity: 0,
    transform: 'scale(0.9)',
  },
  visible: {
    transform: 'scale(1)',
    opacity: 1,
    transition: {
      duration: 0.1,
      type: 'spring',
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    transform: 'scale(0.9)',
    opacity: 0,
  },
};

function TodoModal({ type, modalOpen, setModalOpen, todo }) {
  const dateStateRef = useRef()
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [locTodo, setLocTodo] = useState(todo)
  const [description, setDescription] = useState(EditorState.createEmpty())
  const [status, setStatus] = useState('incomplete');
  const [priority, setPriority] = useState('')
  // const [date, setDate] = useState('')
  // const dateString = date.toString()
  // const slice = dateString.slice(0, -3)


  // const [todoInfo, setTodoInfo] = useState({
  //   description: '',
  // })


  // const onChangeValue = (e) => {
  //   setTodoInfo({
  //     ...todoInfo,
  //     [e.target.name]:e.target.value
  //   })
  // }



  // let editorState = EditorState.createEmpty()
  // const [description, setDescription] = useState(editorState)


  // const onEditorStateChange = (editorState) => {
  //   setDescription(editorState)
  // }

  const getDateState = () => {
    const dateState = dateStateRef.current.getDateData()
    return dateState
  }

  useEffect(() => {
    if (type === 'update' && locTodo) {
      setTitle(locTodo.todo)
      setDescription(locTodo.description)
      setPriority(locTodo.priority)
      // setDate(new Date(locTodo.time * 1000))
      setStatus(locTodo.status)
    } else {
      setTitle('');
      setDescription('')
      setPriority('')
      setStatus('incomplete');
    }
  }, [type, locTodo, modalOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(Math.floor(getDateState().getTime()));
    // console.log(Math.floor(getDateState().getTime() / 1000));
    if (type === 'update') {
      if (locTodo.title !== title || locTodo.status !== status) {
        setLocTodo({...locTodo, todo: title, status, description})
        dispatch(updateTodo({ ...locTodo, todo: title, status, description }));
        return toast.success('Task Updated successfully');
      } else {
        toast.error('No changes made');
        return;
      }
    }
    if (title === '' || description === '' || (type === 'add') ? (getDateState() === null) : '') {
      toast.error('Please fill out all fields');
      return;
    }
    if (title && description && (type === 'add') && getDateState()) {
      if (type === 'add') {
        const data = {
          todo: title,
          description,
          priority,
          time: Math.floor(getDateState().getTime())
        }
        // console.log(data);
        dispatch(postTodo(data));
        toast.success('Task added successfully');
      }

      setModalOpen(false);
    }
  };

  return (
    <AnimatePresence>
      {modalOpen && (
        <motion.div
          className={styles.wrapper}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className={styles.container}
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div
              className={styles.closeButton}
              onKeyDown={() => setModalOpen(false)}
              onClick={() => setModalOpen(false)}
              role="button"
              tabIndex={0}
              // animation
              initial={{ top: 40, opacity: 0 }}
              animate={{ top: -10, opacity: 1 }}
              exit={{ top: 40, opacity: 0 }}
            >
              <MdOutlineClose />
            </motion.div>

            <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
              <h1 className={styles.formTitle}>
                {type === 'add' ? 'Add' : 'Update'} TODO
              </h1>
              <label htmlFor="title">
                Title
                <input
                  type="text"
                  id="todo"
                  name='todo'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </label>
              <label htmlFor="title">
                Description
                {/* <Editor
                  editorState={description}
                  wrapperClassName="wrapper-class"
                  editorClassName="editor-class"
                  toolbarClassName="toolbar-class"
                  // wrapperStyle={ {width: "100%", fontSize: '1rem'} }
                  // editorStyle={ {width: "100%", fontSize: '1rem'} }
                  // toolbarStyle={ {width: "100%"} }
                  onEditorStateChange={onEditorStateChange}
                /> */}
                {/* <textarea style={{ display: 'none' }} ref={(val) => todoInfo.description = val} disabled value={draftToHtml(convertToRaw(description.getCurrentContent()))} /> */}
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
              </label>
              <label htmlFor="type">
                Priority
                <select
                  id="type"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option value="1">Low</option>
                  <option value="2">Medium</option>
                  <option value="3">High</option>
                </select>
              </label>
              {type === 'add' && (
                <label htmlFor='title'>
                  Todo deadline
                  <FormDatePicker ref={dateStateRef} />
                </label>

              )}
              <div className={styles.buttonContainer}>
                <Button type="submit" variant="primary">
                  {type === 'add' ? 'Add Task' : 'Update Task'}
                </Button>
                <Button variant="secondary" onClick={() => setModalOpen(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default TodoModal;
