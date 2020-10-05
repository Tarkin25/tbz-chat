import { Container, makeStyles } from "@material-ui/core";
import React, { ReactNode } from "react";
import Header from "./organisms/Header/Header";

type PageProps = {
    title: string;
    children: ReactNode;
};

const useStyle = makeStyles((theme) => ({
    root: {
        height: "100vh",
        display: "flex",
        flexDirection: "column",
    },
    pageWrapper: {
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        margin: theme.spacing(4, 0)
    },
    header: {
        margin: 0,
    },
    content: {
        position: "relative",
        flexGrow: 1,
    },
}));

const Page = (props: PageProps) => {
    const { title, children } = props;
    const classes = useStyle();

    return (
        <div className={"page"}>
            <Container maxWidth="md">
                <div className={classes.root}>
                    <div className={classes.pageWrapper}>
                        <div className={classes.header}>
                            <Header title={title} />
                        </div>
                        <main className={classes.content}>{children}</main>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Page;