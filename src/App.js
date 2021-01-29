import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import NavBar from "./components/NavBar";

import Profile from "./components/main_components/Profile";

import { Route } from "react-router-dom";
import {BrowserRouter as Router} from "react-router-dom"

import ShowSearchResult from "./components/main_components/ShowSearchResult";

import Home from "./components/main_components/Home";

import NetworkPage from "./components/Network_Components/NetworkPage";
import JobsPage from "./components/Jobs_Compnents/JobsPage";
import MsgPage from "./components/Messaging_Component/MsgPage";
import ProtectedRoute from "./components/authComponents/ProtectedRoute";
import NotRegistered from "./components/authComponents/NotRegistered";
import LinkedinNav from "./components/main_components/LinkedinNav/LinkedinNav";

class App extends React.Component {
  state = {
    userList: [],
    filteredUserList: [],
    showResult: false,
    searchString: "",
    currentId: null,
    notifications: 0,
    counter:0
  };

  setCurrentId=(id)=> {
    this.setState({currentId: id})
  }  

  setUserList = (user) => {
    this.setState({userList: [...this.state.userList, user]})
  }

  totalNot = (notifications) => {
    let total = notifications
    // console.log(total)
    this.setState({ notifications: total })
    let counter = this.state.counter + 1
    this.setState({counter: counter})
  }

  handleSearch = (e) => {
    if (e.keyCode === 13 || e.key === "Enter") {
      e.preventDefault();

      let filteredUserList = this.state.userList.filter(
        (user) =>
          (user.name &&
            user.name.toLowerCase().includes(this.state.searchString)) ||
          (user.surname &&
            user.surname.toLowerCase().includes(this.state.searchString))
      );

      this.setState({ filteredUserList });
      this.setState({ showResult: true });
    } else {
      this.setState({
        searchString: e.currentTarget.value,
        filteredUserList: this.state.userList,
      });
    }
  };



  componentDidMount() {
    // this.getUserList();
  }
  render() {
    return (
      <div className="App">
        <Router>
          <ShowSearchResult
            keyword={this.state.searchString}
            users={this.state.filteredUserList}
            onHide={() => this.setState({ showResult: false })}
            show={this.state.showResult}
          />
          <LinkedinNav
            searchString={this.state.searchString}
            handleSearch={this.handleSearch}
            notifications={this.state.notifications}
          />

          <ProtectedRoute path="/logout" component={NotRegistered} />
          <ProtectedRoute path="/" exact component={Home} />
          <Route path="/profile/:id" component={Profile} />
          <Route
            path="/mynetwork"
            render={(props) => <NetworkPage userList={this.state.userList} setCurrentId={this.setCurrentId} setUsers={ this.setUserList}/>}
          />
          <Route path="/jobs" component={JobsPage} />
          <Route path="/message/:id" render={(props) => <MsgPage {...props} selectedUsers={this.state.userList} totalNot={ this.totalNot}/>} />
        </Router>
      </div>
    );
  }
}
export default App;
