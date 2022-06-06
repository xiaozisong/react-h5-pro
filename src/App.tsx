import React from 'react'
import './app.scss'
import Login from './pages/Login'
import Layout from './pages/Layout'
import { BrowserRouter as Router, Switch, Redirect, Route } from 'react-router-dom'
export default function App() {
  return (
    <Router>
      {/* <Link to={'/'}>首页</Link>
      <Link to={'/login'}>登录</Link> */}
      <Switch>
        <Redirect exact from='/' to={'/home'}></Redirect>
        <Route path={'/home'} component={Layout}></Route>
        <Route path={'/login'} component={Login}></Route>
      </Switch>
    </Router>
  )
}
