import './App.scss';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Body from './components/Body';

function App() {
  return (
    <div className="App">
        {/* navbar */}
        <Navbar />
        {/* body */}
        <Body />
        {/* footer */}
        <Footer />
    </div>
  );
}

export default App;
