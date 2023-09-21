## Questions

1. What is the difference between Component and PureComponent? Give an example where it might break my app.

- Component: the component will re-render on every state or props change.

- PureComponent: If there are no changes on state or props, it prevents unnecessary re-renders.

If the component relies on deep equality comparisons for props or state changes (e.g. when using complex objects), PureComponent might not work as expected because it only performs shallow comparisons. In such cases, you may miss updates.

----------

2. Context + ShouldComponentUpdate might be dangerous. Why is that?

It's dangerous because shouldComponentUpdate might not be aware of changes in context values. Using shouldComponentUpdate to optimize rendering based on props or state but depend on context within your component, changes in context won't trigger re-renders, potentially causing your component to display outdated data.

----------

3. Describe 3 ways to pass information from a component to its PARENT.

- Callback Functions: Pass a callback function as a prop to the child component. When an event or action occurs in the child component, call the callback to pass data back to the parent.

- Props: pass data from child to parent through props. The parent component can pass a function as a prop to the child, which the child can call to send data back to the parent.

- Context API or Global state (Tools like Redox or Recoil): If you have a complex component hierarchy, you can use React Context API to share data between components without needing to pass props explicitly or Redox which creates a global state and link the components to read/write in information in that state.

----------

4. Give 2 ways to prevent components from re-rendering.

- Use PureComponent for class components or memo() for functional components: These optimizations prevent re-renders when props and state haven't changed.

- Implement shouldComponentUpdate only for class Components: implement the shouldComponentUpdate method to control when a component should re-render based on changes in props and state.

----------

5. What is a fragment and why do we need it? Give an example where it might break my app.

A fragment is a way to group multiple elements without adding an extra wrapping DOM element. It's mainly used for cleaner rendering of adjacent JSX elements.

```typescript
const List = () => (
  <>
    <div>Item 1</div>
    <div>Item 2</div>
  </>
);
```

Using a third-party library that parses the code and doesn't support fragments, using it might cause compatibility issues. I remember when Fragment was released, I tried to use it with React Select library and it didn't work, the library didn't identyfy the code `<>...</>`.

----------

6. Give 3 examples of the HOC pattern.

- HOC that adds authentication checks to components, ensuring that only authenticated users can access certain parts of your app.
- HOC that adds styling or CSS classes to a component based on certain conditions or props.
- HOC that adds a loading indicator to a component while it's fetching data from an API.

-----------

7. What's the difference in handling exceptions in promises, callbacks and async...await?

- Promises: You can use .catch() to handle exceptions.

```js
asyncOperation()
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });
```

- async...await: When using async...await, you can use try-catch blocks to catch and handle exceptions.
```jsx
const runOperation = async () => {
  try {
    const result = await asyncOperation();
    console.log(result);
  } catch (error) {
    console.error(error.message);
  }
}
```

- Callbacks: You handle exceptions in callbacks by including error parameters in the callback function's signature and checking for errors inside the callback.
```js
function asyncOperation(callback) {
  const randomValue = Math.random();
  if (randomValue < 0.5) {
    callback('Callback error: Operation failed', null);
  } else {
    callback(null, 'Callback success: Operation successful');
  }
}

asyncOperation((error, result) => {
  if (error) {
    console.error(error);
  } else {
    console.log(result);
  }
});
```

----------

8. How many arguments does setState take and why is it async.

setState can take two types of arguments:

- the new value which will be used to update the state.
```jsx
setState(newValue);
```
- A function that has the prev value as parameter and returns the new state.
```jsx
setState((prevValue) => { return newValue });
``
```

It is asynchronous because React batches multiple setState calls and then performs the updates in a single render cycle for performance reasons.

----------

9. List the steps needed to migrate a Class to Function Component.

- Identify the class component to migrate and create a functional component with the same name.
- Copy any necessary logic from the react life cycle into appropriate hooks. Replace:
  - constructor and this.state by useState.
  - componentDidMount by useEffect with an empty array as the second argument.
  - componentWillUnmount by useEffect with a function that returns a cleanup function.
  - render is replaced by the function's return.
- Replace `this.props` with function arguments.

```jsx
class ClassComponent extends Component {
  constructor() {
    super();
    this.state = {
      count: 0,
    };
  }

  componentDidMount() {
    console.log('Component did mount');
  }

  componentWillUnmount() {
    console.log('Component will unmount');
  }

  incrementCount = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={this.incrementCount}>Increment</button>
      </div>
    );
  }
}

function FunctionComponent() {
    // Equivalent to this.state and this.setState
    const [count, setCount] = useState(0);

    // Equivalent to the logic in class component
    const incrementCount = () => {
        setCount(count + 1);
    };

    // Equivalent to componentDidMount
    useEffect(() => {
        console.log('Component did mount');

        // Cleanup function (equivalent to componentWillUnmount)
        return () => {
            console.log('Component will unmount');
        };
    }, []);

    // Equivalent to render
    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={incrementCount}>Increment</button>
        </div>
    );
}
```

----------

10. List a few ways styles can be used with components.

- CSS Modules: Import and use CSS modules or a variant (SASS, LESS...) to apply scoped styles to your components.
- Inline Styles: You can define styles directly within a component using the style attribute in JSX.
- Styled-components: I know this exists, but I have never used it. 😅

----------

11. How to render an HTML string coming from the server.

You can use the dangerouslySetInnerHTML prop. However, be cautious when using it as it can expose your application to cross-site scripting (XSS) attacks.

Example:

```jsx
function RenderHTML({ htmlString }) {
    return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
}
```
Ensure that the htmlString is sanitized and doesn't contain any potentially malicious content to mitigate security risks.