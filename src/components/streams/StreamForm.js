import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamForm extends Component {
  renderError(error, touched) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  renderInput = ({ input, label, meta: { error, touched } }) => {
    return (
      <div className={`field ${error && touched ? 'error' : ''}`}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {this.renderError(error, touched)}
      </div>
    );
  };

  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(this.props.onSubmit)}
        className="ui form error"
      >
        <Field name="title" component={this.renderInput} label="Enter title" />
        <Field
          name="description"
          component={this.renderInput}
          label="Enter Description"
        />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

const validate = ({ title, description }) => {
  const errors = {};

  if (!title) errors.title = 'You must enter a title';
  if (!description) errors.description = 'You must enter a description';

  return errors;
};

export default reduxForm({
  form: 'streamForm',
  validate,
})(StreamForm);
