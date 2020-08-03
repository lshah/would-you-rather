import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Tabs, Tab, Box, List, Typography } from '@material-ui/core';
import Nav from './Nav';
import Question from './Question';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    margin: "auto",
    height: "100vh",
    maxWidth: "1024px",
    width: '100%',
    marginTop: "6rem",
  },
}));

const Home = ({ answered, unanswered }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Nav />
      <div className={classes.root}>
              <Tabs value={value} onChange={handleChange} aria-label="question tabs" variant="fullWidth">
                  <Tab label="Unanswered questions" {...a11yProps(0)} />
                  <Tab label="Answered questions" {...a11yProps(1)} />
              </Tabs>
              
              <List>
                <TabPanel value={value} index={0}>

                  {unanswered.length ? (
                    unanswered.map(question => (
                        <li key={question.id}>
                          <div><Question id={question.id}/></div>
                      </li>
                  ))
                  ) : (
                    <Typography component="body1" variant="h5">
                        No more Unanswered questions. See Answered tab for more details.
                    </Typography>
                  )}
                </TabPanel>
              </List>
                        
              <List>
                <TabPanel value={value} index={1}>
                  {answered.map(question => (
                            <li key={question.id}>
                              <div><Question id={question.id}/></div>
                          </li>
                      ))}
                </TabPanel>
              </List>
      </div>
    </>
  );
}

const mapStateToProps = ({ authedUser, users, questions }) => {
  const questionIds = Object.keys(questions).sort((a,b) => questions[b].timestamp - questions[a].timestamp)
  const answeredIds = Object.keys(users[authedUser].answers);
  const answered = Object.values(questions)
    .filter(question => answeredIds.includes(question.id))
    .sort((a, b) => b.timestamp - a.timestamp)
  const unanswered = Object.values(questions)
    .filter(question => !answeredIds.includes(question.id))
    .sort((a, b) => b.timestamp - a.timestamp)
  return {
      questionIds,
      answered,
      unanswered,
  }
}

export default connect(mapStateToProps)(Home);