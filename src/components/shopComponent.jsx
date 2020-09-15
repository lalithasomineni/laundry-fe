import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import { Link } from "react-router-dom";

import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    "&:hover": {
      backgroundColor: "lightgreen",
    },
    "&:hover > div:hover": {
      backgroundColor: "lightblue",
    },
  },
  media: {
    height: 140,
  },
});

export default function MediaCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={props.image}
          title="Laundry Shop"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.address}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.email}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.phoneNumber}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.openingTime} to {props.closingTime}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Price/Cloth:{props.price}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        {!props.user && (
          <Link
            to={{ pathname: "/login", price: props.price, redirected: true }}
          >
            <Button size="small" color="secondary">
              Book a PickUp
            </Button>
          </Link>
        )}
        {props.user && (
          <Link
            to={{
              pathname: "/book",
              price: props.price,
              shopemail: props.email,
            }}
          >
            <Button size="small" color="secondary">
              Book a PickUp
            </Button>
          </Link>
        )}
      </CardActions>
    </Card>
  );
}
