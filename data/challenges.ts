import { Challenge } from './types';

export const challenges: Challenge[] = [

  /*
   * =========================================================
   * LAYOUT 1 — WHITEBOARD
   * =========================================================
   */

    {
    id: 'layout1-whiteboard-unlock',
    layout: 1,

    clueIds: [
      'layout1-clue-left-chair',
      'layout1-clue-right-chair',
      'layout1-clue-plant',
      'layout1-clue-blue-board',
    ],

    question:
      'An unpleasant physical feeling that can happen because of an injury, illness, or other medical conditions.',

    answer: 'PAIN',

    explanation:
      'Pain is an unpleasant physical feeling that can happen because of an injury, illness, or other medical conditions. It can affect different parts of the body, such as the head, stomach, back, or joints.',

    type: 'short-answer',
  },

  {
    id: 'layout1-whiteboard-1',
    layout: 1,

    question:
      'The doctor has examined the X-ray results and found no serious damage. The patient ... need surgery.',

    options: [
      'mustn\'t',
      'might not',
      'should',
      'shall',
      'ought to',
    ],

    answer: 1,

    explanation:
      'CORRECT!',

    type: 'multiple-choice',
  },

  {
    id: 'layout1-whiteboard-2',
    layout: 1,

    question:
      'Before dispensing antibiotics, the pharmacist ... verify the prescription to ensure that the medicine is appropriate.',

    options: [
      'would',
      'could',
      'must',
      'might',
      'shall',
    ],

    answer: 2,

    explanation:
      'CORRECT!',

    type: 'multiple-choice',
  },

  {
    id: 'layout1-whiteboard-3',
    layout: 1,

    question:
      '... you mind waiting outside while the laboratory technician prepares your test?',

    options: [
      'should',
      'can',
      'might',
      'mustn\'t',
      'Would',
    ],

    answer: 4,

    explanation:
      'CORRECT!',

    type: 'multiple-choice',
  },

  {
    id: 'layout1-whiteboard-4',
    layout: 1,

    question:
      'The nutritionist advises the patient with high blood pressure that he ... reduce his salt intake.',

    options: [
      'should',
      'might',
      'can',
      'will',
      'would',
    ],

    answer: 0,

    explanation:
      'CORRECT!',

    type: 'multiple-choice',
  },

  {
    id: 'layout1-whiteboard-5',
    layout: 1,

    question:
      'The laboratory technician is unsure about the test result because the blood sample was damaged. The result ... be inaccurate.',

    options: [
      'shall',
      'must',
      'might',
      'ought to',
      'would',
    ],

    answer: 2,

    explanation:
      'CORRECT!',

    type: 'multiple-choice',
  },


  /*
   * =========================================================
   * LAYOUT 1 — DRAWER
   * =========================================================
   */

  {
    id: 'layout1-drawer-1',
    layout: 1,

    question:
      'Visitors ... enter the operating room without permission because the area requires strict infection control.',

    options: [
      'couldn\'t',
      'mustn\'t',
      'wouldn\'t',
      'shouldn\'t have',
      'might',
    ],

    answer: 1,

    explanation:
      'CORRECT!',

    type: 'multiple-choice',
  },

  {
    id: 'layout1-drawer-2',
    layout: 1,

    question:
      '... you tell me where it hurts?',

    options: [
      'Must',
      'Shall',
      'Ought to',
      'Could',
      'Will have',
    ],

    answer: 3,

    explanation:
      'CORRECT!',

    type: 'multiple-choice',
  },

  {
    id: 'layout1-drawer-3',
    layout: 1,

    question:
      'The hospital has scheduled a vaccination program for tomorrow. The medical team ... begin the program at 8 a.m.',

    options: [
      'would',
      'might not',
      'will',
      'mustn\'t',
      'could have',
    ],

    answer: 2,

    explanation:
      'CORRECT!',

    type: 'multiple-choice',
  },

  {
    id: 'layout1-drawer-4',
    layout: 1,

    question:
      'The dentist explains that the patient has a cavity. Without proper treatment, the condition ... become more serious.',

    options: [
      'could',
      'mustn\'t',
      'might not',
      'will not',
      'shouldn\'t',
    ],

    answer: 0,

    explanation:
      'CORRECT!',

    type: 'multiple-choice',
  },

  {
    id: 'layout1-drawer-5',
    layout: 1,

    question:
      '... I carry those bags for you?',

    options: [
      'Must',
      'Might',
      'Should',
      'Would have',
      'Shall',
    ],

    answer: 4,

    explanation:
      'CORRECT!',

    type: 'multiple-choice',
  },


  /*
   * =========================================================
   * LAYOUT 2 — TEACHER DESK
   * =========================================================
   */

  {
    id: 'layout2-teacherdesk-1',
    layout: 2,

    question:
      'The surgeon has not examined the patient yet, so he ... confirm whether an operation is necessary.',
    options: [
      'mustn\'t',
      'cannot',
      'might not',
      'wouldn\'t',
    ],

    answer: 2,

    explanation:
      'CORRECT!',

    type: 'multiple-choice',
  },

  {
    id: 'layout2-teacherdesk-2',
    layout: 2,

    question:
      'You ... take more than the recommended dose of this medicine',

    options: [
      'should',
      'could',
      'can',
      'would',
    ],

    answer: 0,

    explanation:
      'CORRECT!',

    type: 'multiple-choice',
  },

  {
    id: 'layout2-teacherdesk-3',
    layout: 2,

    question:
      'The medical laboratory technician ... wear protective gloves when handling blood samples because safety regulations require it.',

    options: [
      'must',
      'might',
      'could',
      'would',
    ],

    answer: 0,

    explanation:
      'CORRECT!',

    type: 'multiple-choice',
  },

  {
    id: 'layout2-teacherdesk-4',
    layout: 2,

    question:
      '... I see the results of my blood test, Doctor?',

    options: [
      'Must',
      'Should',
      'May',
      'Ought to',
    ],

    answer: 2,

    explanation:
      'CORRECT!',

    type: 'multiple-choice',
  },

  {
    id: 'layout2-teacherdesk-5',
    layout: 2,

    question:
      'The dentist advises the child to brush his teeth twice a day. He ... also avoid eating too many sugary snacks.',

    options: [
      'can',
      'would',
      'shall',
      'should',
    ],

    answer: 3,

    explanation:
      'CORRECT!',

    type: 'multiple-choice',
  },

  {
    id: 'layout2-teacherdesk-6',
    layout: 2,

    question:
      'The ambulance driver is approaching a crowded intersection. He ... drive carefully and follow traffic regulations.',

    options: [
      'must',
      'might',
      'would',
      'could',
    ],

    answer: 0,

    explanation:
      'CORRECT!',

    type: 'multiple-choice',
  },

  {
    id: 'layout2-teacherdesk-7',
    layout: 2,

    question:
      '... you mind helping me move this wheelchair closer to the bed?',

    options: [
      'Must',
      'Shall',
      'Might',
      'Would',
    ],

    answer: 3,

    explanation:
      'CORRECT!',

    type: 'multiple-choice',
  },

  {
    id: 'layout2-teacherdesk-8',
    layout: 2,

    question:
      'The hospital has announced a free health screening event for next Monday. The doctors ... examine residents from 8 a.m. to noon.',

    options: [
      'mustn\'t',
      'would have',
      'will',
      'should have',
    ],

    answer: 2,

    explanation:
      'CORRECT!',

    type: 'multiple-choice',
  },

  {
    id: 'layout2-teacherdesk-9',
    layout: 2,

    question:
      'The patient has been coughing for several days. He ... consult a doctor if the symptoms continue.',

    options: [
      'should',
      'mustn\'t',
      'shall',
      'ought to',
    ],

    answer: 0,

    explanation:
      'CORRECT!',

    type: 'multiple-choice',
  },

  {
    id: 'layout2-teacherdesk-10',
    layout: 2,

    question:
      '... you tell me what you usually eat for breakfast?',

    options: [
      'Will',
      'May',
      'Would',
      'Could',
    ],

    answer: 3,

    explanation:
      'CORRECT!',

    type: 'multiple-choice',
  },


  /*
   * =========================================================
   * LAYOUT 3 — WATER GALLON 1
   * FIND ERROR
   * =========================================================
   */

  {
    id: 'l3-water-gallon-1-1',
    layout: 3,

    question:
      'Find the incorrect word in this sentence:\n\n"The nurse should checked the patient\'s temperature before giving the medicine."',

    answer: 'checked',

    explanation:
      'After the modal verb "should", we use the base form of the verb. The correct sentence is: "The nurse should check the patient\'s temperature before giving the medicine."',

    type: 'find-error',

    clueIds: [],
  },

  {
    id: 'l3-water-gallon-1-2',
    layout: 3,

    question:
      'Find the incorrect word in this sentence:\n\n"Patients must takes their medication according to the doctor\'s instructions."',

    answer: 'takes',

    explanation:
      'After the modal verb "must", we use the base form "take". The correct sentence is: "Patients must take their medication according to the doctor\'s instructions."',

    type: 'find-error',

    clueIds: [],
  },

  {
    id: 'l3-water-gallon-1-3',
    layout: 3,

    question:
      'Find the incorrect word in this sentence:\n\n"The patient has a very high fever, so the nurse might contact the doctor immediately."',

    answer: 'might',

    explanation:
      'In this context, "must" is more appropriate because the very high fever requires an immediate action. The sentence should be: "The patient has a very high fever, so the nurse must contact the doctor immediately."',

    type: 'find-error',

    clueIds: [],
  },

  {
    id: 'l3-water-gallon-1-4',
    layout: 3,

    question:
      'Find the incorrect word in this sentence:\n\n"You should drinking plenty of water while recovering from dehydration."',

    answer: 'drinking',

    explanation:
      'After the modal verb "should", we use the base form "drink". The correct sentence is: "You should drink plenty of water while recovering from dehydration."',

    type: 'find-error',

    clueIds: [],
  },

  {
    id: 'l3-water-gallon-1-5',
    layout: 3,

    question:
      'Find the incorrect word in this sentence:\n\n"The patient is unconscious, so the nurse can\'t to leave the patient unattended."',

    answer: 'to',

    explanation:
      'After "can\'t", we use the base form without "to". The correct sentence is: "The nurse can\'t leave the patient unattended."',

    type: 'find-error',

    clueIds: [],
  },


  /*
   * =========================================================
   * LAYOUT 3 — WATER GALLON 2
   * WORD SCRAMBLE
   * =========================================================
   */

  {
    id: 'l3-water-gallon-2-1',
    layout: 3,

    question:
      'Arrange the words to make a correct sentence:',

    options: [
      'MUST',
      'PATIENTS',
      'THEIR',
      'TAKE',
      'MEDICINE',
      'REGULARLY',
    ],

    answer: 'Patients must take their medicine regularly',

    explanation:
      'The correct sentence is: "PATIENTS MUST TAKE THEIR MEDICINE REGULARLY"',

    type: 'word-scramble',

    clueIds: [],
  },

  {
    id: 'l3-water-gallon-2-2',
    layout: 3,

    question:
      'Arrange the words to make a correct sentence:',

    options: [
      'SURGERY',
      'AFTER',
      'THE',
      'PATIENT',
      'REST',
      'SHOULD',
    ],

    answer: 'The patient should rest after surgery',

    explanation:
      'The correct sentence is: "THE PATIENT SHOULD REST AFTER SURGERY"',

    type: 'word-scramble',

    clueIds: [],
  },

  {
    id: 'l3-water-gallon-2-3',
    layout: 3,

    question:
      'Arrange the words to make a correct sentence:',

    options: [
      'EXPERIENCE',
      'MIGHT',
      'PATIENT',
      'SOME',
      'DIZZINESS',
      'THE',
    ],

    answer: 'The patient might experience some dizziness',

    explanation:
      'The correct sentence is: "THE PATIENT MIGHT EXPERIENCE SOME DIZZINESS"',

    type: 'word-scramble',

    clueIds: [],
  },

  {
    id: 'l3-water-gallon-2-4',
    layout: 3,

    question:
      'Arrange the words to make a correct sentence:',

    options: [
      'CHECK',
      'SHOULD',
      'THE',
      'NURSES',
      'PRESSURE',
      'REGULARLY',
      'PATIENT\'S',
      'BLOOD',
    ],

    answer: 'Nurses should check the patient\'s blood pressure regularly',

    explanation:
      'The correct sentence is: "NURSES SHOULD CHECK THE PATIENT\'S BLOOD PRESSURE REGULARLY"',

    type: 'word-scramble',

    clueIds: [],
  },

  {
    id: 'l3-water-gallon-2-5',
    layout: 3,

    question:
      'Arrange the words to make a correct sentence:',

    options: [
      'WEAR',
      'YOU',
      'PROTECTIVE',
      'MUST',
      'EQUIPMENT',
      'TREATMENT',
      'THE',
      'IN',
      'ROOM',
    ],

    answer: 'You must wear protective equipment in the treatment room',

    explanation:
      'The correct sentence is: "YOU MUST WEAR PROTECTIVE EQUIPMENT IN THE TREATMENT ROOM"',

    type: 'word-scramble',

    clueIds: [],
  },


  /*
   * =========================================================
   * LAYOUT 3 — WATER GALLON 3
   * HANGMAN
   * =========================================================
   */

    {
    id: 'l3-water-gallon-3-1',
    layout: 3,

    question:
      'Guess the healthcare word:',

    answer: 'THERMOMETER',

    clue:
      'This instrument is used to measure a patient\'s body temperature.',

    explanation:
      'A thermometer is an instrument used to measure body temperature.',

    type: 'hangman',

    clueIds: [],
  },

  {
    id: 'l3-water-gallon-3-2',
    layout: 3,

    question:
      'Guess the healthcare word:',

    answer: 'STETHOSCOPE',

    clue:
      'This instrument is used to listen to the heart and lungs.',

    explanation:
      'A stethoscope is an instrument commonly used by healthcare professionals to listen to sounds inside the body, such as the heart and lungs.',

    type: 'hangman',

    clueIds: [],
  },

  {
    id: 'l3-water-gallon-3-3',
    layout: 3,

    question:
      'Guess the healthcare word:',

    answer: 'PRESCRIPTION',

    clue:
      'This is a written instruction from a healthcare professional about medicine or treatment.',

    explanation:
      'A prescription is an instruction from an authorized healthcare professional about medicine or treatment for a patient.',

    type: 'hangman',

    clueIds: [],
  },

  {
    id: 'l3-water-gallon-3-4',
    layout: 3,

    question:
      'Guess the healthcare word:',

    answer: 'HYPERTENSION',

    clue:
      'A medical condition in which the pressure of blood against the walls of the arteries is consistently too high.',

    explanation:
      'Hypertension is a condition in which blood pressure is consistently too high. If untreated, it can increase the risk of heart disease and stroke.',

    type: 'hangman',

    clueIds: [],
  },

  {
    id: 'l3-water-gallon-3-5',
    layout: 3,

    question:
      'Guess the healthcare word:',

    answer: 'INJECTION',

    clue:
      'A common medical procedure used to deliver medicine or vaccines directly into the body.',

    explanation:
      'An injection is a medical procedure in which medicine or a vaccine is introduced into the body using a needle and syringe. It is commonly used to treat illnesses, prevent diseases, and provide medication when needed.',

    type: 'hangman',

    clueIds: [],
  },


  /*
   * =========================================================
   * LAYOUT 4
   * =========================================================
   *
   * No Layout 4 challenges were present in the source file.
   * Keep this section for future Layout 4 questions.
   *
   * =========================================================
   */

];