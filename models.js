module.exports = function(mongoose) {

  var schemas = {
    Deploy: new Schema({
      created_at:       Date,
      environment:      String,
      commit_sha:       String,
      changes:          String
    }),

    Exception: new Schema({
      title:            String,
      affecting:        String,
      occurrences:      Number
    }),

    Status: new Schema({
      created_at:       Date,
      last_checked_at:  Date,
      state:            String,
      type:             String
    }),

    Issue: new Schema({
      number:           Number,
      title:            String,
      status:           String,
      deploy_id:        ObjectId,
      progress:         Number
    }),

    Project: new Schema({
      name:             String,
      issues:           [this.Issue],
      url:              String,
      statuses:         [this.Status],
      exceptions:       [this.Exception],
      deploys:          [this.Deploy]
    }),

    User: new Schema({
      id:               ObjectId,
      email:            String,
      salt:             String,
      hashed_password:  String,
      invoice_amount:   Number,
      projects:         [this.Project]
    })
  };

  for(var model in schemas) {
    mongoose.model(model, schemas[model]);
  }

};
