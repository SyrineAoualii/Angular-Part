import { Component, OnInit } from '@angular/core';
import { TestService } from 'src/app/services/test.service';
import { AnswerService } from 'src/app/services/answer.service';
import { Test, Question, Suggestion, Answer } from 'src/app/models/test.model';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  tests: Test[] = []; // Initialisation avec un tableau vide
  userconnect = JSON.parse(localStorage.getItem("currentUser")!);
  note:any
  showNote: boolean = false;
  constructor(private testService: TestService, private answerService: AnswerService) {}

  ngOnInit() {
    this.getTestByCourseId(3);
    this.getUserScore(1)
    console.log("hellooooooooooooooooooooooooooooooo");

  }

  getTestByCourseId(courseId: number) {
    this.testService.getallTestsByCourseId(courseId).subscribe((tests: any) => {
      this.tests = tests;
      this.initializeAnswers();
    });
  }
  
  
  initializeAnswers() {
    this.tests.forEach(test => {
      test.questions.forEach(question => {
        question.answers = []; // Initialisation de la liste des réponses
      });
    });
  }

  updateSelectedOptions(event: any, suggestionId: number, questionId: number): void {
    const question = this.findQuestionById(questionId);
    if (question) {
      const suggestion = question.suggestions.find(suggestion => suggestion.id === suggestionId);
      if (suggestion) {
        const existingAnswerIndex = question.answers.findIndex(answer => answer.selectedOption === suggestion.text);
        if (event.target.checked) {
          if (existingAnswerIndex === -1) {
            question.answers.push({ id: -1, questionId: questionId, selectedOption: suggestion.text });
          }
        } else {
          if (existingAnswerIndex !== -1) {
            question.answers.splice(existingAnswerIndex, 1);
          }
        }
      }
    }
  }
  

  updateSelectedOptionForRadio(suggestionId: number, questionId: number): void {
    const question = this.findQuestionById(questionId);
    if (question) {
      const suggestion = question.suggestions.find(suggestion => suggestion.id === suggestionId);
      if (suggestion) {
        question.answers = [{ id: -1, questionId: questionId, selectedOption: suggestion.text }];
      }
    }
  }
  
  submitAnswer(testId: number, questionId: number): void {
    if (!this.userconnect.id) {
      console.error('UserId is not found in localStorage');
      return;
    }

    const question = this.findQuestionById(questionId);
    if (question) {
      question.answers.forEach(answer => {
        const answerData = {
          userId: Number(this.userconnect.id),
          courseId: testId,
          questionId: questionId,
          selectedOption: answer.selectedOption
        };

        this.answerService.submitAnswer(answerData).subscribe(
          response => console.log('Réponse soumise avec succès', response),
          error => console.error('Erreur lors de la soumission de la réponse', error)
        );
      });
    }
  }

  private findQuestionById(questionId: number): Question | undefined {
    for (const test of this.tests) {
      for (const question of test.questions) {
        if (question.id === questionId) {
          return question;
        }
      }
    }
    return undefined; // Retourne undefined si la question n'est pas trouvée
  }
  getUserScore(testId: any): void {
    this.testService.UserScore(this.userconnect.id, testId).subscribe((res: any) => {
      this.note = res;
      this.showNote = true; // Maintenant, mettez à jour l'indicateur pour montrer la note
      console.log("Score of user", this.note);
    });
  }
  submit(testId: number): void {
    // ... Votre logique de soumission de réponse ...

    // Après la soumission des réponses, obtenez la note de l'utilisateur
    this.getUserScore(testId);
  }
}
