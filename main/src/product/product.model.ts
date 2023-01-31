import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { type } from 'os';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop()
  id: number;
  @Prop()
  name: string;
  @Prop()
  image: string;
  @Prop()
  likes: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
