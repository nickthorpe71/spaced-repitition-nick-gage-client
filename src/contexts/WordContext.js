import React, { Component } from 'react';

const nullWord = {
  nextWord: null,
  totalScore: null,
  wordCorrectCount: null,
  wordIncorrectCount: null,
};

const nullResObj = {
  answer: null,
  isCorrect: null,
  nextWord: null,
  totalScore: null,
  wordCorrectCount: null,
  wordIncorrectCount: null,
};

const WordContext = React.createContext({
  error: null,
  word: nullWord,
  resObj: nullResObj,
  wordInput: null,
  theLastGuess : null,
  setGuess : () =>{},
  clearGuess : () =>{},
  setError: () => { },
  clearError: () => { },
  setWord: () => { },
  clearWord: () => { },
  setResObj: () => { },
  clearResObj: () => { },
  clearWordInput : () => {},
  handleWordInputChange: () => { },
});

export default WordContext;

export class WordProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      word: nullWord,
      resObj: nullResObj,
      wordInput: '',
      theLastGuess : '',
    };
  }

  setError = error => {
    console.error(error);
    this.setState({ error });
  };

  setGuess = (theLastGuess) => this.setState({theLastGuess});

  clearGuess = () => this.setState({theLastGuess : ''});

  clearError = () => this.setState({ error: null });

  setWord = word => this.setState({ word });
  clearWord = () => this.setState({ word: nullWord });

  setResObj = resObj => this.setState({ resObj });
  clearResObj = () => this.setState({ resObj: nullResObj });

  handleWordInputChange = value => this.setState({ wordInput: value });
  clearWordInput = () => this.setState({ wordInput: '' });

  render() {
    const value = {
      error: this.state.error,
      word: this.state.word,
      resObj: this.state.resObj,
      wordInput: this.state.wordInput,
      theLastGuess : this.state.theLastGuess,
      setGuess : this.setGuess,
      clearGuess : this.clearGuess,
      setError: this.setError,
      clearError: this.clearError,
      setWord: this.setWord,
      clearWord: this.clearWord,
      clearWordInput : this.clearWordInput,
      handleWordInputChange: this.handleWordInputChange,
      setResObj: this.setResObj,
      clearResObj: this.clearResObj,
    };

    return (
      <WordContext.Provider value={value}>
        {this.props.children}
      </WordContext.Provider>
    );
  }
}