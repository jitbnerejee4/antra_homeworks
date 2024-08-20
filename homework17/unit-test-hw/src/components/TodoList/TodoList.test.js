import TodoList from "./TodoList";
import React from 'react'
import {setupServer} from 'msw/node'
import { render, screen, waitFor} from '@testing-library/react';
import { rest } from 'msw';
import userEvent from '@testing-library/user-event'
import { within } from '@testing-library/react';


// findByText is used when we know the element will appear after an async operation. That is why we use await
// getByText is when when we know the element will be rendered immediately after rendering. If we use getByText
// for an element that is expected to appear after an async operation, we will get error.
// getByText or findByText throws error if an element not in the DOM. Where as, queryByText returns null if an element
// not present in the DOM. So to check if an element exist in the DOM use queryByText.


const data = [
    {
        userId: 1,
        id: 1,
        title: 'delectus aut autem',
        completed: false,
    },
    {
        userId: 1,
        id: 2,
        title: 'quis ut nam facilis et officia qui',
        completed: false,
    }
]

const server = setupServer(
    rest.get("https://jsonplaceholder.typicode.com/todos", (req, res, ctx) => {
        return res(ctx.json(data))
    })
)

// TODO: Mock the fetch API, and do reset and clean up
beforeEach(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

// TODO: Test component to render correctly with the fetched data
test("renders fetched todos on mount", async () => {
    render(<TodoList/>)
    expect(screen.getByText("Loading...")).toBeInTheDocument();
    const firstTodo = await screen.findByText('delectus aut autem');
    const secondTodo = await screen.findByText('quis ut nam facilis et officia qui');
    expect(firstTodo).toBeInTheDocument();
    expect(secondTodo).toBeInTheDocument();
  
});

// TODO: Test component to handle API fetch failure and display error message
test("handles API fetch failure", async () => {
    server.use(rest.get("https://jsonplaceholder.typicode.com/todos", (req, res, ctx) => {
        return res(ctx.status(404))
    }))

    render(<TodoList/>)
    expect(screen.getByText("Loading...")).toBeInTheDocument();
    const errorMessage = await screen.findByText("Error: Failed to fetch todos");
    expect(errorMessage).toBeInTheDocument();

});


// TODO: Test adding a new todo
test("adds a new todo item", async () => {
    render(<TodoList/>)
    expect(screen.getByText("Loading...")).toBeInTheDocument();
    const firstTodo = await screen.findByText('delectus aut autem');
    const secondTodo = await screen.findByText('quis ut nam facilis et officia qui');

    const input = screen.getByTestId('inputBox')
    const btn = screen.getByTestId('submit-btn')

    await userEvent.type(input, 'This is a new todo')
    expect(input).toHaveValue('This is a new todo')

    await userEvent.click(btn)
    const text = await screen.findByText('This is a new todo')
    expect(text).toBeInTheDocument();



});

// TODO: Test removing a todo
test("removes a todo item", async () => {
    render(<TodoList/>)
    expect(screen.getByText("Loading...")).toBeInTheDocument();
    const toDeleteItem = await screen.findByText('delectus aut autem')
    expect(toDeleteItem).toBeInTheDocument();

    const listItem = toDeleteItem.closest('li');
    // console.log(listItem.innerHTML);
    const deleteBtn = within(listItem).getByTestId("1");
    await userEvent.click(deleteBtn);
    const deletedItem = await screen.queryByText('delectus aut autem')
    expect(deletedItem).not.toBeInTheDocument();

});

