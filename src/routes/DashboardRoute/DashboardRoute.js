import React, { Component } from 'react';
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

  render() {
    const { name } = this.context.language;

    return (
      <section>
        <h2 className="language_header">{name}</h2>
      </section>
    );
  }
}

export default DashboardRoute;
