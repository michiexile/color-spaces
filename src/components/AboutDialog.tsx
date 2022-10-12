import React from "react";
import {Dialog, DialogTitle, List, ListItem, Typography, Link, DialogContent, IconButton} from "@mui/material";
import {Close} from "@mui/icons-material";

export type AboutDialogProps = {
    open: boolean;
    onClose: () => void;
}
export type DialogTitleProps = {
    children? : React.ReactNode;
    onClose : () => void;
}
function ClosableDialogTitle(props : DialogTitleProps) {
    const {children, onClose, ...other} = props;
    return (
        <DialogTitle {...other}>
            {children}
            {onClose ? (
                <IconButton onClick={onClose} sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: "grey"
                }}><Close /></IconButton>
            ) : null}
        </DialogTitle>
    );
};

export default function AboutDialog({open, onClose} : AboutDialogProps) : JSX.Element {
    return (
        <Dialog onClose={onClose} open={open}>
            <ClosableDialogTitle onClose={onClose}>About this page</ClosableDialogTitle>
            <DialogContent>
                <Typography>This page implements several color spaces by individual sliders and input fields for
                each coordinate of each color space.</Typography>
                <Typography>It works primarily as a front-end for d3.js but also uses several
                additional color space implementations written as extensions for d3-color.</Typography>
                <Typography variant={"h4"}>Color-space libraries used</Typography>
            <List>
                <ListItem><Link href={"https://github.com/d3/d3-color"}>d3-color</Link> (RGB, HSL, CIELAB, CIELCH)</ListItem>
                <ListItem><Link href={"https://github.com/connorgr/d3-cam02"}>d3-cam02</Link> (CIECAM02, CIECAM02-UCS)</ListItem>
                <ListItem><Link href={"https://github.com/d3/d3-hsv"}>d3-hsv</Link> (HSV)</ListItem>
                <ListItem><Link href={"https://github.com/d3/d3-hcg"}>d3-hcg</Link> (HCG)</ListItem>
                <ListItem><Link href={"https://github.com/petulla/d3-hsluv"}>d3-hsluv</Link> (HSLUV)</ListItem>
            </List>
                <Typography variant={"h4"}>Other libraries used</Typography>
            <List>
                <ListItem><Link href={"https://reactjs.org"}>React</Link></ListItem>
                <ListItem><Link href={"https://gatsbyjs.com"}>Gatsby</Link></ListItem>
                <ListItem><Link href={"https://mui.com"}>Material UI</Link> and
                    <Link href={"https://mui.com/material-ui/material-icons/"}>Material Icons</Link></ListItem>
            </List>
            </DialogContent>
        </Dialog>
    );
}