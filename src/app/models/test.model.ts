export interface Answer {
  id: number; // Supposons que chaque réponse a un identifiant unique
  questionId: number; // L'identifiant de la question liée
  selectedOption: string; // L'option sélectionnée par l'utilisateur
  // Ajoutez d'autres champs si nécessaire
}

export interface Test {
  id: number;
  name: string;
  description: string;
  questions: Question[];
}

export interface Suggestion {
  id: number;
  text: string;
}
export interface Question {
  id: number;
  text: string;
  type: string;
  suggestions: Suggestion[];
  answers: Answer[]; // Ajout d'une liste de réponses
}
