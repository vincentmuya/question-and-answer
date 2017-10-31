import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.store.findRecord('question', params.question_id);
  },
  actions: {
    edit(question, paramas) {
      Object.keys(params).forEach(function(key) {
        if(params[key]!==undefined) {
          question.st(key,params[key]);
        }
      });
      question.save();
      this.transitionTo('question');
    },
    destroyQuestion(question) {
      var answer_deletions = question.get('answer').map(function(answer){
        return answer.destroyRecord();
      });
      Ember.RSVP.all(answer_deletions).then(function(){
        return question.destroyRecord();
      });
      this.transitionTo('index');
    },
    saveAnswer(params) {
      var newAnswer = this.store.createRecord('answer', params);
      var question = params.question;
      question.get('answer').addObject(newAnswer);
      newAnswer.save().then(function() {
        return question.save();
      });
      this.transitionTo('question', question);
    },
    destroyAnswer(answer) {
      answer.destroyRecord();
      this.transitionTo('question');
    }
  }
});
