import './App.css';
import RadeonChart from './RadeonCharts';
import TitleBar from './TitleBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';

function App() {
    return (
        <Container fluid className="App">
            <TitleBar />
            <RadeonChart/>
        </Container>
    );
}

export default App;
