import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import BlogHome from "./BlogHome";
import NewBlogForm from "./NewBlogForm";
import AdminDashboard from "./AdminDashboard";
import Post from "./Post";

function Routes() {
  return (
    <Switch>
      <Route exact path="/about"><About /></Route>
      <Route exact path="/contact"><Contact /></Route>
      <Route exact path="/blog/new"><NewBlogForm /></Route>
      <Route exact path="/blog/:slug"><Post /></Route>
      <Route exact path="/blog"><BlogHome /></Route>
      <Route exact path="/admin"><AdminDashboard /></Route>
      <Route exact path="/"><Home /></Route>
      {/* <Route><h1>NOT FOUND!!!</h1></Route> */}
      <Redirect to="/about" />
    </Switch>
  );
}

export default Routes;
