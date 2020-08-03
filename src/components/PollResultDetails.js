import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Typography,
} from '@material-ui/core';
import PollResults from './PollResults';
import Nav from './Nav';
import { Link } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: '2rem',
    margin: 'auto',
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

const PollResultDetails = ({ qid }) => {
    const classes = useStyles();
    return (
        <div>
          <Nav />
          <div className={classes.root}>
            <div className={classes.backLink}><Link to={`/questions/${qid}`}>Back to question</Link></div>
            <Typography className={classes.title} variant="h3" component="h1">
              Result
            </Typography>
            <div><PollResults id={qid}/></div>
          </div>
        </div>
    )
}

const mapStateToProps = ({questions}, props) => {
  const { id } = props.match.params;
    const question = questions[id];
    return {
        qid: question.id,
    }
}

export default connect(mapStateToProps)(PollResultDetails)