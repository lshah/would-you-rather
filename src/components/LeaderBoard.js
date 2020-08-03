import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { 
    Card, CardContent, Typography, Avatar,
} from '@material-ui/core';
import Nav from './Nav';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    container: {
        margin: 'auto',
        padding: '2rem',
        [theme.breakpoints.up('sm')]: {
            width: '50rem',
          },
    },
    root: {
        marginTop: '1rem',
    },
    contentRoot: {
        display: 'flex',
        flexDirection: 'column',
        padding: '2rem',
        justifyContent: 'center',
        alignItems: 'center',
        [theme.breakpoints.up('sm')]: {
            flexDirection: 'row',
          },
        '& .MuiAvatar-root': {
            height: '6rem',
            width: '6rem',
        },
        '& .MuiCardContent-root': {
            margin: '1rem',
            width: '16rem',
            textAlign: 'center',
            [theme.breakpoints.up('sm')]: {
                textAlign: 'left',
              },
        },
        '& button': {
            width: '16rem',
        },
    },
    contentContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: '1rem',
    },
    countContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    count: {
        color: '#3f51b5',
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

const LeaderBoard = ({data}) => {
    const classes = useStyles();
    return (
        <>
            <Nav />
            <div className={classes.container}>
            <div className={classes.backLink}><Link to={`/`}>Back to home</Link></div>
                <Typography className={classes.title} variant="h3" component="h1">
                    Leader Board
                </Typography>
                {data.map((user) => (
                    <Card className={classes.root} key={user.id} variant="outlined">
                        <div className={classes.contentRoot}>
                            <Avatar alt="user avatar" src={user.avatarURL} className={classes.large} />
                            <div className={classes.contentContainer}>
                                <Typography variant="h4" component="h2">
                                        {user.name}
                                </Typography>
                                <CardContent>                        
                                    <div className={classes.countContainer}>
                                        <Typography>
                                            Answered Questions
                                        </Typography>
                                        <Typography>
                                            {user.answerCount}
                                        </Typography>
                                    </div>
                                    <hr />
                                    <div className={classes.countContainer}>
                                        <Typography>
                                            Created Questions
                                        </Typography>
                                        <Typography>
                                            {user.questionCount}
                                        </Typography>
                                    </div>
                                    <hr />
                                    <div className={classes.countContainer}>
                                        <Typography className={classes.count} variant="h6">
                                            Score
                                        </Typography>
                                        <Typography className={classes.count} variant="h6">
                                            {user.total}
                                        </Typography>
                                    </div>
                                </CardContent>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </>
    )
}

const mapStateToProps = ({ users }) => {
    const data = Object.values(users).map((user) => ({
        id: user.id,
        name: user.name,
        avatarURL: user.avatarURL,
        answerCount: Object.values(user.answers).length,
        questionCount: user.questions.length,
        total: Object.values(user.answers).length + user.questions.length,
    }))
    .sort((a, b) => a.total - b.total)
    .reverse()
    .slice(0, 3);
    return {
        data
    }
}

export default connect(mapStateToProps)(LeaderBoard);
