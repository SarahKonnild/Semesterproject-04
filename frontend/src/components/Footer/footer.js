import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import { Container } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    footer: {
        height: "70px",
    },
    container: {},
    github: {
        alignContent: "center",
    },
    text: {
        fontSize: "14px",
        color: "#cccccc",
        margin: theme.spacing(4),
    },
}));

export default function Footer(props) {
    const classes = useStyles();

    return (
        <React.Fragment>
            <footer className={classes.footer}>
                <Container className={classes.container}>
                    <Typography
                        className={classes.text}
                        variant="h5"
                        align="center"
                        gutterBottom
                    >
                        Refslevbæk Bryghus A/S · © Copyright Group ST04 ·
                        ST4-PRO · BEng Software Technology · University of
                        Southern Denmark, SDU
                    </Typography>
                    {/* <GitHubIcon className={classes.github} /> */}
                </Container>
            </footer>
        </React.Fragment>
    );
}
