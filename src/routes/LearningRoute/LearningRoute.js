import React, { Component } from 'react';
import LanguageApiService from '../../services/language-api-service';
import WordContext from '../../contexts/WordContext';
import ProgressBar from '../../components/ProgressBar/ProgressBar';

class LearningRoute extends Component {
  static contextType = WordContext;

  componentDidMount = () => {
    /**
     * @TODO tomorrow pass in the current word's next id 
     */


    LanguageApiService.getNextWord(1)
      .then(res => {
        this.context.setWord(res);
      });
  };

  handleInputChange = (ev) => {
    this.context.handleWordInputChange(ev.target.value);
  };



  render() {
    const { word } = this.context;
    return (
      <section className='learning_section'>
        <h3>Your total score is: {word.lang.total_score}/10</h3>
        <div className='progress_wrapper'>
          <button>X</button>
          <ProgressBar
          // progress={/*something */}
          />
        </div>
        <h2>What is the translation for this word?</h2>
        <div className='questions_wrapper'>
          <div className='lang_container'>
            <label htmlFor='original_word'>{word.lang.name}</label>
            <p
              name='original_word'
              className='lang_question'>
              {word.original}
            </p>
          </div>
          <div className='lang_container'>
            <label htmlFor='eng_word_input'>English</label>
            <div className='eng_word_input'>
              <input
                onChange={(e) => this.handleInputChange(e)}
                value={this.context.wordInput}
                name='eng_word_input'
                className='lang_question'
                required ></input>
            </div>
          </div>
        </div>
        <div className='submission_info_wrapper'>
          <p className='total_correct_for_word submit_info'>You have answered this word correctly {this.context.word.correct_count} times. </p>
          <p className='total_incorrect_for_word submit_info'>You have answered this word incorrectly {this.context.word.incorrect_count} times. </p>
          <button className='submission_button'>Submit</button>
        </div>
      </section>
    );
  }
}

export default LearningRoute;
