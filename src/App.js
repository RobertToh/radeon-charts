import './App.css';
import RadeonChart from './RadeonCharts';
import TitleBar from './TitleBar';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <div className="App">
            <TitleBar />
            <RadeonChart/>
        </div>
    );
}

export default App;
