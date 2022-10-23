import './App.scss';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Body from './components/Body';
import Graphs from './components/Graphs';

function App() {
  return (
    <div className="App">

        {/* navbar */}
        <Navbar />

        {/* body */}
        <Body />

        {/* Graphs */}
        <Graphs />
        {/* footer */}
        <Footer />
    </div>
  );
}

export default App;
