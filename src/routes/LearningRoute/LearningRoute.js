import React, { Component } from 'react';
import LanguageApiService from '../../services/language-api-service';
import WordContext from '../../contexts/WordContext';
// import ProgressBar from '../../components/ProgressBar/ProgressBar';

class LearningRoute extends Component {
  state = { submitted: false };

  static contextType = WordContext;

  componentDidMount = () => {
    LanguageApiService.getNextWord()
      .then(res => {
        this.context.setWord(res);
      });
  };

  handleInputChange = (ev) => {
    this.context.handleWordInputChange(ev.target.value);
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const responseObj = await LanguageApiService.submitGuess(this.context.wordInput);
    this.setState({ submitted: true });
    this.context.setResObj(responseObj);
    console.log(responseObj);

    this.context.handleWordInputChange('');

    LanguageApiService.getNextWord()
      .then(res => {
        this.context.setWord(res);
      });
  };

  handleContinue = () => {
    console.log('continue');
  };

  renderButton = () => {
    if (!this.state.submitted) {
      return (
        <button className='submission_button' type='submit'>Submit your answer</button>
      );
    } else {
      return (
        <button className='submission_button' onClick={this.handleContinue} >Continue</button>
      );
    }
  };

  renderResponse = () => {
    if (this.state.submitted) {
      if (this.context.resObj.isCorrect) {
        return (
          <div>Correct</div>
        );
      } else {
        return (
          <div>{`Nope! The correct answer was ${this.context.resObj.answer}.`}</div>
        );
      }
    } else {
      return null;
    }
  };

  render() {
    const { word } = this.context;
    return (
      <section className='learning_section'>
        {this.context.error && <p className='error'>{this.context.error}</p>}
        <p className='DisplayScore'>Your total score is: {word.totalScore}</p>
        {/* <div className='progress_wrapper'>
          <button>X</button>
          <ProgressBar
          />
        </div> */}
        <h2>Translate the word:</h2><span>{word.nextWord}</span>
        <form onSubmit={e => this.handleSubmit(e)}>
          <div className='questions_wrapper'>
            {/* <div className='lang_container'>
              <label htmlFor='original_word'>Spanish</label>
              <p
                name='original_word'
                className='lang_question'>
                {word.nextWord}
              </p>
            </div> */}
            <div className='lang_container'>
              <label htmlFor='learn-guess-input'>What's the translation for this word?</label>
              <div className='eng_word_input'>
                <input
                  onChange={(e) => this.handleInputChange(e)}
                  id='learn-guess-input'
                  type='text'
                  value={this.context.wordInput}
                  name='learn-guess-input'
                  className='lang_question'
                  required ></input>
              </div>
              {this.renderResponse()}
            </div>
          </div>
          <div className='submission_info_wrapper'>
            <p className='total_correct_for_word submit_info'>You have answered this word correctly {word.wordCorrectCount} times. </p>
            <p className='total_incorrect_for_word submit_info'>You have answered this word incorrectly {word.wordIncorrectCount} times. </p>
            {this.renderButton()}
          </div>
        </form>
      </section>
    );
  }
}

export default LearningRoute;
