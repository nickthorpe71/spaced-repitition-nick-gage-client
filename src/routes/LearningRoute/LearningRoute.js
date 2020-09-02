import React, { Component } from 'react';
import LanguageApiService from '../../services/language-api-service';
import WordContext from '../../contexts/WordContext';

class LearningRoute extends Component {
  static createContext = WordContext;

  componentDidMount = () => {
    /**
     * @TODO tomorrow pass in the current word's next id 
     */

    LanguageApiService.getNextWord(1)
      .then(res => {
        console.log(res);
      });
  };

  render() {
    return (
      <section>
        <h2>What is the translation for this word?</h2>
        <div>
          <span></span>
        </div>
      </section>
    );
  }
}

export default LearningRoute;
