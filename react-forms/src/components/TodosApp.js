import React, {Component} from 'react';
import AddTodo from "./AddTodo";
import TodoList from "./TodoList";
import uuid from 'uuid';

class TodosApp extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            todos: []
        };
    }

    componentDidMount()
    {
        console.log('Did mount');
        this.loadData();
    }

    loadData()
    {
        fetch('/todos?_limit=10')
            .then((res) =>
            {
                return res.json();
            })
            .then(data =>
            {
                console.log('todos:' + data);
                this.setState({todos: data})

            })
    }

    // Toggle Complete
    markComplete = (id) =>
    {
        this.setState({
            todos: this.state.todos.map((todo) =>
            {
                if (todo.id === id)
                {
                    todo.completed = !todo.completed;
                }
                return todo;
            })
        });
    };

    // Delete Todo
    delTodo = (id) =>
    {
        // axios
        //     .delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
        //     .then((res) =>
        //         this.setState({
        //             todos: [...this.state.todos.filter((todo) => todo.id !== id)]
        //         })
        //     );
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        const options = {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        };

        console.log('about to fetch: '+`/todos/${id}/`);
        fetch(`/todos/${id}`,options)
            .then((res) =>
            {
                console.log('response: \n'+res.data);
                // res.data.id = uuid.v4();
                // this.setState({todos: [...this.state.todos, res.data]});
                this.loadData();
            });
    };

    // Add Todo
    addTodo = (title) =>
    {
        console.log('Add a todo');
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        const options = {
            method: 'POST',
            body: {
                title,
                completed: false
            },
            myHeaders
        };

        fetch('/todos',options)
            .then((res) =>
            {
                console.log('response: \n'+res.data);
                // res.data.id = uuid.v4();
                // this.setState({todos: [...this.state.todos, res.data]});
                this.loadData();
            });
    };

    render()
    {
        return (
            <div>
                <h1>Todos App</h1>
                <AddTodo addTodo={this.addTodo}/>
                <TodoList
                    todos={this.state.todos}
                    markComplete={this.markComplete}
                    delTodo={this.delTodo}
                />
            </div>
        )
    }
}

export default TodosApp;
