import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RiderDocument = HydratedDocument<Rider>;

@Schema()
export class Rider {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  experience: number;
}

export const RiderSchema = SchemaFactory.createForClass(Rider);
