import React, { Component } from 'react';
import { handleInitialData } from '../actions/shared';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Login';
import LeaderBoard from './LeaderBoard';
import NewQuestion from './NewQuestion';
import Home from './Home';
import PollDetails from './PollDetails';
import PollResultDetails from './PollResultDetails';
import NotFound from './NotFound';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render(){
    const { authedUser } = this.props;
    
    return (
      <Router>
          <div className="App">
            {authedUser === null ? (
              <Route path='/*' exact component={Login} />
            ) : (
              <>
                <Switch>
                  <Route path='/' exact component={Home} />
                  <Route path='/leader-board' component={LeaderBoard} />
                  <Route path='/add' component={NewQuestion} />
                  <Route path="/questions/:id" component={PollDetails} />
                  <Route path="/result/:id" component={PollResultDetails} />
                  <Route component={NotFound} />
                </Switch>
              </>
              
            )}
        </div>
      </Router>
    );
  }
}

function mapStateToProps ({ authedUser, loading }) {
  return {
    authedUser,
  }
}

export default connect(mapStateToProps)(App);
