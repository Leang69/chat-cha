import Login from './component/login'
import SignUp from './component/signup'
import Chating from './component/chating'
import {Switch, Route} from 'react-router-dom'


function App() {
    return (
        <div className="App">
            <Switch>
                <Route path="/login"><Login/></Route>
                <Route path="/signup"><SignUp/></Route>
                <Route exact path="/chating"><Chating/></Route>
            </Switch>
        </div>
    );
}

export default App;
