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
          <div aria-live="polite">
            <div className='correct count_list_item'><span>{`correct answer count: ${word.correct_count}`}</span></div>
            <div className='incorrect count_list_item'><span>{`incorrect answer count: ${word.incorrect_count}`}</span></div>
          </div>
        </li>
      );
    });
  };

  render() {
    const { name, total_score } = this.context.language;
    return (
      <section id="dashboard">
        <div className="dash_col left_col">
          <div className='list_wrap' aria-live="polite">
            <h3>Words to practice</h3>
            <ul className='word_list'>
              {this.rednerWords()}
            </ul>
          </div>
        </div>
        <div className="dash_col right_col" aria-live="polite">
          <h2 className="language_header">{name}</h2>
          <p className='total_count_text'>{`Total correct answers: ${total_score}`}</p>
          <Link to='/learn'><button className='start_button' >Start practicing</button></Link>
        </div>
      </section>
    );
  }
}

export default DashboardRoute;
