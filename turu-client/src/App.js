import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import Register from "./pages/Register/Register";

import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
	const { user } = useContext(AuthContext);

	return (
		<Router>
			<Switch>
				<Route exact path="/">
					{user ? <Home /> : <Register />}
				</Route>
				<Route path="/profile/:username" component={Profile} />
				<Route path="/login">
					{user ? <Redirect to="/" /> : <Login />}
				</Route>
				<Route path="/register">
					{user ? (
						<Redirect to={`/profile/${user.username}`} />
					) : (
						<Register />
					)}
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
