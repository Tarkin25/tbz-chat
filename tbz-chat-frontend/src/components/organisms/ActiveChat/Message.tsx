import { makeStyles, Typography } from "@material-ui/core";
import clsx from "clsx";
import { Moment } from "moment";
import React from "react";
import useAuthState from "../../../util/hooks/useAuthState";

const useStyle = makeStyles((theme) => ({
    root: {
        display: "flex",
        "&:not(:last-child)": {
            marginBottom: theme.spacing(3)
        },
        flexDirection: "row",
        "&$own": {
            flexDirection: "row-reverse",
            "& $content": {
                background: theme.palette.success[theme.palette.type === "dark" ? "dark" : "main"]
            }
        }
    },
    content: {
        maxWidth: "65%",
        padding: theme.spacing(1),
        borderRadius: theme.spacing(1),
        background: theme.palette.info[theme.palette.type === "dark" ? "main" : "light"]
    },
    own: {},
    authorName: {
        fontWeight: theme.typography.fontWeightBold,
    },
    timestamp: {
        textAlign: "right",
    },
    body: {
        maxWidth: "100%",
        wordWrap: "break-word"
    },
}), {name: "Message"});

type MessageProps = {
    message: {
        body: string;
        authorName?: string;
        timestamp: Moment;
        authorId: string;
    };
};

const Message = (props: MessageProps) => {
    const {
        message: { body, authorName, timestamp, authorId },
    } = props;
    const { user } = useAuthState();
    const isOwn = user!.id === authorId;
    const classes = useStyle();

    return (
        <div className={clsx(classes.root, {[classes.own]: isOwn})}>
            <div className={classes.content}>
                {!isOwn ? (
                    <Typography className={classes.authorName}>
                        {authorName}
                    </Typography>
                ) : null}
                {body.split("\n").map((line, index) => (
                    <Typography key={index} className={classes.body}>{line}</Typography>
                ))}
                <Typography color="textSecondary" className={classes.timestamp}>
                    {timestamp.format("HH:mm")}
                </Typography>
            </div>
        </div>
    );
};

export default Message;
