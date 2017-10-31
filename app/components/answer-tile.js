import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    delete(answer) {
      if (confirm'Are you sure you want to deletethis answer?')){
        this.sendAction('destroyAnswer', answer);
      }
    }
  }
});
