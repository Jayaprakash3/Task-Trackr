import './App.css';
//import Main from './components/Main';
import MyNavigation from './components/UI/Navigation';
import Card from './components/UI/Card';
import TaskAdder from './components/TaskAdder/TaskAdder';
import TaskList from './components/TaskList/TaskList';
//import Sample from './components/UI/sample';

function App() {
  return (
    <div className="App">
      <MyNavigation />
      <Card />
      <TaskAdder />
      <TaskList />
    </div>
  );
}

export default App;
