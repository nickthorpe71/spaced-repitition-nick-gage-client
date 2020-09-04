import React, { Component } from "react";
import LanguageApiService from "../../services/language-api-service";
import WordContext from "../../contexts/WordContext";
// import ProgressBar from '../../components/ProgressBar/ProgressBar';

class LearningRoute extends Component {
  state = { submitted: false };

  static contextType = WordContext;

  componentDidMount = () => {
    LanguageApiService.getNextWord().then((res) => {
      this.context.setWord(res);
    });
  };

  handleInputChange = (ev) => {
    this.context.handleWordInputChange(ev.target.value);
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    const { wordInput } = this.context;

    this.context.setGuess(wordInput);

    const responseObj = await LanguageApiService.submitGuess(
      wordInput
    );
    this.setState({ submitted: true });
    this.context.setResObj(responseObj);
    console.log(responseObj);

    this.context.clearWordInput();
  };

  handleContinue = () => {
    console.log("continue");
    this.setState({ submitted: false });
    LanguageApiService.getNextWord().then((res) => {
      this.context.setWord(res);
    });
  };

  renderButton = () => {
    if (!this.state.submitted) {
      return (
        <button className="submission_button" type="submit">
          Submit your answer
        </button>
      );
    } else {
      return (
        <button className="submission_button" type="none" onClick={this.handleContinue}>
          Try another word!
        </button>
      );
    }
  };

  renderResponse = () => {
    if (this.state.submitted) {
      if (this.context.resObj.isCorrect) {
        return (
          <>
            <h2>You were correct! :D</h2>
            <div className='DisplayFeedback'>
              <p>The correct translation for {this.context.word.nextWord} was {this.context.resObj.answer} and you chose {this.context.theLastGuess}!</p>
            </div>
          </>
        );
      } else {
        return (<>
          <div className='feedback_wrapper'> <h2 className='feedBack'>Good try, but not quite right :(</h2></div>
          <div className='DisplayFeedback'>
            <p>The correct translation for {this.context.word.nextWord} was {this.context.resObj.answer} and you chose {this.context.theLastGuess}!</p>
          </div>
        </>);
      }
    }
  };

  renderInputSection = () => {
    if (!this.state.submitted) {
      return (
        <div className="eng_word_input">
          <label htmlFor="learn-guess-input">
            What's the translation for this word?
              </label>
          <input
            onChange={(e) => this.handleInputChange(e)}
            id="learn-guess-input"
            type="text"
            value={this.context.wordInput}
            name="learn-guess-input"
            className="lang_question"
            required
          ></input>
        </div>
      );
    }
  };

  renderTranslateWord = () => {
    let nextWord = this.context.resObj.nextWord ? this.context.resObj.nextWord : this.context.word.nextWord;
    if (!this.state.submitted) {
      return (
        <div className='translated_word_wrapper'><h2 className="translated_word">Translate the word:</h2><span>{nextWord}</span></div>
      );
    }
  };

  render() {
    const { word, resObj } = this.context;

    let totalScore = resObj.totalScore ? resObj.totalScore : word.totalScore;

    return (

      <section className="learning_section">
        {this.context.error && <p aria-live="polite" className='error'>{this.context.error}</p>}
        <div aria-live="polite" className="DisplayScore"><p>Your total score is: {totalScore}</p></div>
        {this.renderTranslateWord()}
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <div aria-live="polite" className="questions_wrapper">
            <div className="lang_container">
              {this.renderInputSection()}
              {this.renderResponse()}
            </div>
          </div>
          <div aria-live="polite" className="submission_info_wrapper">
            <p className="total_correct_for_word submit_info">
              You have answered this word correctly {word.wordCorrectCount} times.
            </p>
            <p className="total_incorrect_for_word submit_info">
              You have answered this word incorrectly {word.wordIncorrectCount} times.
            </p>
            {this.renderButton()}
          </div>
        </form>
      </section>
    );
  }
}

export default LearningRoute;