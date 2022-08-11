const { Schema, model } = require("mongoose");

const EventoSchema = Schema({
  title: {
    type: String,
    required: true,
  },

  notes: {
    type: String,
  },

  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },

  user: {
    type: Schema.Types.ObjectId, // hace referencia a la tabla Usuario i su id
    ref: "Usuario",
    required: true,
  },
});

// SI no te gusta el _id se puede cambiar y tb que no aparezca _v
EventoSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = model("Evento", EventoSchema);
