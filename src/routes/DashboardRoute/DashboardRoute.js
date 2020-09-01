import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LanguageContext from '../../contexts/LanguageContext';
import LanguageApiService from '../../services/language-api-service';

class DashboardRoute extends Component {
  static contextType = LanguageContext;

  componentDidMount() {
    LanguageApiService.getLanguage()
      .then(res => {
        this.context.clearError();
        this.context.setLanguage(res.language);
        this.context.setWords(res.words);
        console.log(this.context.language);
        console.log(this.context.words);
      })
      .catch(error => {
        this.context.setError(error);
      });
  }

  rednerWords = () => {
    const words = this.context.words;
    return words.map(word => {
      return (
        <li key={word.id}>
          <h4>{word.original}</h4>
          <div>
            <div><span>{`correct answer count: ${word.correct_count}`}</span></div>
            <div><span>{`incorrect answer count: ${word.incorrect_count}`}</span></div>
          </div>
        </li>
      );
    });
  };

  render() {
    const { name, total_score } = this.context.language;
    return (
      <section>
        <h2 className="language_header">{name}</h2>
        <p>{`Total correct answers: ${total_score}`}</p>
        <Link to='/learn'><button>Start practicing</button></Link>
        <h3>Words to practice</h3>
        <ul>
          {this.rednerWords()}
        </ul>
      </section>
    );
  }
}

export default DashboardRoute;
