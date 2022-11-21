import GlobalStyle from './GlobalStyle'
import Container from './utils/Container'
import Header from './components/Header'
import TodoList from './components/TodoList'

function App() {
    return (
        <div className="App">
            <Container>
                <GlobalStyle />
                <Header />
                <TodoList />
            </Container>
        </div>
    )
}

export default App
