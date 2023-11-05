import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import {FilmListPage} from './pages/FilmPages/FilmListPage';

export const Routes =() =>{
    return (
        <Router>
            <Switch>
                <Route path="/">
                    <FilmListPage></FilmListPage>
                </Route>
            </Switch>
        </Router>
    )
}