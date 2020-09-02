import React, { Component } from 'react';
import LanguageApiService from '../../services/language-api-service';
import WordContext from '../../contexts/WordContext';
import ProgressBar from '../../components/ProgressBar/ProgressBar'

class LearningRoute extends Component {
  static contextType = WordContext;

  componentDidMount = () => {
    /**
     * @TODO tomorrow pass in the current word's next id 
     */
    

    LanguageApiService.getNextWord(1)
      .then(res => {
        this.context.setWord(res)
      });
  };

  handleInputChange = (ev) =>{
    this.context.handleWordInputChange(ev.target.value)
  }



  render() {
    const { word } = this.context;
    return (
      <section>
        <ProgressBar
        // progress={/*something */}
        />
        <h2>What is the translation for this word?</h2>
          <div className='questions_wrapper'>
            <label htmlFor='original_word'>{word.lang.name}</label>
            <p
            name='original_word'  
            className='lang_question'>
              {word.original}
            </p>
            <label htmlFor='eng_word_input'>english</label>
            <input
             onChange={(e) => this.handleInputChange(e)}
             value={this.context.wordInput} 
             name='eng_word_input' 
             className='lang_question'
             required ></input>
          </div>
          <div className='submission_info_wrapper'>
            <p className='total_correct_for_word submit_info'>you have answered this word correctly {this.context.word.correct_count} times. </p>
            <p className='total_incorrect_for_word submit_info'>You have answered this word incorrectly {this.context.word.incorrect_count} times. </p>
            <button>Submit</button>
          </div>
      </section>
    );
  }
}

export default LearningRoute;
