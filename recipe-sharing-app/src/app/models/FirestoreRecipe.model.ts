export interface FirestoreRecipe {
  documents: any;
  name: string;
  fields: {
    title: { stringValue: string };
    description: { stringValue: string };
    imageUrl: { stringValue: string };
    ingredients: { arrayValue: { values: { stringValue: string }[] } };
    instructions: { arrayValue: { values: { stringValue: string }[] } };
  };
}
