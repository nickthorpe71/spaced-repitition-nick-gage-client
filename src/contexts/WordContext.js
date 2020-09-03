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
  setError: () => { },
  clearError: () => { },
  setWord: () => { },
  clearWord: () => { },
  setResObj: () => { },
  clearResObj: () => { },
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
    };
  }

  setError = error => {
    console.error(error);
    this.setState({ error });
  };
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
      setError: this.setState,
      clearError: this.clearError,
      setWord: this.setWord,
      clearWord: this.clearWord,
      setResObj: this.setResObj,
      clearResObj: this.clearResObj,
      handleWordInputChange: this.handleWordInputChange,
    };

    return (
      <WordContext.Provider value={value}>
        {this.props.children}
      </WordContext.Provider>
    );
  }
}