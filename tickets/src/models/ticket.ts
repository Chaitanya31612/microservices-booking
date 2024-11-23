import mongoose, { Document, Model, Schema } from "mongoose";

// An interface that describes the properties that are required to create a newTicket
interface TicketAttrs {
  title: string;
  price: number;
  userId: string;
}

// An interface that describes the properties that a Ticket document has
interface TicketDoc extends Document {
  title: string;
  price: number;
  userId: string;
}

// interface to describe properties that a Ticket model has
interface TicketModel extends Model<TicketDoc> {
  build(attrs: TicketAttrs): TicketDoc;
}

const ticketSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    // override toJSON method to change the JSON response
    toJSON: {
      versionKey: false, // remove __v property
      transform(doc, ret) {
        // change _id to id and remove password
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

// statics is used to add a method directly to the model, so Ticket.build({...}) can be used
ticketSchema.statics.build = (attrs: TicketAttrs) => {
  return new Ticket(attrs);
};

const Ticket = mongoose.model<TicketDoc, TicketModel>("Ticket", ticketSchema);

export { Ticket };
