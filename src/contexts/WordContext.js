import React, { Component } from 'react';

const nullWord = {
  nextWord: null,
  totalScore: null,
  wordCorrectCount: null,
  wordIncorrectCount: null,
};

const WordContext = React.createContext({
  error: null,
  word: nullWord,
  setError: () => { },
  clearError: () => { },
  setWord: () => { },
  clearWord: () => { },
});

export default WordContext;

export class WordProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      word: nullWord,
    };
  }

  setError = error => {
    console.error(error);
    this.setState({ error });
  };
  clearError = () => this.setState({ error: null });

  setWord = word => this.setState({ word });
  clearWord = () => this.setState({ word: nullWord });

  render() {
    const value = {
      error: this.state.error,
      word: this.state.word,
      setError: this.setState,
      clearError: this.clearError,
      setWord: this.setWord,
      clearWord: this.clearWord
    };

    return (
      <WordContext.Provider value={value}>
        {this.props.children}
      </WordContext.Provider>
    );
  }
}