import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import List, {
  ListItem,
  ListItemSecondaryAction,
  ListItemText
} from "material-ui/List";
import axios from "axios";
import Checkbox from "material-ui/Checkbox";
import Avatar from "material-ui/Avatar";
import StarIcon from "material-ui-icons/Star";
import StarBorder from "material-ui-icons/StarBorder";
import { FormControl } from "material-ui/Form";
import Input from "material-ui/Input";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: "120px",
    backgroundColor: theme.palette.background.paper
  },
  search: {
    width: "100%",
    position: "fixed",
    backgroundColor: "white",
    marginTop: "-75px",
    boxSizing: "border-box",
    padding: "40px 10px 10px",
    zIndex: 99
  }
});

let ITEMS = [];

class CheckboxListSecondary extends React.Component {
  constructor() {
    super();
    this.state = { checked: [], items: [] };
  }

  componentDidMount() {
    axios.get("./itemsList.json").then(response => {
      console.log(response.data);
      ITEMS = response.data;
      this.setState({ items: ITEMS });
    });
  }

  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    this.setState({
      checked: newChecked
    });
  };

  filterList = event => {
    let searchQuery = event.target.value.toLowerCase();
    const resultItems = this.filterIt(searchQuery, ITEMS);
    this.setState({ ...this.state, items: resultItems });
  };

  filterIt = (terms, arr) => {
    if ("" === terms || terms.length < 3) return arr;
    let words = terms.match(/\w+|"[^"]+"/g);
    return arr.filter(a => {
      let v = Object.values(a);
      let f = JSON.stringify(v).toLowerCase();

      return words.every(val => f.includes(val));
    });
  };

  render() {
    const { classes } = this.props;
    const path = "http://189.126.197.169/img/small/small_";
    return (
      <div className={classes.root}>
        <FormControl className={classes.search}>
          <Input placeholder="SEARCH" onChange={this.filterList} />
        </FormControl>
        <List>
          {this.state.items.map((item, i) => (
            <ListItem key={item.id} dense button className={classes.listItem}>
              <Avatar alt={item.id} src={path + item.id + ".jpg"} />
              <ListItemText primary={item.id} secondary={item.name} />
              <ListItemSecondaryAction>
                <Checkbox
                  checkedIcon={<StarIcon />}
                  icon={<StarBorder />}
                  onChange={this.handleToggle(i)}
                  checked={this.state.checked.indexOf(i) !== -1}
                />
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
}

CheckboxListSecondary.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CheckboxListSecondary);
