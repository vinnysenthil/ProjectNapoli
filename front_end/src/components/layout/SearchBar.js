import React from "react";
import PropTypes from "prop-types";
import deburr from "lodash/deburr";
import Autosuggest from "react-autosuggest";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import { withStyles } from "@material-ui/core/styles";
// import suggestions from "./autosuggest.json";
import Room from "@material-ui/icons/Room";
import Hotel from "@material-ui/icons/Hotel";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

const suggestions = [
  //   { label: "Afghanistan" },
  //   { label: "Aland Islands" },
  //   { label: "Albania" },
  //   { label: "Algeria" },
  //   { label: "British Indian Ocean Territory" },
  //   { label: "Brunei Darussalam" }
];

function renderInputComponent(inputProps) {
  const { classes, inputRef = () => {}, ref, ...other } = inputProps;

  return (
    <TextField
      fullWidth
      InputProps={{
        inputRef: node => {
          ref(node);
          inputRef(node);
        },
        classes: {
          input: classes.input
        }
      }}
      {...other}
    />
  );
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
  const matches = match(suggestion.label, query);
  const parts = parse(suggestion.label, matches);

  //   let add = null;
  //   if (suggestion.style === "dest") {
  //     add = <Room />;
  //   } else {
  //     add = <Hotel />;
  //   }

  return (
    <MenuItem selected={isHighlighted} component="div">
      {/* //       <ListItemIcon>{add}</ListItemIcon> */}

      <div>
        {/* //         <ListItemText> */}

        {parts.map((part, index) =>
          part.highlight ? (
            <span key={String(index)} style={{ fontWeight: 500 }}>
              {part.text}
            </span>
          ) : (
            <strong key={String(index)} style={{ fontWeight: 300 }}>
              {part.text}
            </strong>
          )
        )}
        {/* //         </ListItemText> */}
      </div>
    </MenuItem>
  );
}

function getSuggestions(value) {
  const inputValue = deburr(value.trim()).toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  return inputLength === 0
    ? []
    : //     : suggestions.name.filter(suggestion => {

      suggestions.filter(suggestion => {
        const keep =
          count < 5 &&
          suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;

        if (keep) {
          count += 1;
        }

        return keep;
      });
}

function getSuggestionValue(suggestion) {
  return suggestion.label;
}

const styles = theme => ({
  root: {
    marginTop: 10,
    marginLeft: 50,
    height: 50,
    flexGrow: 1
  },
  container: {
    position: "relative"
    //     padding: theme.spacing.unit * 2
  },
  suggestionsContainerOpen: {
    position: "absolute",
    zIndex: 1,
    //   marginTop: theme.spacing.unit,
    left: 0,
    right: 0
  },
  suggestion: {
    display: "block"
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: "none"
  },
  divider: {
    height: theme.spacing.unit * 2
  }
});

// class SearchBar extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       suggestions: []
//     };
//     this.handleChange = this.handleChange.bind(this);
//   }

//   handleSuggestionsFetchRequested = ({ value }) => {
//     this.setState({
//       suggestions: getSuggestions(value)
//     });
//   };

//   handleSuggestionsClearRequested = () => {
//     this.setState({
//       suggestions: []
//     });
//   };

//   handleChange = (event, { newValue }) => {
//     this.props.onHandleDestinationName(newValue);
//   };

//   render() {
//     const { classes } = this.props;

//     const autosuggestProps = {
//       renderInputComponent,
//       suggestions: this.state.suggestions,
//       onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
//       onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
//       getSuggestionValue,
//       renderSuggestion
//     };

//     return (
//       <div className={classes.root}>
//         <Autosuggest
//           {...autosuggestProps}
//           inputProps={{
//             classes,
//             placeholder: "Enter City, Hotel Name, or Airport",
//             value: this.props.destinationName,

//             onChange: this.handleChange
//           }}
//           theme={{
//             container: classes.container,
//             suggestionsContainerOpen: classes.suggestionsContainerOpen,
//             suggestionsList: classes.suggestionsList,
//             suggestion: classes.suggestion
//           }}
//           renderSuggestionsContainer={options => (
//             <Paper {...options.containerProps} square>
//               {options.children}
//             </Paper>
//           )}
//         />
//         <div className={classes.divider} />
//       </div>
//     );
//   }
// }

// SearchBar.propTypes = {
//   classes: PropTypes.object.isRequired
// };

// export default withStyles(styles)(SearchBar);

class SearchBar extends React.Component {
  state = {
    single: "",
    popper: "",
    suggestions: []
  };

  handleSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  handleChange = name => (event, { newValue }) => {
    this.setState({
      [name]: newValue
    });
  };

  render() {
    const { classes } = this.props;

    const autosuggestProps = {
      renderInputComponent,
      suggestions: this.state.suggestions,
      onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
      onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
      getSuggestionValue,
      renderSuggestion
    };

    return (
      <div className={classes.root}>
        <Autosuggest
          {...autosuggestProps}
          inputProps={{
            classes,
            placeholder: "Search for Employee or Department",
            value: this.state.single,
            onChange: this.handleChange("single")
          }}
          theme={{
            container: classes.container,
            suggestionsContainerOpen: classes.suggestionsContainerOpen,
            suggestionsList: classes.suggestionsList,
            suggestion: classes.suggestion
          }}
          renderSuggestionsContainer={options => (
            <Paper {...options.containerProps} square>
              {options.children}
            </Paper>
          )}
        />
        <div className={classes.divider} />
      </div>
    );
  }
}

SearchBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SearchBar);
