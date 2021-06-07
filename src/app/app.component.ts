import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormArray, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  QuestionForm: FormGroup;
  titleForm: FormGroup;
  formValues: any;
  constructor(private formBuilder: FormBuilder) {
    this.formValues = this.formResponse();
  }

  ngOnInit() {
    this.QuestionForm = this.formBuilder.group({
      questions: this.formBuilder.array([this.initQuestionsForms()]),
    });

    this.titleForm = this.formBuilder.group({
      title: [this.formValues?.title],
      description: [this.formValues?.description],
    });

    this.fillInitialValue();
  }

  get questionFormArray() {
    return this.QuestionForm?.get('questions') as FormArray;
  }

  initQuestionsForms() {
    return this.formBuilder.group({
      title: [''],
      question: [''],
      answer: [''],
    });
  }

  fillInitialValue() {
    this.questionFormArray
      .get(`0.title`)
      .patchValue(this.formValues?.questions[0]?.title);
    this.questionFormArray
      .get(`0.question`)
      .patchValue(this.formValues?.questions[0]?.questionText);
    this.questionFormArray
      .get(`0.answer`)
      .patchValue(this.formValues?.questions[0]?.correctAnswer);
  }

  addNewQuestion() {
    this.questionFormArray.push(this.initQuestionsForms());
  }

  deleteQuestion(index: number) {
    this.questionFormArray.removeAt(index);
  }

  save() {
    const formValueObject = {
      title: this.titleForm.get('title')?.value,
      description: this.titleForm.get('description')?.value,
      questions: [],
    };

    this.questionFormArray.controls.forEach((questionForm) => {
      formValueObject.questions.push(questionForm?.value);
    });

    console.log(formValueObject);
  }

  formResponse() {
    return {
      title: "My Question's Form",
      description: '',
      questions: [
        {
          id: '001',
          title: 'Question #1',
          questionText: 'Is it a difficult question?',
          correctAnswer: 'Yes it is',
        },
      ],
    };
  }
}
