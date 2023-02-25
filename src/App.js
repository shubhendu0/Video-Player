import './App.css';
import {Routes , Route} from 'react-router-dom';
import Local from './components/local';
import { useSelector } from 'react-redux';
import { VideoPlayer } from './components/videoPlayer';


function App() {
  const url = useSelector((state)=> state.videoUrl);
  return (
    <div className="App">   
      <Routes>
        <Route path="/" element={ url=="" ? <Local/> : <VideoPlayer/>}/>
      </Routes>
    </div>
  );
}

export default App;
