import React from 'react';
import ReactDOM from 'react-dom';

import{BrowserRouter,Route,Redirect,Switch} from 'react-router-dom'
import Register from './views/Register'
import Activation from './views/Activation'
import Login from './views/Login.js'
import Reset from './views/Reset'
import ForgetPassword from './views/ForgetPassword.js'
import 'react-toastify/dist/ReactToastify.css'
import Profile from './views/Profile.js';
import Home from './views/Home.js';
import './assets/index.css'
import PrivateRoute from './routes/PrivateRoutes';
import Test from './views/Typingtest'
import Keyboard from './views/Keyboard';
import TypingLessons from './views/Typinglessons';
import Lessons from './views/Lessons';
import Stats from './views/Stats';


ReactDOM.render(
    <BrowserRouter>
      <Switch>
        <Route path='/' exact render={props=><Home {...props}/>}></Route>
        <Route path='/register' exact render={props=><Register {...props}/>}></Route>
        <Route path='/users/activate/:token' exact render={props=><Activation {...props}/>}></Route>
        <Route path='/login' exact render={props=><Login {...props}/>}></Route>
        <Route path='/users/password/forget' exact render={props=><ForgetPassword {...props}/>}></Route>
        <Route path='/users/password/reset/:token' exact render={props=><Reset {...props}/>}></Route>
        <PrivateRoute path='/typing-test' exact component={Test}></PrivateRoute>
        <PrivateRoute path='/typing-lesson' exact component={TypingLessons}></PrivateRoute>
        <Route path='/typing-lesson/:id' exact render={props=><TypingLessons {...props}/>}></Route>
        <PrivateRoute path='/lessons' exact component={Lessons}></PrivateRoute>
        <PrivateRoute path='/profile' exact component={Profile}/>
        <PrivateRoute path='/stats' exact component={Stats}/>
        <Redirect to='/'></Redirect>
      </Switch>
    </BrowserRouter>,
  document.getElementById('root')
);

