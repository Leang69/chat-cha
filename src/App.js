import Login from './component/login'
import SignUp from './component/signup'
import Chating from './component/chating'
import {Switch, Route} from 'react-router-dom'
import {actions} from './Redux/Storeage'

function App(prop) {
    prop.store.dispatch({
        type: "loginAction",
        payload: {
            token: "Hell/o",
            isVerify: true,
            username: "Helllo"}
    })
    return (
        <div className="App">
            <h1>{prop.store.getState().token}</h1>
            <h1>{prop.store.getState().isVerify}</h1>
            <h1>{prop.store.getState().username}</h1>
            <Switch>
                <Route path="/login"><Login/></Route>
                <Route path="/signup"><SignUp/></Route>
                <Route exact path="/chating"><Chating/></Route>
            </Switch>
        </div>
    );
}

export default App;
