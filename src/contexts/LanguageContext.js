import React, { Component } from 'react';

const nullLanguage = {
  id: 0,
  name: null,
  user_id: 0
};

const nullWords = [];

const LanguageContext = React.createContext({
  error: 'null',
  language: nullLanguage,
  words: nullWords,
  setError: () => { },
  clearError: () => { },
  setLanguage: () => { },
  clearLanguage: () => { },
  setWords: () => { },
  clearWords: () => { },
  fetchLanguageAndWords: () => { },
});

export default LanguageContext;

export class LanguageProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      language: nullLanguage,
      words: nullWords
    };
  }

  fetchLanguageAndWords = () => {

  };

  setError = error => {
    console.error(error);
    this.setState({ error });
  };
  clearError = () => this.setState({ error: null });

  setLanguage = language => this.setState({ language });
  clearLanguage = () => this.setState({ language: { id: 0, name: '', user_id: 0 } });

  setWords = words => this.setState({ words });
  clearWords = () => this.setState({ words: {} });

  componentDidMount() {

  }

  render() {
    const value = {
      error: this.state.error,
      language: this.state.language,
      words: this.state.words,
      setError: this.setError,
      clearError: this.clearError,
      setLanguage: this.setLanguage,
      clearLanguage: this.clearLanguage,
      setWords: this.setWords,
      clearWords: this.clearWords,
      fetchLanguageAndWords: this.fetchLanguageAndWords,
    };

    return (
      <LanguageContext.Provider value={value}>
        {this.props.children}
      </LanguageContext.Provider>
    );
  }
}
