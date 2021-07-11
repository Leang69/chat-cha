import Login from './component/login'
import SignUp from './component/signup'
import Chating from './component/chating'
import {Switch, Route} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { useEffect } from 'react'

function App() {
    const storeDispatch = useDispatch()
    const store_user = useSelector((state) => state.user)

    useEffect(() => {
        storeDispatch({
            type: "loginAction",
            payload: {
                token: "58344616714dfadsf86asdfa6",
                isVerify: true,
                username: "Helllo"}
        })
    },[])

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
