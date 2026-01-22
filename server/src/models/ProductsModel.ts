import mongoose from "mongoose";
import { nanoid } from "nanoid";
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  productId : {type : String, required : true, default : `FILTOTECH-nanoid(6)`},
  category: { 
    type: String, 
    enum: ['HVAC', 'Air Handling Units', 'Centrifugal Fans', 'Axial Flow Fan', 'Wet Scrubber', 'Passbox', 'Package AC', 'Drain Trap', 'Air Curtain', 'Laminar Flow Unit', 'Cleanroom', 'Surgical Scrub Sink', 'Clean Room Furniture', 'Dust Collector', 'Dehumidifier', 'Stairwell Pressurisation Systems'],
    required: true 
  },
  subType : {type : String, required : false},
  base_material: String,
  moq: { type: Number, default: 1 },
  sku : {type : String, default : 1},
  // Use Mixed type for MongoDB's flexibility
  technical_specs: { type: mongoose.Schema.Types.Mixed }, 
  
  applications: [String], // e.g., ["Pharma", "Electronics"]
  created_at: { type: Date, default: Date.now }
});

// Indexing for fast library search
productSchema.index({ name: 'text', category: 1 });