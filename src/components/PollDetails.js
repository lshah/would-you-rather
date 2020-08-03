import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Typography,
} from '@material-ui/core';
import Poll from './Poll';
import Nav from './Nav';
import { Link, Redirect } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: '2rem',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backLink: {
    color: 'green',
    textAlign: 'left',
    marginTop: '4rem',
    [theme.breakpoints.up('sm')]: {
      width: '50rem',
    },
  },
  title: {
    marginBottom: '2rem',
    marginTop: '2rem',
    textAlign: 'center',
},
}));

const PollDetails = ({ questions, id }) => {
    const classes = useStyles();
    const question = questions[id];
    if(questions[id] === undefined){
      return <Redirect to="/404"/>
    } else {
      return (
        <div>
          <Nav />            
          <div className={classes.root}>
            <div className={classes.backLink}><Link to={`/`}>Back to home</Link></div>
            <Typography className={classes.title} variant="h3" component="h1">
              Question
            </Typography>
            <div><Poll id={question.id}/></div>
          </div>
        </div>
    )
    }
}

const mapStateToProps = ({questions}, props) => {
  const { id } = props.match.params;
    return {
        questions,
        id,
    }
}

export default connect(mapStateToProps)(PollDetails)