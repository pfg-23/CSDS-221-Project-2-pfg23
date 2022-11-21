import React, { useState } from 'react';
import Todo from './Todo';
import TodoForm from './TodoForm';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Container from '@mui/material/Container';

import moment from 'moment';

function TodoList() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [priority, setPriority] = useState('');
  const [todos, setTodos] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [addOpen, setAddOpen] = React.useState(false);

  function toggleTodo(id) {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos);
  }

  function deleteTodo(id) {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  }

  return (
    <Container>
      <TodoForm
        open={open}
        setOpen={setOpen}
        todos={todos}
        setTodos={setTodos}
        addOpen={addOpen}
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        deadline={deadline}
        setDeadline={setDeadline}
        priority={priority}
        setPriority={setPriority}
      />
      <AppBar position="static">
        <Toolbar style={{ align: 'center', background: '#1666bf' }}>
          <Typography
            component={'span'}
            align="center"
            style={{ width: '100%', alignItems: 'center' }}
          >
            <Grid display="flex" justifyContent="center" alignItems="center">
              <MenuIcon />
              &nbsp;FRAMEWORKS
            </Grid>
          </Typography>
          <Button
            variant="contained"
            style={{ width: '20%' }}
            onClick={() => {
              setOpen(true);
              setAddOpen(true);
              setTitle('');
              setDescription('');
              setDeadline(moment().format('YYYY-MM-DD'));
              setPriority('Low');
            }}
          >
            <AddCircleIcon fontSize="small" />
            &nbsp;Add
          </Button>
        </Toolbar>
      </AppBar>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center">Title</TableCell>
            <TableCell align="center">Description</TableCell>
            <TableCell align="center">Deadline</TableCell>
            <TableCell align="center">Priority</TableCell>
            <TableCell align="center">Is Complete</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {todos.map((todo) => {
            return (
              <Todo
                key={todo.id}
                toggleTodo={toggleTodo}
                deleteTodo={deleteTodo}
                todo={todo}
                setOpen={setOpen}
                setAddOpen={setAddOpen}
                setTitle={setTitle}
                setDescription={setDescription}
                setDeadline={setDeadline}
                setPriority={setPriority}
              />
            );
          })}
        </TableBody>
      </Table>
    </Container>
  );
}

export default TodoList;
