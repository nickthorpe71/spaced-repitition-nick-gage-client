import React, { Component } from 'react';

const nullWord = {
  correct_count : null,
  id : null,
  in_row : null, 
  incorrect_count : null,
  lang : {
    name : null , 
    total_score : null,
  },
  language_id : null,
  memory_value : null,
  next : null,
  original : null,
  translation : null ,
};

const WordContext = React.createContext({
  error: null,
  word: nullWord,
  wordInput : null, 
  setError: () => { },
  clearError: () => { },
  setWord: () => { },
  clearWord: () => { },
  handleWordInputChange : () => { },
});

export default WordContext;

export class WordProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      word: nullWord,
      wordInput : '',
    };
  }

  setError = error => {
    console.error(error);
    this.setState({ error });
  };
  
  clearError = () => this.setState({ error: null });

  setWord = word => this.setState({ word });

  clearWord = () => this.setState({ word: nullWord });

  handleWordInputChange = value => this.setState({wordInput : value})  

  clearWordInput = () => this.setState({wordInput : ''})

  render() {
    const value = {
      error: this.state.error,
      word: this.state.word,
      wordInput : this.state.wordInput,
      setError: this.setState,
      clearError: this.clearError,
      setWord: this.setWord,
      clearWord: this.clearWord,
      handleWordInputChange : this.handleWordInputChange,
    };

    return (
      <WordContext.Provider value={value}>
        {this.props.children}
      </WordContext.Provider>
    );
  }
}